# Investor deck: agents card and matching solution cards

- Timestamp: 2026-11-04 13:45 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: e22f7be
- Ending commit: the commit that adds this note (message "Match investor solution cards to each problem and add agents")

## Goal

Add agents stuck with pending commission to the problem, and answer every problem in its own card on the solution slide.

## What was done

- Both slides now have four cards in the same order: Brokerages, Agents, Developers (accent), The risk.
- The solution slide's orange callout was replaced by the cards, and its timeline is compact, like the problem slide.
- The test asserts both slides show the same four cards in the same order.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/PROBLEMS.md`, this note. The local `investor/notes.md` was updated too.

## Problems

- A push of the previous commit failed with a GitHub "Internal Server Error". It was retried with this one.
- The agent and risk answers depend on open points; see `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. Both slides were inspected in desktop screenshots.

## Next step

The user confirms the agent and risk wording, then supplies where AI does the work.
