# Investor deck: team order

- Timestamp: 2026-11-04 14:32 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 07977c0
- Ending commit: the commit that adds this note (message "Reorder team on investor deck")

## What was done

Reordered the team slide as the user asked, and the test asserts the new order.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions and problems

None new.

## Verification

`npm test` passed all three decks. The team slide was inspected in a desktop screenshot.

## Next step

The user supplies our margin, then the raise amount and use of funds.
