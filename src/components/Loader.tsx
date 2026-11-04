"use client";
import { useEffect, useState } from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";

type State = OrbState;
const beats: { orb: State; line: string }[] = [
  { orb: "searching", line: "Reading everything I've written" },
  { orb: "solving", line: "Keeping what your time can hold" },
];

// The first thing anyone sees: the site doing to its own content what I do to a context window.
export default function Loader({ total }: { total: number }) {
  const [i, setI] = useState(0);
  const [kept, setKept] = useState<number | null>(null);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen") || matchMedia("(prefers-reduced-motion: reduce)").matches) { setGone(true); return; }
    const start = performance.now();
    const step = setInterval(() => setI((n) => Math.min(n + 1, beats.length - 1)), 520);
    const main = document.querySelector<HTMLElement>("main");
    setKept(main ? main.innerText.split(/\s+/).filter(Boolean).length : null);
    const finish = () => {
      clearInterval(step);
      setI(beats.length - 1);
      setOut(true);
      try { sessionStorage.setItem("seen", "1"); } catch {}
      setTimeout(() => setGone(true), 500);
    };
    const cap = setTimeout(finish, 900);
    document.fonts.ready.then(() => {
      const wait = Math.max(0, 760 - (performance.now() - start));
      setTimeout(() => { clearTimeout(cap); finish(); }, wait);
    });
    return () => { clearInterval(step); clearTimeout(cap); };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${out ? " out" : ""}`} role="status" aria-label="Loading">
      <div className="loader-in">
        <ThinkingOrb state={beats[i].orb} size={64} theme="dark" />
        <p className="loader-line">{beats[i].line}</p>
        <p className="loader-count">
          {total.toLocaleString("en-IN")} words of work{kept ? `, ${kept.toLocaleString("en-IN")} kept for this page` : ""}
        </p>
      </div>
    </div>
  );
}
