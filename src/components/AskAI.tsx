"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { projects, writing, person } from "@/data/site";

type Item = { label: string; kind: string; href?: string; doc?: string };

const steps = ["Reading your question", "Checking whether this needs a model", "It doesn't."];

// The joke with a point: "Ask AI" decides a model isn't needed and hands you a plain index.
export default function AskAI() {
  const ref = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(-1);
  const [q, setQ] = useState("");

  const index: Item[] = useMemo(
    () => [
      ...projects.map((p) => ({ label: p.name, kind: "Work", href: `/work/${p.slug}` })),
      ...writing.map((d) => ({ label: d.title, kind: d.kind, doc: d.slug })),
      { label: "Where a request stops", kind: "Thinking", href: "/#thinking" },
      { label: "Path and recognitions", kind: "About", href: "/#path" },
      { label: "Résumé, PDF", kind: "File", href: person.resume },
      { label: "Email Vatsla", kind: "Contact", href: `mailto:${person.email}` },
    ],
    [],
  );
  const hits = index.filter((i) => (i.label + " " + i.kind).toLowerCase().includes(q.trim().toLowerCase()));

  function open() {
    setQ("");
    setStep(0);
    ref.current?.showModal();
  }
  useEffect(() => {
    if (step < 0 || step >= steps.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 750);
    return () => clearTimeout(t);
  }, [step]);

  function pick(i: Item) {
    ref.current?.close();
    if (i.doc) {
      location.hash = "writing";
      setTimeout(() => window.dispatchEvent(new CustomEvent("open-doc", { detail: i.doc })), 400);
    } else if (i.href) location.href = i.href;
  }

  const done = step === steps.length - 1;
  return (
    <>
      <button type="button" onClick={open}>Ask AI</button>
      <dialog ref={ref} className="ask" aria-label="Ask AI" onClose={() => setStep(-1)}>
        <div className="ask-think" aria-live="polite">
          <ThinkingOrb state={done ? "breathing" : "solving"} size={64} />
          <p className="lead">{steps[Math.max(step, 0)]}</p>
        </div>
        {done && (
          <>
            <p>A list of everything here answers this faster. Type to filter it.</p>
            <label className="sr" htmlFor="ask-q">Filter the index</label>
            <input id="ask-q" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try ‘evals’ or ‘Splitwise’" />
            <ul>
              {hits.map((i) => (
                <li key={i.label}>
                  {i.href && !i.doc ? (
                    <a href={i.href} onClick={() => ref.current?.close()}><span>{i.label}</span><span className="muted">{i.kind}</span></a>
                  ) : (
                    <button type="button" onClick={() => pick(i)}><span>{i.label}</span><span className="muted">{i.kind}</span></button>
                  )}
                </li>
              ))}
            </ul>
            <p className="ask-foot">Answered by a filter over {index.length} items. Model calls: 0. Cost: ₹0.</p>
          </>
        )}
        <form method="dialog"><button className="btn" style={{ marginTop: 16 }}>Close</button></form>
      </dialog>
    </>
  );
}
