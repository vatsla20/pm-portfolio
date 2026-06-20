const experience = [
  {
    title: "Full Stack Developer",
    company: "SAP Signavio Process Insights",
    period: "July 2025 – Present",
    bullets: [
      "Defined and delivered Managed Cloud Provisioning (MCP) to onboard enterprise customers into private cloud — translating compliance and security requirements into a scalable, repeatable infrastructure workflow.",
      "Identified a fully manual tenant decommissioning process as a critical operational risk; architected an automated, audit-governed replacement that cut turnaround time by 90% and eliminated manual error exposure.",
      "Drove readiness for 2 new production data centres (UAE and India), coordinating across infra, security, and compliance stakeholders to meet regional data-residency requirements.",
      "Designed automated credential-rotation scripts to harden platform security posture, proactively reducing risk surface without service disruption.",
    ],
  },
  {
    title: "Full Stack Developer — AI/ML Product",
    company: "SAP API Management",
    period: "Jan 2023 – July 2025",
    bullets: [
      "Owned the end-to-end product lifecycle for an AI/ML anomaly detection and forecasting platform — from zero — including scoping, architecture, multi-team coordination, and release management across a multi-tenant environment.",
      "Won SAP's Invent for Customer hackathon with an AI-based Candidate Verification System, demonstrating customer-first problem definition and rapid 0-to-1 execution.",
      "Built an LLM + RAG conversational analytics tool for API management and a recommendation engine for anomaly detection — identifying user gaps in existing tooling and shipping solutions that extended platform value.",
      "Designed secure data flows between the product and IaaS platforms, balancing performance, reliability, and data integrity under enterprise-grade security constraints.",
      "Attended SAP Code Camp 2026 (Berlin) — AI workshop and hackathon for SAP Signavio org.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "SAP API Management Integration Suite",
    period: "May 2022 – Dec 2022",
    bullets: [
      "Diagnosed a critical performance bottleneck in the Integration Suite Dashboard and drove optimisations that reduced initial load time by 80%, directly improving daily-use experience for operations teams.",
      "Established an automated regression testing framework, reducing manual QA overhead and improving release confidence across the team.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "SAP AI Launchpad",
    period: "Sept 2021 – Apr 2022",
    bullets: [
      "Shaped the log-viewing experience for AI Launchpad — building pagination, filtering, and download workflows that translated into measurably faster debugging for end users.",
      "Improved frontend performance through package minification and lazy loading, reducing server load and improving perceived responsiveness.",
    ],
  },
];

const education = [
  {
    degree: "MTech, Software Engineering",
    school: "BITS Pilani (Birla Institute of Technology and Science)",
    year: "2021 – 2025",
    note: "CGPA 8.9",
  },
  {
    degree: "BCA (Bachelor of Computer Application)",
    school: "Christ (Deemed to be University), Bengaluru",
    year: "2018 – 2021",
    note: "CGPA 9.7 · 85.5%",
  },
];

const certifications = [
  "IBM AI Product Manager",
  "Microsoft AI Product Manager (ongoing)",
  "IBM RAG & Agentic AI Professional Certificate",
  "SAP Security Champion",
  "SAP AI Security Champion",
  "SAPUI5 Trainer Certification",
  "Google Agentic AI Hackathon",
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold">Resume</h2>
          <a
            href="/resume.pdf"
            download="Vatsla_Khurana_Resume.pdf"
            className="text-sm text-accent hover:text-accent-light transition-colors flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download PDF
          </a>
        </div>
        <div className="w-16 h-1 bg-accent rounded mb-10" />

        <div className="mb-12">
          <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-6">
            Experience
          </h3>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-6 border-l border-border">
                <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-accent -translate-x-[5.5px]" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 className="text-base font-semibold text-foreground">
                    {job.title}
                  </h4>
                  <span className="text-xs text-muted">{job.period}</span>
                </div>
                <p className="text-sm text-accent-light mb-3">{job.company}</p>
                <ul className="space-y-2">
                  {job.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted leading-relaxed flex gap-2"
                    >
                      <span className="text-accent mt-1 shrink-0">›</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certs in 2 columns */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
              Education
            </h3>
            {education.map((edu, index) => (
              <div key={index} className="p-4 rounded-lg bg-surface border border-border">
                <h4 className="text-sm font-semibold text-foreground">
                  {edu.degree}
                </h4>
                <p className="text-sm text-muted">
                  {edu.school} • {edu.year}
                </p>
                <p className="text-xs text-muted/70 mt-1">{edu.note}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-accent-light uppercase tracking-wider mb-4">
              Certifications
            </h3>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-surface border border-border text-sm text-muted"
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
