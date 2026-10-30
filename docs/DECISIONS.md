# Decisions

## 2026-10-22 — Roadmap

Count 22 October as day 1 and 20 November as day 30. Show licensing and capital in parallel with developer outreach. Launch requires the necessary approval, signed developer agreements and available capital. The window targets initial invoice funding; developer repayments remain tied to their contractual due dates. Preserve the existing static Reveal.js architecture and visual design.

## 2026-10-29 — Calculator fee derived from an annual interest rate

The deck calculator takes "our interest rate, annualised" (default 12%) and derives the read-only customer fee as rate × developer payment duration ÷ day-count basis (12% × 30/360 = 1%). Defaults changed to a 30-day duration and 100% of commission advanced, as the user requested. Hint text for the two new fields was omitted so the expanded form still fits the 800px slide. The standalone `commission-calculator.html` and the static Unit economics slide were left unchanged (out of scope; flagged).

## 2026-10-29 — Developer flows as one journey

Both developer situations share one numbered brokerage journey: Flow A ("Sale not yet done") starts at step 1, booking; Flow B ("Sale done, yet to raise invoice") starts at step 2, raising the invoice. The Express/Normal decision sits at step 2, as the user directed.

## 2026-10-30 — Fee scenarios slide

A separate slide (not a change to the main calculator) compares 30/60/90-day developer payment durations per AED 100K advanced. Our annual rate is editable per scenario (defaults 18/15/12%); one shared bank rate (default 12%, a user assumption) and a static fixed fee per deal (default AED 0) is added after "left for us" to give net revenue. 360-day basis, 100% advanced.

## 2026-10-30 — Agreement reviews in Notion

Contract reviews (starting with Channel Connect) go to private Notion pages as plain-English summaries with clause references and financing learnings, not into the deck. Personal data from contracts (passport, date of birth, bank/IBAN) is excluded from Notion and repo docs.
