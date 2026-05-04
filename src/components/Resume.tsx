const experience = [
  {
    title: "[Your Most Recent Job Title]",
    company: "[Company Name]",
    period: "[Start] – [End or Present]",
    bullets: [
      "Identified [user/business problem] through [method], leading to [solution] that achieved [quantified result]",
      "Collaborated with [teams/stakeholders] to deliver [project/initiative] within [timeline/constraints]",
      "Prioritized [competing demands] using [framework/criteria], resulting in [measurable improvement]",
      "Led discovery for [feature/product area] by conducting [X user interviews / analyzing Y data]",
    ],
  },
  {
    title: "[Previous Job Title]",
    company: "[Company Name]",
    period: "[Start] – [End]",
    bullets: [
      "[Action verb] + [what you did] + [for whom/with whom] + [measurable result]",
      "[Action verb] + [what you did] + [for whom/with whom] + [measurable result]",
      "[Action verb] + [what you did] + [for whom/with whom] + [measurable result]",
    ],
  },
  {
    title: "[Earlier Role]",
    company: "[Company Name]",
    period: "[Start] – [End]",
    bullets: [
      "[Action verb] + [what you did] + [for whom/with whom] + [measurable result]",
      "[Action verb] + [what you did] + [for whom/with whom] + [measurable result]",
    ],
  },
];

const education = [
  {
    degree: "[Your Degree]",
    school: "[University Name]",
    year: "[Year]",
    note: "[Relevant coursework, honors, or thesis if applicable]",
  },
];

const certifications = [
  "[PM Certificate — e.g., Product School, Reforge, Coursera]",
  "[Technical skill — e.g., SQL for Business Analytics, Google Analytics Cert]",
  "[Methodology — e.g., Certified Scrum Product Owner (CSPO)]",
];

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6 bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold">Resume</h2>
          {/* PLACEHOLDER: Link to your actual PDF */}
          <a
            href="#"
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

        {/* Experience */}
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
