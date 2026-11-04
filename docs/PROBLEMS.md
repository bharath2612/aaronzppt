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
