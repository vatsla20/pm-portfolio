"use client";
import { useEffect, useState } from "react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";

const states: OrbState[] = ["searching", "connecting", "solving", "composing"];
const FACES = ["var(--f-doto)", "var(--f-pixel)", "var(--f-major)", "var(--f-orbit)", "var(--f-digit)", "var(--font)"];

// The name with a thinking orb in the gap; its letters flicker through tech faces while the count follows the real load.
export default function Loader() {
  const [pct, setPct] = useState(0);
  const [i, setI] = useState(0);
  const [face, setFace] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const done = () => { html.classList.add("ready"); dispatchEvent(new Event("site-ready")); };
    if (html.classList.contains("seen") || matchMedia("(prefers-reduced-motion: reduce)").matches) { done(); setGone(true); return; }
    const start = performance.now();
    let fonts = false, page = document.readyState === "complete";
    document.fonts.ready.then(() => (fonts = true));
    addEventListener("load", () => (page = true), { once: true });
    const orb = setInterval(() => setI((n) => (n + 1) % states.length), 420);
    const flick = setInterval(() => setFace((n) => (n + 1) % (FACES.length - 1)), 110);
    let raf = 0;
    const tick = () => {
      const t = Math.min((performance.now() - start) / 1500, 1);
      const real = (fonts ? 0.5 : 0.2) + (page ? 0.5 : 0);
      const p = Math.round(Math.min(t, real) * 100);
      setPct(p);
      if (p < 100) { raf = requestAnimationFrame(tick); return; }
      clearInterval(orb); clearInterval(flick);
      setFace(FACES.length - 1);
      try { sessionStorage.setItem("seen", "1"); } catch {}
      setTimeout(() => { setOut(true); done(); }, 250);
      setTimeout(() => setGone(true), 1200);
    };
    raf = requestAnimationFrame(tick);
    const cap = setTimeout(() => { page = true; fonts = true; }, 3000);
    return () => { cancelAnimationFrame(raf); clearInterval(orb); clearInterval(flick); clearTimeout(cap); };
  }, []);

  if (gone) return null;
  return (
    <div className={`loader${out ? " out" : ""}`} role="status" aria-label={`Loading, ${pct}%`}>
      <div className="loader-word" aria-hidden="true" style={{ fontFamily: FACES[face] }}>
        <span>Vatsla</span>
        <span className="loader-box"><ThinkingOrb state={states[i]} size={64} theme="light" /></span>
        <span>Khurana</span>
      </div>
      <div className="loader-foot" aria-hidden="true"><span>(Loading)</span><span>{pct}%</span></div>
    </div>
  );
}
