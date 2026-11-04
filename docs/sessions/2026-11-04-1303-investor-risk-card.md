# Investor deck: risk card on the problem slide

- Timestamp: 2026-11-04 13:03 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 06206d0
- Ending commit: the commit that adds this note (message "Replace market card with risk card on investor problem slide")

## Goal

The user rejected "Nobody fixes it at the source" and said the problem is "unsafety".

## What was done

The third card is now "The risk": "Commission isn't safe until it's paid". The speaker notes link it to the handpicked developers slide. The test was updated.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note.

## Decisions and problems

"Unsafety" was read as commission being at risk until paid. The user may have meant uncertainty; awaiting confirmation.

## Verification

`npm test` passed all three decks. The problem slide was inspected in a desktop screenshot.

## Next step

The user confirms the card, then supplies where AI does the work.
