# Competitive Brief — Expense Splitting & Settle-Up

**Focus:** How competitors handle shared-expense tracking and the *settle-up / get-paid-back* loop specifically — the opportunity surfaced in the discovery study (Project 1).
**Decision this informs:** Where to differentiate vs. achieve parity for the Smart Nudge feature (Project 3).
**Date:** October 2026 — *competitive data has a shelf life; flagged areas change fast.*

> **Method.** Ratings are based on signing up and walking the first-run experience of each product, public pricing pages, and App Store / Play Store / G2 review patterns — not marketing claims. Where I'm inferring rather than confirming, I say so.

---

## 1. The Competitive Set

Defined at multiple levels (not just direct rivals — the real competitor is often *doing nothing*):

| Level | Products | Why they're in the set |
|---|---|---|
| **Direct** | Splitwise, Settle Up, Tricount | Solve the same problem the same way: track and split shared costs. |
| **Indirect** | Google Pay / Venmo / UPI apps | Solve *repayment* but not tracking — they own the moment our users leak into. |
| **Substitute** | A shared spreadsheet; WhatsApp + mental math | What most people actually fall back to. **The #1 real competitor.** |
| **Adjacent** | Revolut / bank-app "split bill" features | Could bundle splitting into the payment app and eat the category. |

The strategic read: the dangerous competitor isn't Settle Up. It's a bank/payment app adding "split this" as a feature, because they already own the repayment step our users leak into (Finding 3).

---

## 2. Feature Comparison Matrix

Rating scale: **Strong** (market-leading) · **Adequate** (works, not differentiated) · **Weak** (exists, gaps) · **Absent**.
Rated on what matters to the *Reluctant Creditor* persona, not total feature count.

| Capability | Splitwise | Settle Up | Tricount | Payment apps (GPay/Venmo) | Spreadsheet |
|---|---|---|---|---|---|
| **Expense tracking** | | | | | |
| &nbsp;&nbsp;Multi-person splits | Strong | Strong | Strong | Weak | Adequate |
| &nbsp;&nbsp;Unequal / itemized splits | Strong | Adequate | Adequate | Absent | Weak |
| &nbsp;&nbsp;Group / trip support | Strong | Adequate | Strong | Absent | Adequate |
| **Settle-up loop** | | | | | |
| &nbsp;&nbsp;Balance clarity | Strong | Strong | Adequate | Weak | Weak |
| &nbsp;&nbsp;Repayment reminders | **Weak** | **Weak** | Absent | Absent | Absent |
| &nbsp;&nbsp;Tactful / tone-aware nudging | **Absent** | **Absent** | **Absent** | **Absent** | **Absent** |
| &nbsp;&nbsp;In-app / one-tap payment | Adequate* | Absent | Absent | **Strong** | Absent |
| **Trust** | | | | | |
| &nbsp;&nbsp;Calculation correctness | Strong | Strong | Strong | N/A | Weak (human error) |
| **Monetization friction** | Paywalls core-ish flows | Mostly free | Free + ads | Free | Free |

\* Splitwise's pay integration is region-dependent and often a handoff, not a true in-app pay.

**The whitespace is one row:** *tactful, tone-aware nudging.* **Nobody owns it.** Every competitor either reminds bluntly or not at all. This is the exact gap Project 1 Finding 2 predicted.

---

## 3. Positioning Analysis

Using the standard template — *For [customer] who [need], [product] is a [category] that [benefit]. Unlike [alt], it [differentiator].*

- **Splitwise:** For groups sharing costs who need to track balances, Splitwise is the default expense-splitter that remembers who owes whom. Differentiator: ubiquity + network effect. **Weakness: leans on being the incumbent; the settle-up loop is neglected.**
- **Settle Up:** For privacy-minded groups, a free, no-account-needed splitter. Differentiator: free + frictionless start. Weakness: thin on repayment.
- **Tricount:** For trip groups, a travel-first splitter. Differentiator: trip framing. Weakness: dormant outside trips.
- **Payment apps:** For anyone sending money, instant P2P transfer. Differentiator: they *are* the money movement. Weakness: no memory of *why* or *who still owes*.

**Unclaimed position:** "the app that gets you paid back without making it weird." No one is making this claim. It's ours to take.

---

## 4. Strengths & Weaknesses (honest — a brief that always shows us winning isn't credible)

**Splitwise strengths:** category-defining brand, network effects (your friends already have it), genuinely strong splitting engine, trusted math.
**Splitwise weaknesses:** the *entire settle-up loop is an afterthought* — reminders are blunt, payment is a handoff, and aggressive paywalling of once-free features is the #1 complaint in recent reviews. The product optimized tracking and forgot the painful half (getting paid).

Where competitors are genuinely ahead: payment apps win decisively on *actual money movement* (parity there is table stakes, not a differentiator we can win on).

---

## 5. Opportunities & Threats

**Opportunities**
- **Own the tactful-nudge position** — the one empty row in the matrix, validated by Finding 2. Differentiate here; achieve mere parity everywhere else.
- **Close the track→pay gap** (Finding 3) by pulling repayment in-app, attacking the payment apps' only real advantage.

**Threats**
- A payment app (GPay/Venmo/Revolut) adds "split + remind." They already own repayment; adding memory is easier for them than adding payment is for us. **This is the nightmare scenario and the clock we're racing.**
- Continued paywall backlash eroding Splitwise's incumbent trust advantage.

---

## 6. Strategic Implications

1. **Differentiate on one thing: tactful, automated settle-up nudging.** It's the only unclaimed row in the matrix and the sharpest pain from discovery. → This is the PRD feature (Project 3).
2. **Achieve parity, not leadership, on splitting mechanics.** They're solved; out-featuring them is a money pit.
3. **Treat in-app payment as a strategic must** (not to beat payment apps at payments, but to deny them the gap they'd use to beat us). → Shapes roadmap sequencing (Project 4).
4. **Move before a payment app does.** The window is the threat above.

*Shelf-life flag: payment-app "split bill" features and Splitwise's paywalling are the fastest-moving items here — re-check in a quarter.*
