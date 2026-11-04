// One content file. Every section, case page and the "Ask AI" index reads from here.
// Depth: t30 = what a 30-second visitor sees, t60 adds the reasoning, full adds the rest.

export type Orb =
  | "working" | "searching" | "solving" | "listening" | "connecting"
  | "weaving" | "composing" | "breathing" | "shaping";

export type Project = {
  slug: string;
  name: string;          // short name, set large
  title: string;         // full title
  where: string;
  when: string;
  orb: Orb;
  t30: string;           // the one line + number
  problem: string;
  myCall: string[];      // what I decided or built myself
  aiCall: string;        // where AI earned its place, or didn't
  costCall: string;      // the cost / context lever
  outcome: string;
  outOfContext: string[]; // what stays out of this case on purpose
  related: string[];     // slugs of projects or writing
  fragment: "forecast" | "names" | "patent" | "evals" | "steps" | "sources" | "query";
};

export const person = {
  name: "Vatsla Khurana",
  short: "Vatsla K.",
  initials: "VK",
  line: "Engineer turned product manager. I find where AI earns its place, and where a script does the job for free.",
  email: "vatsla20.k@gmail.com",
  linkedin: "https://www.linkedin.com/in/vatsla-khurana",
  city: "Bengaluru, India",
  resume: "/resume.pdf",
};

