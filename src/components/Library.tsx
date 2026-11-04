"use client";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { writing, titleOf, type Doc } from "@/data/site";

const kinds = ["All", ...Array.from(new Set(writing.map((d) => d.kind)))];

// A listing that rearranges itself (View Transitions where supported) and opens each piece in place.
export default function Library() {
  const [kind, setKind] = useState("All");
  const [open, setOpen] = useState<Doc | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);

  function filter(k: string) {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches)
      doc.startViewTransition(() => flushSync(() => setKind(k)));
    else setKind(k);
  }
  function read(d: Doc) {
    setOpen(d);
    requestAnimationFrame(() => dlg.current?.showModal());
  }
  useEffect(() => {
    const on = (e: Event) => {
      const d = writing.find((x) => x.slug === (e as CustomEvent).detail);
      if (d) read(d);
    };
    addEventListener("open-doc", on);
    return () => removeEventListener("open-doc", on);
  }, []);

  const shown = writing.filter((d) => kind === "All" || d.kind === kind);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by kind">
        {kinds.map((k) => (
          <button key={k} type="button" className="btn" aria-pressed={k === kind} onClick={() => filter(k)}>{k}</button>
        ))}
      </div>
      <div className="lib">
        {shown.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            className={`doc${(kind === "All" ? i % 5 === 0 : i === 0) ? " wide" : ""}`}
            style={{ "--vt": `doc-${d.slug}` } as React.CSSProperties}
            data-slug={d.slug}
            data-rel={d.related.join(" ")}
            onClick={() => read(d)}
          >
            <span className="k">{d.kind}{d.series ? `, ${d.series} series` : ""}</span>
            <span>
              <span className="t">{d.title}</span>
              <span className="d60" style={{ display: "block", marginTop: 10 }}>{d.t30}</span>
              <span className="dfull" style={{ display: "block", marginTop: 8 }}>{d.t60}</span>
            </span>
          </button>
        ))}
      </div>
      <dialog ref={dlg} className="reader" aria-label={open?.title} onClose={() => setOpen(null)}>
        {open && (
          <div className="reader-in">
            <div className="reader-top">
              <div>
                <p className="lead semi">{open.title}</p>
                <p className="d60" style={{ marginTop: 6, maxWidth: "64ch" }}>{open.t60}</p>
                <p className="small muted" style={{ marginTop: 6 }}>Connects to: {open.related.map(titleOf).join(", ")}</p>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <a className="btn" href={open.href} target="_blank" rel="noopener">New tab</a>
                <form method="dialog"><button className="btn primary">Close</button></form>
              </div>
            </div>
            <iframe src={open.href} title={open.title} />
          </div>
        )}
      </dialog>
    </>
  );
}
