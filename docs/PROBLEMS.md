# Problems

## 2026-10-22 — Local verification environment (resolved)

Initial tests could not load Playwright because dependencies were absent; npm ci resolved this. Chromium then failed to launch inside the macOS sandbox. Approved execution outside the sandbox allowed the unchanged test suite to pass for all 25 slides and existing interactions.

## 2026-10-22 — Collection model consistency (open)

Earlier slides propose collection into an Aaronz account, while the licensing-requirements slide describes restrictions under an arranging-only model. Reconcile when the commercial structure is selected. Not changed as part of the roadmap request.

## 2026-10-29 — Calculator slide height (resolved)

Adding the interest-rate field made the expanded calculator 16px taller than the slide. Removing the two new fields' hints fixed it (800/800); `npm test` passes.

## 2026-10-29 — Meeting audio transcription (open)

No local speech-to-text tool is installed. The user declined installing whisper.cpp and downloading a model, so the minutes from the meeting recording weren't produced.

## 2026-10-29 — Calculator inconsistencies (open)

The Unit economics slide (90% / 3% / 60 days) and `commission-calculator.html` (fixed 3% fee) don't match the deck calculator's new 12% / 30-day / 100% defaults.

## 2026-10-30 — Fee scenarios table on phones (resolved)

At 390px the four-column table and second input were clipped. Inputs now stack and the table scrolls horizontally in its own wrapper; page width stays 390px.

## 2026-10-30 — 90-day scenario margin (open)

At a 12% bank rate, the 12% 90-day rate nets AED 0 per AED 100K. The user expected a ~3.5% fee, which would need 14%. Awaiting a decision.

## 2026-10-30 — Channel Connect commissions as financeable receivables (open)

The broker may not assign or novate its rights (11.2), immediate termination voids all commission including sold units (7.2), and Channel Connect has not countersigned the copy reviewed. Financing Imtiaz/Channel Connect commissions likely needs Channel Connect's written consent or acknowledgement; legal confirmation pending.

## 2026-10-30 — Imtiaz deck dark theme rendered white (resolved)

`assets/vendor/reveal.css` sets `.reveal-viewport` to white, so dark slides showed white text on white. Fixed by setting the viewport background in `assets/imtiaz.css`. A slide id `next` also clashed with the footer's `#next` button; it's renamed `next-steps`.

## 2026-10-30 — Aaronz & Co logo resolution (resolved 2026-11-01)

The only available Aaronz & Co logo is a 291×156 PNG from aaronz.co, cropped to 251×131. At 76px high it may look soft on high-density screens next to the vector Imtiaz logo. Needs a vector or larger source.

## 2026-10-30 — Live demo branding differs from the deck (open)

The today-ai Imtiaz demo shows a "Today" wordmark at the payment choice; the Imtiaz deck brands the product "Aaronz". It's a separate repo, so nothing was changed there.

Resolution (2026-11-01): aaronz.co has no vector logo; its only other large images are service icons. The PNG was upscaled six times and traced with potrace (JS port, run from the scratchpad, not a project dependency) into `assets/brand/aaronz-co-logo.svg`. Checked side by side against the PNG. Replace it with the official SVG if the brand team has one.

## 2026-11-01 — Imtiaz cover headline kept the old font

`presentation.css` sets `.reveal h1` to Plus Jakarta Sans directly, so after the switch to Inter the cover headline still rendered in Jakarta (seen in the exported PDF). Fixed with `.reveal h1, h2, h3, h4 {font-family: inherit}` in `assets/imtiaz.css`.

## 2026-11-04 — Off-plan figures don't reconcile with total commissions

AED 293B of off-plan sales at about 5% implies about AED 14.65B of commission, more than the AED 13.59B DLD reports across the whole market. Likely causes: 5% is too high as a market-wide average, or the two figures use different scopes. Not resolved. The investor market slide omits the 5%; the Imtiaz market slide still shows both and needs the user's decision.

## 2026-11-04 — Investor solution timeline starts at booking, fees start at DLD registration

The solution slide promises 2 to 3 days from booking, as the user asked. The fee table on the same deck counts days from DLD registration, and the Imtiaz process slide pays after DLD registration. If payment waits for DLD registration, 2 to 3 days from booking may not hold. Waiting on the user.

## 2026-11-04 — Investor 24-hour promise vs cover and fee table (replaces the 2-to-3-days question above)

The solution slide's clock now starts at the invoice, so the booking question no longer applies. Still open: the cover says "paid the same day", while the solution says "within 24 hours"; and the fee table counts days from DLD registration with a "Same day" option, while the solution counts from the invoice. Waiting on the user.

## 2026-11-04 — Investor "roughly 2 months" vs the timeline's own numbers

