const bring = [
  { title: "Technical depth", desc: "4+ years shipping full-stack AI/ML products at SAP gives me the ability to evaluate feasibility, spot scope creep, and earn engineering trust on day one." },
  { title: "End-to-end product ownership", desc: "Drove complete release lifecycles — from requirements and architecture through delivery and post-launch — on multi-tenant enterprise platforms used at scale." },
  { title: "Cross-functional execution", desc: "Coordinated across AI, infra, security, and frontend teams while automating workflows that reduced operational overhead by up to 90%." },
  { title: "Customer & problem focus", desc: "Won SAP's Invent for Customer award and holds a patent-pending identity verification architecture — both anchored in solving real user problems, not just shipping features." },
];

export default function About() {
  return (
    <section id="about" className="sec" data-say="This is where it started: code first, then the why.">
      <div className="sec-head" data-reveal>
        <h2 className="display h2">About Me</h2>
      </div>
      <div className="grid">
        <div className="story" data-reveal>
          <div className="panel">
            <h3>My Story</h3>
            <p className="muted">
              I started my career at SAP as a full-stack developer, building and shipping AI/ML-powered products end-to-end — from database
              design and backend architecture to frontend performance and cloud security. Over time I noticed that the moments I found
              most energising weren&apos;t the ones where I wrote the most code, but the ones where I was figuring out what to build, for whom,
              and why it mattered.
            </p>
          </div>
          <div className="panel d60">
            <h3>The Pivot</h3>
            <p className="muted">
              When I owned the full product lifecycle for SAP API Management&apos;s Anomaly Detection and Signavio Process Intelligence platforms —
              scoping requirements, designing data flows, coordinating across infra and AI teams, and driving releases from zero — I was
              already doing product management. That became undeniable when I won SAP&apos;s Invent for Customer hackathon, where the edge wasn&apos;t
              technical execution but clearly defining a user problem and building the right solution for it. Product management is where
              I belong.
            </p>
          </div>
          <div className="panel light">
            <h3>What I&apos;m Looking For</h3>
            <p className="muted">
              I&apos;m seeking PM roles in B2B SaaS or enterprise AI products — where deep technical fluency is an advantage, not just a
              nice-to-have. I thrive where user empathy, data-informed decisions, and iterative shipping are the operating model.
            </p>
          </div>
        </div>
        <div className="bring" data-reveal>
          <h3>What I Bring</h3>
          {bring.map((item) => (
            <div key={item.title} className="item">
              <b>{item.title}</b>
              <p className="muted small d60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
