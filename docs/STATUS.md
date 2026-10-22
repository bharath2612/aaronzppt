# Project status

Updated: 2026-10-22 13:58 +04

Aaronz is a static, offline-capable Reveal.js presentation about proposed UAE real-estate commission finance. There are 25 slides, an embedded earnings calculator and a standalone calculator page. No backend or build pipeline is configured.

The latest commits added global competitors and licensing details, shortened headings, and removed two providers from the US slide. Current branch: `main`; reviewed commit: `52bf7b3b86702d93010c4a646296fb8304381610`.

## Current work

Added Roadmap as slide 24, before Sources. It covers 22 October–20 November 2026 (30 calendar days inclusive): outreach and paperwork, readiness and marketing, onboarding, then initial invoice funding. Licensing and capital progress in parallel. Required approval, signed agreements and available capital gate launch. Developer repayment remains tied to agreed due dates. README and the initial footer count now reflect 25 slides.

Slide content is in `index.html`, styling in `assets/presentation.css`, navigation in `assets/presentation.js`, and calculator behavior in `assets/calculator.js` and `assets/unit-picker.js`. The standalone calculator duplicates the calculation script inline. Global directory data also exists in `assets/global-players.json`; the displayed tables are embedded in HTML.

## Verification

- Initial Git working tree was clean.
- Read README, application HTML/CSS/JavaScript, directory data, package configuration and Playwright test script.
- `npm ci` passed: 8 packages installed, 0 vulnerabilities reported.
- `npm test` passed outside the sandbox: all 25 slide layouts, funding navigation, calculator cases, keyboard controls, read mode and mobile layout. Initial sandbox execution failed to launch Chromium due to macOS permission restrictions; no checks were weakened.
- Visually inspected `.build/roadmap.png`: dated stages, parallel tracks and launch gate fit without clipping.
- No build or lint scripts are configured in `package.json`.
- External financial and regulatory sources were not reverified during this code-context review.

## Follow-up

The early slides describe payment into an Aaronz collection account; the licensing-requirements slide says the arranging-only model cannot hold client money. Reconcile the chosen commercial structure when requested; no legal conclusion was made during this review.

Deployment authorised. GitHub Pages is configured for `main` at `/`, publishing to https://bharath2612.github.io/aaronzppt/. Final `npm test` passed before commit. Next: push the roadmap commit, verify the Pages build and live content, then user review.