The problem timeline adds up to 35 to 50 days (4 to 5 days, then 30 to 45), which is closer to 5 to 7 weeks than 2 months. The label stays as the user asked. The earlier cover and fee-table wording conflict is resolved by using "same day" and the commission milestone throughout the investor deck. The daily cut-off was set to 2 pm later the same day.

## 2026-11-04 — Investor problem cards are unsourced

The brokerage, developer and risk cards come from reasoning about the model, not data or interviews, so behaviour claims are worded with "may". They need real examples before investors see them. "Nobody fixes it at the source" was removed at the user's request and replaced with a risk card.

## 2026-11-04 — Investor notes were published briefly

The notes were pushed in 391490b before checking repo visibility, which is public. They are now removed from the current site and ignored by git, but that commit stays in the public history unless it is rewritten, which needs the user's approval. Check visibility before pushing anything sensitive. Note that `docs/` is public too.

## 2026-11-04 — Investor solution cards rest on two unconfirmed points

- **Agents:** "nothing pending ties an agent to their agency" assumes the agency passes the agent's share on promptly. Aaronz pays the brokerage, not the agent.
- **Risk:** "the brokerage no longer waits on the developer" holds only if Aaronz can't reclaim the money when a developer doesn't pay. Whether there is recourse to the brokerage isn't decided.

## 2026-11-04 — Investor developer slide looked broken in the user's browser

Labels sat outside the column and the five cards wrapped to two rows. Cause: GitHub Pages sends `cache-control: max-age=600`, so the browser paired new HTML with an older cached `investor.css`. Reproduced by using the stylesheet from c1c1a14 with the current HTML. Fix: the link carries a content hash, enforced by `tests/investor.cjs`. The shared `assets/` files are not versioned this way.

## 2026-11-04 — Grey line across the "o" in the Aaronz AI logo

The "o" is two mirrored halves. Their overlap was under a pixel at logo sizes, so the antialiased edges left a faint line, which an enlarged check didn't show. Fixed with a larger overlap in `tools/make-aaronz-ai-logo.py`. Check logos at their real display size.

## 2026-11-04 — "Months" vs the investor timeline's numbers

The problem title now says "months", replacing the "roughly 2 months" label noted earlier. The timeline still adds up to 35 to 50 days, so the same question applies. Resolved: the user accepted "months" as is.

## 2026-11-04 — Single words dropping to a last line on investor slides

The text under titles was capped at 760px, so "it." dropped to its own line after a wording change. The same fault had been fixed only on the product slide. Now fixed for the whole deck, with a test. The test skips text with inline markup and only checks one viewport width, so other screen sizes could still show it.

## 2026-11-04 — Investor fee table loses money on the 30-day option at a 7% partner rate

Funding periods assume the developer pays 45 days after the milestone. Same day: $1,500 fee, 45 days funded, 12% a year, $875 cost, $625 spread. 15 days: $750 fee, 30 days funded, 9% a year, $583 cost, $167 spread. 30 days: $250 fee, 15 days funded, 6% a year, $292 cost, a $42 loss. The main deck's fee scenarios slide also assumes a 12% bank rate, which would leave no spread on the same-day option. Waiting on the user and a real partner rate.

## 2026-11-04 — "$100,000" example wasn't a real conversion

When the investor deck moved to US dollars, the per-100,000 fee example was relabelled from AED to dollars, which kept the rates right but implied a commission far above reality. The user caught it. The example now uses $25,000. The 30-day loss logged earlier is also resolved in this deck: at 15% and 9%, the options give spreads of $188, $125 and $63. Whether that money slide's rates match the Imtiaz deck is open.

## 2026-11-04 — Investor competition figures are thin

Lyte's $33M valuation comes from a Dealroom search listing. The page itself returned 403, and CB Insights hides valuations, so it has no second source and no known date. Tongo's $11M total is from September 2022; later aggregator totals differ ($9.47M to $9.87M). No valuation exists for FastPay RECAP or ACOT. ACOT advertises same day before 2 pm for its top developer tiers, the same promise as the investor deck's solution slide.

## 2026-11-04 — Investor spread falls if a developer pays later than the fee assumed

The partner charges interest until the developer pays, so a fee fixed for 60 days ($625 on $25,000) leaves $62.50 instead of $250 if the developer pays at 90 days, and turns negative beyond about 100 days. Whether the fee is set per developer term, or charged until collection, is not decided. The solution slide's "Brokerages can also choose a later date" and the cover's date choice also need checking against this model.

## 2026-11-04 — Open points on the investor agent product

