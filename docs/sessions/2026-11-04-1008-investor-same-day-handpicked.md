# Investor deck: same-day wording, commission milestone, handpicked developers

- Timestamp: 2026-11-04 10:08 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: a3ba36e
- Ending commit: the commit that adds this note (message "Use same-day wording, commission milestone and handpicked developers in investor deck")

## Goal

Choose between "same day" and "within 24 hours", count from the commission milestone instead of DLD registration, simplify the two timelines, and replace "top-tier" on the developer slide.

## What was done

- **Problem ("Roughly 2 months to get paid"):** commission milestone achieved; 4 to 5 days until "Now you can raise an invoice"; 30 to 45 days to money in the bank.
- **Solution ("Paid the same day"):** commission milestone achieved; immediately "Now you can withdraw"; money withdrawn the same day. A footnote covers invoices raised after the daily cut-off.
- **Fee table:** days now count from the commission milestone.
- **Developer slide:** retitled "Handpicked developers only", with a clean financial track record in the lede.
- **Placeholder style:** fixed cramped letter spacing in the large "To be added" boxes.

Files changed: `investor/index.html`, `investor/investor.css`, `tests/investor.cjs`, `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note.

## Decisions

See `docs/DECISIONS.md`.

## Problems

The script's CSS assertion failed on a stale pattern, leaving the HTML changed but not the CSS or test. Caught by the failing test and the screenshot, then fixed. The new timeline adds up to 35 to 50 days against a "roughly 2 months" label; see `docs/PROBLEMS.md`.

## Verification

`npm test` passed all three decks. The problem, solution and fee slides were inspected in screenshots before the developer-slide text change; the developer slide is covered by the test and overflow check.

## Unfinished

The daily cut-off time. Where AI does the work, our margin, the raise amount and the use-of-funds split. The Imtiaz deck still counts from DLD registration.

## Next step

The user sets the daily cut-off and decides whether the Imtiaz deck should change too.
