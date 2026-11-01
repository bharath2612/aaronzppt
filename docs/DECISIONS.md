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

## 2026-10-30 — Imtiaz proposal deck

A separate `imtiaz.html` (not slides in `index.html`) for the Imtiaz CFO meeting. It leads with the commission-only proposition, then future potential and market size. It uses a dark, Chronicle-style design (researched from chroniclehq.com) with Aaronz green as the one accent. The broker-facing product is branded "Aaronz" (no "Express"); the alternative is "Standard". Channel Connect isn't mentioned in the deck. The cover uses the official Imtiaz and Aaronz & Co logos at equal height on white.

## 2026-10-30 — Payout fee schedule shown to Imtiaz

Per AED 100K of commission, by days after DLD registration: same day 1,500; 15 days 750; 30 days 250; 45 days 0. The user confirmed 250 after the first request said 2,250, which was above the same-day fee. Half payment uses half of each fee. All options are labelled "Guaranteed", never "No fee". The fee applies before 5% VAT. This replaces the 1%-per-30-days figure on the Imtiaz slides only; the main deck calculator is unchanged.

## 2026-10-30 — Live demo instead of an embedded payout page

The booking-confirmation email's button opens the live today-ai demo (https://today-ai-zeta.vercel.app/developer-flows#imtiaz/booking) in a new tab, so the product looks ready. A payout slide rebuilt from the user's screenshot was removed at the user's request, and the email shows no visible fallback link.

## 2026-10-31 — Payout link, Aaronz pay button, auto-push

The email button now opens https://today-ai-zeta.vercel.app/presentations/imtiaz-commission, replacing the developer-flows link above. It's styled like an Apple Pay button: "Get paid with" plus the Aaronz & Co logo. The cover headline says "Brokerages", not "Brokers", and is highlighted. The user asked for verified changes to be committed and pushed automatically, without waiting for a "push" message.

## 2026-10-31 — Aaronz pays all Imtiaz broker commissions

Brokers no longer choose between Aaronz and Imtiaz. Aaronz handles every commission payment: Imtiaz pays all broker commission to Aaronz on its usual dates, and Aaronz pays each brokerage. The brokerage chooses the usual date at no fee, or early payout for a fee (the same schedule as before; 45 days is treated as the usual date). The deck says "fee", not "interest". The "Standard" option and the "payment direction" wording are removed.

## 2026-10-31 — Current-process slide second

Slide 2 of the Imtiaz deck is now "Current process": two five-step flows comparing today's path (milestone, Imtiaz notifies, broker invoices, paid on payment terms) with Aaronz (notify at booking, broker chooses timing, invoice requested at DLD registration, paid immediately or on schedule). The proposal moves to slide 3. The flow wording follows the user's description; Imtiaz's real process is still to be confirmed.

## 2026-11-01 — Follow-up email and in-deck payout picker

The email slide (now slide 3) is a separate follow-up after the booking confirmation, branded Imtiaz × Aaronz. It's framed as punctuality, not fees: "choose when to get paid, and get paid exactly on that day". Its small "Get commission now" button goes to a new slide 4, "How brokerages would select". That slide is an interactive picker: same day / 15 / 30 days / usual date, and 100% / 50%. It replaces the link to the external today-ai demo, so the deck works offline and stays on Aaronz branding. The fee appears only as a small line on the picker and on the finance slides.

The user listed the options as "50 days, 30 days, 100%, 50%". The picker uses the confirmed schedule (same day, 15, 30, usual date = 45 days); "50 days" was read as 15; the user confirmed 15 days on 2026-11-01.