- **Regulation:** this means funding individuals. CBUAE rules require a licence for finance business onshore, and one secondary source says DFSA firms can't provide credit to retail clients, with an exception for business purposes. Not legal advice; needs a lawyer. LytePay holds a MAS payment licence and describes the product as not a loan; that doesn't carry over to the UAE.
- **Double financing:** one commission can't back both a brokerage advance and an agent cash-out.
- **Price:** ACOT's example fee is 3%, below the 4.5% used. At 3% on $10,000, the 60-day spread is $150, not $300.
- **Data:** broker counts conflict (32,978 and about 39,776 in the same Khaleej Times article). The 50:50 split is "most cases" per Bayut, and top agents earn more.
- **Claims:** ACOT, Agents First and Insiders of Dubai terms are from their own pages or press coverage, not independently verified.

## 2026-11-05 — Partner licence model is unconfirmed

No partnership is confirmed in the repo. A licence can't simply be sublet: the partner would need to be the regulated provider, or Aaronz its agent. Who funds, owns the receivable, carries first loss and sets pricing is undecided, and the main deck notes the fee-minus-cost maths only applies if the contract gives Aaronz that margin. Mawarid is Sharia-compliant, so its pricing may not be described as interest, which would affect the money slide's wording.

## 2026-11-05 — Investor funding slide names Mawarid before terms are confirmed

The public deck names Mawarid and carries an assumed valuation of $20M, which could anchor investors. The small print says terms aren't final. At the default 15% and 9%, partner funding makes the least profit ($0.25M at $300M a year) and loses money at $74M and $150M.

## 2026-11-05 — Investor money slide still describes borrowing

The funding slide now says equity is the working capital, but the money slide says we borrow from finance partners at 9% and keep the spread. On equity alone, a 60-day payout of $25,000 earns the full $625, with no $375 partner cost. The user has not yet said whether borrowing stays, so the money slide is unchanged. The funding slide no longer names Mawarid or a $20M valuation, which closes the concern about naming them publicly, but those remain in git history. Licence coverage under an equity-funded model is unconfirmed.

## 2026-11-06 — Smaller-developer problem conflicts with the developer tests

The new developer problem slide targets smaller developers short of cash, but the developer slide only signs developers that pass all five tests, including cash flow and market share. Smaller developers with weak cash flow would fail. Paying their brokers while they pay later is also the credit risk those tests exist to avoid. Unresolved until the user decides which story holds. The deck also says "brokers" on the problem slides but "Agents" on the solution slide.

## 2026-11-06 — Developer problem now leads with cash flow

The developer problem slide now leads with developers having cash flow issues, which conflicts more directly with the cash-flow test on the developer slide than the smaller-developer version did. The solution slide's notes still compare against the removed 30 to 90 day timeline. Both are open.

## 2026-11-10 — Two market sizes across the decks (fixed the same day)

The Reem deck uses DLD Atlas totals (AED 508.2B of sales and an estimated AED 10.2B of commission in 2025). The investor and Imtiaz decks use the land department's reported AED 682.5B and AED 13.59B. The Atlas counts only Sell and Sell - Pre registration. The Reem commission slide shows both, but the decks should eventually agree on one basis. The Reem deck is also public (noindex) with pricing and draft routing limits; the user has not yet confirmed that is acceptable.

## 2026-11-10 — Reem market figures understated DLD sales by a quarter (fixed)

The first Reem market slides counted only Sell and Sell - Pre registration, about 25% below DLD's reported sales value in every year, with off-plan at 72% instead of 63%. They now use DLD's reported values, with 2021 and 2022 recalculated from all DLD sales registrations, which match DLD's reports within 0.5% for 2023 to 2025. All decks now agree with DLD within 0.4% for 2025.

## 2026-11-10 — Reem gap and solution slides describe different funding models

The gap slide (user's wording) says Aaronz allocates funds to pay the brokerage and is repaid by the developer. The solution slide says a licensed finance partner pays from its own account, with Aaronz as software (Flow B). Unresolved until the user decides. Also: a line-based regex used to remove CSS cut parts of the mobile media block; it was rewritten in full, so edit shared media blocks by hand.

## 2026-11-10 — Scripted CSS edits keep hitting the wrong rule

This happened three times in this deck: two line-based regexes cut parts of the mobile block, and a search for `.wait{` matched the broker slide's `.months .wait{` and deleted the broker styles. Each was caught by screenshots before pushing, and fixed by rebuilding from the last commit. Also, the gap container's `.wait` class collided with the broker slide's `.wait` segment; it is now `.gap-wait`. On phones the Dubai chart had been wider than the screen since it was built; columns now shrink and a test checks both charts fit.

## 2026-11-10 — The three market charts use different measures

Dubai and Abu Dhabi show all property sales, including off-plan. RAK shows completed sales only, because its off-plan figures are missing for 2020, 2021 and 2026 and partial for 2024. The RAK source line states this. If RAK publishes full off-plan figures, switch RAK to completed plus off-plan to match.
