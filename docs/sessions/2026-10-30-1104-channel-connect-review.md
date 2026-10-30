# Channel Connect agreement review

- Timestamp: 2026-10-30 11:04 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: 0b6a007d5527d6a3a2571e099213c8a7cb434505
- Ending commit: the commit that adds this note (message "Record Channel Connect agreement review")

## Goal

Understand the scope of the Channel Connect agreement: what Channel Connect does, and how that relates to Imtiaz. Record the analysis in Notion.

## What was done

- Read the user's local "Signed Agency Agreement - Channel Connect.pdf" (12 pages). It is a scan with no text layer. Pages were rendered locally with macOS PDFKit (a temporary Swift script in the session scratchpad) and read as images. The file was not uploaded anywhere.
- Created a private Notion page, [Channel Connect agreement: scope and learnings](https://app.notion.com/p/4096ebf7407281f7b22bd5fe6a90bbf1). It covers the parties, Channel Connect's role as Imtiaz's exclusive sales manager, Channel Connect's actions by clause, the broker's obligations, the commission payment steps, termination, 8 learnings for the financing model, and open questions.
- Personal data in the agreement (passport, date of birth, bank account and IBAN) was deliberately left out of the Notion page and these docs.

## Files changed

- `docs/STATUS.md`, `docs/DECISIONS.md`, `docs/PROBLEMS.md`, this note. No application files changed.

## Key findings

- Channel Connect is Imtiaz's exclusive broker. It appoints brokerages such as Aaronz & Co on a non-exclusive basis and pays their commission (5% by default; it can change the rate at any time, 4.2).
- Commission is due once the SPA is signed and Imtiaz has confirmed the agreed funds plus 4% DLD in cleared funds. Channel Connect then pays within 30 days of the broker's tax invoice (4.1).
- Risks for financing:
  - the broker cannot assign or novate its rights (11.2);
  - immediate termination cancels all commission, even for sold units (7.2);
  - commission sharing needs consent (6.1.5);
  - Channel Connect pays to the account on file (4.6).
- Channel Connect's signature and stamp are blank on the signature page (p.12).

## Decisions

- See `docs/DECISIONS.md` 2026-10-30, "Agreement reviews in Notion".

## Problems and fixes

- The PDF has no text layer, and `pdftoppm` (poppler) isn't installed. Rendering the pages with PDFKit avoided installing anything.

## Verification

- Every page (1–12) was rendered and read. The Notion create call returned the page ID and URL.
- `npm test` passed: "Passed: twenty-six slide layouts and funding-card navigation; calculator modes, rounding, loss, validation and reset; fee scenarios; keyboard input; expanded controls; read mode; mobile layout and controls."
- `git diff --check` clean.

## Unfinished

- Confirm a countersigned copy of the agreement.
- Ask Channel Connect whether it would consent to assigning receivables or to a payment direction to Aaronz.
- Optionally move the Notion page under Pitch or the tracker.
- Earlier open items remain: the 90-day rate, the Unit economics and standalone calculator alignment, meeting-minutes transcription, and collection account vs arranging-only.

## Next step

Ask the user where the Notion page should live, and whether Learnings 3 and 4 should go to legal review.
