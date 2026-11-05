# Investor deck: funding simulation

- Timestamp: 2026-11-05 12:31 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 89716f6
- Ending commit: the commit that adds this note (message "Add funding simulation slide to investor deck")

## What was done

Added "A funding partner lets us keep 95%" before the raise, so the deck now has 12 slides. It compares equity only, our own debt and Mawarid funding, with switches for volume, partner rate and our fee. It follows the currency switch, and the PDFs show the default state. Logic is in `investor/funding.js`.

Files changed: `investor/index.html`, `investor/investor.css`, `investor/funding.js`, `investor/currency.js`, both investor PDFs, `tests/investor.cjs`, `README.md`, `AGENTS.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

Mawarid is named publicly and its terms are assumptions. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks, with simulation outputs asserted at default and changed switches, in both currencies. The slide was inspected at desktop size in USD and AED. No phone overflow was found by measurement.

## Next step

The user confirms Mawarid's actual terms and whether it may be named.
