# 2026-11-26 13:18 +04: ready-homes money flow

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `2f6c4d6`. **End commit:** the commit that adds this note (see `git log`).

## Goal

Add ready (secondary) home deals to the one commission product, starting with the money flow. Wills and insurance are out of scope for now.

## What was done

- Explained how ready deals fit next to off-plan, then recorded the user's answers in `docs/DECISIONS.md`: commission collected on transfer day; buyer pays; MOU to transfer about 2 to 4 weeks cash, 6 to 8 weeks mortgage; cash, mortgage and mixed deals all eligible after the MOU.
- Draft brief: new slide `#business-model-ready`, "Ready homes: from MOU to transfer in six steps", right after the off-plan money flow, on the same six-step rail. Speaker notes name the two open questions.
- `tests/brief-draft.cjs`: 24 slides, the new slide in the layout, orphan, confidentiality and phone checks, and its steps and timing line asserted.
- Rebuilt `brief-draft/index.html` and the draft PDF (24 pages).

## Files changed

- `brief-draft/slides.html`, `brief-draft/index.html` (generated), `brief-draft/aaronz-commission-finance-draft.pdf`
- `tests/brief-draft.cjs`
- `docs/DECISIONS.md`, `docs/PROBLEMS.md`, `docs/STATUS.md`, this note

## Decisions

Ready homes join the one commission product (see `docs/DECISIONS.md`, 2026-11-26). The flow slide lives in the draft brief until the user approves merging.

## Problems and fixes

Playwright's Chromium (headless shell 1243) was missing from the cache; installed with `npx playwright install chromium` after the user approved the download (`docs/PROBLEMS.md`).

## Checks

`npm test` passed all five suites; `npm run export:brief-draft` wrote the page and a 24-page PDF. Desktop screenshot of the new slide checked.

## Unfinished

- How the buyer's transfer-day commission reaches the finance partner.
- What happens when a ready deal falls through before transfer.
- Ready-homes commission row, pricing and credit risk; the pricing and credit risk slides still describe off-plan only.

## Next step

Get the user's answer on transfer-day collection and fall-through, then draft the ready-deal credit risk.
