# 2026-11-11 08:00 +04: Brief restructure, outcome, money flow, settings sheet

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `899ce90`. **End commit:** the commit that adds this note (see `git log`).
- **Concurrent work:** this push includes uncommitted changes another session had made in the same working tree: the commission section and the problem slides rewritten as numbered lists. The user said "push it" knowing that.

## Deck now (17 slides)

Cover; break "The market"; Dubai; Abu Dhabi; RAK; break "Commissions"; off-plan commission; break "The problem"; brokers; brokerages; developers; break "The solution"; the gap; break "The outcome"; three-way outcome; break "Money flow"; six-step flow.

## What changed in this session

- **Brokerages problem:** the fourth point (smaller brokerages cannot push developers to pay) was removed.
- **Gap slide:** today is up to 4 months: engages lead; unit booked at the end of month 1; registration complete at the end of month 2; developer releases payment at the end of month 3; brokerage releases payout at the end of month 4. With Aaronz it is 2 months: registration done, paid immediately. The Aaronz line is half of today's.
- **Sections:** new breaks "The solution" and "The outcome". The gap slide now sits under the solution.
- **Outcome slide:** three columns in the order broker, brokerage, developer, each problem line turned into a benefit. It replaces the old finance-partner solution cards.
- **Money flow:** six steps on one numbered line, with green only on Aaronz's steps: developer marks the broker eligible for commission; brokerage chooses terms and raises the invoice; Aaronz approves and routes; licensed partner pays the commission amount from money it already holds; developer repays the licensed partner on agreed terms; Aaronz settles the finance partner (interest only) and collects its fee. The title is "From registration to settlement in six steps"; the user rejected "How we make money".
- **Settings sheet (`brief/settings.js`):** a button in the top bar opens a side sheet with five primary colours (orange, blue, indigo, amber, slate) and a hide/show switch per slide. Green stays the secondary colour. Choices are saved in that browser only. Hidden slides are removed from the deck, so the counter, arrows and reader view skip them.
- **Ready commission slide:** built at 2% (AED 5.7B excluding land) and then deleted at the user's request.

## Problems

- A `.flow` class clashed with an arrow rule in `assets/imtiaz.css`; the diagram now uses `.rail`.
- Scripted edits stopped on missing anchors when another session had already changed the file. Each stop was visible and nothing was half-applied to the slide.

## Open

- The gap slide's green line says Aaronz pays "through a finance partner, and the developer repays the partner", while the flow says the licensed partner pays and is repaid.
- Step 6 has money returning to Aaronz's capital pool; the Flow B PDF says money never passes through Aaronz's bank. Needs a legal check.
- The final primary colour is not chosen (default is still orange). Share-link option for hide/show is proposed, not built.
- The other session's commission slide numbers (4% of off-plan, AED 26.7B) were not reviewed in this session.

## Verification

- `npm test`: all four suites passed ("financier brief deck, seventeen slide layouts, ...").
- `npm run export:brief`: 17 pages. `git diff --check` clean.
- Gap, outcome, section break, flow and settings views were inspected on desktop; gap, outcome, flow and settings at 390px.

## Follow-up: Aaronz.AI

The user asked for the brand to read "Aaronz.AI". All text in the brief (slides, speaker notes, page title and description) now says Aaronz.AI. The brief has its own logo, `brief/aaronz-ai-logo.svg`, which is the investor logo with a dot added; the investor deck's logo is unchanged. A test checks the name and the logo.

An interrupted tool call still committed and pushed `6870577`; the user had asked to push, and was told. `npm test` passed all four suites after this change.
