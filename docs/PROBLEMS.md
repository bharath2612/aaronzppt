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
