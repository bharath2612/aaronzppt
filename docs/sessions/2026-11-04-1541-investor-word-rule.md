# Investor deck: word rule

- Timestamp: 2026-11-04 15:41 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 8d14fa0
- Ending commit: the commit that adds this note (message "Remove banned word from investor deck")

## What was done

The user banned "automatically" from the pitch. It was replaced in the product lede, two card titles and the speaker notes, with "on its own" and "by AI". The test now fails if the word returns, and `AGENTS.md` records the rule.

Files changed: `investor/index.html`, `tests/investor.cjs`, `AGENTS.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

None new.

## Verification

`npm test` passed all three decks. The product slide was inspected in a desktop screenshot.

## Next step

The user chooses a replacement wording if they prefer another, then supplies our margin.
