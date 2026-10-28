# Product Roadmap — Splitwise Settle-Up Initiative

**Framework:** RICE (Reach × Impact × Confidence ÷ Effort) for scoring, then **judgment layered on top** to produce Now / Next / Later. The raw score ranks; it doesn't decide — strategic sequencing overrides where it should, and I say where and why.
**Date:** October 2026
**Inputs:** Discovery (Project 1), Competitive gap (Project 2), PRD scope (Project 3).

> **The skill here is the reasoning behind each number, not the arithmetic.** Reach = users affected per quarter. Impact = {3 massive, 2 high, 1 medium, 0.5 low, 0.25 minimal}. Confidence = {100% data-backed, 80% some evidence, 50% gut}. Effort = person-weeks. Assumed base of ~2M quarterly-active users with an open balance for Reach sizing.

---

## Backlog & RICE Scores

| # | Feature | Reach (users/qtr) | Impact | Conf | Effort (pw) | **RICE** | Source |
|---|---|--:|--:|--:|--:|--:|---|
| 1 | Automated nudge trigger (P0 core) | 800,000 | 3 | 80% | 8 | **240,000** | P1 F1/F2 |
| 2 | Three tone presets | 800,000 | 2 | 80% | 5 | **256,000** | P1 F2 |
| 3 | One-tap pay handoff | 600,000 | 2 | 50% | 10 | **60,000** | P1 F3 |
| 4 | Frequency cap + mute (guardrail) | 800,000 | 2 | 100% | 3 | **533,333** | P3 P0 |
| 5 | "I'll pay by [date]" snooze | 500,000 | 1 | 80% | 3 | **133,333** | P1 F2 |
| 6 | Smart quiet-period suggestion | 400,000 | 1 | 50% | 4 | **50,000** | P3 P1 |
| 7 | Nudge-effectiveness readout | 300,000 | 0.5 | 80% | 2 | **60,000** | P3 P1 |
| 8 | Partial-payment handling | 250,000 | 1 | 80% | 4 | **50,000** | P3 P1 |
| 9 | AI custom-tone copy | 400,000 | 1 | 50% | 12 | **16,667** | P3 P2 |
| 10 | Micro-debt batching | 350,000 | 1 | 50% | 6 | **29,167** | P1 F5 |
| 11 | Nudge non-users via SMS/WhatsApp | 1,200,000 | 2 | 50% | 14 | **85,714** | P3 P2 |
| 12 | Settle-rate analytics dashboard (internal) | 50,000 | 3 | 100% | 3 | **50,000** | P3 open Q |
| 13 | Per-pair settle-speed history | 200,000 | 0.5 | 80% | 3 | **26,667** | P1 F4 |
| 14 | Group "treasurer handoff" (reassign who chases) | 150,000 | 2 | 50% | 7 | **21,429** | P1 F4 |
| 15 | Remove/soften existing paywalls on reminders | 1,500,000 | 1 | 80% | 2 | **600,000** | P2 §4 |
| 16 | Localized deep-link pay (region coverage) | 500,000 | 2 | 80% | 9 | **88,889** | P3 open Q |
| 17 | Debtor-side "nudge me" opt-in | 300,000 | 0.5 | 50% | 3 | **25,000** | P1 F3 |
| 18 | Tone A/B testing framework | 100,000 | 1 | 80% | 5 | **16,000** | P3 metrics |

*Worked example (row 1):* (800,000 × 3 × 0.80) ÷ 8 = 1,920,000 ÷ 8 = **240,000**.
*Worked example (row 4):* (800,000 × 2 × 1.00) ÷ 3 = 1,600,000 ÷ 3 = **533,333** — cheap, certain, universal → tops the raw ranking.

### Raw ranking (RICE descending)
15 (600k) · 4 (533k) · 2 (256k) · 1 (240k) · 5 (133k) · 16 (89k) · 11 (86k) · 3 (60k) · 7 (60k) · 12/6/8 (50k) · 10 (29k) · 13 (27k) · 17 (25k) · 14 (21k) · 9 (17k) · 18 (16k)

---

## Now / Next / Later — RICE ranked, then judgment applied

Raw RICE is the starting point. Here's where I **override it on purpose:**

### NOW (committed — this is the shippable v1 loop)
- **#4 Frequency cap + mute** (533k) — highest-defensible, and a *dependency*: without the anti-nagging guardrail we recreate the problem. Must precede #1.
- **#1 Automated nudge trigger** (240k) — the core. Nothing works without it.
- **#2 Tone presets** (256k) — the actual differentiator (Competitive §2). The nudge existing isn't enough; tone is *why* it's less awkward.
- **#5 Snooze** (133k) — small, and closes the loop that otherwise re-nags.
- **#12 Settle-rate analytics** (50k) — *ranked mid-pack, pulled into Now anyway.* **Judgment override:** PRD open question flags we have no baseline. Without instrumentation we can't prove any of this worked. Low RICE, non-negotiable sequencing. Ship first, quietly.

> **Deliberately NOT in Now despite high RICE: #15 (paywall softening, 600k — the top raw score).** It's a monetization/business call, not part of the settle-up loop, and bundling a revenue-sensitive change into a feature launch muddies the read on both. Routed to a separate business decision, not this roadmap's Now. *This is the override that matters most — the highest number is not the first thing we build.*

### NEXT (1–3 months, scoped not started)
- **#3 One-tap pay handoff** (60k) — *RICE is mid, strategic value is top.* **Judgment override up:** this is the move against the Competitive §5 threat (a payment app eating us). Low confidence (50%) drags the score; the strategic bet justifies the slot. Needs #16 to be robust.
- **#16 Localized deep-link pay** (89k) — hard dependency for #3 to work outside one region.
- **#7 Effectiveness readout** (60k) — cheap retention hook for the creditor cohort once the loop is live.
- **#8 Partial payments** (50k) — real-world completeness.

### LATER (directional — revisit as evidence arrives)
- **#6 Smart quiet-period** (50k), **#11 non-user nudges** (86k — big reach, big effort, big unknowns), **#14 treasurer handoff** (21k), **#13 per-pair history** (27k).
- **#10 Micro-debt batching** (29k) — **explicitly gated on validating Finding 5** (low-confidence discovery insight). Do not build until data confirms the problem.
- **#9 AI custom-tone** (17k) & **#18 A/B framework** (16k) — lowest RICE, genuinely P2.
- **#17 debtor-side opt-in** (25k).

---

## Dependencies & Risks
- **#4 → #1**: guardrail must ship before/with the trigger. Highest-risk sequencing error if reversed.
- **#16 → #3**: pay handoff is only as good as deep-link coverage.
- **#12 before everything measurable**: no baseline = no proof.
- **Capacity note:** Now block ≈ 21 person-weeks. If the team can't absorb that, **#5 snooze is the cut** (smallest loss to the core proof), not the guardrail.

## Changes vs. a naive RICE-only roadmap
Three overrides, each justified: pulled **#12** up (measurement is a precondition), pushed **#15** out (business decision, not this loop), and pulled **#3** up (strategic defense vs. the payment-app threat). RICE ranked the backlog; judgment sequenced it.
