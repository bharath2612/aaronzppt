# Investor deck: full-width timelines and 2 pm cut-off

- Timestamp: 2026-11-04 10:19 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 55cd4bf
- Ending commit: the commit that adds this note (message "Redesign investor timelines to span full width and add 2 pm cut-off")

## Goal

The user said the timelines looked cut in half. Make them use the whole width, and add the 2 pm cut-off to the footnote.

## What was done

- **Timeline design:** one line across the full column, with nodes at the left edge, centre and right edge. Text aligns to its node, and duration pills sit on the line between nodes. Phones get a plain stacked list.
- **Footnote:** "Settled the same day if the invoice is raised before 2 pm; after that, the next working day."
- **Test:** asserts the timeline spans the column, the last step is right-aligned, and the footnote says 2 pm.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Decisions

The commission-milestone change is confirmed as investor deck only. See `docs/DECISIONS.md`.

## Problems

None new.

## Verification

`npm test` passed all three decks. Problem and solution slides inspected at desktop size; the phone layout inspected and measured, with nothing clipped.

## Unfinished

Where AI does the work, our margin, the raise amount and the use-of-funds split. The 2-month label question stays noted in `docs/PROBLEMS.md`.

## Next step

Get from the user where AI does the work, for the product slide.
