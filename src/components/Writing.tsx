const articles = [
  {
    title: "Splitwise — Customer Discovery Study",
    type: "User Research",
    description:
      "A structured discovery study on how people manage shared money — research design, 6 interviews synthesized into prioritized findings, evidence-based personas, and opportunity areas. Honest about live vs. reconstructed data and confidence levels.",
    status: "Published",
    link: "/documents/splitwise/01-discovery-research.html",
  },
  {
    title: "Splitwise — Competitive Teardown",
    type: "Product Teardown",
    description:
      "A full competitive brief across 5 competitors and substitutes, with a feature matrix, positioning analysis, and the one unclaimed position in the category. Lands on a sharp strategic recommendation, not a list of screenshots.",
    status: "Published",
    link: "/documents/splitwise/02-competitive-teardown.html",
  },
  {
    title: "Smart Nudge — Product Requirements Document",
    type: "PRD",
    description:
      "A full PRD for a tactful settle-up reminder feature, grounded in the discovery findings: problem statement, goals, non-goals, user stories, P0/P1/P2 requirements with acceptance criteria, and leading/lagging success metrics.",
    status: "Published",
    link: "/documents/splitwise/03-prd.html",
  },
  {
    title: "Splitwise — Prioritized Roadmap (RICE)",
    type: "Strategy",
    description:
      "An 18-item backlog scored with RICE, then sequenced into Now/Next/Later with judgment layered on top — including three deliberate overrides of the raw ranking, each justified. Shows the reasoning, not just the arithmetic.",
    status: "Published",
    link: "/documents/splitwise/04-roadmap-rice.html",
  },
  {
    title: "Smart Nudge — Stakeholder Simulation",
    type: "Framework",
    description:
      "The same feature reframed for four audiences — engineering, design, marketing, and executive — foregrounding what each room cares about without changing what the feature is.",
    status: "Published",
    link: "/documents/splitwise/05-stakeholder-simulation.html",
  },
  {
    title: "Netflix Breaks Its Own Episode-Ordering Rule — On Purpose",
    type: "Opinion",
    description:
      "A small UI detail — episodes sorted newest-first for episodic shows, oldest-first for narrative series — and why it reveals a product sorting by user intent, not content format. The kind of decision users never notice but feel every session.",
    status: "Published",
    link: "/documents/netflix-episode-ordering.html",
  },
  {
    title: "Slack — How a Gaming Company Accidentally Built the Future of Work",
    type: "Product Teardown",
    description:
      "A teardown of Slack's journey from a failed game's internal chat tool to a $27B acquisition: the pivot, the 'email replacement' positioning, bottom-up PLG before it had a name, the Teams threat, and the PM lessons underneath.",
    status: "Published",
    link: "/documents/slack-product-teardown.html",
  },
  {
    title: "The Gap Between Building a Feature and Building a Product",
    type: "Opinion",
    description:
      "How building an EdTech product during COVID taught me the difference between solving for a moment vs. building for a long term market trajectory.",
    status: "Published",
    link: "/documents/market-gap.html",
  },
  {
    title: "DentistGPT - Product Requirements Document",
    type: "PRD",
    description:
      "A comprehensive PRD for a WhatsApp-based AI assistant that automates appointment scheduling for dental clinics, including technical architecture, Mermaid diagrams, and implementation roadmap.",
    status: "Published",
    link: "/documents/PRD.html",
  },
];

const typeColors: Record<string, string> = {
  "Product Teardown": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Strategy: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Opinion: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  PRD: "bg-green-500/10 text-green-400 border-green-500/20",
  Framework: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "User Research": "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function Writing() {
  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Writing & Product Thinking</h2>
        <div className="w-16 h-1 bg-accent rounded mb-4" />
        <p className="text-muted mb-10">
          Demonstrating how I think about products — teardowns, strategy pieces,
          and frameworks. The Splitwise pieces form one connected case study:
          discovery → competitive teardown → PRD → prioritized roadmap →
          stakeholder alignment.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => {
            const ArticleWrapper = article.link ? 'a' : 'article';
            const wrapperProps = article.link
              ? { href: article.link, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <ArticleWrapper
                key={index}
                {...wrapperProps}
                className="group p-5 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2 py-0.5 text-xs rounded border ${typeColors[article.type] || "bg-surface-light text-muted"}`}
                  >
                    {article.type}
                  </span>
                  <span className="text-xs text-muted/60 italic">
                    {article.status}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground group-hover:text-accent-light transition-colors mb-2">
                  {article.title}
                  {article.link && (
                    <svg
                      className="inline-block ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {article.description}
                </p>
              </ArticleWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
