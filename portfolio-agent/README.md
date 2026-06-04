# Portfolio Monitoring Agent

A **read-only** portfolio monitor. It fetches live quotes, converts USD → ILS
explicitly, and reports **status**, **risk**, and **alerts**.

> **No trade execution.** This tool only reads quotes and prints analysis. It
> never places, modifies, or cancels orders, and holds no broker credentials.

## What it does

| Command  | Output |
|----------|--------|
| `status` | Each position: current price, daily change, market value (ILS), portfolio weight, and unrealized P/L (% and ₪). Plus a portfolio total. |
| `risk`   | Flags: any single position over 15% of the book; sector **and** theme concentration over your limits; any position down more than 10% from cost. |
| `alerts` | Cron-friendly. Prints daily moves past your threshold and price-level **crossings**. Remembers prices between runs so a level alert fires once, not every run. |

## Setup

Requires Python 3.9+.

```sh
cd portfolio-agent
python3 -m venv .venv && source .venv/bin/activate   # optional but recommended
pip install -r requirements.txt
```

That installs `yfinance` (free Yahoo Finance data, no API key).

## Usage

```sh
python3 portfolio_agent.py status
python3 portfolio_agent.py risk
python3 portfolio_agent.py alerts            # prints "No alerts triggered." when calm
python3 portfolio_agent.py alerts --quiet    # prints nothing when calm (for cron)
```

Run completely offline against a saved snapshot (no network):

```sh
python3 portfolio_agent.py --fixture fixtures/snapshot_2026-06-04.json status
```

## Editing your holdings — `portfolio.json`

You change holdings here; you never touch the code.

```json
{ "ticker": "ASML", "name": "ASML Holding NV", "shares": 6, "avg_cost": 1412.39,
  "cost_currency": "USD", "sector": "Semiconductor Equipment", "theme": "Semis & AI Infra" }
```

- `shares` — number of shares held.
- `avg_cost` — your average buy price **per share**, in `cost_currency`.
- `sector` / `theme` — free-text labels used by the `risk` command to group
  positions. Change the grouping however you like.

> **Note on your 9th holding.** Your broker shows **9 positions**; the 8 listed
> here are the ones you provided. When you have the 9th line (it looked like
> cash or another stock making up the difference to your ₪147,938 total), add it
> as another object in `holdings` so weights match your broker exactly. Until
> then, weights are computed over the 8 listed positions.

## Tuning thresholds — `config.json`

```json
{
  "risk": {
    "single_position_max_pct": 15,
    "sector_concentration_max_pct": 40,
    "theme_concentration_max_pct": 60,
    "drawdown_from_cost_pct": 10
  },
  "alerts": {
    "daily_move_pct": 5,
    "price_levels": [
      { "ticker": "AVGO", "direction": "below", "level": 400, "note": "watch the gap-down" }
    ]
  }
}
```

- `price_levels[].direction` is `"above"` or `"below"`; `level` is a price in the
  quote currency (USD). `note` is optional free text shown in the alert.

## Currency handling (explicit, on purpose)

This is the part that quietly breaks naive trackers, so it is deliberate:

- Quotes from Yahoo are in the instrument's **native currency** — **USD** for
  every US-listed name here. The code reads the currency back from Yahoo and
  **warns** if it is ever not USD, so a foreign listing can't silently corrupt
  your numbers.
- `avg_cost` is also in USD (tagged `cost_currency`).
- A **single USD→ILS rate** (Yahoo symbol `ILS=X`, i.e. shekels per dollar) is
  fetched once per run and applied at the display edge. Every ₪ figure is that
  USD amount × the rate.
- **Percentages — daily %, P/L %, and weights — are ratios and do not depend on
  the FX rate.** Only absolute ₪ values do. (That's why this agent's daily % and
  P/L % match your broker exactly even though the absolute ₪ totals differ: your
  broker uses its own display rate and includes the 9th holding.)

## Scheduling with cron

`alerts --quiet` prints nothing when nothing fires, so with cron's `MAILTO` you
only get an email when something actually triggers.

Edit your crontab:

```sh
crontab -e
```

Add (adjust the path to where you cloned this, and to your `python3`):

```cron
MAILTO=tsahi.cohen@gmail.com

# Every 15 minutes during US market hours (09:30–16:00 ET ≈ 14:30–21:00 UTC),
# Monday–Friday. cron uses the server's local timezone — adjust accordingly.
*/15 14-21 * * 1-5  cd /path/to/portfolio-agent && /path/to/python3 portfolio_agent.py alerts --quiet

# A daily status + risk snapshot at 21:05 UTC (just after the US close):
5 21 * * 1-5  cd /path/to/portfolio-agent && /path/to/python3 portfolio_agent.py status && /path/to/python3 portfolio_agent.py risk
```

Tips:
- If you used a virtualenv, point cron at `.venv/bin/python3`.
- To log instead of email: append `>> agent.log 2>&1`.
- The agent writes `.alert_state.json` next to the script to remember prices
  between runs (so level alerts fire on the crossing, not repeatedly). It's safe
  to delete; the next run recreates it.

## Files

```
portfolio_agent.py   single module (status | risk | alerts)
portfolio.json       your holdings (edit this)
config.json          thresholds + price-level alerts
requirements.txt     yfinance
fixtures/            offline snapshots for --fixture
.alert_state.json    auto-created; last-seen prices for crossing detection
```

## Possible next modules

- **News / earnings digest** per holding (next earnings date, recent headlines).
- **Rebalancing suggester** — set target weights and get suggested trims/adds
  (still read-only — it would only *suggest*).
