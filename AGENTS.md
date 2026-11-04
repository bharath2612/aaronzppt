# Aaronz decks: agent guide

Static, offline-capable Reveal.js presentations about UAE real-estate commission finance. There is no backend and no build pipeline. GitHub Pages publishes `main`: https://bharath2612.github.io/aaronzppt/.

## Start here

Read `docs/STATUS.md` (current truth and next steps) and the newest file in `docs/sessions/`. Decisions are in `docs/DECISIONS.md`, past problems in `docs/PROBLEMS.md`, and the commission model in `README.md`.

## Commands

- `npm test`: runs `tests/presentation.cjs`, `tests/imtiaz.cjs` and `tests/investor.cjs` (needs Playwright Chromium). Slide screenshots land in `.build/` (ignored by git).
- `npm run export:imtiaz`: regenerates `imtiaz.pdf`. Re-run it after every Imtiaz deck change.
- `npm start`: optional local server on port 4173.
- No lint or build scripts are configured.

## Code map

- **Main deck:** `index.html`, `assets/presentation.css`, `assets/presentation.js`, `assets/calculator.js`, `assets/unit-picker.js`, `assets/scenarios.js`.
- **Imtiaz deck:** `imtiaz.html`, `assets/imtiaz.css`, `assets/imtiaz-select.js` (payout picker), `assets/imtiaz-present.js` (Present button). It shares `assets/presentation.js` with the main deck, so check both decks when changing it.
- **Investor deck:** `investor/index.html`, `investor/investor.css`. It builds on `assets/imtiaz.css`, so check it when changing that file. Show unknown facts as a visible "To be added", never invented text.
- **Standalone calculator:** `commission-calculator.html` has its own inline copy of the calculation.
- **Diagrams:** scripts in `diagrams/`, rendered with `@excalidraw/cli`.

## Imtiaz deck rules

- Aaronz handles every broker commission payment. Imtiaz pays Aaronz on its usual dates, and each brokerage chooses when it is paid.
- Pitch punctuality, not fees. Say "Aaronz", never "Today" or "Express".
- Never mention Channel Connect in the deck.
- No slide transitions. The market size slide stays last.
- Keep slide copy short and put detail in each slide's `aside.notes`.
- The picker's illustrative DLD date appears in both `imtiaz.html` and `assets/imtiaz-select.js`, and the test asserts a date derived from it. Change all three together.

## Workflow

- After a verified deck change: run `npm test`, check the slide in a screenshot, update the docs, commit, push to `main`, then confirm the Pages build.
- Leave `aaronz-admin-monthly-expenses.xlsx` uncommitted.
- Never put secrets or personal data (passport, date of birth, IBAN, phone numbers) in docs, commits or commands.
- Every session note records tool, model, branch, and starting and ending commit.
