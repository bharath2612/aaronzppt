# 2026-11-10 19:30 +04: Reem gap slide as long vs short wait

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `3f4ead0`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user wanted the gap slide to show visually how much Aaronz shortens the wait: today's line long (about 5 months), and the Aaronz line about 40% of it.

## What changed

`#problem-gap` keeps the headline "Aaronz fills the market gap". The subtitle is now "Time until the brokerage is paid." The month calendar was replaced by two bars on a Month 1 to Month 5 scale:
- **Today (up to 5 months):** working the deal, then "Waiting for the developer" (hatched orange), ending at "Paid".
- **With Aaronz (about 2 months):** working the deal, then a green "Paid at closing" end. The bar is 40% of today's length, which is true, because payment at closing comes at month 2 of 5.
- **Saved time:** a dashed green box fills the rest of the line: "Up to 3 months sooner".
- **Callout:** the green partner callout from the other session is unchanged.

The test now checks that the Aaronz bar is 40% of today's (within 1%), on the slide itself.

## Notes

- On phones the Aaronz bar is 60% wide so its labels fit, and the dashed box is hidden. Desktop and the PDF use the exact 40%.
- The 2026 Abu Dhabi highlight from just before is in commit `3f4ead0`.
- **Same CSS mistake again:** the mobile media block was damaged again by a scripted edit (a `replace` hit the first `}` in the block). It was rewritten in full and checked on desktop and phone. Edit that block by hand.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem`: 8 pages.
- The gap slide was inspected on desktop and at 390px.
