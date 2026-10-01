# Arronz commission finance

Open `index.html` directly in your browser. Reveal.js and the font are bundled locally, so no server or internet connection is required. Use the arrow controls to present, or **Read as page** to scroll. Mobile starts in read mode.

The presentation contains eight slides, source links, proposed deal flows and the interactive calculator. `commission-calculator.html` remains available as a standalone calculator.

## Edit
- `index.html`: slide content
- `assets/presentation.css`: layout and visual design
- `assets/presentation.js`: Reveal.js navigation and read mode
- `assets/calculator.js`: calculator interactions and formulas

## Check
Run `npm install`, then `npm test` (requires a Playwright Chromium installation). `npm start` optionally serves the folder on port 4173.

## Model
Annual advance volume = annual commission market × market share × advance rate, or total annual commission processed × advance rate.

Contribution = advance volume × (customer fee − annual bank rate × duration / day-count basis − additional bank charge rate).

Customer fees are a percentage of gross advances. Interest is modeled on gross advances for the full duration. The result excludes operating costs, credit losses and taxes, and assumes a commercial agreement allowing Arronz to retain the residual. Market share is annual commission value financed once, not a share of all property transaction value. Additional bank charges default to zero and should be configured from the actual facility terms.

Market facts and the limits of provider claims are documented on the evidence slide. The 90% Arronz advance, fee assumptions and funding rates are proposals, not approved offers.
