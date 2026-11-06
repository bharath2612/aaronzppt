# Investor deck: hero problems for developers and brokerages

- **Timestamp:** 2026-11-06 13:51 +04
- **Tool and model:** Claude Code, Claude Opus 5.5
- **Branch:** main
- **Starting commit:** b0cf6ad
- **Ending commit:** the commit containing this note

## Goal

Lead the developer and brokerage problem slides with the right main problem.

## What was done

- `#problem`: "Developers need a partner to pay commission". The cards are cash flow, what they want (a partner who pays) and smaller developers (a minor point).
- `#problem-brokerages`: "Brokerages can't plan, and can't demand their money". The cards are planning, smaller brokerages and campaigns. The timeline was removed, and the unused three-column style with it (CSS hash updated).
- Tests check the new titles and cards, and the broker timeline.

## Files changed

`investor/index.html`, `investor/investor.css`, both investor PDFs, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`.

## Verification

`npm test` passed for all three decks. Both slides were checked in screenshots.

## Unfinished

- The developer cash-flow problem conflicts with the developer cash-flow test.
- The solution slide doesn't yet match the three problem slides.

## Next step

Rework the solution slide to answer each audience.
