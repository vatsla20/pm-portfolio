# PRD

**Product:** Splitwise

**Author:** Vatsla

**Date:** October 2026 

 **Version:** 1.0

**Status:** Draft for review

**Grounding:** Discovery study (Project 1, Findings 1 & 2) + competitive gap analysis 

---

## Problem Statement

Splitwise users track balances well but routinely fail to *collect* them. The blocker isn't memory — it's the social cost of asking: people will absorb a ₹300–₹500 debt rather than send a reminder that feels like nagging (Discovery Finding 1). Existing reminders are generic and read as passive-aggressive by both sides, so users disable or ignore them (Finding 2). Every uncollected balance is a leak in the core loop and a quiet erosion of the friendships the product sits inside. No competitor addresses tone (Competitive §2).

## Goals

Outcomes, not outputs:

1. **Increase the share of balances that get settled** — more debts closed, fewer written off to avoid awkwardness.
2. **Reduce time-to-settle** for balances older than 7 days.
3. **Make reminding feel costless to the sender** — the creditor never has to personally "be the one who asks."
4. **Make receiving a nudge feel like a prompt, not a dunning** — measured by nudge-to-dismiss vs. nudge-to-pay ratio.
5. **Deny the track→pay gap** — a meaningful share of nudges lead to payment in the same session (attacks Competitive §5 threat).

## Non-Goals

| Out of scope for v1 | Why |
|---|---|
| Building our own payment rail | Massive, regulated, separate initiative. v1 hands off to existing UPI/Venmo. |
| Debt collection for non-users | Network/legal complexity; core loop is user-to-user first. |
| AI that drafts fully custom free-text messages | Tone *calibration* (3 presets) delivers 90% of value without the hallucination/abuse risk. P2. |
| Rescuing micro-debts via batching (Finding 5) | Lowest-confidence finding; validate before building. Parked for roadmap "Later." |
| Changing the splitting/calculation engine | It works and is trusted (Finding 6). Don't touch the license-to-operate. |

## User Stories

Ordered by priority, grounded in the personas from Project 1.

1. As a **Reluctant Creditor**, I want the app to send a tactful reminder on my behalf, so I can get paid back without personally being the bad guy.
2. As a **Reluctant Creditor**, I want to choose how gentle or firm the tone is, so the nudge matches my relationship with that person.
3. As a **debtor receiving a nudge**, I want to pay in one tap from the reminder, so I settle before I get distracted (the track→pay gap).
4. As an **Involuntary Treasurer**, I want nudges to go out automatically to everyone who owes me after a trip, so I'm not individually chasing five people.
5. As any user, I want to *mute* nudges for a specific person, so a sensitive relationship never gets auto-messaged. *(Edge case — consent/safety.)*
6. As a debtor, I want to say "I'll pay by Friday," so the nudge pauses instead of repeating. *(Edge case — avoids the nagging loop we're trying to kill.)*

## Requirements

### Must-Have (P0) — the feature doesn't solve the problem without these
- **Automated nudge trigger**: system sends a settle-up reminder on the creditor's behalf after a configurable quiet period (default 7 days).
  - *Acceptance:* Given a balance >7 days old and nudges enabled, when the quiet period lapses, then the debtor receives one nudge and the creditor is notified it was sent.
- **Three tone presets**: Gentle / Neutral / Firm. Creditor picks per-person or sets a default.
  - *Acceptance:* Each preset produces visibly different copy; selection persists per contact.
- **One-tap pay handoff**: nudge contains a deep link to the debtor's preferred payment app pre-filled with amount.
  - *Acceptance:* Tapping opens UPI/Venmo with amount populated; on return, app prompts "mark as settled?"
- **Frequency cap + mute**: max one nudge per balance per quiet period; creditor can mute any contact.
  - *Acceptance:* No contact receives >1 nudge/period; muted contacts receive zero. *(This is the anti-nagging guardrail — without it we rebuild the problem we're solving.)*
- **"I'll pay by [date]" snooze**: debtor can defer; nudge pauses until then.

### Nice-to-Have (P1) — fast follows
- Smart quiet-period suggestion based on that pair's historical settle speed.
- Nudge-effectiveness readout to the creditor ("3 of 4 nudges settled").
- Partial-payment handling in the nudge flow.

### Future Considerations (P2) — design so we don't block these
- AI-drafted custom-tone copy (design the tone system as pluggable).
- Micro-debt batching (pending Finding 5 validation).
- Nudges to non-users via SMS/WhatsApp.

## Success Metrics

**Leading (days–weeks):**
- Nudge opt-in rate among users with open balances — target **>40%** in 30 days.
- Nudge-to-pay rate (nudge → payment in same session) — target **>25%**.
- Nudge-to-mute rate (proxy for "feels like nagging") — keep **<10%**. *If mute spikes, the tone system failed.*

**Lagging (weeks–months):**
- % of balances settled within 14 days — target **+15pp** vs. baseline.
- Median time-to-settle for 7-day-old balances — target **−30%**.
- Retention of Reluctant Creditor cohort — directional lift.

*Measurement:* event instrumentation on nudge sent/opened/paid/muted/snoozed; cohort comparison vs. a holdout that keeps old reminders.

## Open Questions

- **[Data — blocking]** What's today's baseline settle-rate and time-to-settle? Targets above are hypotheses until we have it.
- **[Design]** Does an auto-sent nudge genuinely feel less awkward to the *receiver*, or does it just relocate the awkwardness? → prototype test, not more interviews (carried from Project 1 open questions).
- **[Legal]** Consent model for auto-messaging on someone's behalf — opt-in default, or explicit per-contact?
- **[Eng]** Deep-link reliability into UPI/Venmo with pre-filled amount across regions — how robust is it? (See Project 5 engineering lens.)

## Phasing

- **Phase 1:** P0 nudge loop with tone presets + mute/snooze guardrails. Ship to a holdout-controlled cohort.
- **Phase 2:** P1 one-tap pay refinement + effectiveness readout, after Phase 1 confirms tone doesn't trigger mute spikes.
