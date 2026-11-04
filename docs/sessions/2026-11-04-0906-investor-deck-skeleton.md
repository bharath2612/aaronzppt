# Investor deck skeleton

- Timestamp: 2026-11-04 09:06 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: a910302
- Ending commit: the commit that adds this note (message "Add investor deck skeleton in Aaronz orange")

## Goal

Create a separate investor deck in the same design language, with brand orange. Titles first, content to be filled in progressively.

## What was done

- **Folder:** `investor/index.html` and `investor/investor.css`. The deck loads the shared Reveal files, `assets/presentation.js`, `assets/imtiaz.css` and `assets/imtiaz-present.js`, and overrides the palette.
- **Slides (9):** cover, the team, the problem, the solution, the market, the AI-native product, how we make money, top-tier developers only, the raise.
- **Developer slide:** the track record of paying dues on time, internal tools that test it, and the five factors the user listed (reputation, social reputation, banking history, balance sheets, leverage), then "we make a call".
- **Placeholders:** team, where AI does the work, our margin, the raise amount and the use of funds show a dashed "To be added".
- **Test:** `tests/investor.cjs`, added to `npm test`.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `package.json`, `README.md`, `AGENTS.md`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note.

## Decisions

See `docs/DECISIONS.md`.

## Problems

`docs/PROBLEMS.md`: AED 293B at about 5% exceeds the AED 13.59B commission total, so the investor market slide leaves out the 5%. The Imtiaz market slide still shows both figures and was not changed.

## Verification

See the Verification section of `docs/STATUS.md`.

## Unfinished

Team details, where AI does the work, our margin, the raise amount and use-of-funds split. No PDF yet. The use-of-funds categories (licence, funding capital, product, team) are suggestions awaiting confirmation.

## Next step

Fill in the team slide with names, roles and backgrounds from the user.
