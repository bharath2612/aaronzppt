# Investor deck: autonomous product slide, centred team, stale stylesheet fix

- Timestamp: 2026-11-04 14:11 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: a76afc9
- Ending commit: the commit that adds this note (message "Fill autonomous product slide, centre team names, version investor stylesheet")

## Goal

Fix the developer slide the user reported as bad, centre the team names, and retitle and fill the product slide from the user's vision.

## What was done

- **Developer slide:** no layout change. The user's screenshot came from new HTML with a cached older stylesheet.
- **Stylesheet link:** now `investor.css?v=<hash>`, and the test fails if the hash doesn't match the file.
- **Team:** names centred in their cards.
- **Product:** titled "Fully autonomous solution". The placeholder rows are gone, the cards are filled, and the callout reads "Zero bloat in the AI economy."

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `AGENTS.md`, `docs/STATUS.md`, `docs/PROBLEMS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Problems

See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The screenshot was reproduced by pairing the current HTML with the stylesheet from c1c1a14. The team, product and developer slides were inspected in desktop screenshots.

## Next step

The user supplies our margin, then the raise amount and use of funds.
