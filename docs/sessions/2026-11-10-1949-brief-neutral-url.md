# 2026-11-10 19:49 +04: Financier brief at a neutral URL; gap lines; solution benefits

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `a69ecea`. **End commit:** the commit that adds this note (see `git log`).

## Requests and what was done

1. **Gap slide:** the user asked for more space between the two lines, no filler box ("Up to 3 months sooner" removed), one thin line each, and lower height.
   - The rows are now 14px lines: today is a full orange line ending "Paid", and with Aaronz a green line at 40% ending "Paid at closing".
   - There is 64px between the rows.
   - The container class is now `gap-wait` to avoid clashing with the broker slide's `.wait`.
2. **Neutral URL:** the deck moved from `/reem/` to `/brief/`.
   - The files are `brief/index.html`, `brief/brief.css`, `tests/brief.cjs` and `tools/export-brief-pdf.cjs`, run by `npm run export:brief`.
   - `reem/index.html` is now only a redirect to `../brief/` that keeps the slide anchor. Locally it goes to `index.html`, because file URLs can't open a folder. The test checks it.
3. **Solution slide:** the user asked to remove the 18%, 12% and 6% figures and state benefits in words.
   - The three money cards and the worked example are gone. They are replaced by Developers (better cash flow), Brokerages (attract brokers, plan growth, run more campaigns) and Brokers (bills paid on time, free to change brokerage). The timeline stays.
   - The user's last line, "Don't remove all those numbers", was read as "now remove", since the message asked twice to remove them. The test now fails if % or AED appears on the solution slide.
4. **Found while checking:** on phones the Dubai chart overflowed the screen (bars to 471px on a 390px screen).
   - The fix: columns now shrink and labels wrap.
   - A new test checks that both market charts fit the phone width.

## Problems

A scripted CSS edit matched `.months .wait{` instead of `.wait{` and deleted the broker slide's styles. It was caught in a screenshot, and the stylesheet was rebuilt from the last commit with a targeted edit. See `docs/PROBLEMS.md`.

## Verification

- `npm test`: all four suites passed.
- `npm run export:brief`: 8 pages.
- Gap, solution and broker slides were inspected on desktop; the gap slide and both charts at 390px.

## Next

Confirm with the user that the "numbers" reading is right. Decide when to delete the `/reem/` redirect.

## Follow-up (19:55): breakpoints and solution timeline

- **Gap slide:** the user asked to keep the month intervals on the lines. The dots, labels and interval text are:

  | Row | Dots | Interval text under the line |
  |---|---|---|
  | Today | Work starts; Deal closes at 40%; Paid at the end | "Working the deal · about 2 months" and "Waiting for the developer · 2 to 3 months" |
  | With Aaronz | Work starts; Paid at closing | "Working the deal · about 2 months" |

  The lines stay 12px thin. The test checks the breakpoint labels.
- **Solution slide:** the user said to skip "that line", read as the timeline (confirm, then partner pays same day, then developer repays in 30 to 45 days), since the gap slide now shows it. It was removed, so the slide is the headline, the subtitle and the three benefit cards. The test checks there is no timeline.
- **Verification:** `npm test` passed all four suites. Both slides were inspected on desktop and the gap slide at 390px.

## Follow-up: broker journey by month

On the broker slide, each month on the bar now has a step under it, worded formally from the user's list:

| Month | Step |
|---|---|
| 1 | Engages the lead |
| 2 | Closes the deal |
| 3 | Completes registration |
| 4 | Waits for payment |
| 5 | Receives the commission |

Thin dividers separate the months. The test checks all five steps. `npm test` passed all four suites, and the slide was inspected on desktop and at 390px, where it fits.
