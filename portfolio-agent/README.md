# Portfolio Monitoring Agent

A **read-only** portfolio monitor. It fetches live quotes, converts USD → ILS
explicitly, and reports **status**, **risk**, and **alerts**.

> **No trade execution.** This tool only reads quotes and prints analysis. It
> never places, modifies, or cancels orders, and holds no broker credentials.

## What it does

| Command     | Output |
|-------------|--------|
| `status`    | Each position: current price, daily change, market value (ILS), portfolio weight, and unrealized P/L (% and ₪). Plus a portfolio total. |
| `risk`      | Flags: any single position over 15% of the book; sector **and** theme concentration over your limits; any position down more than 10% from cost. |
| `alerts`    | Cron-friendly. Prints daily moves past your threshold and price-level **crossings**. Remembers prices between runs so a level alert fires once, not every run. |
| `digest`    | Per holding: next earnings date (with countdown) and the most recent headlines. |
| `rebalance` | Drift of each position vs its target weight, with suggested trims/adds in shares and ₪. **Suggestion-only — never trades.** |

## Run it without a terminal (GitHub Actions)

You can run everything **from the GitHub website / mobile app** — no command line.
Two workflows are included (in `.github/workflows/`):

| Workflow | What it does |
|----------|--------------|
| **Portfolio alerts (WhatsApp)** | Runs `alerts` every 15 min during US market hours and sends any triggers to your WhatsApp. |
| **Portfolio report** | Daily `status`+`risk` snapshot, and a **Run workflow** button to show `status` / `risk` / `digest` / `rebalance` on demand. Output appears in the run **Summary** (reads well on the GitHub mobile app). |

**One-time setup (all in the browser):**

1. **Merge this branch to `main`.** Scheduled GitHub Actions only run from the
   default branch, so the workflows must be on `main` to fire on a schedule.
2. Add your secrets: repo **Settings → Secrets and variables → Actions → New
   repository secret**:
   - `CALLMEBOT_APIKEY` — your CallMeBot key (see *WhatsApp alerts* below).
   - `WHATSAPP_PHONE` — your number, e.g. `+972541234567` (kept out of the repo).
3. Done. Alerts arrive on WhatsApp automatically. To run something by hand:
   **Actions** tab → pick the workflow → **Run workflow**.

Editing your holdings/thresholds is also browser-only: open `portfolio.json` or
`config.json` on GitHub and click the ✏️ pencil to edit and commit.

> Prefer your own machine instead? The terminal setup is below.

## Setup (run locally)

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
python3 portfolio_agent.py alerts --test-notify  # send a WhatsApp test message
python3 portfolio_agent.py alerts --notify   # force-send triggers to WhatsApp
python3 portfolio_agent.py digest            # earnings + headlines per holding
python3 portfolio_agent.py digest --news 5   # show 5 headlines per holding
python3 portfolio_agent.py rebalance         # drift vs target_weight in portfolio.json
python3 portfolio_agent.py rebalance --equal # target equal weight instead
python3 portfolio_agent.py rebalance --band 3  # only suggest when drift > 3%
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
- `target_weight` — your desired % of the portfolio, used by `rebalance`. The
  values shipped are **examples** (they trim the ASML/CRDO concentration the
  `risk` command flags); edit them to your own plan. They should sum to ~100 —
  if they don't, `rebalance` normalizes them and tells you.

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

## WhatsApp alerts

The `alerts` command can push triggers to **WhatsApp** so you get them on your
phone, not just in a terminal or email. Two providers are supported. **Secrets
(API key / tokens) live in environment variables — never in `config.json`** — so
nothing sensitive is committed.

Routing goes in `config.json`:

```json
"notifications": {
  "whatsapp": {
    "enabled": false,        // flip to true once your env vars are set
    "provider": "callmebot", // or "twilio"
    "phone": "+972500000000",// YOUR number, international format
    "dry_run": false         // true = print the request instead of sending
  }
}
```

