# Investor deck: equity funding slide, agent slide removed

- **Timestamp:** 2026-11-05 15:15 +04
- **Tool and model:** Claude Code, Claude Opus 5.5
- **Branch:** main
- **Starting commit:** 9df6273
- **Ending commit:** the commit containing this note

## Goal

Remove the agent slide, and replace the funding simulation with what the user actually means: raising equity from VCs for working capital.

## What was done

- Removed the `agents` slide and its styles and tests.
- Rewrote `funding` as "We raise equity for working capital": three steps and one callout. Removed `investor/funding.js`.
- Renumbered the slides to 11, and rebuilt both PDFs.
- Moved the AED one-line table check to the money slide. It now measures line wrapping directly, because that slide's rows are taller than the old 60px limit without wrapping.

## Files changed

`investor/index.html`, `investor/investor.css`, `investor/funding.js` (deleted), both investor PDFs, `tests/investor.cjs`, `AGENTS.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`.

## Verification

`npm test` passed for all three decks. The funding slide was checked in a screenshot.

## Problems

A failed docs script left a chained command to commit only what was already staged, so e6da726 pushed the `investor/funding.js` deletion alone. For a short time the live page requested the deleted script and still showed the old slides. The next commit completed the change.

## Unfinished

The money slide still describes borrowing at 9%, which conflicts with the funding slide (`docs/PROBLEMS.md`).

## Next step

Ask the user whether borrowing stays on the money slide, and get the raise amount.
