# Imtiaz deck: Aaronz handles all commission payments

- Timestamp: 2026-10-31 15:27 +04
- Tool / model: Claude Code, Claude Opus 5.5 (`claude-opus-5-5`)
- Branch: main
- Starting commit: f6b35b4 (the previous commit is live on Pages; build verified as "built", with the new headline on the public page)
- Ending commit: the commit that adds this note (message "Reframe Imtiaz deck: Aaronz pays all broker commissions")

## Goal

Change the proposal so Aaronz handles all of Imtiaz's broker commission payments. Each brokerage only chooses when to be paid: the usual date at zero fee, or early for a fee.

## What was done

Copy changes in `imtiaz.html`; layout unchanged:

- **Meta description and cover lede:** say that Aaronz handles every broker commission payment.
- **Proposal:**
  - brokerage card: "Paid on time for free, or early for a fee", with the bar labelled "Usual date … Guaranteed";
  - Imtiaz card: "One payee for every commission, no cost", ledger row "Commission paid to: Aaronz".
- **Email:** "Your commission is paid through our partnership with Aaronz. Now you can get it instantly, or on the usual date at no cost." The small print no longer mentions "Standard".
- **CFO table:** payment terms and cost rows reworded. Team effort is now "One payee instead of many".
- **Money slide:** headline "The broker chooses when…". Fee chip and source say "usual date (45 days)".
- **Pilot:** set-up is "commission-payment agreement". Safeguards are reworded.
- **Future and market:** wording adjusted.
- **Next steps:** decision 03 is "Appoint Aaronz as commission payer".
- **FAQ:** "What if Aaronz stops operating?" reworded.

## Files changed

`imtiaz.html`, `docs/STATUS.md`, `docs/DECISIONS.md`, this note.

## Verification

- `npm test` passed both decks (eleven Imtiaz slide layouts; no overflow).
- Every changed slide was inspected in contact-sheet screenshots.

## Unfinished

- Confirm that the usual date is 45 days after DLD registration.
- Decide on the FAQ's "no loan, guarantee or recourse" line.
- Higher-resolution Aaronz & Co logo; nav wordmark; "Today" branding on the live demo.

## Next step

Click through the deck and the live demo before Monday.
