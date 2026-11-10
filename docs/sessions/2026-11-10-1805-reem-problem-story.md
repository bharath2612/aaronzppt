# 2026-11-10 17:54 +04: Reem problem slides retold as one chain

- **Tool:** Claude Code. **Model:** Claude Opus 5.5 (`claude-opus-5-5`). **Branch:** `main`.
- **Start commit:** `332ca3a`. **End commit:** the commit that adds this note (see `git log`).

## Goal

The user said the three problem slides had poor layout and messaging, and asked for a better way to tell the story.

## What changed (Reem deck only)

The problem now follows one commission down the chain: developer, then brokerage, then broker, then the gap. Each slide carries a small chain strip (Developer → Brokerage → Broker) with its own party in orange.

1. `#problem`: "Every sale leaves developers a commission bill to pay". One large orange card says what developers want ("A partner who pays brokers now, while the developer pays later"). One grey card covers the hardest hit, smaller developers.
2. `#problem-brokerages`: "Brokerages can't plan around money with no date". A large versus small brokerage comparison (knows when the money lands; can push the developer; what happens: "Many don't survive"), plus a line on campaigns.
3. `#problem-brokers`: "A broker works five months for one paycheck". A five-month bar: about 2 months working the deal, then 2 to 3 months waiting, ending at "Paid". Below it: bills, and being stuck at the agency.
4. `#problem-gap` (new): "Commission is earned at the sale, and paid months later". Developer wants to pay later, brokerage and broker need to be paid now, and a bar runs Sale → the gap → Developer pays. Callout: "Someone has to fund that gap, against the developer's promise to pay."

The deck is now 7 slides. Because the Reem problem slides no longer copy the investor deck, the test that kept their headlines in step was replaced with checks on the new structure.

## Verification

- `npm test`: all four suites passed.
- `npm run export:reem` wrote a 7-page PDF.
- All four problem slides were inspected at desktop size, and the broker and gap slides on a 390px phone after a scroll.
- The full-page mobile screenshot shows blank space after the second slide in both the Reem and investor decks. Scrolling shows every slide renders, so this is a screenshot artifact, not a page fault.
- Fixed while checking: the "Paid" tag overlapped the chain on mobile.

## Next

The user decides whether the investor deck should get the same problem story. The developer headline question is superseded for the Reem deck.
