# Investor deck: three developer tests

- Timestamp: 2026-11-04 13:37 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 87d6215
- Ending commit: the commit that adds this note (message "Show three developer tests on investor partner slide")

## Goal

Put the approved lines on the developer slide, with the firm ending.

## What was done

- **Lede:** "In our initial phase, we only partner with developers who pass three tests."
- **Cards:** reputation, cash flow and payment record, replacing the five factor cards. The factors are kept in the speaker notes under these tests.
- **Ending:** "Our internal tools test every developer. If they don't pass all three, we don't sign."
- The test asserts the three cards and the ending.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note. The local `investor/notes.md` was updated too.

## Decisions

See `docs/DECISIONS.md`.

## Problems

None new.

## Verification

`npm test` passed all three decks. The developer slide was inspected in a desktop screenshot.

## Next step

Get from the user where AI does the work, for the product slide.
