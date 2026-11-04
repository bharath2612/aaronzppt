# Investor deck: problem and solution timelines

- Timestamp: 2026-11-04 09:12 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 3c91baf
- Ending commit: the commit that adds this note (message "Show payment timelines on investor problem and solution slides")

## Goal

Show the payment timeline on the problem slide (roughly 2 months) and the Aaronz timeline on the solution slide (2 to 3 days).

## What was done

- **Problem:** sale done; about a week later the developer says "Now you can raise"; 2 to 3 days to raise; paid in 30 to 45 days, "who knows exactly when". Total: roughly 2 months.
- **Solution:** booking done; Aaronz notifies the brokerage immediately; commission paid the same day the invoice is in. Total: 2 to 3 days.
- The test asserts the step counts and both totals. Both timelines are labelled "Indicative timeline".

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note.

## Problems

The solution timeline counts from booking, but the fee table and the Imtiaz deck count from DLD registration. Logged in `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. Both slides were inspected in a screenshot.

## Unfinished

The user's message said "notify the listing"; the slide says "notifies the brokerage", to be confirmed. Where AI does the work, our margin, the raise amount and the use-of-funds split.

## Next step

Confirm when the 2 to 3 days starts, booking or DLD registration.