export const projects: Project[] = [
  {
    slug: "anomaly-detection",
    name: "Anomaly detection",
    title: "AI anomaly detection and forecasting platform, zero to one",
    where: "SAP API Management",
    when: "2023 to 2025",
    orb: "searching",
    t30: "Built from nothing to a live multi-tenant AI product for thousands of API Management customers.",
    problem:
      "Customers learned about API failures after their own users did. There was no blueprint, no codebase and no detection.",
    myCall: [
      "Wrote the requirements and drove the data architecture in CAP CDS.",
      "Coordinated the AI, infra, security and frontend teams across a multi-tenant, multi-instance estate.",
      "Defined the data flows to the IaaS platform, plus authentication and authorisation.",
      "Owned training and inference pipelines with end-to-end data integrity.",
    ],
    aiCall:
      "A spike is not always an anomaly. Forecasting sets what normal looks like for this hour first, so a known Monday surge is not paged as an incident.",
    costCall:
      "Fixed thresholds stay where a rule is enough. The model is reserved for the traffic whose rhythm makes a rule wrong.",
    outcome: "Shipped to production across tenants and instances, from requirements to release.",
    outOfContext: ["Model architecture", "Tenant topology", "Training data"],
    related: ["conversational-analytics", "daily-pm-briefing"],
    fragment: "forecast",
  },
  {
    slug: "candidate-verification",
    name: "Candidate verification",
    title: "Invent for Customer: AI candidate verification system",
    where: "SAP, company-wide hackathon",
    when: "2023 to 2025",
    orb: "solving",
    t30: "Won SAP's company-wide Invent for Customer hackathon, and became a pending patent.",
    problem:
      "Verifying a candidate is slow, open to fraud and buried in documents. Recruiters lose hours per hire matching names that are spelled five ways.",
    myCall: [
      "Ran the problem discovery and chose which recruiter pain to solve.",
      "Scoped the solution and wrote the business case the jury judged.",
      "Built the reconciliation: phonetic name fusion and graph consistency across documents.",
    ],
    aiCall:
      "Names across scripts are matched phonetically before any model is asked. A model only sees the cases the cheap checks cannot settle.",
    costCall:
      "Progressive short-circuit evaluation: every tier can stop the run. Most documents never reach the expensive one.",
    outcome: "Judged on customer impact, business value and feasibility. Won.",
    outOfContext: ["Scoring thresholds", "Graph schema"],
    related: ["identity-patent"],
    fragment: "names",
  },
  {
    slug: "identity-patent",
    name: "Patent pending",
    title:
      "Plug-and-play identity verification architecture: a domain-agnostic, multi-tier framework for scalable document reconciliation using script-adaptive phonetic fusion, conflict-amplified graph consistency analysis and progressive short-circuit evaluation",
    where: "Filed through SAP, #86836268",
    when: "Pending",
    orb: "weaving",
    t30: "An identity check that stops at the first tier sure enough to answer.",
    problem:
      "Every verification product rebuilds the same matching for its own documents and its own language.",
    myCall: [
      "Generalised the hackathon system into a domain-agnostic architecture.",
      "Designed the tiers so each one can end the evaluation early.",
    ],
    aiCall:
      "Script-adaptive phonetic fusion handles names across writing systems without a model. Conflicts in the document graph are amplified so the rare hard case is obvious.",
    costCall: "The cheapest tier that is confident wins. Compute is spent only where documents disagree.",
    outcome: "Patent pending, #86836268.",
    outOfContext: ["Claims", "Tier internals"],
    related: ["candidate-verification"],
    fragment: "patent",
  },
  {
    slug: "dentist-ai",
    name: "DentistAI",
    title: "DentistAI: an evaluation framework for a WhatsApp booking bot",
    where: "Self-initiated",
    when: "2025",
    orb: "listening",
    t30: "An eval set that caught a missing safety metric before the bot could ship.",
    problem:
      "A booking bot for Indian dental clinics, in Hindi and English, is only as good as its worst failure: a made-up slot, a misread intent, or medical advice it should never give.",
    myCall: [
      "Set the North Star: AI-assisted booking completion rate, laddered into quality, safety and efficiency.",
      "Built a labelled golden set matched to the real language mix: 40% Hindi, 30% code-switched.",
      "Wrote the runnable grader that enforces the language guardrail.",
      "Found the gap in my own framework and added a clinical-advice refusal metric to the launch gates.",
    ],
    aiCall:
      "Non-deterministic output, held to a predictable bar. The bot cannot ace an English-heavy dashboard and then fail in Pune.",
    costCall:
      "The golden set is version-controlled and runs as a regression gate, and logs are read for drift and attacks, not only errors.",
    outcome: "Metrics, then evals, then a caught gap, then the gap closed.",
    outOfContext: ["Prompt text", "Clinic data"],
    related: ["dentistgpt-prd"],
    fragment: "evals",
  },
  {
    slug: "conversational-analytics",
    name: "Ask your APIs",
    title: "LLM and RAG conversational analytics for API Management",
    where: "SAP API Management, self-initiated",
    when: "2023 to 2025",
    orb: "connecting",
    t30: "Plain-language questions over API analytics, shipped without a mandate.",
    problem:
      "API performance lived in dashboards that only answered people who already knew where to look.",
    myCall: [
      "Spotted that power users spent most of their time hunting, not deciding.",
      "Designed and built the natural-language query layer.",
      "Paired it with recommendations for anomaly scenarios.",
    ],
    aiCall:
      "The model answers the question. Retrieval decides what it is allowed to read, so an answer is grounded in this tenant's numbers.",
    costCall:
      "Context is the metrics the question names, not the whole dashboard. Less in the window, fewer ways to be wrong.",
    outcome: "Shipped as a platform extension. Time to insight went down for API monitoring.",
    outOfContext: ["Index design", "Prompt chain"],
    related: ["anomaly-detection", "daily-pm-briefing"],
    fragment: "query",
  },
  {
    slug: "daily-pm-briefing",
    name: "Daily briefing",
    title: "Daily PM briefing: an AI news synthesis pipeline",
    where: "Personal tool",
    when: "2025",
    orb: "composing",
    t30: "30+ sources every morning, zero API keys, zero backend.",
    problem: "Keeping up with AI and product news meant scanning dozens of noisy, repetitive sites every day.",
    myCall: [
      "Curated the source list: feeds, Hacker News, Reddit, YouTube and company blogs.",
      "Wrote the fetch in curl and jq, and the synthesis prompt that dedupes stories into neutral briefs.",
      "Built the React dashboard, filterable by topic, with a refresh that reruns the whole pipeline.",
    ],
    aiCall:
      "Fetching and parsing are plain scripts. The model does the one thing scripts cannot: notice that four headlines are one story.",
    costCall: "A local CLI and a flat JSON file. Nothing runs when nobody is reading.",
    outcome: "A daily briefing that costs nothing to run.",
    outOfContext: ["Source list"],
    related: ["anomaly-detection", "conversational-analytics"],
    fragment: "sources",
  },
  {
    slug: "tenant-decommissioning",
    name: "Decommissioning",
    title: "Tenant decommissioning automation",
    where: "SAP Signavio Process Insights",
    when: "2025 to now",
    orb: "working",
    t30: "90% faster turnaround, no manual error exposure, and no AI at all.",
    problem:
      "Taking down a customer tenant was fully manual: no audit trail, no standard steps, and a growing risk as the platform scaled.",
    myCall: [
      "Named it a scaling risk before it became an incident.",
      "Made the case for automation and architected the governed workflow.",
      "Built audit controls into every step.",
    ],
    aiCall:
      "No model. The steps are known and they repeat. A well-oiled machine does not need to guess.",
    costCall: "Zero inference cost, and every run is explainable to an auditor.",
    outcome: "Turnaround cut by 90%, with manual error exposure removed across enterprise environments.",
    outOfContext: ["Customer environments"],
    related: ["anomaly-detection"],
    fragment: "steps",
  },
];

