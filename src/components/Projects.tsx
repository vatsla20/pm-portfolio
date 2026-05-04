const projects = [
  {
    title: "[Project 1 Name]",
    outcome: "Reduced onboarding drop-off by 35% through redesigned user flow",
    role: "Led",
    domain: "B2B SaaS",
    tags: ["User Research", "Roadmap", "A/B Testing"],
    description:
      "Identified a critical friction point in the onboarding process through user interviews and funnel analysis. Defined the problem space, proposed solutions, and coordinated with engineering and design to ship an improved flow.",
  },
  {
    title: "[Project 2 Name]",
    outcome:
      "Launched internal tool that saved 10 hrs/week for the operations team",
    role: "Co-led",
    domain: "Internal Tool",
    tags: ["Process Improvement", "Stakeholder Mgmt", "Specs"],
    description:
      "Recognized an operational bottleneck affecting team productivity. Wrote the requirements, prioritized features using RICE, and managed the build with a 2-person engineering team across 3 sprints.",
  },
  {
    title: "[Project 3 Name]",
    outcome: "Defined product strategy for new market segment worth $2M ARR",
    role: "Contributed",
    domain: "Growth",
    tags: ["Market Research", "Strategy", "GTM"],
    description:
      "Conducted competitive analysis and user interviews to validate a new market opportunity. Created the business case and feature requirements that informed the product roadmap for the next two quarters.",
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

        {/* Case study CTA */}
        <div className="mt-12 p-6 rounded-xl border border-dashed border-border text-center">
          <p className="text-sm text-muted mb-2">
            Each project above expands into a full case study with:
          </p>
          <p className="text-xs text-muted/70">
            Problem → Discovery & Research → Solution → Execution → Results →
            Reflections
          </p>
        </div>
      </div>
    </section>
  );
}
