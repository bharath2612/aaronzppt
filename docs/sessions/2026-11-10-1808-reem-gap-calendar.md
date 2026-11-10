# 2026-11-10 18:08 +04: Reem gap slide shows where Aaronz fits

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `4bbcccb`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user asked to turn the gap slide into "where we come in". They wanted a calendar-month timeline with the current scenario and the next one, where Aaronz fills the two-month gap. In their words: "Aaron allocates funds to pay the brokerages and receives funds back from the developer."

## What changed

`#problem-gap` is now "Aaronz fills the two-month gap". It is a calendar with columns Month 1 to Month 5 and two rows:
- **Today:** working the deal, deal closes, then a hatched two-month block ("The gap: brokerage unpaid for about 2 months"), then the developer pays the brokerage.
- **With Aaronz:** the same block is solid orange ("Aaronz pays the brokerage at the close"), then the developer pays Aaronz.

A bracket labelled "Where Aaronz fits" sits over months 3 and 4. The callout below reads: "Aaronz allocates funds to pay the brokerage, and receives the money back from the developer."

The test checks that the gap block, the Aaronz block and the bracket all sit exactly under months 3 to 4, plus the callout text.

## Problems and fixes

Removing the old gap-bar CSS with a line-based regex also cut parts of the shared mobile media block, which dropped the single-column rules for the market chart and problem slides on phones. The mobile overflow test did not catch it. The block was rewritten in full and checked on a 390px screen.

## Open

The solution slide still says a licensed finance partner pays the brokerage (Flow B). This slide now says Aaronz allocates funds. The two describe different models, so the user needs to choose.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem`: 8 pages.
- The gap slide was inspected on desktop and at 390px.

## Follow-up: headline

The user said "Aaronz fills the two-month gap" "feels very bad" and asked for a bigger framing. The headline is now "Aaronz fills the market gap", and the test asserts it.

## Follow-up: Dubai headline

At the user's request, the Dubai market headline is now "Dubai property sales grew 10× in five years" ("close to" removed). The figures behind it, AED 71.7B to AED 680B, are 9.5×, which the headline rounds up.

## Follow-up: professional copy

The user said the copy was too casual (citing "hardest hit") and asked for professional wording with fewer words. Every slide's visible copy was tightened and the figures are unchanged:
- **Developers:** "Developers carry commission costs on every sale". The cards are now "The need" and "Most exposed".
- **Brokerages:** "Brokerages cannot forecast commission income". The rows are Certainty of payment date, Leverage over the developer, and Outcome; the small-brokerage outcome is now "Many exit the market".
- **Brokers:** "Brokers wait up to five months to be paid". The points are "Living costs continue" and "Limited mobility".
- **Gap slide:** "Aaronz funds brokerage payments and is repaid by the developer."
- **Solution cards:** Early payment, Net return, Platform fee.

`npm test` passed all four suites, and the developer, brokerage and solution slides were inspected.

## Follow-up: no recipient named

The user said not to mention "Prepared for Reem", because the deck may go to several parties. The changes:
- **Cover line:** removed the recipient; it now reads "Aaronz closes the gap between a property sale and the commission payment."
- **Cover meta:** now just "November 2026", with "Prepared for Reem" and "Draft" removed.
- **Browser tab title and footer:** "Commission finance".
- **PDF:** renamed from `aaronz-reem.pdf` to `aaronz-commission-finance.pdf`.

The test now fails if "Reem" appears in the title, description, visible text or PDF link. The URL path `/reem/` is unchanged, so it still shows the name in the address bar.
