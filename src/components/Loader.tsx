"use client";
import { useEffect, useState } from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";

const states: OrbState[] = ["searching", "connecting", "solving", "composing"];

// The name with a thinking orb in the gap, and a count that follows the real load: fonts, then the page.
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains("seen") || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.add("ready");
      setGone(true);
      return;
    }
    const start = performance.now();
    let fonts = false, page = document.readyState === "complete";
    document.fonts.ready.then(() => (fonts = true));
    addEventListener("load", () => (page = true), { once: true });
    const orb = setInterval(() => setI((n) => (n + 1) % states.length), 420);
    let raf = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / 1400, 1); // at least 1.4 s so the moment reads
      const real = (fonts ? 0.5 : 0.2) + (page ? 0.5 : 0);
      const p = Math.round(Math.min(t, real) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        clearInterval(orb);
        try { sessionStorage.setItem("seen", "1"); } catch {}
        setOut(true);
        html.classList.add("ready");
        setTimeout(() => setGone(true), 600);
      }
    };
    raf = requestAnimationFrame(tick);
    const cap = setTimeout(() => { page = true; fonts = true; }, 3000);
    return () => { cancelAnimationFrame(raf); clearInterval(orb); clearTimeout(cap); };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${out ? " out" : ""}`} role="status" aria-label={`Loading, ${pct}%`}>
      <div className="loader-word display" aria-hidden="true">
        <span>Vatsla</span>
        <span className="loader-box"><ThinkingOrb state={states[i]} size={64} theme="light" /></span>
        <span>Khurana</span>
      </div>
      <div className="loader-foot" aria-hidden="true"><span>(Loading)</span><span>{pct}%</span></div>
    </div>
  );
}
