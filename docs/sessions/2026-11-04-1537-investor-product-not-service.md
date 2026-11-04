# Investor deck: a product, not a service

- Timestamp: 2026-11-04 15:37 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 2db3c1a
- Ending commit: the commit that adds this note (message "Retitle investor product slide as a product, not a service")

## What was done

- **Title:** "A product, not a service", replacing "Fully autonomous solution".
- **Lede:** a product that manages all of this automatically, instead of hiring an army of accountants, with full autonomy kept as the goal.
- Speaker notes and the test were updated.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

None new.

## Verification

`npm test` passed all three decks. The product slide was inspected in a desktop screenshot.

## Next step

The user supplies our margin, then the raise amount and use of funds.
