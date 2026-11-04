# Investor deck: cover heading and logo seam fix

- Timestamp: 2026-11-04 14:23 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: a893e6a
- Ending commit: the commit that adds this note (message "Change investor cover heading and fix logo seam")

## Goal

Replace the cover heading with the user's chosen line, plus a second line about running autonomously by AI.

## What was done

- **Heading:** "Real estate commissions, paid the same day." (highlighted), then "Autonomously, by AI."
- **Size:** cover heading reduced to 64px so the longer line stays on one row; 40px on phones.
- **Logo:** fixed a faint grey line across the "o" at small sizes, and made the same overlap larger on the "I".

Files changed: `investor/index.html`, `investor/investor.css`, `investor/aaronz-ai-logo.svg`, `tools/make-aaronz-ai-logo.py`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Problems

See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The cover was inspected at desktop and phone sizes, and the logo in magnified screenshots at three desktop sizes. The logo seam fix was checked by those crops, not by a re-render of the full cover.

## Next step

The user confirms the second line, then supplies our margin.
