# Investor deck: competition slide

- Timestamp: 2026-11-04 17:06 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 618b9e7
- Ending commit: the commit that adds this note (message "Add competition slide to investor deck")

## What was done

Added slide "Competition" before the raise, so the deck now has 10 slides. Two global players sit in the larger top row: Lyte and Tongo. Two local players sit below: FastPay RECAP and ACOT. The test asserts the names and that only Lyte shows a valuation.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

Valuation data is thin. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The slide was inspected in a desktop screenshot.

## Next step

The user confirms the global picks, then supplies the raise amount and use of funds.
