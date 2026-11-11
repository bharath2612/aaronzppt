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

## Follow-up: RAK side-card wording

At the user's request, RAK's second card reads "8,599 sales in 2025", worded as on Dubai and Abu Dhabi. The source line says the count and the 66% off-plan share include completed and off-plan sales. `npm test` passed all four suites.

## Follow-up: Sharjah 2020 to 2026

At the user's request, Sharjah now runs 2020 to 2026 like the other markets, with asterisks where the measure differs:

| Year | Value | Measure |
|---|---|---|
| 2020 | AED 5.0B* | completed sales only; off-plan not reported separately before 2021 |
| 2021 to 2024 | AED 14.0B to 28.4B | completed plus off-plan |
| 2025 | AED 65.6B* | total transactions including mortgages and others; highlighted |
| 2026 | AED 46.5B* | total transactions, to September |

- **Side cards:** AED 65.6B transactions in 2025 including mortgages; 18,333 sales in 2025 (completed, per the source line); 42% of 2024 sales value off-plan.
- **Caution:** the jump from 2024 to 2025 is partly the change of measure. The asterisk and source line say so.
- **Verification:** `npm test` passed all four suites, and the slide was inspected.

## Follow-up: Sharjah commission row

The commission slide has a Sharjah row between Abu Dhabi and RAK reading "Not yet published" for 2025 and 2026, because Sharjah has no off-plan sales figure for those years. The totals are unchanged. `npm test` passed all four suites.

## Follow-up: estimate toggle and cover (14:00 +04)

- **Estimate toggle:** settings has "Estimate unpublished values" (off by default, saved as `brief-commission-estimate`). When on, the three unpublished cells show estimated commission with an EST tag, the totals include them, and an EST line explains the method. The PDF button prints when it is on.
- **Method, as the user asked (grow off-plan with how far the market moved):** Sharjah 2025 = 2024 off-plan AED 12.0B × 65.6/39.9 ≈ AED 19.7B; Sharjah 2026 = that × 46.5/65.6 ≈ AED 14.0B; RAK 2026 = 2025 off-plan AED 11.2B × 2.12/3.19 ≈ AED 7.5B. At 4% the totals become AED 15.3B (2025), AED 13.0B (2026), AED 28.3B overall.
- The user dropped the idea of editing the commission rate in the title; the settings dropdown stays.
- **Cover:** removed the "AaronzPay.today" line at the user's request.
- **Verification:** `npm run export:brief` wrote 18 pages; `npm test` passed all four suites; the commission slide (toggle on), settings sheet and cover were inspected in screenshots.

## Follow-up: Sharjah side cards on one year

The user pointed out the Sharjah cards mixed "sales in 2025" with "of 2024 sales value was off-plan". Sharjah has no published 2025 off-plan share, so both now use 2024: 13,522 sales in 2024 (completed sales, from the Sharjah registration annual report) and 42% of 2024 sales value off-plan. The lead card stays AED 65.6B transactions in 2025. `npm test` passed all four suites and the slide was checked in a screenshot.

## Follow-up: gap slide, broker enjoys the funds

The Aaronz Pay line now runs the full length of the Today line. After the immediate payout at 1.5 months, the rest of the period is a lighter green segment labelled "Broker enjoys the funds". The test checks that the line matches Today's length and that the paid point is still 45 of 110 days. `npm test` passed all four suites and the slide was checked in a screenshot.

## Follow-up: gap callout back, developer wording

- **Gap slide:** the green callout is back under the timeline: "AaronzPay settles the brokerage commission through a finance partner, and the developer repays the finance partner."
- **Developers problem, point 4:** "No right fin-real-tech solution is available to take on this challenge".
- **Outcome, developer point 4:** "A right partner who takes care of commissions". Speaker notes match.
- `npm test` passed all four suites; the gap slide was checked in a screenshot.
