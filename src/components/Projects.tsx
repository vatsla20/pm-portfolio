const projects = [
  {
    title: "AI Anomaly Detection & Forecasting Platform — 0 to 1",
    outcome:
      "Shipped a production AI/ML SaaS product end-to-end — from zero requirements to live multi-tenant deployment — within SAP API Management",
    role: "Led",
    domain: "Enterprise SaaS",
    tags: ["0-to-1 product", "Roadmap ownership", "Cross-functional coordination", "Multi-tenant architecture", "AI/ML integration", "Release management"],
    description:
      "The problem: SAP API Management lacked intelligent anomaly detection, leaving customers reactive to API failures. I owned the complete product lifecycle — writing requirements, designing the data architecture in CAP CDS, coordinating across AI, infra, security, and frontend teams, and managing releases across a multi-tenant, multi-instance environment. I defined data flows for IaaS platform communication, implemented authentication and authorisation, and managed large-scale training and inference pipelines with end-to-end data integrity guarantees. This was a greenfield product: no blueprint, no existing codebase — just a customer need and a team to coordinate.",
  },
  {
    title: "Invent for Customer — AI Candidate Verification System",
    outcome:
      "Won SAP's company-wide Invent for Customer hackathon — judged on customer impact, feasibility, and innovation",
    role: "Led · 🏆 Winner",
    domain: "HR Tech / GenAI",
    tags: ["Customer discovery", "Problem framing", "GenAI", "0-to-1 execution", "Business case", "Patent pending"],
    description:
      "The problem: candidate verification in hiring is slow, fraud-prone, and document-heavy — costing recruiters hours per hire. I led problem discovery, defined the solution scope, and built an AI-based verification system that reconciles candidate documents using phonetic name fusion and graph-based consistency analysis. The win wasn't the technical execution — it was identifying the right customer pain, framing the right solution, and making a compelling case for its business value. This is the foundation of my patent-pending identity verification architecture.",
  },
  {
    title: "DentistAI — AI Evaluation Framework for a WhatsApp Booking Bot",
    outcome:
      "Designed the AI metrics framework and a version-controlled golden-set eval that caught a missing safety metric before it could ship",
    role: "Led",
    domain: "Healthcare / Conversational AI",
    tags: ["AI product metrics", "LLM evaluation", "AI safety", "Hallucination & escalation", "Multilingual NLP", "Eval-driven development"],
    description:
      "The problem: a WhatsApp booking bot for Indian dental clinics (Hindi/English) is only as good as its worst failure — a hallucinated slot, a misread intent, or worse, a bot casually dispensing medical advice. I built the full AI metrics framework (North Star: AI-Assisted Booking Completion Rate, laddered into Quality / Safety / Efficiency layers) and then the artifact that makes it real: a labeled golden-set eval dataset stratified to the production language mix (40% Hindi, 30% code-switched) so the bot can't ace an English-skewed dashboard and fail in Pune. The set is safety-weighted — intent, slot-filling, hallucination grounding, graceful escalation, and clinical-advice refusal — with a runnable grader enforcing the language guardrail. Building the eval surfaced a gap in my own metrics: a dental bot needs a dedicated Clinical-advice Refusal metric (never diagnose, never dose, redirect emergencies), which I then wrote back into the framework and launch gates. The PM motion on display: metrics → eval → caught a gap → closed it.",
  },
  {
    title: "Tenant Decommissioning Automation — Operational Risk Elimination",
    outcome:
      "Reduced decommissioning turnaround time by 90% · Eliminated manual error risk · Enforced governance at every step",
    role: "Led",
    domain: "Platform / Internal Tool",
    tags: ["Process improvement", "Risk identification", "Workflow automation", "Governance design", "Stakeholder alignment"],
    description:
      "The problem: tenant decommissioning at SAP Signavio was entirely manual — no audit trail, no standard process, slow execution, and a growing liability as the platform scaled. I identified this as an unacceptable operational risk, made the case for automation, and architected a governed workflow with built-in audit controls. The result transformed a multi-hour, error-prone process into a reliable, repeatable system. This is a textbook PM motion: spot a silent pain point, quantify the risk, define the solution, and ship it.",
  },
  {
    title: "Daily PM Dashboard — AI News Synthesis Pipeline",
    outcome:
      "Built a zero-API-key news pipeline that fetches 30+ sources, dedupes with a local LLM, and renders a filterable daily briefing",
    role: "Built",
    domain: "Developer Tools / AI",
    tags: ["AI tooling", "LLM prompting", "RSS/feed parsing", "React", "Self-initiated", "Developer productivity"],
    description:
      "The problem: staying current on AI and product news requires scanning dozens of sites daily — noisy, repetitive, and time-consuming. I built a fully local pipeline: a shell script fetches RSS/Atom feeds, Hacker News, Reddit, YouTube, and company blogs from a curated source list; pipes all items through a Claude-powered synthesis prompt that deduplicates overlapping stories and writes neutral multi-source briefs; and writes the result as a flat JSON file consumed by a React dashboard. The pipeline runs on zero API keys and zero backend — just curl, jq, and the local claude CLI. The dashboard shows animated brief cards filterable by topic (AI in products / product strategy / business moves) with source-link chips and inline video embeds. A refresh button re-runs the full pipeline live.",
  },
  {
    title: "LLM + RAG Conversational Analytics Tool for API Management",
    outcome:
      "Extended the API Management platform with natural-language querying — reducing time-to-insight for API performance monitoring",
    role: "Led",
    domain: "Developer Tools / AI",
    tags: ["User insight gap", "LLM / RAG", "Platform extension", "Self-initiated", "Recommendation systems"],
    description:
      "The problem: API performance data lived in dashboards that required users to know exactly what to look for. I identified this as a usability gap — power users were spending disproportionate time hunting for insights. I designed and built an LLM + RAG-based conversational tool that let users query API analytics in plain language, and paired it with a recommendation engine that surfaced contextual guidance for anomaly scenarios. The project required no stakeholder mandate — I saw the gap, defined the solution, and shipped it as a platform extension.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
        <div className="w-16 h-1 bg-accent rounded mb-4" />
        <p className="text-muted mb-10">
          {/* PLACEHOLDER: Customize intro */}
          Case studies demonstrating product thinking, execution, and impact.
          Each project highlights a different PM skill set.
        </p>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 hover:glow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-accent-light font-medium mt-1">
                    {project.outcome}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 text-xs rounded bg-accent/10 text-accent-light border border-accent/20">
                    {project.domain}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded bg-surface-light text-muted">
                    {project.role}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded bg-surface-light text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
