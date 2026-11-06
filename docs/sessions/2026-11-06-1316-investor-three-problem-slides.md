# Investor deck: problem split into three slides

- **Timestamp:** 2026-11-06 13:16 +04
- **Tool and model:** Claude Code, Claude Opus 5.5
- **Branch:** main
- **Starting commit:** 86ed821
- **Ending commit:** the commit containing this note

## Goal

Split the problem slide into three: developers, brokers and brokerages.

## What was done

- `#problem` is now developers: smaller developers can't easily fund commission, and slow payers sell less.
- New `#problem-brokers`: a timeline from starting work, to about 2 months to close, to 2 to 3 months more before payment (4 to 5 months), with cards on bills and being stuck at an agency.
- New `#problem-brokerages`: the approved title and timeline, with cards on campaigns, salaries and rent, and risk.
- Added two- and three-column card grids, and updated the CSS hash. The deck now has 13 slides.
- Tests now check the three slides in order, both new timelines, and the market slide by id rather than index. The solution keeps its four cards.

## Files changed

`investor/index.html`, `investor/investor.css`, both investor PDFs, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`.

## Verification

`npm test` passed for all three decks. All three problem slides were checked in screenshots.

## Unfinished

- The solution slide doesn't yet answer the three problem slides.
- Smaller developers conflict with the developer tests (`docs/PROBLEMS.md`).

## Next step

Rework the solution slide to answer each audience, once the user confirms.
