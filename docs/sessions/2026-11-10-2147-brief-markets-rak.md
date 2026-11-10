# 2026-11-10 21:47 +04: Brief cover, market section break, Dubai 2026, Abu Dhabi 2020, RAK

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `00b62ec`. **End commit:** the commit that adds this note (see `git log`).
- The user asked to hold pushes while they gave a batch of changes, then said "push the changes".

## What changed (`brief/`)

- **Cover:** the subtext ("Aaronz closes the gap…") was removed.
- **New slide 2, section break:** "The market" (`#break-market`, class `c-break`).
- **Dubai:**
  - **2026 bar:** AED 423.4B to 10 November from the DLD 2026 transaction table (Sales group, read-only query), tagged YTD. A dashed empty box on top makes up the AED 257B still needed to match 2025, labelled "To match 2025", not a forecast. The source line says so.
  - **Tags removed:** the "DLD DATA" tags are gone. The footnote still explains 2021 and 2022.
- **Abu Dhabi:** 2020 added (AED 38B, from the 2025 report), with ADREC's registration-incentive caveat. The headline is now "Abu Dhabi property sales are rising sharply"; the user did not want a multiple.
- **New slide 5, Ras Al Khaimah (`#market-rak`):** "RAK completed sales have more than tripled since 2020".
  - **Bars:** completed property sales of AED 1.0B, 1.7B, 2.2B, 3.5B, 6.4B, 3.2B for 2020 to 2025, and 2.1B for 2026 January to September. 2026 is highlighted and tagged JAN–SEP.
  - **Side cards:** AED 2.1B in 2026 to September; 67% of all of 2025 in nine months; average sale AED 1.08M in 2025, up from AED 0.56M in 2020.
  - **Source:** the user's RAK artifact, compiled from RAK Municipality Lands & Properties Sector reports. Off-plan, which is reported separately, is not included, and the slide says so.
- **Chart styles:** charts now take any number of bars (grid auto columns). A `.bar.fc` style draws the dashed empty box.
- **Deck size:** 10 slides. `tests/brief.cjs` checks every figure above, the tags, the highlight, and that all three charts fit a phone screen.

## Decisions and pushback

- **Dubai 2026 forecast:** the user asked for a forecast of about AED 700B. DLD data, which matches DLD's published H1 (AED 286B) and October (about AED 34B), shows 2026 well below 2025. At the July to October pace the year would end near AED 476B. A 700B forecast was declined. The user then chose to show the gap to 2025, which is labelled as a gap, not a forecast.
- **RAK measure:** the user's page offered three series: all transactions, completed sales, and off-plan sales. All transactions include mortgages, one of them over AED 9B in 2025. Completed plus off-plan, the like-for-like measure with Dubai and Abu Dhabi, is only complete for 2022, 2023 and 2025. The user chose completed sales, consistent across 2020 to 2026, so RAK is a narrower measure than the other two charts.
- **Why sales exclude mortgages and gifts:** the user asked. Commission is paid only on sales; mortgages double-count purchases and include refinancing, and gifts carry no broker.

## Problems

- **Percentage error:** a hand-computed "66%" was wrong (2.124 ÷ 3.192 = 66.5%, which rounds to 67%). The test caught it and the slide was fixed.
- **Scripted edits:** two failed partway because an anchor was missing. Each failure was visible in the output, and the edits were re-applied.

## Verification

- `npm test` passed all four suites ("financier brief deck, ten slide layouts…").
- `npm run export:brief` wrote 10 pages.
- The cover, section break, Dubai, Abu Dhabi and RAK slides were inspected in screenshots.

## Next

The user may add more slides.
