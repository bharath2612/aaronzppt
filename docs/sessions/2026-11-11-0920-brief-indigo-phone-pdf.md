# 2026-11-11 09:20 +04: Brief default colour, phone slides, PDF follows settings

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `58fc3e4`. **End commit:** the commit that adds this note (see `git log`).

## What changed (`brief/`)

- **Default colour:** indigo (amber was set briefly first). `<html data-accent="indigo">` and `settings.js` both default to it.
- **Phones open as slides:** `settings.js` detects a phone by screen size and sets the viewport to `width=1440`, so every slide uses the exact desktop layout. The test compares element positions on all slides against desktop. Swiping is on. In portrait the bars around the slide grow, and the settings sheet is zoomed. "Read as page" returns to the phone viewport and stacked layout.
- **PDF button:** in the default state (indigo, nothing hidden) it downloads the file on the site. With any other colour or hidden slide it opens the browser's print dialog, which saves exactly what is on screen, one 1440x800 page per visible slide.
- **Print CSS:** `<html class="print-pdf">` switches off Reveal's own `@media print` rules, which restyled every slide. The `reveal-print` class that Reveal's print view needs is not set, so slide mode is unaffected. Printed slides are 799px tall, because a 1px rounding overflow otherwise adds a blank page.

## Verification

- `npm test`: all four suites passed ("... PDF for current settings, phone slides and mobile reader layout").
- The test counts PDF pages for the default (17) and with one slide hidden (16).
- `npm run export:brief`: 17 pages, indigo.
- Phone portrait, phone landscape, settings on a phone, and printed pages were inspected in screenshots.

## Next

Open items are in `docs/STATUS.md`.

## Follow-up: market labels and gap line

- **2026 bars:** Dubai and RAK's dashed box now just says "Q4" (no amount), and "YTD" sits inside the solid part. Abu Dhabi's 2026 has no dashed box, only YTD. The YTD and JAN–SEP tags above the bars were removed. The source lines still say the box marks the rest of the year, drawn up to the 2025 total, and is not a forecast.
- **Highlight:** Dubai and Abu Dhabi both highlight 2025. Abu Dhabi's side cards are AED 94B in 2025, AED 137B in 2026 to 9 November, and 78% of 2025 residential value off-plan. RAK stays highlighted on 2026.
- **Gap slide line:** now "Aaronz.AI pays the brokerage through a licensed partner, and the developer repays the licensed partner", matching the money flow.
- **Verification:** `npm test` passed all four suites, and the three market slides were inspected.

## Follow-up: 2026 value inside the bar

On Dubai, Abu Dhabi and RAK, the 2026 figure now sits inside the solid part of the bar, directly under YTD, and no longer above the bar. `npm test` passed all four suites, and the three market slides were inspected.

## Follow-up: 2025 on all three market slides

Dubai, Abu Dhabi and RAK all highlight the 2025 bar, and their side cards cover 2025 only. RAK: AED 3.2B completed sales, 2,964 completed sales, average sale AED 1.08M. Abu Dhabi's middle card is now +77% on 2024 (AED 53B to AED 94B, from the bars). A test checks all three. `npm test` passed all four suites, and the RAK and Abu Dhabi slides were inspected.
