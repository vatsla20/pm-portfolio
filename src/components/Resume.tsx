"use client";
import { useEffect, useRef } from "react";
import Morph from "./Morph";

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

// "July 2025 – Present" → year big, months small, so the dates are the first thing the eye lands on
const split = (period: string) => {
  const [from, to] = period.split("–").map((x) => x.trim());
  const year = (x: string) => x.match(/\d{4}/)?.[0] ?? x;
  const end = to === "Present" ? "now" : to && year(to);
  return { big: end && end !== year(from) ? `${year(from)} – ${end}` : year(from), small: period };
};

export default function Resume() {
  const line = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  // The line fills as you scroll; each role lights when the fill reaches its dot.
  useEffect(() => {
    const el = line.current!, f = fill.current!;
    const jobs = [...el.querySelectorAll<HTMLElement>(".job")];
    let raf = 0, shown = 0;
    const frame = () => {
      const r = el.getBoundingClientRect();
      const reach = innerHeight * 0.62 - r.top;
      const goal = Math.min(Math.max(reach / r.height, 0), 1);
      shown += (goal - shown) * 0.14;
      if (Math.abs(goal - shown) < 0.001) shown = goal;
      f.style.scale = `1 ${shown}`;
      jobs.forEach((j) => j.classList.toggle("lit", j.offsetTop + 10 <= shown * r.height));
      raf = shown === goal ? 0 : requestAnimationFrame(frame);
    };
    const on = () => (raf ||= requestAnimationFrame(frame));
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    addEventListener("depth", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="resume" className="wrap sec" data-say="Watch the line. Every role lights up as you pass it.">
      <div className="sec-head" style={{ maxWidth: "none", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap" }}>
        <Morph as="h2" text="Resume" className="h2" />
        <a href="/resume.pdf" download="Vatsla_Khurana_Resume.pdf" className="btn primary"><span>Download PDF ↓</span></a>
      </div>

      <h3 className="sr">Experience</h3>
      <div className="timeline" ref={line}>
        <div className="track" aria-hidden="true"><span className="fill" ref={fill} /></div>
        {experience.map((job) => {
          const d = split(job.period);
          return (
            <div key={job.company + job.period} className="job">
              <p className="when"><b>{d.big}</b><span>{d.small}</span></p>
              <span className="dot" aria-hidden="true" />
              <div className="body">
                <h4>{job.title}</h4>
                <p className="company">{job.company}</p>
                <ul>
                  {job.bullets.map((bullet, i) => (
                    <li key={i} className={i > 1 ? "dfull" : i > 0 ? "d60" : undefined}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="edu">
        <div data-stagger>
          <h3>Education</h3>
          {education.map((edu, i) => (
            <div key={edu.degree} className="item" style={{ "--n": i + 1 } as React.CSSProperties}>
              <b>{edu.degree}</b>
              <p className="small dim">{edu.school} • {edu.year}</p>
              <p className="note">{edu.note}</p>
            </div>
          ))}
        </div>
        <div data-stagger>
          <h3>Certifications</h3>
          {certifications.map((cert, i) => (
            <div key={cert} className={`item${i > 3 ? " d60" : ""}`} style={{ "--n": i + 1 } as React.CSSProperties}>{cert}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
