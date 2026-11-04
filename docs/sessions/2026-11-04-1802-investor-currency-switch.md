# Investor deck: USD and AED switch

- Timestamp: 2026-11-04 18:02 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: ff15aa6
- Ending commit: the commit that adds this note (message "Add USD and AED switch with PDF downloads to investor deck")

## What was done

- **Switch:** a USD/AED dropdown in the nav changes all 50 money figures, including speaker notes. USD is the default; the choice is remembered, and `?currency=aed` sets it by link.
- **PDFs:** `npm run export:investor` writes `investor/aaronz-investor-usd.pdf` and `-aed.pdf`. The nav PDF link follows the currency.
- **Figures:** each is stored as `<data data-usd data-aed>`. A first attempt with `<span>` shrank the market headline figures because of an existing CSS rule.

Files changed: `investor/index.html`, `investor/investor.css`, `investor/currency.js`, `investor/aaronz-investor-usd.pdf`, `investor/aaronz-investor-aed.pdf`, `tools/export-investor-pdf.cjs`, `package.json`, `tests/investor.cjs`, `AGENTS.md`, `README.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Verification

`npm test` passed all three decks, covering every slide in AED for overflow, no dollar sign in AED, figure size, reload and reading mode. Market and agent slides were inspected in both currencies, and one page of each PDF was rendered.

## Next step

The user confirms the rounded AED example amounts, then supplies the raise amount and use of funds.
