# Notion tracker, Pitch page, developer flows and calculator interest rate

- Timestamp: 2026-10-29 23:32 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 09ff184c31e34f7c0d73abf913abf5885cf817a4
- Ending commit: the commit that adds this note (message "Add our-interest-rate calculator input, developer flow diagram and session docs")

## Goal

Session start and housekeeping; rebuild the launch tracker in the new Notion account and re-plan it; build a Notion page that justifies a USD 20M valuation; research peer valuations; draw the developer flows in Excalidraw; add an annual interest-rate input to the deck calculator.

## What was done

- Session start: reconstructed `docs/sessions/2026-10-24-2002-excalidraw-roadmap-tracker.md` for undocumented work. Removed a duplicated block from the global `~/.claude/CLAUDE.md` (backup at `~/.claude/CLAUDE.md.bak`; outside the repo).
- Notion (new workspace, private): [Aaronz launch tracker](https://app.notion.com/p/4086ebf7407281b9ab6af8f6ca4e04bd). Date-only, 29 tasks running 26 Oct–6 Dec. Agreements and Developers merged into one workstream; banking and that workstream start 9 Nov; the pitch deck is the first fundraising task (from 29 Oct). Timeline grouped by workstream with status shown; week tasks start on Mondays. The user set the group order by hand.
- Notion: "Valuation" page, later renamed "Pitch" by the user ([link](https://app.notion.com/p/4086ebf74072819a9a25f2ea0ac75ae5)). Final contents: the question, Phase 1, a three-year view (AED 100M in year 1 growing 50–100% a year; year-3 revenue at 3% and net profit at 2%; USD 20M ≈ 16× / 9× net profit), Beehive as the comparable with sources, and a calculator database.
- Researched public valuations of the deck's global competitors (in chat only, not saved to Notion). Only Beehive (~USD 35M, 2023) is well sourced; Lyte USD 33M is unverified. Most peers disclose only funding raised (USD 2.5–7M typical).
- Excalidraw: `diagrams/create-developer-flows.cjs` generates `diagrams/aaronz-developer-flows.excalidraw` (116 elements) and `.png`. It has two parts. The brokerage journey: Flow A "Sale not yet done" enters at step 1 (book the unit) and Flow B "Sale done, yet to raise invoice" enters at step 2 (raise the invoice), followed by an Express/Normal decision. Express continues to step 3 (review the amount and accept terms) and step 4 (confirm bank account), then payment within 24h; Normal is paid in 30/60 days. Below that, "Developer integration models" is transcribed from a whiteboard photo (Emaar, Imtiaz, Danube, All developers). A copy was placed in `~/Downloads`.
- Deck calculator: added "Our interest rate, annualised" (default 12%). The customer fee is now read-only and calculated as our rate × days ÷ basis. The default duration is 30 days (was 60) and the default advance is 100% (was 90%). The formula note and README were updated, and the tests were updated to the new defaults with checks of the calculated fee.

## Files changed

- `assets/calculator.js`, `assets/presentation.css`, `index.html`, `tests/presentation.cjs`, `README.md`
- `diagrams/create-developer-flows.cjs`, `diagrams/aaronz-developer-flows.excalidraw`, `diagrams/aaronz-developer-flows.png` (new)
- `diagrams/create-roadmap.cjs`, `diagrams/aaronz-roadmap.excalidraw`, `diagrams/aaronz-roadmap.png` (from the earlier undocumented session, first committed now)
- `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, `docs/sessions/2026-10-24-2002-excalidraw-roadmap-tracker.md`, this note
- Not committed: `aaronz-admin-monthly-expenses.xlsx`. It's still undecided whether it belongs in the repo.

## Decisions

See `docs/DECISIONS.md`, 2026-10-29: the fee is derived from an annual rate; the new defaults; the hints were dropped to fit the slide; the standalone calculator was left unchanged.

## Problems and fixes

- The new field made the expanded calculator 16px taller than the 800px slide. Shortening the hints left it 1px over; removing the two new hints fixed it. Verified by measuring scroll and client height with Playwright.
- The test expectations changed with the defaults: 612.68K (was 2.33M), 612.68 in the millions unit, 604.29K on a 365-day basis, 450.83K in processed mode, AED 100M / 100K volumes. The negative case now sets our rate to 8% and expects −600K.
- Audio transcription of the "Phone Book, Dubai Marina Mall Branch 2.mp3" recording for the meeting minutes: no local transcriber is installed. The user declined installing whisper.cpp and downloading the model, so the minutes were not produced.
- The user declined two extended web searches; the Tabby/Tamara figures were given from memory, marked unverified, and later removed from the page.

## Verification

- `npm test`: "Passed: twenty-five slide layouts and funding-card navigation; calculator modes, rounding, loss, validation and reset; keyboard input; expanded controls; read mode; mobile layout and controls."
- `git diff --check`: clean.
- Calculator slide screenshot inspected at 1440×1000; expanded height 800/800.
- Excalidraw diagram rendered with `npx @excalidraw/cli@0.2.0 render` (PNG 2048×1638) and inspected.
- No lint or build scripts are configured.

## Unfinished

- The "Unit economics" slide still shows the old static example (90% advance, 3% fee, 60 days). It contradicts the calculator defaults.
- `commission-calculator.html` still uses the old fixed-fee logic.
- Meeting minutes from the MP3 are blocked until there is a transcription route.
- Not yet decided: adding peer valuations (Lyte, funding table) to the Pitch page, and aligning the Pitch calculator's 8× multiple with the three-year table.
- Not confirmed: the meaning of S.N.I / N.S.N.I / RT on the whiteboard, and "IMR".
- Open problem: collection account vs arranging-only.

## Next step

Ask whether to update the Unit economics slide (and the standalone calculator) to the 12% / 30-day / 100% model, then verify the GitHub Pages deployment of this commit.
