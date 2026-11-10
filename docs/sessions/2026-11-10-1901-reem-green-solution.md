# 2026-11-10 19:01 +04: Reem deck uses green for the solution and less orange

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `3d64e97`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user said the gap slide showed the solution in orange, which reads as a problem, and that the deck had too much orange overall. Solutions should be green, problems may stay orange, and green should be used only where it makes sense. Then the user asked for markers at the start of month 3 and the end of month 4. The start should say Aaronz pays the brokerage through the finance partner, and the end should say the developer pays the money back to the finance partner. The last block should say Aaronz takes its fee from the funder.

## What changed (`reem/reem.css`, `reem/index.html`, `tests/reem.cjs`)

- **Colour rule for the Reem deck only:** orange is the brand accent (eyebrow numbers, progress bar, cover highlight, the 2025 bar) and marks problems (the hatched unpaid blocks, "Many exit the market"). Green `#1f6b4a` marks what Aaronz fixes. Everything else is neutral.
- **Neutral:** lead cards (ink instead of orange), the active Developer/Brokerage/Broker pill, the "Paid" pill, market bars before 2025 (grey), the YTD bar (grey hatch) and the "DLD DATA" tags.
- **Green:** gap slide bracket, "With Aaronz" label, funded block, callout (light green with dark green text), and the solution slide timeline.
- **Gap slide wording:**
  - The funded block now reads "Finance partner funds about 2 months".
  - Start marker (month 3): "Aaronz pays the brokerage through the finance partner".
  - End marker (month 4): "Developer pays the money back to the finance partner".
  - Month 5 now reads "Aaronz takes its fee from the funder".
  - Callout: "Aaronz pays the brokerage through a finance partner, and the developer repays the partner."
  - Speaker notes were updated to match.
- **Test:** asserts the new text and that the markers line up with the start of month 3 and the end of month 4.

This also settles the earlier open point: the gap slide and the solution slide now both describe the finance-partner model (Flow B).

## Problems and fixes

- The lead-card text rule made the callout white on light green. Fixed with a dark green heading colour.
- The end marker used class `end`, which collided with `.cal .end` (black block). Renamed to `pin-start` and `pin-end`.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem`: 8 pages.
- The market, developer, gap and solution slides were inspected in screenshots.

## Open / next step

The investor deck keeps its orange styling, which this change did not touch. Ask the user whether it should follow the same rule.
