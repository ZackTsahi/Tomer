#!/usr/bin/env python3
"""
Read-only portfolio monitoring agent.

Analysis and alerts only — this tool NEVER places, modifies, or cancels trades.
It fetches quotes, converts USD -> ILS explicitly, and reports status / risk / alerts.

Subcommands:
    status   Per-position price, value, daily change, unrealized P/L, weight.
    risk     Flags concentration (single position, sector, theme) and drawdowns.
    alerts   Cron-friendly: prints only what crossed a threshold you configured.

Currency model:
    - Each holding's avg_cost is in its cost_currency (USD here).
    - Live quotes come back in the instrument's native currency (USD for US listings);
      the code reads that currency back and warns if it is ever NOT USD.
    - A single USD->ILS rate (Yahoo symbol ILS=X) is applied once, at the display edge.
    - Percentages (daily, P/L, weight) are ratios and therefore FX-independent.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from dataclasses import dataclass
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_PORTFOLIO = os.path.join(HERE, "portfolio.json")
DEFAULT_CONFIG = os.path.join(HERE, "config.json")
STATE_FILE = os.path.join(HERE, ".alert_state.json")


# --------------------------------------------------------------------------- #
# Data model
# --------------------------------------------------------------------------- #
@dataclass
class Position:
    ticker: str
    name: str
    shares: float
    avg_cost: float          # USD per share
    sector: str
    theme: str
    price: float             # USD per share, current
    prev_close: float        # USD per share, previous regular-session close
    currency: str            # native quote currency, expected "USD"

    @property
    def daily_pct(self) -> float:
        if not self.prev_close:
            return 0.0
        return (self.price / self.prev_close - 1.0) * 100.0

    @property
    def market_value_usd(self) -> float:
        return self.shares * self.price

    @property
    def cost_basis_usd(self) -> float:
        return self.shares * self.avg_cost

    @property
    def unrealized_pl_usd(self) -> float:
        return self.market_value_usd - self.cost_basis_usd

    @property
    def unrealized_pl_pct(self) -> float:
        if not self.avg_cost:
            return 0.0
        return (self.price / self.avg_cost - 1.0) * 100.0

    @property
    def daily_change_usd(self) -> float:
        return self.shares * (self.price - self.prev_close)


# --------------------------------------------------------------------------- #
# JSON loading
# --------------------------------------------------------------------------- #
def load_json(path: str) -> dict:
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except FileNotFoundError:
        sys.exit(f"error: file not found: {path}")
    except json.JSONDecodeError as exc:
        sys.exit(f"error: invalid JSON in {path}: {exc}")


def load_portfolio(path: str) -> dict:
    data = load_json(path)
    if not data.get("holdings"):
        sys.exit(f"error: no 'holdings' in {path}")
    return data


# --------------------------------------------------------------------------- #
# Market data
# --------------------------------------------------------------------------- #
def _import_yfinance():
    try:
        import yfinance as yf  # noqa: WPS433 (local import keeps --help/offline working)
        return yf
    except ImportError:
        sys.exit(
            "error: yfinance is not installed.\n"
            "       pip install -r requirements.txt  (or: pip install yfinance)\n"
            "       Or run offline with --fixture fixtures/snapshot_2026-06-04.json"
        )


def _fast_info_get(fast_info, *keys):
    """fast_info exposes both snake_case attrs and camelCase keys across versions.

    A failed network fetch can surface as almost any exception from deep inside
    yfinance, so we swallow broadly here and let the caller decide what a missing
    value means.
    """
    for key in keys:
        try:
            val = fast_info[key]
        except Exception:  # noqa: BLE001 - yfinance raises varied errors on lookup miss / network failure
            try:
                val = getattr(fast_info, key, None)
            except Exception:  # noqa: BLE001
                val = None
        if val is not None:
            return val
    return None


def get_fx_rate(symbol: str) -> float:
    """USD -> ILS via Yahoo (symbol 'ILS=X' = ILS per 1 USD)."""
    yf = _import_yfinance()
    try:
        fi = yf.Ticker(symbol).fast_info
        rate = _fast_info_get(fi, "last_price", "lastPrice", "previous_close", "previousClose")
    except Exception as exc:  # noqa: BLE001
        sys.exit(f"error: could not fetch FX rate for {symbol}: {exc}")
    if not rate:
        sys.exit(
            f"error: could not fetch FX rate for {symbol} (no data returned).\n"
            "       Check your network/Yahoo access, or run offline with --fixture."
        )
    return float(rate)


def get_quotes(tickers: list[str]) -> dict[str, dict]:
    yf = _import_yfinance()
    quotes: dict[str, dict] = {}
    for ticker in tickers:
        try:
            fi = yf.Ticker(ticker).fast_info
            price = _fast_info_get(fi, "last_price", "lastPrice")
            prev = _fast_info_get(fi, "previous_close", "previousClose")
            currency = _fast_info_get(fi, "currency") or "USD"
        except Exception as exc:  # noqa: BLE001
            print(f"warning: failed to fetch {ticker}: {exc}", file=sys.stderr)
            continue
        if price is None or prev is None:
            print(f"warning: no quote for {ticker}; skipping", file=sys.stderr)
            continue
        quotes[ticker] = {"price": float(price), "prev_close": float(prev), "currency": currency}
    return quotes


def load_fixture(path: str) -> tuple[dict, float]:
    data = load_json(path)
    fx_map = data.get("fx", {})
    fx = float(next(iter(fx_map.values()))) if fx_map else 1.0
    return data.get("quotes", {}), fx


# --------------------------------------------------------------------------- #
# Build positions
# --------------------------------------------------------------------------- #
def build_positions(portfolio: dict, quotes: dict[str, dict]) -> list[Position]:
    positions: list[Position] = []
    for h in portfolio["holdings"]:
        ticker = h["ticker"]
        q = quotes.get(ticker)
        if not q:
            print(f"warning: no quote for {ticker}; skipping position", file=sys.stderr)
            continue
        cost_ccy = h.get("cost_currency", "USD")
        if cost_ccy != "USD" or q["currency"] != "USD":
            print(
                f"warning: {ticker} currency mismatch "
                f"(cost={cost_ccy}, quote={q['currency']}); FX assumes USD legs",
                file=sys.stderr,
            )
        positions.append(
            Position(
                ticker=ticker,
                name=h.get("name", ticker),
                shares=float(h["shares"]),
                avg_cost=float(h["avg_cost"]),
                sector=h.get("sector", "Uncategorized"),
                theme=h.get("theme", "Uncategorized"),
                price=q["price"],
                prev_close=q["prev_close"],
                currency=q["currency"],
            )
        )
    if not positions:
        sys.exit("error: no positions could be priced. Check tickers / network / --fixture.")
    return positions


def resolve_market_data(args, portfolio) -> tuple[dict[str, dict], float]:
    """Returns (quotes, usd_to_ils). Uses a fixture file if given, else live Yahoo."""
    if args.fixture:
        return load_fixture(args.fixture)
    tickers = [h["ticker"] for h in portfolio["holdings"]]
    quotes = get_quotes(tickers)
    fx = get_fx_rate(portfolio.get("fx_symbol", "ILS=X"))
    return quotes, fx


# --------------------------------------------------------------------------- #
# Formatting
# --------------------------------------------------------------------------- #
COLOR = sys.stdout.isatty()


def _c(text: str, code: str) -> str:
    return f"\033[{code}m{text}\033[0m" if COLOR else text


def fmt_pct(value: float) -> str:
    s = f"{value:+.2f}%"
    if not COLOR:
        return s
    return _c(s, "32" if value >= 0 else "31")


def fmt_ils(value: float) -> str:
    return f"₪{value:,.0f}"


def fmt_usd(value: float) -> str:
    return f"${value:,.2f}"


def header(title: str) -> None:
    print()
    print(_c(title, "1;36"))
    print(_c("─" * len(title), "36"))


# --------------------------------------------------------------------------- #
# Commands
# --------------------------------------------------------------------------- #
def cmd_status(args) -> int:
    portfolio = load_portfolio(args.portfolio)
    quotes, fx = resolve_market_data(args, portfolio)
    positions = build_positions(portfolio, quotes)

    total_mv_usd = sum(p.market_value_usd for p in positions)
    total_cost_usd = sum(p.cost_basis_usd for p in positions)
    total_daily_usd = sum(p.daily_change_usd for p in positions)
    total_prev_usd = total_mv_usd - total_daily_usd

    header(f"PORTFOLIO STATUS   {datetime.now(timezone.utc):%Y-%m-%d %H:%M UTC}   "
           f"USD/ILS {fx:.3f}")

    cols = f"{'Ticker':<6}{'Price':>11}{'Daily':>10}{'Value (ILS)':>15}{'Wt':>8}{'P/L %':>10}{'P/L (ILS)':>15}"
    print(cols)
    print("-" * len(cols))
    for p in sorted(positions, key=lambda x: x.market_value_usd, reverse=True):
        weight = p.market_value_usd / total_mv_usd * 100 if total_mv_usd else 0
        print(
            f"{p.ticker:<6}"
            f"{fmt_usd(p.price):>11}"
            f"{fmt_pct(p.daily_pct):>{10 + (9 if COLOR else 0)}}"
            f"{fmt_ils(p.market_value_usd * fx):>15}"
            f"{weight:>7.1f}%"
            f"{fmt_pct(p.unrealized_pl_pct):>{10 + (9 if COLOR else 0)}}"
            f"{fmt_ils(p.unrealized_pl_usd * fx):>15}"
        )

    print("-" * len(cols))
    total_pl_usd = total_mv_usd - total_cost_usd
    total_pl_pct = (total_mv_usd / total_cost_usd - 1) * 100 if total_cost_usd else 0
    total_daily_pct = (total_mv_usd / total_prev_usd - 1) * 100 if total_prev_usd else 0
    print(
        f"{'TOTAL':<6}"
        f"{'':>11}"
        f"{fmt_pct(total_daily_pct):>{10 + (9 if COLOR else 0)}}"
        f"{fmt_ils(total_mv_usd * fx):>15}"
        f"{100.0:>7.1f}%"
        f"{fmt_pct(total_pl_pct):>{10 + (9 if COLOR else 0)}}"
        f"{fmt_ils(total_pl_usd * fx):>15}"
    )
    print()
    print(f"Cost basis: {fmt_ils(total_cost_usd * fx)}   "
          f"Market value: {fmt_ils(total_mv_usd * fx)}   "
          f"Unrealized P/L: {fmt_ils(total_pl_usd * fx)} ({total_pl_pct:+.2f}%)")
    print(f"(USD — value {fmt_usd(total_mv_usd)}, P/L {fmt_usd(total_pl_usd)})")
    return 0


def cmd_risk(args) -> int:
    portfolio = load_portfolio(args.portfolio)
    config = load_json(args.config).get("risk", {})
    quotes, fx = resolve_market_data(args, portfolio)
    positions = build_positions(portfolio, quotes)

    max_single = config.get("single_position_max_pct", 15)
    max_sector = config.get("sector_concentration_max_pct", 40)
    max_theme = config.get("theme_concentration_max_pct", 60)
    max_dd = config.get("drawdown_from_cost_pct", 10)

    total_mv = sum(p.market_value_usd for p in positions)
    flags = 0

    header("RISK — Single-position concentration  (limit "
           f"{max_single:.0f}% of book)")
    heavy = [(p, p.market_value_usd / total_mv * 100) for p in positions]
    heavy = [(p, w) for p, w in heavy if w > max_single]
    if heavy:
        for p, w in sorted(heavy, key=lambda x: -x[1]):
            flags += 1
            print(f"  {_c('FLAG', '1;31')}  {p.ticker:<6} {w:5.1f}%  "
                  f"({fmt_ils(p.market_value_usd * fx)})")
    else:
        print(f"  {_c('OK', '32')}    no single position over {max_single:.0f}%")

    header(f"RISK — Sector concentration  (limit {max_sector:.0f}%)")
    flags += _print_group_concentration(positions, total_mv, "sector", max_sector, fx)

    header(f"RISK — Theme concentration  (limit {max_theme:.0f}%)")
    flags += _print_group_concentration(positions, total_mv, "theme", max_theme, fx)

    header(f"RISK — Positions down more than {max_dd:.0f}% from cost")
    losers = [p for p in positions if p.unrealized_pl_pct < -max_dd]
    if losers:
        for p in sorted(losers, key=lambda x: x.unrealized_pl_pct):
            flags += 1
            print(f"  {_c('FLAG', '1;31')}  {p.ticker:<6} "
                  f"{p.unrealized_pl_pct:+6.1f}%  "
                  f"(cost {fmt_usd(p.avg_cost)} -> {fmt_usd(p.price)})")
    else:
        print(f"  {_c('OK', '32')}    no position down more than {max_dd:.0f}% from cost")

    print()
    summary = f"{flags} risk flag(s) raised." if flags else "No risk flags."
    print(_c(summary, "1;31" if flags else "1;32"))
    return 0


def _print_group_concentration(positions, total_mv, key, limit, fx) -> int:
    groups: dict[str, float] = {}
    for p in positions:
        groups[getattr(p, key)] = groups.get(getattr(p, key), 0) + p.market_value_usd
    flags = 0
    for name, mv in sorted(groups.items(), key=lambda x: -x[1]):
        weight = mv / total_mv * 100 if total_mv else 0
        over = weight > limit
        flags += 1 if over else 0
        tag = _c("FLAG", "1;31") if over else _c("ok", "32")
        print(f"  {tag:<4}  {name:<32} {weight:5.1f}%  ({fmt_ils(mv * fx)})")
    return flags


def cmd_alerts(args) -> int:
    portfolio = load_portfolio(args.portfolio)
    config = load_json(args.config).get("alerts", {})
    quotes, fx = resolve_market_data(args, portfolio)
    positions = build_positions(portfolio, quotes)
    by_ticker = {p.ticker: p for p in positions}

    daily_threshold = config.get("daily_move_pct", 5)
    triggered: list[str] = []

    # 1) Daily move alerts
    for p in positions:
        if abs(p.daily_pct) >= daily_threshold:
            arrow = "▲" if p.daily_pct >= 0 else "▼"
            triggered.append(
                f"[DAILY] {p.ticker} {arrow} {p.daily_pct:+.2f}% today "
                f"({fmt_usd(p.prev_close)} -> {fmt_usd(p.price)})"
            )

    # 2) Price-level crossings (stateful: alert on the crossing, not every run)
    prev_state = load_json(STATE_FILE) if os.path.exists(STATE_FILE) else {}
    prev_prices = prev_state.get("prices", {})
    for level in config.get("price_levels", []):
        ticker = level["ticker"]
        p = by_ticker.get(ticker)
        if not p:
            continue
        target = float(level["level"])
        direction = level["direction"]
        last_price = prev_prices.get(ticker)
        now_meets = (p.price <= target) if direction == "below" else (p.price >= target)
        if last_price is None:
            was_meeting = not now_meets  # first run: alert if condition holds now
        else:
            was_meeting = (last_price <= target) if direction == "below" else (last_price >= target)
        if now_meets and not was_meeting:
            note = f"  — {level['note']}" if level.get("note") else ""
            triggered.append(
                f"[LEVEL] {ticker} crossed {direction} {fmt_usd(target)} "
                f"(now {fmt_usd(p.price)}){note}"
            )

    # Persist current prices for next run's crossing detection
    _save_state({"prices": {p.ticker: p.price for p in positions},
                 "updated": datetime.now(timezone.utc).isoformat()})

    if triggered:
        stamp = f"{datetime.now(timezone.utc):%Y-%m-%d %H:%M UTC}"
        print(f"ALERTS @ {stamp}  (USD/ILS {fx:.3f})")
        for line in triggered:
            print(f"  {line}")
        return 1  # non-zero so cron wrappers / pipelines can detect "something fired"
    if not args.quiet:
        print("No alerts triggered.")
    return 0


def _save_state(state: dict) -> None:
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as fh:
            json.dump(state, fh, indent=2)
    except OSError as exc:
        print(f"warning: could not write state file: {exc}", file=sys.stderr)


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #
def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="portfolio_agent",
        description="Read-only portfolio monitor (analysis & alerts only — no trading).",
    )
    parser.add_argument("--portfolio", default=DEFAULT_PORTFOLIO, help="path to portfolio.json")
    parser.add_argument("--config", default=DEFAULT_CONFIG, help="path to config.json")
    parser.add_argument("--fixture", help="load quotes/FX from a JSON file instead of Yahoo (offline)")

    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status", help="per-position price, value, daily change, P/L, weight")
    sub.add_parser("risk", help="flag concentration and drawdown risks")
    alerts = sub.add_parser("alerts", help="print configured threshold/level triggers (for cron)")
    alerts.add_argument("--quiet", action="store_true",
                        help="print nothing when no alerts fire (ideal for cron + MAILTO)")
    return parser


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    dispatch = {"status": cmd_status, "risk": cmd_risk, "alerts": cmd_alerts}
    return dispatch[args.command](args)


if __name__ == "__main__":
    raise SystemExit(main())
