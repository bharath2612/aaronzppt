# Investor deck: spread example

- Timestamp: 2026-11-04 16:49 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: a0335c9
- Ending commit: the commit that adds this note (message "Add spread example to investor money slide")

## What was done

- **Lede:** we borrow from finance partners at a lower rate, lend to brokerages at a higher one, and keep the spread.
- **Example:** replaces the "Our margin" placeholder. $100,000 same day at 12% a year, an assumed 7% partner rate and 45 days gives $1,500 less $875, a $625 spread.
- Speaker notes and a source line were added, and the test checks the arithmetic.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

7% is rounded from the 6.59% scenario in the main deck. It is not a partner quote.

## Problems

The 30-day fee doesn't cover funding at this rate. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The slide was inspected in a desktop screenshot.

## Next step

The user decides how to handle the 30-day fee and gives a real partner rate.
