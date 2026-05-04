export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <div className="w-16 h-1 bg-accent rounded mb-10" />

        <div className="grid md:grid-cols-3 gap-10">
          {/* Main story */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                My Story
              </h3>
              <p className="text-muted leading-relaxed">
                {/* PLACEHOLDER: Replace with your story */}
                I started my career in [your field], where I [what you did and
                achieved]. Over time, I found myself drawn to the work that sat
                at the intersection of user needs, business goals, and technical
                feasibility — the work that, I later realized, is product
                management.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                The Pivot
              </h3>
              <p className="text-muted leading-relaxed">
                {/* PLACEHOLDER: Replace with your pivot moment */}
                When I led [specific initiative], I naturally stepped into the PM
                role: talking to users, defining requirements, prioritizing
                features, and coordinating across teams to ship on time. That
                experience made it clear — product management is where I belong.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                What I&apos;m Looking For
              </h3>
              <p className="text-muted leading-relaxed">
                {/* PLACEHOLDER: Replace with your target */}
                I&apos;m seeking product roles where I can [your goal — e.g.,
                &quot;drive 0-to-1 initiatives&quot;, &quot;improve user
                experiences at scale&quot;, &quot;work on B2B SaaS
                products&quot;]. I thrive in environments that value user
                empathy, data-informed decisions, and iterative development.
              </p>
            </div>
          </div>

          {/* What I bring sidebar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 text-accent-light">
              What I Bring
            </h3>

            {/* PLACEHOLDER: Replace with your actual strengths */}
            {[
              {
                title: "Domain Expertise",
                desc: "[Your field] gives me deep product intuition in [area]",
              },
              {
                title: "Data Analysis",
                desc: "Built dashboards and made data-informed decisions for [context]",
              },
              {
                title: "Stakeholder Management",
                desc: "Aligned cross-functional teams around shared goals at [context]",
              },
              {
                title: "User Empathy",
                desc: "Conducted [X]+ user interviews and synthesized insights into action",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-lg bg-surface border border-border"
              >
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
