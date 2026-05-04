const articles = [
  {
    title: "[Product Teardown: An App You Use Daily]",
    type: "Product Teardown",
    description:
      "What it does well, where it falls short, and what I'd change — with measurable success criteria.",
    status: "Draft",
  },
  {
    title: "[How I'd Improve X — Feature Proposal]",
    type: "Strategy",
    description:
      "A detailed feature proposal for [product you use], including user segments, prioritization, and success metrics.",
    status: "Draft",
  },
  {
    title: "[What My Previous Field Taught Me About Product]",
    type: "Opinion",
    description:
      "How [your background] built transferable PM skills: stakeholder management, prioritization under constraints, and user empathy.",
    status: "Draft",
  },
  {
    title: "[Mini-PRD: Feature Idea for a Product You Love]",
    type: "PRD",
    description:
      "A lightweight product requirements document covering problem statement, user stories, scope, and success metrics.",
    status: "Draft",
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
          {articles.map((article, index) => (
            <article
              key={index}
              className="group p-5 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300"
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
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {article.description}
              </p>
            </article>
          ))}
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
