# Investor founder notes made local only

- Timestamp: 2026-11-04 13:31 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 391490b
- Ending commit: the commit that adds this note (message "Stop publishing investor founder notes")

## Goal

The notes were publicly reachable. The user chose to keep them local only.

## What was done

Removed `investor/notes.md` from git tracking and added it to `.gitignore`. The file stays on disk.

Files changed: `.gitignore`, `investor/notes.md` (removed from git), `AGENTS.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note.

## Decisions

See `docs/DECISIONS.md`.

## Problems

The copy in commit 391490b stays in the public git history. See `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. See the live check reported to the user.

## Next step

The user decides whether to rewrite git history, and confirms what the lending point means for the deck.
