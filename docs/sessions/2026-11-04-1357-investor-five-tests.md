# Investor deck: five developer tests, new label, team name fix

- Timestamp: 2026-11-04 13:57 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 767ba70
- Ending commit: the commit that adds this note (message "Add five developer tests and new label to investor deck")

## Goal

Replace the "handpicked" label, which the user found lazy, say both "reputed with large market share" and "internally tested", add market share and unsold inventory, and correct one team name.

## What was done

- **Label:** "Every developer tested before we sign".
- **Lede:** reputed developers with a large share of the market, then tested by internal tools on five things.
- **Tests:** "Will we get paid?" (reputation, cash flow, payment record) and "Is the volume there?" (market share, unsold inventory).
- **Ending:** "If they don't pass all five, we don't sign."
- **"Handpicked" removed:** also from the solution risk card and the problem speaker note.
- **Team:** one name corrected as the user spelled it.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Verification

`npm test` passed all three decks. The developer slide was inspected in a desktop screenshot; the team name is asserted by the test.

## Next step

The user confirms the label, then supplies where AI does the work.
