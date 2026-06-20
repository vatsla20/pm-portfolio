const skills = {
  "Product Skills": [
    "User Research & Discovery",
    "Roadmap Planning",
    "Prioritization (RICE, MoSCoW)",
    "PRD & Spec Writing",
    "A/B Testing & Experimentation",
    "Data Analysis & Metrics",
  ],
  Methodologies: [
    "Agile / Scrum",
    "Design Thinking",
    "Jobs-to-be-Done (JTBD)",
    "OKRs",
    "User Story Mapping",
  ],
  Tools: [
    "Jira",
    "Figma",
    "SQL",
    "Claude Code",
    "Confluence",
  ],
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Skills & Tools</h2>
        <div className="w-16 h-1 bg-accent rounded mb-10" />

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs rounded-md bg-surface border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted/60 mt-8 italic">
          {/* PLACEHOLDER: Customize this note */}
          Note: Only listing skills I can speak to in depth during an interview.
          Replace/add items that reflect your actual experience.
        </p>
      </div>
    </section>
  );
}
