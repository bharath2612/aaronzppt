# Decisions

## 2026-10-22 — Roadmap

Count 22 October as day 1 and 20 November as day 30. Show licensing and capital in parallel with developer outreach. Launch requires the necessary approval, signed developer agreements and available capital. The window targets initial invoice funding; developer repayments remain tied to their contractual due dates. Preserve the existing static Reveal.js architecture and visual design.

## 2026-10-29 — Calculator fee derived from an annual interest rate

The deck calculator takes "our interest rate, annualised" (default 12%) and derives the read-only customer fee as rate × developer payment duration ÷ day-count basis (12% × 30/360 = 1%). Defaults changed to a 30-day duration and 100% of commission advanced, as the user requested. Hint text for the two new fields was omitted so the expanded form still fits the 800px slide. The standalone `commission-calculator.html` and the static Unit economics slide were left unchanged (out of scope; flagged).

## 2026-10-29 — Developer flows as one journey

Both developer situations share one numbered brokerage journey: Flow A ("Sale not yet done") starts at step 1, booking; Flow B ("Sale done, yet to raise invoice") starts at step 2, raising the invoice. The Express/Normal decision sits at step 2, as the user directed.
