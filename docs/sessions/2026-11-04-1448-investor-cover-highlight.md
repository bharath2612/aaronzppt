# Investor deck: cover highlight

- Timestamp: 2026-11-04 14:48 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 88fbec3
- Ending commit: the commit that adds this note (message "Highlight only same-day phrase on investor cover")

## What was done

The orange highlight on the cover now covers only "paid the same day." The test asserts it.

Files changed: `investor/index.html`, `tests/investor.cjs`, `docs/STATUS.md`, this note. The local `investor/notes.md` was updated too.

## Problems

The GitHub Pages build for 88fbec3 stayed at "building" for over 10 minutes with no error reported. This commit was pushed to start a fresh build.

## Verification

`npm test` passed all three decks. The cover was inspected in a desktop screenshot.

## Next step

The user supplies our margin, then the raise amount and use of funds.
