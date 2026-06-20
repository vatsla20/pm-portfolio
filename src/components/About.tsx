export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">About Me</h2>
        <div className="w-16 h-1 bg-accent rounded mb-10" />

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                My Story
              </h3>
              <p className="text-muted leading-relaxed">
                I started my career at SAP as a full-stack developer, building
                and shipping AI/ML-powered products end-to-end — from database
                design and backend architecture to frontend performance and
                cloud security. Over time I noticed that the moments I found
                most energising weren't the ones where I wrote the most code,
                but the ones where I was figuring out what to build, for whom,
                and why it mattered.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                The Pivot
              </h3>
              <p className="text-muted leading-relaxed">
                When I owned the full product lifecycle for SAP API Management's
                Anomaly Detection and Signavio Process Intelligence platforms —
                scoping requirements, designing data flows, coordinating across
                infra and AI teams, and driving releases from zero — I was
                already doing product management. That became undeniable when I
                won SAP's Invent for Customer hackathon, where the edge wasn't
                technical execution but clearly defining a user problem and
                building the right solution for it. Product management is where
                I belong.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent-light">
                What I&apos;m Looking For
              </h3>
              <p className="text-muted leading-relaxed">
                I'm seeking PM roles in B2B SaaS or enterprise AI products —
                where deep technical fluency is an advantage, not just a
                nice-to-have. I thrive where user empathy, data-informed
                decisions, and iterative shipping are the operating model.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 text-accent-light">
              What I Bring
            </h3>

            {[
              {
                title: "Technical depth",
                desc: "4+ years shipping full-stack AI/ML products at SAP gives me the ability to evaluate feasibility, spot scope creep, and earn engineering trust on day one.",
              },
              {
                title: "End-to-end product ownership",
                desc: "Drove complete release lifecycles — from requirements and architecture through delivery and post-launch — on multi-tenant enterprise platforms used at scale.",
              },
              {
                title: "Cross-functional execution",
                desc: "Coordinated across AI, infra, security, and frontend teams while automating workflows that reduced operational overhead by up to 90%.",
              },
              {
                title: "Customer & problem focus",
                desc: "Won SAP's Invent for Customer award and holds a patent-pending identity verification architecture — both anchored in solving real user problems, not just shipping features.",
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
