# 2026-11-11 13:00 +04: Brief edits from the printed review

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `1ab10e1`. **End commit:** the commit that adds this note (see `git log`).

## Source

The user marked up a printed copy of the brief: 12 photos. They answered the open questions in chat:
- use "Aaronz Pay", with the domain AaronzPay.today;
- "Finance" wherever "Licensed partner" was marked;
- the gap reads "3 to 4 months";
- the commission rate is an average, default 4%, adjustable in settings;
- the money flow's last step is a fee.

Sharjah data is to follow.

## What changed

- **Cover:** "AaronzPay.today" under the headline.
- **Market slides:** no dashed Q4 box. The 2026 bars show data only to the date it runs to, labelled inside the bar: "Till 10 Nov", "Till 9 Nov", "Till Sep".
  - Dubai's source line is simplified.
  - RAK's middle card now gives off-plan sales (AED 11.2B in 2025, reported separately), answering "How much off-plan?".
- **Commission slide:** the rate is "an average of 4%". Every figure is now computed from the off-plan base values, so the settings dropdown (3% to 6%) recalculates the slide live. The rate is remembered per browser, and a non-default rate makes the PDF button print the current view.
- **Problem slides:** each has a 4th point.
  - Brokers: "Trust is missing".
  - Brokerages: points 1 and 2 reworded; point 4 is "Managing a business on cash predictions is not a business".
  - Developers: "under cash flow pressure" removed from point 1; point 4 is the lack of a fintech or real-estate tech solution.
- **Gap slide:** "Aaronz Pay fills the market gap". Today takes 3 to 4 months: booking and registration (1.5 months), invoice raised (1 week), 30 days, 10 to 15 days late, then the brokerage pays the broker after 15 days. That is about 110 days in total, drawn to scale. With Aaronz Pay it is 1.5 months: "Registration complete, invoice raised and paid immediately".
- **Outcome slide:** "A win-win-win for brokers, brokerages and developers", with four points per column: "Gains trust", "Runs the business as a business, not on speculation", "A platform that takes on the core of the challenge"; "with no loan needed" removed.
- **Money flow:** steps 3 and 6 and the bottom line say Aaronz Pay. Step 4 is the finance partner; step 5 repays "To the finance partner"; step 6's partner "receives a fee".

## Not done

- **Logo font:** "Better fonts" on the logo was not confirmed.
- **Sharjah:** a market slide and commission row are waiting for the user's data.

## Verification

- `npm test`: all four suites passed, including the commission-rate recalculation at 5% (AED 33.4B) and a check that the gap labels do not overlap.
- `npm run export:brief`: 17 pages.
- The gap, outcome, brokerages, Dubai, money flow and commission slides were inspected.

## Follow-up: consistent market side cards

At the user's request, the three market slides' side cards follow one pattern: 2025 sales value, number of 2025 sales, and the 2025 off-plan share by number of sales.

| | Sales value | Number of sales | Off-plan share |
|---|---|---|---|
| Dubai | AED 680B | 217,889 | 63% |
| Abu Dhabi | AED 94B | 25,114 | 66% |
| RAK | AED 3.2B completed | 8,599 completed and off-plan | 66% |

Abu Dhabi's earlier 78% was by residential value, so it wasn't comparable. The "+77% on 2024", RAK's off-plan value card and RAK's average-sale card were dropped. Source lines say where the counts come from. `npm test` passed all four suites.

## Follow-up: gap labels

The last two points on today's line now read "Invoice settled to brokerage" and "Payout to broker", after "Invoice raised" and "Payment due". `npm test` passed all four suites, and the slide was inspected.

## Follow-up: Aaronz.Pay wordmark and wording

- **Logo:** the logo in the top bar and on the cover is now an "Aaronz.Pay" wordmark: Inter bold with tight spacing, ".Pay" in the primary colour. The tab title and description say Aaronz Pay. `brief/aaronz-ai-logo.svg` was deleted; the brief no longer shows Aaronz.AI anywhere, and a test checks this.
- **Developers problem, point 4:** "No risk partner or fin-real-tech solution is available to take on this challenge".
- **Outcome, developer's last point:** "A risk partner who takes care of commission".
- **Verification:** `npm test` passed all four suites. The cover, outcome slide and phone cover were inspected.

## Follow-up: no dot in the wordmark

The user asked for "AaronzPay" with no dot, with "Pay" kept in a different colour. The wordmark now reads AaronzPay, and its accessible label is "Aaronz Pay". `npm test` passed all four suites, and the cover was inspected.

## Follow-up: Sharjah market slide

- **Placement:** `#market-sharjah`, before RAK. The deck is now 18 slides.
- **Source:** the user's Sharjah artifact, compiled from the Sharjah Real Estate Registration Department's annual and monthly reports.
- **Measure:** sales value only exists to 2024, and 2025 and 2026 are published only as total transactions including mortgages. The user chose completed plus off-plan sales, 2021 to 2024 (AED 14.0B, 13.0B, 18.5B, 28.4B), with 2024 highlighted.
- **Headline:** "Sharjah property sales have doubled since 2021".
- **Side cards:** AED 28.4B sold in 2024; 13,522 completed sales; 42% of sales value off-plan. Sharjah publishes no off-plan count, so the share is by value, unlike the other three slides, and the source line says so.
- **Not added:** a Sharjah commission row, because there is no 2025 or 2026 off-plan figure.
- **Verification:** `npm test` passed all four suites, and the slide was inspected.
