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
