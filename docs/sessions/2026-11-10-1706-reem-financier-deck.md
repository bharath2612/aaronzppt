# 2026-11-10 17:06 +04: Reem financier deck

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `1fd34e8`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user asked for a deck for Reem, a financier, saying three things: the market size over five years and how the commission pie has grown; the three problems (developers, brokers, brokerages) from the investor deck; and where we are now, working out how to allocate funds, plus the solution. Inputs were the Flow B (embedded finance partner) PDF dated 7 Nov 2026, the routing rules PDF (v0.1 draft, 9 Nov 2026), the commission-flow diagram, and the user's DLD Atlas pages (transaction insights, asset classes).

## What was done

- New deck `reem/index.html` (8 slides): cover; market (`#market`); commission pie (`#commission`); the three problem slides copied from the investor deck; solution (`#solution`); where we are (`#allocation`).
- **Market figures:** read from the DLD Atlas data file `asset-classes.json` (Sell and Sell - Pre registration, all asset classes summed per year): AED 52.3B, 105.1B, 191.5B, 301.5B, 396.5B, 508.2B for 2020 to 2025; 27,544 to 187,850 sales; off-plan share of sales 53%, 50%, 57%, 61%, 69%, 72%.
- **Commission pie:** an estimate at 2% of that value (AED 1.0B to 10.2B, +28% vs 2024), with the land department's own AED 13.59B for 2025 shown beside it.
- **Solution:** Flow B. A licensed partner approves and pays the brokerage the same day, the developer repays the partner in 30 to 45 days, and Aaronz invoices a 6% fee. Worked example: AED 100,000 for 45 days gives AED 97,780.82 to the brokerage, AED 1,479.45 to the partner and AED 739.73 to Aaronz.
- **Where we are:** the routing rules' grade, route and pull-back steps, plus grades A to D with the chance of a bad outcome and the per-funder ceiling for each, marked as draft starting values.
- Added `reem/reem.css`, `tests/reem.cjs` (added to `npm test`), `tools/export-reem-pdf.cjs` (`npm run export:reem`), and `reem/aaronz-reem.pdf`.

## Decisions

- AED only, with no currency switch: the audience is a UAE financier.
- The solution follows Flow B rather than the investor deck's equity-funded "We pay them the same day", because Reem would be the funding partner.

## Problems

- The DLD Atlas totals (AED 508.2B in 2025) are lower than the AED 682.5B the land department reports and the other decks use, because the Atlas counts only Sell and Sell - Pre registration. The commission slide states both figures.
- The deck is public on GitHub Pages (`noindex`), including pricing (18%, 12%, 6%) and the draft routing limits.

## Verification

- `npm test`: all four suites passed, including "Reem deck, eight slide layouts, market figures, problem slides, worked example, grades, PDF and mobile reader layout".
- `npm run export:reem` wrote an 8-page PDF.
- Screenshots of the cover, market, commission, solution and allocation slides were inspected.

## Unfinished and next

- The developer headline is still waiting on the user's choice. When it changes, update both decks; the Reem test checks that the problem headlines match the investor deck.
- Confirm who Reem is and whether the deck should stay public.
