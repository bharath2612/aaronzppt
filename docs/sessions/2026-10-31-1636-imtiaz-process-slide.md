# Imtiaz deck: current-process slide

- Timestamp: 2026-10-31 16:36 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: f754c59 (the previous commit, f754c59, is live: the Pages build showed "built" and the live page had the new wording)
- Ending commit: the commit that adds this note (message "Add current-process slide to Imtiaz deck")

## Goal

Make slide 2 a "Current process" comparison: today vs with Aaronz. The proposal and the rest follow.

## What was done

- **New slide** `#process`, inserted after the cover. It has two lanes of five steps with arrows:
  - grey lane "Today · Broker waits";
  - green lane "With Aaronz · Broker chooses".
- **Nav:** new "Process" link.
- **Footer:** count is now 12.
- **Styles:** new `.flow` classes in `assets/imtiaz.css`. Arrows point down on mobile.
- **Tests:** `tests/imtiaz.cjs` uses the new id order, '12 / 12' and "twelve slide layouts".

## Files changed

`imtiaz.html`, `assets/imtiaz.css`, `tests/imtiaz.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Verification

- `npm test` passed both decks: "Imtiaz deck, twelve slide layouts …", with no overflow and no horizontal scroll on mobile.
- The process slide was inspected in a desktop screenshot.

## Unfinished

- Confirm Imtiaz's real booking-to-invoice process and whether the usual date is 45 days after DLD registration.
- Decide on the FAQ's "no loan, guarantee or recourse" line.
- Logo resolution; nav wordmark; "Today" branding on the live demo.

## Next step

Click through the deck and the live demo before Monday.
