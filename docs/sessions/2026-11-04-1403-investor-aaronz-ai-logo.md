# Investor deck: Aaronz AI logo

- Timestamp: 2026-11-04 14:03 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: bbc9a2e
- Ending commit: the commit that adds this note (message "Use one-line Aaronz AI logo in investor deck")

## Goal

Replace "Aaronz & Co" with "Aaronz AI" on one line, in the same font as "Aaronz".

## What was done

- Added `investor/aaronz-ai-logo.svg`, used in the nav and on the cover, plus its generator `tools/make-aaronz-ai-logo.py`.
- The letters come from the traced logo. The top row touched "& Co", so clip paths separate the letters and the "o" is its top half mirrored. The second "A" is copied. The logo has no "I", so it is built from the foot of the "r", widened to suit a capital.
- The test asserts both logos use the new file.

Files changed: `investor/aaronz-ai-logo.svg`, `tools/make-aaronz-ai-logo.py`, `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Verification

`npm test` passed all three decks. The logo was inspected enlarged, on the cover at desktop size, and at the top of the phone layout.

## Next step

The user confirms the label and logo, then supplies where AI does the work.
