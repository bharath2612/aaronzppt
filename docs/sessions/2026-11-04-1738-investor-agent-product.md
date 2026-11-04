# Investor deck: agent cash-out slide (LytePay model)

- Timestamp: 2026-11-04 17:38 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 6b94260
- Ending commit: the commit that adds this note (message "Add agent cash-out slide to investor deck")

## What was done

Added "Agents cash out their commission early" after the money slide, so the deck now has 11 slides. It has a $10,000 cash-out table, a 5% take-up scenario and the UAE players. Later slides were renumbered, and the test checks the maths.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

Regulation, double financing and price are open. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The slide was inspected in a desktop screenshot.

## Next step

Get legal advice on lending to individual agents, and have the user confirm the model.
