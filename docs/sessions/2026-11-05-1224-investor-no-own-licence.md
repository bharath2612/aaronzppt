# Investor deck: no own licence

- Timestamp: 2026-11-05 12:24 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 54056a4
- Ending commit: the commit that adds this note (message "Remove licence from investor use of funds")

## What was done

The user said the licence will come through an embedded finance partner such as Mawarid Finance. Removed "Licence" from the raise slide's use of funds and re-exported both PDFs. The raise scenarios were rerun in chat, not on a slide.

Files changed: `investor/index.html`, `investor/aaronz-investor-usd.pdf`, `investor/aaronz-investor-aed.pdf`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks, including the raise slide's rows.

## Next step

The user confirms who funds the advances under the partner model.
