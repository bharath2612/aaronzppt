# Investor deck: $25,000 example at 15% and 9%

- Timestamp: 2026-11-04 16:53 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: f62c345
- Ending commit: the commit that adds this note (message "Use realistic $25,000 example on investor money slide")

## What was done

- **Example:** $25,000 same day, 15% charged, 9% cost of money, 45 days: $469 fee, $281 cost, $188 spread.
- **Fee table:** recalculated at 15% a year on $25,000: $469, $313, $156, $0.
- Source line, speaker notes and the test were updated.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

The earlier USD conversion relabelled "AED 100,000" as "$100,000" without converting it. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The slide was inspected in a desktop screenshot.

## Next step

The user confirms the recalculated fee table, then supplies the raise amount and use of funds.
