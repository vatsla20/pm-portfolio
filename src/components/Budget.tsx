"use client";
import { useEffect, useState } from "react";

const depths = ["30", "60", "full"] as const;
const names = { "30": "The gist", "60": "The reasoning", full: "Everything" };
const WPM = 238; // average adult silent reading speed
// What a person reads. Controls, interface samples, credits and the footer don't count.
const READ = "h1, h2, h3, p, li";
const SKIP = "button, [data-ui], .budget, .guide, footer, nav, .board-dir, .board-head p";

function seconds(scope: string) {
  const root = document.querySelector<HTMLElement>(scope);
  if (!root) return 0;
  let words = 0;
  root.querySelectorAll<HTMLElement>(READ).forEach((el) => {
    if (el.closest(SKIP) || el.parentElement?.closest(READ) || !el.getClientRects().length) return; // skip hidden
    words += el.innerText.split(/\s+/).filter(Boolean).length;
  });
  return (words / WPM) * 60;
}
const fmt = (s: number) => (s < 90 ? `${Math.max(10, Math.round(s / 10) * 10)} seconds` : `${Math.round(s / 60)} minutes`);

// The live thing: the visitor's time is the context window, and the page compresses itself to fit.
export default function Budget({ line, scope = "main" }: { line?: string; scope?: string }) {
  const [depth, setDepth] = useState("60");
  const [times, setTimes] = useState<Record<string, string>>({});

  // Measure each depth on the real page: set it, count what's visible, put the visitor's choice back.
  useEffect(() => {
    const html = document.documentElement;
    const mine = html.dataset.depth || "60";
    setDepth(mine);
    const measure = () => {
      const t: Record<string, string> = {};
      for (const d of depths) { html.dataset.depth = d; t[d] = fmt(seconds(scope)); }
      html.dataset.depth = mine;
      setTimes(t);
    };
    const id = setTimeout(measure, 150);
    return () => clearTimeout(id);
  }, [scope]);

  function pick(v: string) {
    setDepth(v);
    document.documentElement.dataset.depth = v;
    document.documentElement.classList.add("rebudget");
    try { localStorage.setItem("depth", v); } catch {}
    dispatchEvent(new Event("depth"));
  }

  const controls = (
    <div className="budget" role="group" aria-label="How long do you have?">
      <div className="budget-b">
        {depths.map((d) => (
          <button key={d} type="button" className="btn" aria-pressed={depth === d} onClick={() => pick(d)}>
            {times[d] ?? names[d]}
          </button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="hero-row">
      <p>
        {line} How long do you have?
        <span aria-live="polite">{times[depth] ? `${names[depth as keyof typeof names]}, measured on this page at ${WPM} words a minute.` : ""}</span>
      </p>
      {controls}
    </div>
  );
}