export type Doc = {
  slug: string;
  title: string;
  kind: "Research" | "Teardown" | "PRD" | "Strategy" | "Framework" | "Opinion";
  t30: string;
  t60: string;
  href: string;
  series?: string;
  related: string[];
};

export const writing: Doc[] = [
  {
    slug: "splitwise-discovery", series: "Splitwise", kind: "Research",
    title: "How people settle shared money",
    t30: "Six interviews, honest about what was live and what was reconstructed.",
    t60: "Research design, synthesised findings, evidence-based personas and ranked opportunity areas, each with its confidence level.",
    href: "/documents/splitwise/01-discovery-research.html", related: ["splitwise-teardown"],
  },
  {
    slug: "splitwise-teardown", series: "Splitwise", kind: "Teardown",
    title: "Five rivals and one unclaimed position",
    t30: "A competitive brief that lands on a recommendation, not a screenshot list.",
    t60: "Five competitors and substitutes, a feature matrix, positioning, and strengths and weaknesses that do not always show us winning.",
    href: "/documents/splitwise/02-competitive-teardown.html", related: ["splitwise-discovery", "smart-nudge-prd"],
  },
  {
    slug: "smart-nudge-prd", series: "Splitwise", kind: "PRD",
    title: "Smart Nudge, a tactful settle-up reminder",
    t30: "A PRD grounded in the discovery, with non-goals as sharp as the goals.",
    t60: "Problem, goals, non-goals, user stories, P0 to P2 requirements with acceptance criteria, and leading and lagging metrics.",
    href: "/documents/splitwise/03-prd.html", related: ["splitwise-teardown", "splitwise-roadmap"],
  },
  {
    slug: "splitwise-roadmap", series: "Splitwise", kind: "Strategy",
    title: "RICE, then judgement",
    t30: "Eighteen items scored, then three deliberate overrides of the ranking.",
    t60: "An 18-item backlog scored with RICE and sequenced into now, next and later, with every override justified.",
    href: "/documents/splitwise/04-roadmap-rice.html", related: ["smart-nudge-prd", "stakeholder-simulation"],
  },
  {
    slug: "stakeholder-simulation", series: "Splitwise", kind: "Framework",
    title: "One feature, four rooms",
    t30: "The same feature told to engineering, design, marketing and the executive.",
    t60: "What each room cares about, foregrounded, without changing what the feature is.",
    href: "/documents/splitwise/05-stakeholder-simulation.html", related: ["splitwise-roadmap"],
  },
  {
    slug: "rapido", kind: "Opinion",
    title: "The feature that made me quit Rapido",
    t30: "A live rejection counter that backfires hardest at peak hour.",
    t60: "Counting the wrong number in a category with almost no switching cost, and what I would have shown instead.",
    href: "/documents/rapido-rejection-counter.html", related: ["netflix"],
  },
  {
    slug: "netflix", kind: "Opinion",
    title: "Netflix breaks its own episode order, on purpose",
    t30: "Newest first for episodic shows, oldest first for stories.",
    t60: "A small sorting rule that shows a product ordering by intent, not by content format.",
    href: "/documents/netflix-episode-ordering.html", related: ["rapido"],
  },
  {
    slug: "slack", kind: "Teardown",
    title: "How a game studio built Slack",
    t30: "From a failed game's internal chat to a $27B acquisition.",
    t60: "The pivot, the email-replacement positioning, bottom-up growth before it had a name, and the Teams threat.",
    href: "/documents/slack-product-teardown.html", related: ["market-gap"],
  },
  {
    slug: "market-gap", kind: "Opinion",
    title: "A feature is not a product",
    t30: "What an EdTech build during COVID taught me about lasting markets.",
    t60: "Solving for a moment against building for a long-term market, and what a 2.0 would do today.",
    href: "/documents/market-gap.html", related: ["slack"],
  },
  {
    slug: "dentistgpt-prd", kind: "PRD",
    title: "DentistGPT, the requirements",
    t30: "A WhatsApp assistant that books dental appointments.",
    t60: "Architecture, diagrams and an implementation roadmap behind the DentistAI evaluation work.",
    href: "/documents/PRD.html", related: ["dentist-ai"],
  },
];

