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
