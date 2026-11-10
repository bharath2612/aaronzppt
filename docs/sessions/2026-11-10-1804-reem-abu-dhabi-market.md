# 2026-11-10 18:04 +04: Abu Dhabi market slide for Reem

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `a905085`. **End commit:** the commit that adds this note (see `git log`).

## Goal

Add an Abu Dhabi market slide after Dubai, from the ADREC reports the user shared:
- the 2025 report;
- the H1 2025 report;
- the H1 2026 report;
- the 2024 market report;
- a sales-level CSV (`recent_sales.csv`, 127,220 rows, 2 Jan 2019 to 9 Nov 2026).

## What was done

New slide `#market-ad`: "Abu Dhabi property sales grew 6× in four years".

- **Bars:** real estate sales value of AED 15B, 25B, 53B, 53B and 93B for 2021 to 2025, from the chart on page 32 of the ADREC 2025 report.
- **2026 bar:** AED 137B to date, hatched and tagged "YTD", added up from the CSV.
- **Side cards:**
  - AED 93B sold in 2025;
  - AED 137B sold in 2026 to 9 November;
  - 78% of 2025 home sales value was off-plan (59 of 76 bn in the ADREC 2025 chart on page 39).

The deck is now 8 slides. `tests/reem.cjs` checks the figures, bar heights, the 6× claim and the YTD tag.

## Cross-checks

The CSV matches ADREC's reported sales value:

| Year | CSV | ADREC |
|---|---|---|
| 2022 | AED 25.45B | AED 25B |
| 2023 | AED 54.67B | AED 53B (includes one-off land deals) |
| 2024 | AED 52.6B | AED 53B |
| 2025 | AED 93.09B | AED 93B |
| H1 2026 | AED 86.35B | AED 86B |

It does not match for 2020 and 2021: AED 46.5B against 38B, and AED 18.1B against 15B.

**Why 2020 is left out:** ADREC says registration incentives inflated it by recording older deals, which would show a false fall from 2020 to 2021.

**Off-plan share:** 2025 off-plan share is 78% in ADREC's chart (residential units) against 72% from the CSV (whole residential asset class). The slide uses ADREC's figure.

**2023 differs between reports:** the 2024 report gives AED 50B excluding AED 3.5B of exceptional land deals. The 2025 report shows 53 including them. The slide uses the 2025 report.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem` wrote an 8-page PDF.
- The slide was inspected in a screenshot. A hyphen break ("off-" and "plan" on separate lines) was fixed with a non-breaking hyphen.

## Next

Wait for the user's next instruction.

## Follow-up: switched to ADREC's latest report

The user asked why 2023 and 2024 looked the same. Measured live, the bars were the same height (124px), because the 2025 report rounds both years to AED 53B. The user then chose ADREC's latest report, H1 2026, for 2022 to 2025, adding the two halves of each year:

| Year | Sales value |
|---|---|
| 2022 | AED 26B |
| 2023 | AED 52B |
| 2024 | AED 53B |
| 2025 | AED 94B |

2021 stays at AED 15B from the 2025 report, and 2026 to date stays at AED 137B from the transaction records. The headline is still 6× (15 to 94). The 2025 card now says AED 94B.

**Reports available:** the 2024 annual report (2019 to 2024), H1 2025, the 2025 annual report (2019 to 2025), and H1 2026 (half-years from H1 2022 to H1 2026).

**Verification:** `npm test` passed all four suites, and the slide was inspected.
