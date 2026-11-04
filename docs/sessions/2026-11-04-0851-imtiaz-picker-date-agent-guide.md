# Imtiaz picker date and agent guide

- Timestamp: 2026-11-04 08:51 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 35857de
- Ending commit: the commit that adds this note (message "Move Imtiaz picker date forward and add agent guide")

## What was done

- **Picker date:** the illustrative DLD registration moved from Tue 3 Nov 2026 (now past) to Tue 24 Nov 2026. Options now read Wed 9 Dec, Thu 24 Dec and Fri 8 Jan 2027. The test and `imtiaz.pdf` were updated.
- **Agent guide:** added `AGENTS.md`, which the session routine expects but which never existed in git, and `CLAUDE.md`, which only imports it.
- **Status fixes:** the Imtiaz deck font now reads Inter rather than Manrope. "Monday" is replaced with "date to be confirmed", because Monday 2 Nov has passed and the meeting date is unknown.

Files changed: `imtiaz.html`, `imtiaz.pdf`, `assets/imtiaz-select.js`, `tests/imtiaz.cjs`, `AGENTS.md`, `CLAUDE.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Decisions

See `docs/DECISIONS.md`: a fixed date rather than a live one.

## Problems

None new.

## Verification

- `npm test` passed both decks.
- The select slide was inspected in a screenshot.
- `npm run export:imtiaz` wrote 8 pages.

## Unfinished

- The user has not confirmed the meeting date or whether the meeting has already happened.
- `docs/PROJECT.md` does not exist, although the wrap-up routine refers to it. `AGENTS.md`, `README.md` and `docs/STATUS.md` cover that ground for now.

## Next step

Confirm the meeting date, then rehearse in speaker view (press S).
