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

## 2026-11-01 — No slide transition; Aaronz & Co logo in the nav

The user found the fade between slides "very bad", so it was removed completely and the deck uses Reveal's `transition:'none'` again (asserted in the test). The Imtiaz deck nav now shows the Aaronz & Co SVG logo instead of the shared "aaronz/" wordmark. The main deck is unchanged.

## 2026-11-04 — Fixed illustrative picker date

The picker's DLD date moved to Tue 24 Nov 2026 and stays fixed rather than following today's date, so the slide, the PDF and the test all show the same dates. 24 Nov was chosen because none of the resulting payout dates falls on a weekend or a UAE national holiday, and it stays in the future for about three weeks. It will need moving again if the deck is shown after that.

## 2026-11-04 — Investor deck in its own folder, in Aaronz orange

The investor deck lives in `investor/` and has 9 slides. The user merged "how we make sure" with "which developers" into "Top-tier developers only", merged the amount and use of funds into "The raise", and approved adding "How we make money". It is branded Aaronz, using the orange found in the `today-admin` theme (`#ff6b35` for decoration, `#cf4000` for text and the accent card, because `#ff6b35` is too low-contrast for small text). It reuses `assets/imtiaz.css` and overrides tokens in `investor/investor.css`, so layout fixes carry across both decks but changes to `imtiaz.css` must be checked here too (the test covers this). Unknown facts appear as a visible "To be added", never invented text.

## 2026-11-04 — Investor pitch: settled within 24 hours of the invoice

The user dropped the "2 to 3 days" figure. Brokerages raise the invoice the same day they are notified, so the problem is the 30 to 45 days (sometimes 90) that follow. The solution is notification the day the milestone is achieved, and settlement within 24 hours of the invoice. The "sometimes over 3" months on the problem slide is computed: about a week plus 90 days.

## 2026-11-04 — Investor wording: same day, commission milestone, handpicked

The investor deck says "same day", which matches the cover and fee table and is the stronger pitch. It carries a footnote that invoices raised after a daily cut-off are paid the next working day, because a late invoice can't be paid that day. This replaces "within 24 hours". Timelines and fees count from the commission milestone, not DLD registration; the Imtiaz deck is unchanged. "Handpicked developers only" replaces "Top-tier developers only" because "top-tier" invites the objection that Aaronz isn't capturing the whole market. The criterion is a clean financial track record.

## 2026-11-04 — Investor same-day cut-off is 2 pm; Imtiaz deck keeps DLD registration

The user set the cut-off: settled the same day if the invoice is raised before 2 pm. The move from DLD registration to the commission milestone applies to the investor deck only, so the Imtiaz deck stays as it is.

## 2026-11-04 — Investor founder notes stay local

The repo and GitHub Pages site are public, so `investor/notes.md` is ignored by git rather than published. The trade-off: no backup, and tools working from a fresh clone won't have it.

## 2026-11-04 — Three developer tests on the investor partner slide

The user approved three tests (reputation, cash flow, payment record) for the initial phase, with the firm ending "If they don't pass all three, we don't sign." "Initial phase" answers the objection that being selective limits the market. The earlier five factors now sit inside the tests.

## 2026-11-04 — Investor deck in US dollars

The user wants every investor deck figure in US dollars with no conversion footnote. Market figures use the pegged 3.6725 AED per dollar, kept in the speaker note. "No footers" was read as no currency footnote, so the market sources and the 2 pm and fee terms stay until the user says otherwise. The Imtiaz and main decks stay in AED.

## 2026-11-04 — Investor developer slide: tested, five criteria

"Every developer tested before we sign" replaces "Handpicked developers only", because the user found it lazy and wanted internal testing in the label. Market share and unsold inventory join reputation, cash flow and payment record. The first three protect repayment and the last two show volume, so the slide groups them that way. The firm ending now says all five.

## 2026-11-04 — Aaronz AI logo in the investor deck only

The user asked for "Aaronz AI" on one line in the Aaronz font. It is derived from the traced logo rather than a font file, because the font isn't identified. The "I" is constructed, so an official vector from the brand's designer should replace it if one exists. The Imtiaz and main decks keep their logos. Body copy still says "Aaronz".

## 2026-11-04 — Investor product slide: fully autonomous, zero bloat

The user retitled the slide "Fully autonomous solution", with the vision of a completely autonomous product at maximum efficiency, built as an AI-native company from the ground up, and "zero bloat in the AI economy". Full autonomy is written as a goal in the lede and notes, because it isn't yet in operation.

## 2026-11-04 — Investor product slide: a product, not a service

The user wants the slide to stress software over headcount: a product that manages this automatically instead of an army of accountants. The title "A product, not a service" replaces "Fully autonomous solution", and the autonomy vision stays in the lede.

## 2026-11-04 — "Automatically" is banned from the investor pitch

The user doesn't want the word anywhere in the pitch, including speaker notes. The deck uses "on its own" and "by AI"; the test enforces the rule.

## 2026-11-04 — Investor money slide: $25,000 commission, 15% charged, 9% cost of money

