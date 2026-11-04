# Investor deck: no single words on a last line

- Timestamp: 2026-11-04 16:36 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: e3d1b29
- Ending commit: the commit that adds this note (message "Stop single words dropping to a last line in investor deck")

## What was done

- Widened the text under slide titles to 980px on every slide, and added balanced wrapping to card titles, card text and timeline text.
- Reworded three lines so they fit: the brokerage card on the problem slide, one problem timeline step and one solution timeline step.
- Added a test that fails if a paragraph or title on any slide leaves one word alone on its last line, at the 1440px test viewport.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Problems

See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The problem and solution slides were inspected in desktop screenshots; the full deck in a contact sheet before the last rewording.

## Next step

The user supplies our margin, then the raise amount and use of funds.
