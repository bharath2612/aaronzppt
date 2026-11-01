# Imtiaz deck: follow-up email and payout picker

- Timestamp: 2026-11-01 09:56 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 4eacd67
- Ending commit: the commit that adds this note (message "Add follow-up email and payout picker to Imtiaz deck")

## Goal

- Move the email to slide 3 and make it a separate follow-up after the booking confirmation, branded Imtiaz × Aaronz and framed around punctuality, not fees.
- Shrink the CTA to "Get commission now".
- Put a payout-choice interaction on the next slide, "How brokerages would select".
- Then the proposal and "what changes" follow.

## What was done

- **Slide order:** home, process, how-it-works (email), select (new), proposal, cfo, money, source-advantage, pilot, future, market, next-steps, faq. That's 13 slides; the nav is reordered to match.
- **Email:**
  - header: lockup (Imtiaz × Aaronz & Co), subject "Choose when you get paid · Unit 1204";
  - a "Booking confirmed" pill, then the congratulations and the choose-when line;
  - a smaller black "Get commission now" button (`href="#/select"`);
  - signed "Thanks for the collaboration, Imtiaz × Aaronz";
  - the facts panel adds "Paid by: Aaronz, on your date".
- **Payout picker:** new `assets/imtiaz-select.js` and `.sel` styles.
  - Options: date (same day / 15 / 30 / usual date) and amount (100% / 50%).
  - A green summary shows the amount, the exact date, "Exactly on that day. Guaranteed.", a small fee line and a Confirm step.
  - Mouse clicks blur the button so the arrow keys keep moving the deck.
- **Cover lede:** "Each brokerage chooses when to be paid, and is paid exactly on that day."
- **Tests:** `tests/imtiaz.cjs` checks:
  - the new order and '13 / 13';
  - the CTA text and href, and that clicking it reaches `#/select`;
  - the picker amounts (98,500; 49,625 then 50,000 on Fri 18 Dec 2026; 100,000);
  - the Confirm step.

  The README is updated.

## Files changed

`imtiaz.html`, `assets/imtiaz.css`, `assets/imtiaz-select.js` (new), `tests/imtiaz.cjs`, `README.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Decisions

See `docs/DECISIONS.md`, 2026-11-01. The external today-ai demo link is replaced by the in-deck picker. "50 days" in the request was read as 15 days; this needs confirming.

## Verification

- `npm test` passed both decks: "Imtiaz deck, thirteen slide layouts, email call to action and payout selection, and mobile reader layout."
- The email, picker, cover and proposal slides were inspected in screenshots.

## Unfinished

- Confirm the picker options ("50 days") and that the usual date is 45 days after DLD.
- The finance slides still state fees plainly (proposal brokerage card, money slide). Decide whether to soften them further.
- The FAQ "no recourse" line; logo resolution; nav wordmark.

## Next step

Click through the deck before Monday.
