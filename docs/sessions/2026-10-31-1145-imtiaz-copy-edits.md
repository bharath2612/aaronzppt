# Imtiaz deck copy edits and publication

- Timestamp: 2026-10-31 11:45 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 5c88252b6639dae64052cfde6aaec36505acadb7
- Ending commit: the commit that adds this note (message "Refine Imtiaz deck finance slide and booking email copy")

## Goal

Publish the Imtiaz deck and apply the user's copy edits.

## What was done

- **Published:** pushed 5c88252 at the user's request. The GitHub Pages build reported "built", and `imtiaz.html` returned HTTP 200 with the live demo link present.
- **Slide 4, "What changes for Imtiaz":**
  - Removed the "Balance sheet: no borrowing, no guarantee" row.
  - "What we need" now reads "Eligible commission data for each sale": for every booking, the total eligible commission and the milestone and date it becomes payable. Aaronz releases payment when the milestone is reached.
- **Booking email:**
  - Now says "Now you can get your commission instantly, through our partnership with Aaronz."
  - The small print says Imtiaz charges nothing; Aaronz pays on the chosen date and charges a small early-payout fee that falls the longer the broker waits. "Standard" keeps the usual schedule.

## Files changed

- `imtiaz.html`, `docs/STATUS.md`, this note

## Decisions

- None new beyond the user's copy choices above.

## Problems and fixes

- None.

## Verification

- `npm test`:
  - "Passed: twenty-six slide layouts ... mobile layout and controls."
  - "Passed: Imtiaz deck, eleven slide layouts, booking email button to the live payout page, and mobile reader layout."
- `git diff --check` clean. Slides 3 and 4 were inspected in screenshots.

## Unfinished

- The pilot, next-steps and FAQ slides still mention a "payment direction". The user hasn't decided whether to align them with slide 4.
- The FAQ still says "no loan, guarantee or recourse to Imtiaz". The user hasn't been asked whether to keep it after removing the balance-sheet row.
- Earlier items remain; see STATUS.

## Next step

Verify this push on GitHub Pages, then ask about the remaining "payment direction" and FAQ wording.
