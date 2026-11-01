# Imtiaz deck: remove "Follow the money"

- Timestamp: 2026-11-01 10:01 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 942254f
- Ending commit: the commit that adds this note (message "Remove Follow the money slide from Imtiaz deck")

## Goal and what was done

The user asked to remove the "Follow the money" slide entirely:

- removed `#money` from `imtiaz.html`, so the deck has 12 slides;
- deleted its now-unused `.money` and `.chips` styles from `assets/imtiaz.css`;
- updated the test's id order and count in `tests/imtiaz.cjs`;
- updated the README slide count and `docs/STATUS.md`.

The fee schedule still appears in the payout picker's source note and on the proposal card.

## Verification

`npm test` passed both decks ("Imtiaz deck, twelve slide layouts, email call to action and payout selection, and mobile reader layout").

## Unfinished / next step

Unchanged: the FAQ "no recourse" line, logo resolution, the nav wordmark, and a click-through before Monday.
