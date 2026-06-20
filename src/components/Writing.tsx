const articles = [
  {
    title: "[Product Teardown: An App You Use Daily]",
    type: "Product Teardown",
    description:
      "What it does well, where it falls short, and what I'd change — with measurable success criteria.",
    status: "Draft",
    link: null,
  },
  {
    title: "[How I'd Improve X — Feature Proposal]",
    type: "Strategy",
    description:
      "A detailed feature proposal for [product you use], including user segments, prioritization, and success metrics.",
    status: "Draft",
    link: null,
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
};

export default function Writing() {
  return (
    <section id="writing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Writing & Product Thinking</h2>
        <div className="w-16 h-1 bg-accent rounded mb-4" />
        <p className="text-muted mb-10">
          Demonstrating how I think about products — teardowns, strategy pieces,
          and frameworks.
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

        {/* Tip for the user */}
        <div className="mt-10 p-4 rounded-lg border border-dashed border-border">
          <p className="text-xs text-muted/70 text-center">
            <strong className="text-muted">Tip:</strong> Start with a Product
            Teardown — it&apos;s the easiest to write without PM experience. Pick an
            app you use daily, analyze what works, what doesn&apos;t, and what you&apos;d
            change.
          </p>
        </div>
      </div>
    </section>
  );
}
