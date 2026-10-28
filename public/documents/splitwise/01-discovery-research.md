# Customer Discovery Study — Shared Expenses & Settling Up

**Product context:** Splitwise (expense-splitting app)
**Research question:** How do people actually manage shared money with friends, roommates, and partners — and where does the current experience break down?
**Method:** 6 semi-structured discovery interviews (2 conducted live, 4 reconstructed as evidence-based personas grounded in the live interviews and public review data — flagged explicitly below)
**Date:** October 2026
**Decision this informs:** What to prioritize on a shared-expenses roadmap, and whether "getting paid back" is a problem worth building for.

> **Honesty note on method.** Findings tagged **[Live]** come from two real interviews I ran. Findings tagged **[Reconstructed]** are drawn from personas I built from App Store / Play Store review patterns and triangulated against the live interviews. I mark confidence on every finding so the reader can weigh the evidence. A finding from 2 interviews is a hypothesis, not a conclusion.

---

## 1. Research Design

I framed every session around behavior, not solutions, opening with (deliberately *not* a solution pitch):

> "I want to understand how you handle money that's shared with other people — rent, trips, dinners, whatever. Not looking for feedback on any app. Just want to hear how it actually works for you."

The discovery script used eight open-ended questions — past-tense where possible (what people *did*, not what they'd *like*), none hinting at a desired answer:

1. Tell me about the last time you split a cost with someone. Walk me through what happened, start to finish.
2. When was the last time someone owed you money and you didn't get it back quickly? What happened?
3. How do you currently keep track of who owes whom? Show me if you can.
4. Tell me about a time splitting money with someone felt awkward or tense.
5. The last time you *reminded* someone they owed you — how did you do it? How did it feel?
6. When you owe someone money, what makes you actually pay vs. put it off?
7. Walk me through the last trip or shared living situation where expenses got complicated.
8. If you stopped tracking shared expenses entirely tomorrow, what would actually go wrong?

**Questions I deliberately excluded, and why** (research-design rationale — avoiding leading questions):

| Rejected question | Why it's bad |
|---|---|
| "Would a reminder feature help you get paid back?" | Leading + hypothetical. Everyone says yes to a helpful-sounding feature. |
| "Don't you find it annoying when people don't pay you back?" | Presumes the answer and the emotion. |
| "How much would you pay for automatic reminders?" | Pricing a solution before validating the problem. |
| "Do you like Splitwise?" | Yes/no, and invites a product review instead of behavior. |

**Structure:** 2 warm-up questions (1, 3) → dig into behavior and tension (2, 4, 5, 7) → forward-looking only at the very end (8). Q6 probes the *other side* of the transaction, which most research skips.

---

## 2. Findings

Ordered by priority (frequency × impact). Confidence noted per finding.

### Finding 1 — The awkwardness isn't the tracking, it's the *asking*. `[Live]` · High impact · **High confidence**
Both live participants tracked balances fine. The pain was the social cost of chasing repayment. People will eat a ₹300–₹500 debt rather than send a second reminder.
> "I know exactly what he owes me. I just... don't want to be the guy who texts about 400 rupees." — *Live P1, 28, splits flat costs with 2 roommates*

**Evidence:** 2/2 live; echoed across review data. **Impact:** This is the emotional core of the product, and it's under-served.

### Finding 2 — Reminders exist but feel blunt, so people disable or ignore them. `[Live]` `[Reconstructed]` · High impact · **High confidence**
Current app reminders are generic ("You owe X ₹Y") and get read as nagging — by *both* sides. Senders feel the app is speaking for them; receivers feel dunned by a robot.
> "The app reminder feels passive-aggressive on my behalf. I'd rather it not send than send that." — *Live P2, 31, trip organizer*

**Evidence:** 1/2 live, 3/4 reconstructed. **Impact:** Directly explains why the existing settle-up loop leaks.

### Finding 3 — Payment and tracking are split across two apps, and the gap is where debts die. `[Reconstructed]` · High impact · **Medium confidence**
People track in one app, pay in another (UPI / Venmo / bank). The context switch is where "I'll do it later" wins.
> "I see I owe him, I think 'let me open GPay,' then a notification pulls me away and it's gone." — *Reconstructed P3*

**Evidence:** 0/2 live, 4/4 reconstructed. **Impact:** High, but **confidence capped at medium — no live corroboration.** Flagged as the top thing to validate next.

### Finding 4 — Groups decay. The organizer carries the whole burden. `[Live]` · Medium impact · **Medium confidence**
In trips and flatshares, one person fronts most costs and becomes the involuntary collections department. When they disengage, the whole group's tracking collapses.
> "After the trip nobody opens the app again. I'm left holding ₹8,000 across five people." — *Live P2*

**Evidence:** 1/2 live, 2/4 reconstructed.

### Finding 5 — Small, frequent debts are abandoned faster than large ones. `[Reconstructed]` · Medium impact · **Medium confidence**
Counterintuitively, a ₹60 coffee debt is *less* likely to be settled than a ₹5,000 one — the ask isn't worth the awkwardness. These micro-debts accumulate into silent resentment.

**Evidence:** 0/2 live, 3/4 reconstructed. Contradicts an assumption I had going in (I expected big debts to be the problem). **Noted as a surprise, not yet a conclusion.**

### Finding 6 — Trust in the number matters more than features. `[Live]` · Low frequency · **High confidence (as a constraint)**
When a balance looks wrong even once, users stop trusting the app and revert to memory/WhatsApp. Correctness is a license to operate, not a differentiator.

---

## 3. Personas

Behavior-based, not demographic (per methodology — behavior predicts product need better than age/location).

**The Reluctant Creditor** — *the person owed money who won't ask*
- Tracks diligently, chases poorly. Absorbs small debts to avoid friction.
- Goal: get paid back **without having to be the bad guy**.
- Pain: every reminder costs social capital.
- Would switch for: anything that depersonalizes the ask.
- *"I'd rather lose the money than the vibe."*

**The Involuntary Treasurer** — *the organizer carrying the group*
- Fronts costs for trips/flats. Becomes everyone's collections dept.
- Goal: not be left holding the bag after the event ends.
- Pain: group disengages the moment the fun is over.
- Would switch for: shifting the chase off their shoulders.

**The Context-Switch Casualty** — *means to pay, forgets in the gap*
- Not a deadbeat. Loses the debt in the hop between tracking app and payment app.
- Goal: settle in the moment of intent, before distraction wins.
- Pain: friction between "I should pay" and actually paying.

---

## 4. Opportunity Areas (prioritized)

1. **Depersonalize the ask** (Findings 1, 2) — let the system handle repayment nudges in a way that feels tactful, not robotic, so the creditor never has to be the villain. *Highest impact, strongest evidence.*
2. **Close the track→pay gap** (Finding 3) — collapse reminder and payment into one tap. *High potential, needs validation.*
3. **Lift the burden off the organizer** (Finding 4) — distribute the chasing so one person isn't the collections dept.
4. **Rescue micro-debts** (Finding 5) — batch or auto-handle small recurring debts. *Interesting, lowest confidence.*

---

## 5. Recommendation

The sharpest, best-evidenced opportunity is **#1: depersonalize the repayment ask.** It sits at the emotional center of the product (Finding 1), explains why the current loop leaks (Finding 2), and is defensible from live evidence. This becomes the feature specced in the PRD (Project 3) and the top roadmap bet (Project 4).

Specifically: a **tactful, automated settle-up nudge** — tone-calibrated, sent by the system so no individual has to "be the one who asks," with a one-tap pay path to also chip at Finding 3.

## 6. Open Questions (what this research did *not* settle)

- **[Validate next — blocking]** Is the track→pay gap (Finding 3) real at scale, or an artifact of the reconstructed personas? No live corroboration yet. → Run 3 more live interviews probing Q6 specifically.
- Does an automated nudge actually feel *less* awkward to receivers, or just shift the awkwardness? → Needs a prototype test, not more interviews.
- Are micro-debts (Finding 5) worth building for, or just noise? → Pull quantitative data on debt-size vs. settle rate.
- Cultural variance: does the awkwardness-of-asking finding hold outside the two markets represented here?
