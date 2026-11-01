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

## 2026-11-01 — Market slide: off-plan first, secondary later

The market slide now follows "Why this design". It tells the developer why Aaronz is in this market:
- **Dubai 2025:** AED 682.5B in sales across 214,912 deals; 62.6% off-plan; AED 13.59B in brokerage commissions, up 31%.
- **Phases:** start with off-plan commission paid by developers (AED 293B, 134,623 deals); add secondary later (about 80,300 deals, usually 2%).

The old "half of brokerages choose early pay" sizing is gone, because Aaronz now handles all commission (AED 50M per AED 1B of sales). The secondary deal count is total minus off-plan (214,912 − 134,623). A secondary value isn't shown: the reported AED 314.7B doesn't reconcile with the totals.

## 2026-11-01 — Imtiaz deck ends on market size

At the user's request the pilot, future potential, next steps and finance FAQ slides were removed, so the market slide is last. The deck is now 8 slides: cover, current process, email, payout picker, proposal, what changes for Imtiaz, why this design, market. Their now-unused styles were deleted. The pilot plan, safeguards, decisions and FAQ answers remain in git history (commit 99ef75f) if they're needed as talking points.

## 2026-11-01 — Imtiaz deck moves to a light theme

The user felt black looked "vibe-coded" and asked for white and a more premium, Chronicle-level finish. `assets/imtiaz.css` was rewritten as a light system, based on Chronicle's own palette (page #f3f3f3, cards #e1e1e1–#eaeaea, ink about #212121, tight negative tracking):
- white canvas, one 1240px content column, left-aligned slide heads;
- one ink, one grey, deep green as the single accent (one solid green card per slide);
- flat cards, hairline tables, tabular numerals, source notes aligned to the column.

About 30 unused rules left over from removed slides were dropped. Manrope stays, because Chronicle's typeface (ABC Diatype) is licensed.

## 2026-11-01 — Premium finish for the Imtiaz deck

At the user's request ("do all of them"):
- **Typeface:** Inter, variable with optical sizes (the Display cut at large sizes), vendored with its OFL licence, replacing Manrope. Chronicle's ABC Diatype would need a paid licence.
- **Logo:** a traced vector Aaronz & Co logo.
- **Copy:** shorter cards and tables, with the detail and the removed pilot/FAQ talking points moved into speaker notes. `presentation.js` now registers the Reveal notes plugin only when `window.RevealNotes` is loaded, so the main deck is unaffected.
- **Presenting:** a Present button (fullscreen, site chrome hidden) and fade transitions, both Imtiaz-only in `assets/imtiaz-present.js`.
- **Labels and icons:** numbered section labels, and SVG arrows and checks instead of text glyphs.
- **PDF:** a committed `imtiaz.pdf`, regenerated with `npm run export:imtiaz`. It must be re-run after every deck change.

The cover image was not done: it needs an Imtiaz project image we have rights to use.
