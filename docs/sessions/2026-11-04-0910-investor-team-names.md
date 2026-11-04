# Investor deck: team names

- Timestamp: 2026-11-04 09:10 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 5f4c47f
- Ending commit: the commit that adds this note (message "Add team names to investor deck")

## Goal

Show the three team names on the team slide, names only.

## What was done

The team slide now has three cards with names only, as the user asked. The role and background placeholders were removed, and the test asserts the names.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, this note.

## Decisions and problems

None new.

## Verification

`npm test` passed all three decks. The team slide was inspected in a screenshot.

## Unfinished

Where AI does the work, our margin, the raise amount and the use-of-funds split. Roles and backgrounds if the user wants them later.

## Next step

Get from the user where AI does the work, for the product slide.