The user set these figures, saying commissions are around $25,000 to $30,000. The fee table was recalculated at the same 15% a year so it doesn't contradict the example. That changes the investor deck's fee rates (same day 1.875%, was 1.5%), which awaits the user's confirmation. The Imtiaz deck keeps its AED fees.

## 2026-11-04 — Investor competition picks

The user asked for 2 global and 2 local players from the main deck's list, with the top-valued global ones given more weight. "Accord" was read as ACOT. Lyte is the only commission-finance player found with a published valuation. Tongo was chosen second on funding raised, shown as "valuation not disclosed". Gazeal has a higher reported valuation (about $14M to $15M, 2021 to 2022) but is a property platform where commission advances are a side offering, so it was left out. Modelled estimates from aggregators were not used.

## 2026-11-04 — Investor deck: developers pay in 30 to 90 days; spread depends on duration

The user replaced the single 45-day assumption ("offline commissions" read as off-plan). Interest is commission × annual rate × days ÷ 360, so the slide shows the spread by duration instead of fees by payout date. The picker-style options (15 days, 30 days, usual date) no longer appear on this slide.

## 2026-11-04 — Investor agent product modelled on LytePay

The user asked for LytePay's model in the UAE. The slide uses LytePay's published 4.5% flat fee and its highest published 80% limit (one agency, SRI; others are capped by a balance). 9% cost of money is the user's figure; 60 days and 5% take-up are assumptions. It is framed as "the next product", which is our wording for the user to confirm.

## 2026-11-04 — Investor deck switches between USD and AED

Replaces USD-only; USD stays the default. Market figures use the source AED numbers. Example amounts are rounded to AED 92,000 ($25,000) and AED 37,000 ($10,000), and their fees are recalculated from those amounts rather than converted, so each currency's maths adds up on its own. PDFs are pre-built per currency.

## 2026-11-05 — Investor raise excludes a licence

The user plans to operate under an embedded finance partner's licence, such as Mawarid Finance, rather than obtain one. This changes the earlier DIFC direction for the investor deck. The Imtiaz deck's speaker note still mentions pursuing a DIFC licence, and the main deck has licensing slides; both are unchanged and flagged.

## 2026-11-05 — Investor funding simulation assumes Mawarid funds and licenses

The user says Mawarid would give both licence and capital. The slide uses equity of $1M at an assumed $20M pre-money, partner funding of all advances, and losses carried by Aaronz (the cautious case). Rates of 7%, 9% and 11% are test values. Its "Founders keep" figure is for this round only, before any later rounds.

## 2026-11-05 — Investor deck funds advances with equity; agent product slide removed

The user rejected the funding simulation: the plan is simply raising equity from VCs for working capital. The slide now says that in three steps, with no switches, comparison or partner name, and `investor/funding.js` is gone. This replaces the Mawarid simulation decision above. The agent cash-out slide was removed at the user's request, leaving 11 slides. Its research stays in git history and in `investor/notes.md`.

## 2026-11-06 — Investor problem split into three audience slides

At the user's request, the problem is now three slides: developers, brokers (individual agents, in the user's word) and brokerages. They share section number 02, so later slide numbers are unchanged. The brokerage slide keeps the approved title and timeline. The solution slide is not yet reworked to match.

## 2026-11-06 — Investor problem slides lead with each audience's main problem

The user said the developer and brokerage slides had the wrong hero problems. Developers: cash flow, and the wish for a partner to pay commission, with smaller developers as a minor point. Brokerages: they can't plan or demand their money; smaller ones can't push developers to pay and many fail, and every brokerage wants money sooner for campaigns. The brokerage timeline was dropped because the broker slide covers timing.

## 2026-11-10 — Reem financier deck uses Flow B and DLD Atlas figures

The Reem deck is for a financier, so its solution is the embedded finance partner flow (the partner approves and pays; Aaronz earns a 6% fee), not the investor deck's equity-funded story. Market figures come from the user's DLD Atlas (Sell and Sell - Pre registration, 2020 to 2025), and commission is estimated at 2% of sales value, in line with the land department's 2025 ratio. AED only. The three problem slides are copies of the investor deck's, and a test keeps their headlines in step.

## 2026-11-10 — Reem market uses DLD reported sales, Atlas for 2021 and 2022

User decision: "Use DLD official numbers, recalculate 2021 and 2022 from Atlas". Sources are DLD's annual reports (2020, 2024, and the 2025 data review), using the newest report where they disagree. 2021 and 2022 are taken from all DLD sales registrations in the Atlas. Commission stays at 2% of sales value.

## 2026-11-10 — Don't name the Atlas on the Reem deck

The user said the "DLD Atlas" label "doesn't hold any credibility". Estimated years carry an "Estimated" badge, with the reasoning on its own line in the source note: estimated from DLD transaction data, and within 0.5% of DLD's reported totals where both exist.

## 2026-11-10 — Reem deck drops the commission and allocation slides

The commission series had published support only for 2024 and 2025. The user removed it and the "where we are" routing slide. The market headline says "close to 10×" rather than 9.5×. The deck is now market, problems and solution.

