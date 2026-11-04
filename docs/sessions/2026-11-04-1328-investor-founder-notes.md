# Investor deck: founder notes file

- Timestamp: 2026-11-04 13:28 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 3cab961
- Ending commit: the commit that adds this note (message "Add founder notes for investor deck")

## Goal

Keep everything the user says about the investor deck in one file, so the company vision isn't lost.

## What was done

Added `investor/notes.md` with the user's direction so far, the dropped ideas and the open questions. `AGENTS.md` now says to read and update it. No slide changed.

Files changed: `investor/notes.md`, `AGENTS.md`, `docs/STATUS.md`, this note.

## Decisions and problems

The notes file is publicly reachable if GitHub Pages serves it, like the rest of the repo. Flagged to the user.

## Verification

`npm test` passed all three decks. No slide changed, so no screenshot was needed.

## Next step

The user confirms what the lending and developer-choosing point means for the deck.
