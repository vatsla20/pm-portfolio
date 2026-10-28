# Stakeholder Simulation — Smart Nudge, Four Ways

**The skill:** the same feature (Smart Nudge, from the PRD) reframed for four audiences. Same feature, nothing changed about *what it is* — only what's foregrounded. A good PM reframes one idea for four rooms without it becoming four different features.

---

## 1. Engineering

> Foregrounds: feasibility, constraints, decisions needed. (This is the lens most non-technical PMs fake — written here from a real dev's view.)

**What we're building:** a scheduled job that, after a quiet period, sends a tone-templated nudge on the creditor's behalf, with a deep link into a payment app pre-filled with the amount. Plus guardrails (frequency cap, mute, snooze).

**Shipped / in progress**
- Analytics instrumentation (#12) lands *first* — we have no settle-rate baseline and can't evaluate the feature without it. Blocking all other work.

**Decisions needed (with recommendation)**
- **Scheduler design:** per-balance cron vs. a daily batch sweep. *Recommend batch sweep* — settle-up isn't latency-sensitive, and a daily sweep is far cheaper than per-balance timers at 2M balances. `ponytail: batch sweep, move to per-balance scheduling only if quiet-periods need sub-day precision.`
- **Deep-link reliability (open PRD question):** UPI/Venmo deep links with pre-filled amount are inconsistent across regions and app versions. Recommend: ship the handoff where links are reliable, fall back to copy-amount-to-clipboard elsewhere. Do **not** block launch on universal coverage (#16 handles that in Next).
- **Tone presets:** static templated copy, not generative. Three string templates, per-contact selection stored on the balance relationship. No model in the P0 path — cheaper, testable, no abuse surface.

**Constraints / risks**
- Idempotency on the nudge job is non-negotiable: a retry must never double-send. The frequency cap (#4) is the correctness guarantee, not just a UX nicety.
- Consent/mute state must be checked at send time, not enqueue time, or a just-muted contact still gets pinged.

**Blockers:** need the baseline-metrics query defined with Data before instrumentation is meaningful.

---

## 2. Design

> Foregrounds: user flow, UX tradeoffs, the emotional job.

**The real job:** make the sender feel the ask is *costless* and make the receiver feel *prompted, not dunned.* The whole feature lives or dies on tone, not mechanics.

**Key flows**
1. *Creditor setup:* pick a tone (Gentle / Neutral / Firm) per person or a default. Must be glanceable — this is a 3-second decision, not a settings deep-dive.
2. *Receiver nudge:* a message that reads human, not robotic, with a single obvious "Pay now" action and a quiet "I'll pay by…" escape hatch.
3. *Mute:* reachable in one tap from any balance — the safety valve for sensitive relationships.

**Tradeoffs to resolve**
- **Tone copy is the design deliverable, not decoration.** Gentle vs. Firm has to be *felt* in one read. If users can't tell the presets apart, the differentiator is gone and mute-rate spikes.
- Default tone: Gentle. Erring toward too-soft protects the relationship (the thing users said they'd rather keep than the money).
- Avoid dark patterns — no guilt-tripping copy. The nudge-to-mute metric is our guardrail against designing something that technically works but feels gross.

**Open:** prototype test needed — does an auto-sent nudge actually feel less awkward to receivers, or just relocate the awkwardness? (Carried from discovery.)

---

## 3. Marketing

> Foregrounds: positioning, the external story, no internal jargon.

**The one-liner:** *"Get paid back. Without making it weird."*

**Why it lands:** everyone has floated a friend ₹500 and quietly written it off rather than send the awkward text. We're naming a feeling no competitor talks about.

**Positioning:** we own the empty space in the category — every other app either reminds bluntly or not at all. We're the first that reminds *tactfully*, on your behalf.

**Story beats**
- The villain isn't your friend — it's the awkward text you never send.
- Splitwise already remembers who owes you. Now it does the uncomfortable part for you — gently.
- Choose your tone. The app speaks in your voice, not a robot's.

**Launch framing:** benefit-led ("close out your group trip without chasing anyone"), not feature-led ("automated reminder scheduling"). Lead with the relief, not the mechanism.

**Watch-out:** don't over-promise money movement in v1 — the pay step is a handoff, not our rail. Market the *nudge*, not a wallet.

---

## 4. Executive

> Foregrounds: cost, metrics, ROI, the strategic bet. Under 200 words.

**Status: Green (proposed)**

**TL;DR:** We're fixing the neglected half of our core loop — getting users *paid back* — and claiming a position no competitor owns: the tactful reminder.

**Why it matters strategically:**
- Our product optimized tracking and ignored collection, the actually-painful part (validated in discovery).
- The real threat is a payment app bolting "split + remind" onto their wallet. They own repayment; adding memory is easy for them. This feature is how we hold the ground before they take it.

**The bet:** differentiate on *tone* (cheap, unclaimed), achieve parity everywhere else, and pull repayment in-app to deny the payment apps their opening.

**Cost:** ~21 person-weeks to a measured v1 (one squad, roughly one quarter).

**Success (evaluated at 1 quarter):** +15pp balances settled in 14 days; >25% nudge-to-pay; nudge-to-mute <10% (our "is it annoying" tripwire).

**Decision needed:** approve the squad allocation for Q[X]. Separately — the paywall-softening question is a related but distinct business call I've kept *off* this roadmap; flag if you want it bundled.

**Risk (Owned):** payment-app competitive move — mitigated by shipping the in-app pay handoff in the Next phase.
