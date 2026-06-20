const skills = {
  "Product Skills": [
    "Product lifecycle management",
    "Roadmap planning",
    "Requirements & PRD writing",
    "Prioritisation (RICE, MoSCoW)",
    "Metrics & KPI definition",
    "User research & discovery",
    "0-to-1 product development",
  ],
  Methodologies: [
    "Agile / Scrum",
    "Design thinking",
    "OKRs",
    "Jobs-to-be-done (JTBD)",
    "Multi-tenant SaaS architecture",
    "API-first product design",
  ],
  "Technical Fluency": [
    "Java / Spring Boot",
    "Python",
    "JavaScript",
    "GenAI / LLM / RAG",
    "SQL / SAP HANA",
    "Cloud & microservices",
    "REST APIs",
    "Bash / automation scripting",
  ],
  Tools: [
    "Jira",
    "Confluence",
    "Figma",
    "SQL",
    "SAP BTP / HANA Cloud",
    "Git / GitHub",
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
      </div>
    </section>
  );
}
