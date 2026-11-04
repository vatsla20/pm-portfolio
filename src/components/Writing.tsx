"use client";
import { useRef, useState } from "react";
import Rail from "./Rail";

const articles = [
  {
    title: "Splitwise — Customer Discovery Study",
    type: "User Research",
    description:
      "A structured discovery study on how people manage shared money — research design, 6 interviews synthesized into prioritized findings, evidence-based personas, and opportunity areas. Honest about live vs. reconstructed data and confidence levels.",
    status: "Published",
    link: "/documents/splitwise/01-discovery-research.html",
  },
  {
    title: "Splitwise — Competitive Teardown",
    type: "Product Teardown",
    description:
      "A full competitive brief across 5 competitors and substitutes, with a feature matrix, positioning analysis, and the one unclaimed position in the category. Lands on a sharp strategic recommendation, not a list of screenshots.",
    status: "Published",
    link: "/documents/splitwise/02-competitive-teardown.html",
  },
  {
    title: "Smart Nudge — Product Requirements Document",
    type: "PRD",
    description:
      "A full PRD for a tactful settle-up reminder feature, grounded in the discovery findings: problem statement, goals, non-goals, user stories, P0/P1/P2 requirements with acceptance criteria, and leading/lagging success metrics.",
    status: "Published",
    link: "/documents/splitwise/03-prd.html",
  },
  {
    title: "Splitwise — Prioritized Roadmap (RICE)",
    type: "Strategy",
    description:
      "An 18-item backlog scored with RICE, then sequenced into Now/Next/Later with judgment layered on top — including three deliberate overrides of the raw ranking, each justified. Shows the reasoning, not just the arithmetic.",
    status: "Published",
    link: "/documents/splitwise/04-roadmap-rice.html",
  },
  {
    title: "Smart Nudge — Stakeholder Simulation",
    type: "Framework",
    description:
      "The same feature reframed for four audiences — engineering, design, marketing, and executive — foregrounding what each room cares about without changing what the feature is.",
    status: "Published",
    link: "/documents/splitwise/05-stakeholder-simulation.html",
  },
  {
    title: "The Feature That Made Me Quit Rapido",
    type: "Opinion",
    description:
      "A well-intentioned engagement feature, a live '28/60 drivers rejected your ride' counter shown while you wait, and why it backfires hardest at peak hour. How counting the wrong number strengthened the decision to switch apps in a category with almost no switching cost, and what I would have shown instead.",
    status: "Published",
    link: "/documents/rapido-rejection-counter.html",
  },
  {
    title: "Netflix Breaks Its Own Episode-Ordering Rule — On Purpose",
    type: "Opinion",
    description:
      "A small UI detail — episodes sorted newest-first for episodic shows, oldest-first for narrative series — and why it reveals a product sorting by user intent, not content format. The kind of decision users never notice but feel every session.",
    status: "Published",
    link: "/documents/netflix-episode-ordering.html",
  },
  {
    title: "Slack — How a Gaming Company Accidentally Built the Future of Work",
    type: "Product Teardown",
    description:
      "A teardown of Slack's journey from a failed game's internal chat tool to a $27B acquisition: the pivot, the 'email replacement' positioning, bottom-up PLG before it had a name, the Teams threat, and the PM lessons underneath.",
    status: "Published",
    link: "/documents/slack-product-teardown.html",
  },
  {
    title: "The Gap Between Building a Feature and Building a Product",
    type: "Opinion",
    description:
      "How building an EdTech product during COVID taught me the difference between solving for a moment vs. building for a long term market trajectory.",
    status: "Published",
    link: "/documents/market-gap.html",
  },
  {
    title: "DentistGPT - Product Requirements Document",
    type: "PRD",
    description:
      "A comprehensive PRD for a WhatsApp-based AI assistant that automates appointment scheduling for dental clinics, including technical architecture, Mermaid diagrams, and implementation roadmap.",
    status: "Published",
    link: "/documents/PRD.html",
  },
];

type Article = (typeof articles)[number];

export default function Writing() {
  const [open, setOpen] = useState<Article | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const read = (a: Article) => { setOpen(a); requestAnimationFrame(() => dlg.current?.showModal()); };

  return (
    <section id="writing" className="sec" style={{ paddingLeft: 0, paddingRight: 0 }} data-say="Pick one. It opens right here.">
      <div className="sec-head" style={{ padding: "0 var(--m)" }} data-reveal>
        <h2 className="display h2">Writing &amp; Product Thinking</h2>
        <p>
          Demonstrating how I think about products — teardowns, strategy pieces, and frameworks. The Splitwise pieces form one connected case study:
          discovery → competitive teardown → PRD → prioritized roadmap → stakeholder alignment.
        </p>
      </div>
      <Rail label="Writing">
        {articles.map((article) => (
          <button key={article.title} type="button" className="doc" role="listitem" onClick={() => read(article)}>
            <span className="tag-row"><span className="badge">{article.type}</span><span className="badge ghost">{article.status}</span></span>
            <span>
              <span className="t" style={{ display: "block" }}>{article.title}</span>
              <span className="muted d60" style={{ display: "block", marginTop: 12, fontSize: 15 }}>{article.description}</span>
            </span>
            <span className="open-hint">Read it here <span className="arrow" aria-hidden="true">→</span></span>
          </button>
        ))}
      </Rail>
      <dialog ref={dlg} className="reader" aria-label={open?.title} onClose={() => setOpen(null)} onClick={(e) => e.target === dlg.current && dlg.current?.close()}>
        {open && (
          <>
            <div className="reader-top">
              <p className="t">{open.title}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <a className="btn" href={open.link} target="_blank" rel="noopener">New tab</a>
                <form method="dialog"><button className="btn">Close</button></form>
              </div>
            </div>
            <div className="reader-screen"><iframe src={open.link} title={open.title} /></div>
          </>
        )}
      </dialog>
    </section>
  );
}
