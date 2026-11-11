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
