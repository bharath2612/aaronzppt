# 2026-11-27 12:17 +04: ready-homes flows as diagrams and a PDF

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`) for the first diagram on 2026-11-26, then Claude Fable 5.2 (`claude-fable-5-2`). **Branch:** `main`.
- **Start commit:** `afa8a53`. **End commit:** the commit that adds this note (see `git log`).

## Goal

Put the ready-homes (secondary market) commission process into flow diagrams and a PDF with two flows: the practically possible way and an AI-native way.

## What was done

- The user wanted an Excalidraw flow, not a slide; the ready-homes slide added to the draft brief on 2026-11-26 stays, at the user's choice.
- `diagrams/aaronz-ready-homes-flow.*` (2026-11-26): off-plan beside ready homes. Now superseded.
- From the user's notebook photos and dictated description, drew the process: two non-cashable cheques at the MOU, the 2% cheque handed to AaronzPay, four staged payouts, and the hand-to-hand swap for a manager's cheque on transfer day (`diagrams/aaronz-ready-homes-process.*`).
- Recommended an alternative with no cheque custody and drew it (`diagrams/aaronz-ready-homes-ai-flow.*`).
- `diagrams/export-ready-homes-pdf.cjs` builds `diagrams/aaronz-ready-homes-flows.pdf`: page 1 the normal flow (diagram only), page 2 the AI-native flow with six steps.
- User edits applied: last payout 20%; "the practically possible way" as the name; timing box and other risks removed so only cheque pickup and delivery is highlighted; both cheques in the finance partner's name (applied to both flows); in the AI-native flow the broker brings the manager's cheque to AaronzPay for the last 20%.

## Files changed

- `diagrams/create-ready-homes-flow.cjs`, `create-ready-homes-process.cjs`, `create-ready-homes-ai-flow.cjs`, `export-ready-homes-pdf.cjs`
- `diagrams/aaronz-ready-homes-flow.*`, `aaronz-ready-homes-process.*`, `aaronz-ready-homes-ai-flow.*` (`.excalidraw` and `.png`), `diagrams/aaronz-ready-homes-flows.pdf`
- `docs/STATUS.md`, `docs/DECISIONS.md`, this note

## Decisions

See `docs/DECISIONS.md`, 2026-11-27: four staged payouts against a non-cashable 2% cheque, both cheques in the finance partner's name, two flows kept side by side.

## Problems and fixes

- The first PDF build let page 2's step list run into the footer; the export script's own check caught it, and the spacing was tightened.
- Reading single PDF pages needs `pdftoppm`, which is not installed; the whole PDF was read instead.

## Checks

`npm test` passed all five suites. The PDF export's footer check passed. Both PDF pages were read after the cheque-payee edit, and the AI-native diagram was viewed again after its last change.

## Unfinished

- The user has not chosen between the two flows.
- The draft brief's ready-homes slide still shows the 2026-11-26 version and now contradicts these flows.
- Open: the cash-buyer milestone for the second payout, and how money already paid out comes back if a deal falls through.

## Next step

Ask the user which flow to go with, then update the draft brief's ready-homes slide to match.

## Follow-up: flows renamed

The user rejected "the practically possible way". The two flows are now the **manual flow** and the **advanced flow** in the diagrams, the PDF, `docs/STATUS.md` and `docs/DECISIONS.md`. The file names are unchanged. `npm test` passed all five suites; both PDF pages were read after the rebuild.
