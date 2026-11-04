"use client";
import { useEffect, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";

const depths = ["30", "60", "full"] as const;
const names = { "30": "The gist", "60": "The highlights", full: "Everything" };
const WPM = 238; // average adult silent reading speed
const READ = "h1, h2, h3, h4, p, li";
const SKIP = "button, .budget-card, .guide, nav, .loader, .curtain";

// Count what a person would read at the current depth; hidden text doesn't count.
function seconds() {
  const root = document.querySelector<HTMLElement>("main");
  if (!root) return 0;
  let words = 0;
  root.querySelectorAll<HTMLElement>(READ).forEach((el) => {
    if (el.closest(SKIP) || el.parentElement?.closest(READ) || !el.getClientRects().length) return;
    words += el.innerText.split(/\s+/).filter(Boolean).length;
  });
  return (words / WPM) * 60;
}
const fmt = (s: number) => (s < 90 ? `${Math.max(10, Math.round(s / 10) * 10)} seconds` : `${Math.round(s / 60)} minutes`);

// How long do you have? Each button is a reading time measured on this page; picking one compresses the page to fit.
export default function Budget() {
  const [depth, setDepth] = useState("full");
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const html = document.documentElement;
    const mine = html.dataset.depth || "full";
    setDepth(mine);
    const measure = () => {
      const t: Record<string, string> = {};
      for (const d of depths) { html.dataset.depth = d; t[d] = fmt(seconds()); }
      html.dataset.depth = mine;
      setTimes(t);
    };
    const id = setTimeout(measure, 150);
    document.fonts?.ready.then(() => setTimeout(measure, 50));
    return () => clearTimeout(id);
  }, []);

  function pick(v: string) {
    setDepth(v);
    document.documentElement.dataset.depth = v;
    try { localStorage.setItem("depth", v); } catch {}
    dispatchEvent(new Event("depth"));
  }

  return (
    <div className="budget-card" role="group" aria-labelledby="budget-q">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <p id="budget-q" className="lead" style={{ fontWeight: 700, maxWidth: "14ch" }}>How long do you have?</p>
        <ThinkingOrb state="working" size={64} theme="dark" />
      </div>
      <div>
        <div className="budget-b">
          {depths.map((d) => (
            <button key={d} type="button" className="btn" aria-pressed={depth === d} onClick={() => pick(d)}>
              <span>{times[d] ?? names[d]}</span>
            </button>
          ))}
        </div>
        <p className="budget-note" style={{ marginTop: 14 }}>
          {names[depth as keyof typeof names]}. The page reshapes to fit; times are measured on it at {WPM} words a minute.
        </p>
      </div>
    </div>
  );
}
