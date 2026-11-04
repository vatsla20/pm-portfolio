"use client";
import { useEffect, useState } from "react";

// A small figure who walks while you scroll, faces the way the camera moves and points at what's related.
export function Figure() {
  return (
    <svg viewBox="0 0 58 92" aria-hidden="true">
      <rect className="leg a" x="22" y="58" width="6" height="28" fill="var(--ink)" />
      <rect className="leg b" x="30" y="58" width="6" height="28" fill="var(--ink)" />
      <rect className="arm b" x="38" y="30" width="5" height="22" rx="2.5" fill="#e9b894" />
      <path d="M21 28h16l6 34H15z" fill="var(--accent)" />
      <rect className="arm a" x="15" y="30" width="5" height="22" rx="2.5" fill="#e9b894" />
      <circle cx="29" cy="16" r="10" fill="#e9b894" />
      <path d="M18.5 16a10.5 10.5 0 0 1 21 0c-3-4-8-6-14-4-3 1-5 2-7 4z" fill="var(--ink)" />
      <path className="tail" d="M38 9c7 0 11 6 9 14-1 4-4 6-6 5 2-4 2-9-3-13z" fill="var(--ink)" />
      <circle cx="33" cy="17" r="1.3" fill="var(--ink)" />
    </svg>
  );
}

export default function Guide() {
  const [say, setSay] = useState("Pick your time. I’ll pack the page to fit.");
  const [cls, setCls] = useState("");
  const [point, setPoint] = useState(false);
  useEffect(() => {
    let t = 0;
    const onSay = (e: Event) => setSay((e as CustomEvent).detail);
    const onScroll = () => {
      const h = document.documentElement.classList;
      setCls(`walk${h.contains("walk-left") ? " left" : ""}`);
      clearTimeout(t);
      t = window.setTimeout(() => setCls(h.contains("walk-left") ? "left" : ""), 180);
    };
    const onOver = (e: PointerEvent) => {
      const rel = (e.target as HTMLElement).closest?.("[data-rel]");
      setPoint(!!rel);
    };
    addEventListener("guide", onSay);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointerover", onOver);
    return () => { removeEventListener("guide", onSay); removeEventListener("scroll", onScroll); removeEventListener("pointerover", onOver); };
  }, []);
  return (
    <div className={`guide ${cls}${point ? " point" : ""}`} aria-hidden="true">
      <p className="guide-say">{say}</p>
      <Figure />
    </div>
  );
}
