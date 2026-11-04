# Investor deck: problem and solution titles

- Timestamp: 2026-11-04 14:34 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: dfc9e42
- Ending commit: the commit that adds this note (message "Retitle investor problem and solution slides")

## What was done

- **Problem title:** "Brokerages wait months to receive their commission".
- **Solution title:** "We pay them the same day".
- The test asserts both.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions and problems

The user's wording was "wait months to receive the invoice to receive the commission", which was read as a dictation slip and shortened. Flagged to the user. "Roughly 2 months" no longer appears on the slide.

## Verification

`npm test` passed all three decks. Both slides were inspected in desktop screenshots.

## Next step

The user supplies our margin, then the raise amount and use of funds.
