# 2026-11-10 17:17 +04: Reem market slides on DLD official figures

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `aad4caa`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user shared DLD annual reports and asked for the Reem market figures to be checked against them. Their decision after the check: "Use DLD official numbers, recalculate 2021 and 2022 from Atlas".

## Findings

- The first version counted only Sell and Sell - Pre registration. That understated DLD's sales value by about 25% every year (2025: AED 508.2B against 680B) and overstated the off-plan share (72% against 63%).
- A read-only query of the DLD Atlas database (`public.dubai_transactions`, all rows with `trans_group_en = 'Sales'`) matches DLD's reports closely:

| Year | Atlas | DLD report |
|---|---|---|
| 2023 | AED 408.8B | AED 410.2B |
| 2024 | AED 520.3B | AED 521B to 522.4B |
| 2025 | AED 682.5B | AED 680B |
| 2020 | AED 69.4B | AED 71.7B |

- The query used the DLD_analysis project's own read-only helper. Nothing in that repo was changed.

## What changed

**Market slide:** "Dubai property sales grew 9.5× in five years".

| Year | Sales value | Source |
|---|---|---|
| 2020 | AED 71.7B | DLD Annual Report 2020, chart on page 19 |
| 2021 | AED 148.6B | Atlas |
| 2022 | AED 262.7B | Atlas |
| 2023 | AED 410.2B | DLD Annual Report 2024 |
| 2024 | AED 521B | DLD Annual Data Review 2025 |
| 2025 | AED 680B | DLD Annual Data Review 2025 |

- The 2021 and 2022 bars are labelled "DLD Atlas".
- 2025 had 217,889 sales, against 34,947 in 2020, and 63% were off-plan.

**Commission slide:** "The commission pie grew from AED 1.4B to AED 13.6B". This is 2% of sales value, up 31% on 2024. The land department's own AED 13.59B for 2025 now agrees with it. The off-plan shares come from the Atlas, by count: 44, 39, 44, 51, 60 and 63%.

**Tests and PDF:** `tests/reem.cjs` now asserts the new figures, and the PDF was regenerated.

## Notes

- The DLD reports disagree slightly with each other:
  - 2019 sales are given as AED 81B in the text but 79.2B in the chart.
  - 2024 sales are 522.4B in the 2024 report but 521B in the 2025 review.
  - The slides use the newest source for each year.
- The investor and Imtiaz decks' AED 682.5B matches the Atlas exactly, so they are consistent with DLD within 0.4%. They were not changed.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem` wrote an 8-page PDF.
- The market and commission screenshots were inspected.

## Next

- The developer headline is still waiting on the user's pick.
- Confirm whether the Reem deck should stay public.