### Option A — CallMeBot (free, easiest, personal use)

One-time setup (no account needed):

1. Add the CallMeBot WhatsApp number **+34 644 51 95 23** to your contacts.
2. Send it the message: **`I allow callmebot to send me messages`**.
3. It replies with your personal **APIKEY**.
4. Put your number in `config.json` (`phone`) and export the key. The repo ships
   a template — copy it and fill in:

```sh
cp .env.example .env     # then edit .env and paste your key
. ./.env                 # load it into the current shell
```

Test it:

```sh
python3 portfolio_agent.py alerts --test-notify
```

You should get a WhatsApp message within a few seconds. Then set
`"enabled": true` and triggered alerts will be delivered automatically.

### Option B — Twilio (robust, for heavier use)

Use the [Twilio WhatsApp sandbox](https://www.twilio.com/docs/whatsapp/sandbox)
or an approved sender, set `"provider": "twilio"`, and export:

```sh
export TWILIO_ACCOUNT_SID=ACxxxxxxxx
export TWILIO_AUTH_TOKEN=your_token
export TWILIO_FROM="+14155238886"     # your Twilio WhatsApp sender
# recipient comes from config.json "phone" (or export TWILIO_TO)
```

### Flags & behavior

- With `enabled: true`, **triggered** alerts auto-send (nothing is sent when calm).
- `--notify` forces a send even if `enabled` is false; `--no-notify` blocks sending.
- `--test-notify` sends one canned message and exits — use it to verify setup.
- `dry_run: true` (or `WHATSAPP_DRY_RUN=1`) prints the exact request instead of
  sending — handy for testing without spending a message.
- A delivery failure logs a warning but never crashes the run or hides the
  printed alerts.

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
- **WhatsApp from cron:** cron runs with a bare environment, so your secret
  isn't there automatically. Either set it at the top of the crontab
  (`CALLMEBOT_APIKEY=...`) or source a file in the command, e.g.
  `* * * * * . /path/to/.env && cd /path/to/portfolio-agent && .venv/bin/python3 portfolio_agent.py alerts --quiet`.
  Keep that `.env` out of git (the repo's `.gitignore` already excludes `.env`).
  With WhatsApp `enabled: true`, `alerts --quiet` stays silent in the terminal
  but still pushes triggers to your phone.
- The agent writes `.alert_state.json` next to the script to remember prices
  between runs (so level alerts fire on the crossing, not repeatedly). It's safe
  to delete; the next run recreates it.

## Files

```
portfolio_agent.py   single module (status | risk | alerts | digest | rebalance)
portfolio.json       your holdings (edit this)
config.json          thresholds + price-level alerts
requirements.txt     yfinance
fixtures/            offline snapshots for --fixture
.alert_state.json    auto-created; last-seen prices for crossing detection
```

## News & earnings digest (`digest`)

For each holding, pulls the **next earnings date** (with a day countdown) and the
most recent **headlines** from Yahoo. Earnings dates and news are best-effort:
some tickers won't have a scheduled date, and the command degrades gracefully
(`no earnings date` / `no recent headlines`) rather than failing. Use
`--news N` to change how many headlines per holding (default 3). Not market-hours
sensitive — handy to run each morning before the US open.

## Rebalancing suggester (`rebalance`)

Compares each position's **current weight** to its **`target_weight`** (from
`portfolio.json`) and, for anything outside the drift band, suggests the
approximate **trim/add in shares and ₪** to get back to target.

- Default band comes from `config.json` → `rebalance.drift_band_pct` (5%);
  override per run with `--band`.
- `--equal` ignores your targets and aims for equal weight across holdings.
- Targets that don't sum to 100% are normalized automatically (with a note).

> **Suggestion-only.** Like every command here, `rebalance` reads data and prints
> ideas. It does not connect to a broker and cannot place trades. The share/₪
> figures are rounded estimates at the current price — your actual fills will
> differ, and they ignore FX conversion costs, fees, and tax.