## 2026-11-10 — Reem problem told as one commission chain

The user said the problem slides' layout and messaging were weak. The Reem deck now follows one commission from developer to brokerage to broker, each slide with its own visual, and ends on a new "gap" slide: commission is earned at the sale and paid months later, and someone has to fund that gap. This sets up the finance-partner solution. The investor deck keeps its old problem slides for now.

## 2026-11-10 — Abu Dhabi market slide uses ADREC reports and sales records

The Abu Dhabi slide uses ADREC's 2025 report for 2021 to 2025 and adds 2026 to date from the ADREC sales CSV the user supplied. That CSV matches ADREC's reported totals within 3% for 2022 to 2025 and for H1 2026. 2020 is left out because ADREC says registration incentives inflated it.

## 2026-11-10 — Abu Dhabi figures from ADREC's latest report

The user chose ADREC's latest report (H1 2026) for 2022 to 2025, adding the two half-year values (26, 52, 53, 94 bn). 2021 (AED 15B) comes from the 2025 report, which is the latest to cover it. 2026 to date (AED 137B) comes from ADREC transaction records, because no report covers it yet. ADREC's reports disagree on 2023 (50 excluding one-off land deals, or 53 including them); the H1 2026 halves give 52.

## 2026-11-10 — Financier deck names no recipient

The user said the deck may go to multiple parties. The cover, tab title, footer and PDF name no longer mention Reem, and the PDF is now `reem/aaronz-commission-finance.pdf`. The cover line is "Aaronz closes the gap between a property sale and the commission payment." The URL path `/reem/` is unchanged so existing links keep working.

## 2026-11-10 — Gap slide shows the wait as long vs short bars

The user wanted the gap slide to show the impact visually. Today's wait is drawn as a full five-month line, and the Aaronz line is 40% of it (paid at closing, month 2 of 5). This is the real ratio, not an exaggeration. The calendar version with start and end markers was replaced.

## 2026-11-10 — Financier brief moves to /brief/; solution shows benefits, not pricing

The deck goes to several parties, so it now lives at `/brief/` (files `brief/`, `tests/brief.cjs`, `npm run export:brief`). `reem/index.html` stays only as a redirect, so links already shared keep working. It can be deleted once those links no longer matter. The solution slide no longer shows the 18%, 12% and 6% split or the worked example; it lists benefits for developers, brokerages and brokers. Pricing stays in the Flow B PDF.

## 2026-11-10 — Market slides: Dubai 2026 gap box, RAK completed sales

Dubai 2026 shows DLD data to date plus a dashed box for the amount still needed to match 2025. It is labelled as a gap, not a forecast, because DLD's own 2026 data points to about AED 476B, and a 700B forecast was declined. RAK uses completed sales for 2020 to 2026, the only RAK series that is complete for every year; off-plan, reported separately, is excluded and the slide says so. Sales figures exclude mortgages and gifts throughout, because commission is only paid on sales.

## 2026-11-11 — Brief ends on outcome and money flow; settings are per browser

At the user's request, the old finance-partner solution cards were replaced by a solution section (the gap) and an outcome section (broker, brokerage, developer benefits), followed by a six-step money flow. The ready commission slide was built and then removed. Primary colour and slide visibility are set in a side sheet and saved per browser, because the site is static; a share-link option is proposed but not built. Deck hide/show is not a confidentiality control, since hidden slides stay in the page source.

## 2026-11-11 — Brief default primary colour is amber

The user felt the orange read as red, and so as something bad. Amber is now the default for the page and the PDF; green stays the secondary colour. The other four colours remain available in the settings sheet. The investor deck keeps its orange.

## 2026-11-11 — Brief: indigo default, phones show slides, PDF follows settings

Indigo replaces amber as the default primary colour. Phones open as slides at the full desktop layout (viewport width 1440) because the user wanted nothing inside a slide to change. Because the site is static, the PDF button cannot generate a file for every combination; with non-default settings it uses the browser's print dialog, and the default state still downloads the fixed file.

## 2026-11-11 — Aaronz Pay, finance partner, average commission rate

From the user's printed review: the product is "Aaronz Pay" (AaronzPay.today) on the solution and money-flow slides, with Aaronz.AI kept as the company logo. The money flow names only the finance partner, which receives a fee. The commission rate is shown as an average, default 4%, with a 3% to 6% dropdown in settings that recalculates the slide. The market slides no longer draw a box for the rest of 2026.

## 2026-11-11 — Brief brand is Aaronz.Pay

The user asked for the logo and cover to read Aaronz.Pay, in a clean font with a different colour. The brief now uses a text wordmark (Inter bold, ".Pay" in the primary colour) in place of the Aaronz.AI SVG. The investor deck keeps its Aaronz AI logo.

## 2026-11-11 — Sharjah uses sales to 2024

Sharjah publishes sales value only to 2024; 2025 and 2026 appear only as total transactions including mortgages. The user chose completed plus off-plan sales, 2021 to 2024, over total transactions. Its 2024 highlight and value-based off-plan share differ from the other three market slides, and the slide says so.
