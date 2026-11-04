# Investor deck: problem slide cards

- Timestamp: 2026-11-04 10:28 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 8ad9bee
- Ending commit: the commit that adds this note (message "Add brokerage, developer and market cards to investor problem slide")

## Goal

Stop the problem slide resting on the timeline alone, and stress the developer side.

## What was done

- The timeline stays at the top in a more compact form, as evidence.
- Three cards replace the orange callout: Brokerages ("Can't plan or grow"), Developers ("Carry the admin, lose broker attention", the accent card) and The market ("Nobody fixes it at the source").
- Speaker notes and the test were updated.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note.

## Decisions

The user approved the three-card structure.

## Problems

The card claims come from reasoning about the model, not sourced data. Logged in `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The problem slide was inspected in a desktop screenshot.

## Unfinished

Real examples or numbers for the cards. Where AI does the work, our margin, the raise amount and the use-of-funds split.

## Next step

Get from the user where AI does the work, for the product slide.
