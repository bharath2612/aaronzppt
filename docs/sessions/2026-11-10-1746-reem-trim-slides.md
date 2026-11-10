# 2026-11-10 17:46 +04: Reem deck trimmed to six slides

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `214659b`. **End commit:** the commit that adds this note (see `git log`).

## What changed

- **Commission slide removed:** the user asked to dig into how the commission figure was worked out. Only 2025 (AED 13.59B, DLD release) and 2024 (worked back from DLD's +31%) are backed by DLD. A search found no published figure for 2022, 2023 or earlier. The DLD reports never mention brokers. DLD's own half-year and full-year commission figures imply very different per-deal amounts. The user then removed the slide ("Both are bullshit").
- **Allocation slide removed:** the "where we are" slide (routing rules and grades) is gone at the same request.
- **Deck now:** cover, market, the three problem slides, solution. The cover lede now ends "and how we solve it", and the nav lost "Where we are".
- **Market headline:** "Dubai property sales grew close to 10× in five years" (was 9.5×), at the user's request.
- **Clean-up:** removed the now-unused grade and step CSS. `tests/reem.cjs` checks six slides, that the removed slides stay out, and the new headline.

## Verification

- `npm test` passed all four suites ("Reem deck, six slide layouts, ...").
- `npm run export:reem` wrote a 6-page PDF.
- The cover and market slides were inspected in screenshots.

## Next

The user said they will say what to do next. The developer headline is still waiting on the user's pick.
