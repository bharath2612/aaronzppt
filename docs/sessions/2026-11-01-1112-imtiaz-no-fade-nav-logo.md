# Imtiaz deck: no fade, Aaronz & Co logo in the nav

- Timestamp: 2026-11-01 11:12 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: d0811fa
- Ending commit: the commit that adds this note (message "Remove Imtiaz slide fade and use Aaronz & Co logo in nav")

## What was done

- **Fade removed:** `assets/imtiaz-present.js` no longer sets a transition; Reveal's `none` applies. The test asserts the transition is `none`, and the screenshot wait is back to 300ms.
- **Nav logo:** the top-left "aaronz/" wordmark is replaced by `assets/brand/aaronz-co-logo.svg` (36px; 30px on phones). The test checks that it loads.
- **PDF:** re-exported `imtiaz.pdf`.

Files changed: `imtiaz.html`, `imtiaz.pdf`, `assets/imtiaz.css`, `assets/imtiaz-present.js`, `tests/imtiaz.cjs`, `README.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Verification

- `npm test` passed both decks.
- The cover was inspected in a screenshot with the new nav logo.
- `npm run export:imtiaz` wrote 8 pages.

## Next step

Rehearse with the speaker view (press S) before Monday.