// The path: roles and recognitions, for the table.
export const path: { kind: string; what: string; when: string; href?: string }[] = [
  { kind: "Role", what: "Full stack developer to product owner, SAP Signavio Process Insights", when: "2025 to now" },
  { kind: "Shipped", what: "Managed cloud provisioning for private cloud onboarding", when: "2025" },
  { kind: "Shipped", what: "Regional expansion into UAE and India data centres", when: "2025" },
  { kind: "Shipped", what: "Credential rotation scripts, no service disruption", when: "2025" },
  { kind: "Role", what: "Full stack developer to product lead, SAP API Management", when: "2023 to 2025" },
  { kind: "Role", what: "Full stack developer, SAP Integration Suite: dashboard load 80% faster", when: "2022" },
  { kind: "Role", what: "Full stack developer, SAP AI Launchpad: the log viewer", when: "2021 to 2022" },
  { kind: "Won", what: "SAP Invent for Customer, company-wide", when: "2023 to 2025" },
  { kind: "Selected", what: "SAP Code Camp, Berlin: AI workshop and hackathon", when: "2026" },
  { kind: "Named", what: "SAP Security Champion and AI Security Champion", when: "Now" },
  { kind: "Study", what: "MTech, Software Engineering, BITS Pilani", when: "2021 to 2025" },
  { kind: "Study", what: "BCA, Christ University, Bengaluru", when: "2018 to 2021" },
  { kind: "Certified", what: "IBM AI Product Manager · IBM RAG and Agentic AI", when: "Done" },
  { kind: "Certified", what: "Microsoft AI Product Manager", when: "In progress" },
];

// The cascade: how a request is routed. Costs are relative and illustrative.
export const tiers = [
  { name: "Seen it before", tool: "Cache or lookup", cost: "≈0" },
  { name: "The steps are known", tool: "Script, rule or index search", cost: "1×" },
  { name: "Needs judgement, small context", tool: "Small model", cost: "10×" },
  { name: "Needs judgement, wide context", tool: "Large model, only the context it needs", cost: "100×" },
];

export const requests = [
  { ask: "Has this exact request come in before?", tier: 0, why: "Return the stored answer." },
  { ask: "Decommission a customer tenant", tier: 1, why: "Known steps, audited. No model." },
  { ask: "Find the chapter on pricing in a book", tier: 1, why: "An index search did this. RAG was not needed." },
  { ask: "Do these two documents name the same person?", tier: 1, why: "Phonetic match first. Most stop here." },
  { ask: "Was last Monday's spike an anomaly?", tier: 2, why: "A forecast decides what normal was." },
  { ask: "Merge 30 sources into one morning brief", tier: 3, why: "Real synthesis, once a day, nothing more." },
];

export const credits = [
  { file: "/img/flock-1.jpg", title: "Rosy starling murmuration over Kankaria Lake, Ahmedabad", creator: "Vickey Chauhan", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/w/index.php?curid=71360462" },
  { file: "/img/flock-2.jpg", title: "Basai Wetland, Gurgaon, murmuration", creator: "T. R. Shankar Raman", licence: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/w/index.php?curid=60374270" },
  { file: "/img/flock-3.jpg", title: "Starling murmuration at Rome's Termini station", creator: "Moskenes", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/w/index.php?curid=168825633" },
  { file: "/img/flock-4.jpg", title: "Starling murmuration", creator: "Airwolfhound", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/w/index.php?curid=57846087" },
  { file: "/img/flock-6.jpg", title: "Starling murmuration, Fairburn Ings", creator: "Rich Tea", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/w/index.php?curid=182908663" },
];

export const allSlugs = () => [...projects.map((p) => p.slug), ...writing.map((d) => d.slug)];
export const titleOf = (slug: string) =>
  projects.find((p) => p.slug === slug)?.name ?? writing.find((d) => d.slug === slug)?.title ?? slug;
