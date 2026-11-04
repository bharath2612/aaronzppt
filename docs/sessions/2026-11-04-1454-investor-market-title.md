# Investor deck: market title and months wording

- Timestamp: 2026-11-04 14:54 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 4c23caf
- Ending commit: the commit that adds this note (message "Strengthen investor market title and use months wording")

## What was done

- **Market title:** "Dubai's commission market: $3.7B and growing fast".
- **Problem lede:** now says "months away".
- The test asserts both.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions and problems

The user accepted "months" against the 35-to-50-day timeline, so that question is closed. "Growing fast" rests on one year of growth (+31% vs 2024).

## Verification

`npm test` passed all three decks. Both slides were inspected in desktop screenshots.

## Next step

The user supplies our margin, then the raise amount and use of funds.
