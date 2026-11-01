# Imtiaz deck: end on market size

- Timestamp: 2026-11-01 10:40 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 99ef75f
- Ending commit: the commit that adds this note (message "End Imtiaz deck on market size slide")

## Goal and what was done

The user asked for market size to be the last slide, with every slide after it removed.

- **Removed:** `#pilot`, `#future`, `#next-steps` and `#faq` from `imtiaz.html`.
  - The nav "Pilot" link is removed.
  - The footer count is now 08.
- **Styles:** deleted the unused rules in `assets/imtiaz.css` (weeks, kpis, c-pilot-low, c-panel, horizons, decisions, delivers, faq, statement, big-stats, sizing). Their selectors were also removed from the mobile media query, along with a stale "Money" comment.
- **Tests and README:** `tests/imtiaz.cjs` uses the eight ids and '08 / 08'; the README says 8 slides.

## Verification

- `npm test` passed both decks ("Imtiaz deck, eight slide layouts, email call to action and payout selection, and mobile reader layout").
- All eight slides were inspected in a contact sheet after the CSS clean-up.

## Unfinished / next step

- Confirm that the usual date is 45 days after DLD registration.
- Logo resolution; nav wordmark.
- Click through the deck before Monday.
