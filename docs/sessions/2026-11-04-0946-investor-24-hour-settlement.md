# Investor deck: 24-hour settlement

- Timestamp: 2026-11-04 09:46 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 36ff028
- Ending commit: the commit that adds this note (message "Refocus investor problem and solution on invoice wait and 24-hour settlement")

## Goal

Drop the 2 to 3 days. Make the wait after the invoice the problem, and settlement within 24 hours of the invoice the solution.

## What was done

- **Problem ("The invoice goes in, then they wait"):** sale done; about a week later "Now you can raise"; invoice raised the same day because they need the money; paid in 30 to 45 days, sometimes 90. Total: roughly 2 months, sometimes over 3.
- **Solution ("Settled within 24 hours"):** milestone achieved; Aaronz notifies the same day; invoice raised; settled within 24 hours.
- The test asserts the new totals and that "2 to 3 days" is gone.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note.

## Decisions

See `docs/DECISIONS.md`.

## Verification

`npm test` passed all three decks. Both slides were inspected in a screenshot.

## Unfinished

The cover still says "paid the same day" and the fee table still counts from DLD registration; see `docs/PROBLEMS.md`. Where AI does the work, our margin, the raise amount and the use-of-funds split.

## Next step

The user decides how the 24-hour promise fits the cover and the fee table.
