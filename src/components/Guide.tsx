"use client";
import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";

const SKIN = "#d29a74", SKIN_SHADE = "#b9805c", HAIR = "#1f1512", HAIR_LIGHT = "#3a2a22", BLAZER = "#1c1a17", LAPEL = "#35312c", TOP = "#efe6d6", GOLD = "#c9a04a", LIP = "#b5525a", IVORY = "#f4eee3";

// Vatsla, illustrated and cut out like a sticker: long hair worn down and side-swept, gold hoops,
// a flower pendant, a black blazer over an ivory top. She sways, breathes, blinks, walks while you
// scroll, waves when a new section arrives and points at whatever you hover.
export function Figure() {
  return (
    <svg viewBox="0 0 120 244" aria-hidden="true">
      <defs>
        <filter id="cutout" x="-20%" y="-10%" width="140%" height="120%">
          <feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="grow" />
          <feFlood floodColor={IVORY} />
          <feComposite in2="grow" operator="in" result="edge" />
          <feMerge><feMergeNode in="edge" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="60" cy="238" rx="30" ry="4" fill={BLAZER} opacity="0.18" />
      <g filter="url(#cutout)">
        <g className="g-sway">
          {/* hair behind: long, worn down, longer on her left */}
          <g className="g-hair">
            <ellipse cx="60" cy="38" rx="22" ry="24" fill={HAIR} />
            <path d="M39 36c-4 22-5 50-1 74l10-3c-3-22-2-46 2-64z" fill={HAIR} />
            <path d="M81 34c6 24 9 60 5 94-7-1-12-5-14-10 4-28 3-58-4-77z" fill={HAIR} />
          </g>
          {/* back arm */}
          <g className="g-arm b">
            <path d="M80 74c6 2 9 6 10 12l3 26c1 6-3 8-6 3l-6-24z" fill={BLAZER} />
            <path d="M89 110l3 16c1 4-1 7-4 6l-3-1-1-19z" fill={SKIN_SHADE} />
          </g>
          {/* legs */}
          <g className="g-leg a"><path d="M50 140h11l-1 80h-9z" fill={BLAZER} /><path d="M49 218h12c4 0 7 3 7 7H48z" fill={BLAZER} /></g>
          <g className="g-leg b"><path d="M60 140h11l-1 80h-9z" fill="#2b2824" /><path d="M60 218h11c4 0 7 3 7 7H59z" fill={BLAZER} /></g>
          {/* body: blazer over an ivory top, a fine gold chain and a flower pendant */}
          <g className="g-breathe">
            <path d="M53 60h14v12H53z" fill={SKIN_SHADE} />
            <path d="M38 80c0-9 9-13 22-13s22 4 22 13l3 62c0 4-3 6-6 6H41c-3 0-6-2-6-6z" fill={BLAZER} />
            <path d="M50 69l10 32 10-32c-3-1-6-2-10-2s-7 1-10 2z" fill={TOP} />
            <path d="M52.5 70q7.5 14 15 0" fill="none" stroke={GOLD} strokeWidth="0.7" />
            <g transform="translate(60 84)" fill="none" stroke={GOLD} strokeWidth="0.9">
              <circle r="1.1" /><circle cx="0" cy="-2" r="1.1" /><circle cx="1.9" cy="-0.6" r="1.1" /><circle cx="1.2" cy="1.6" r="1.1" /><circle cx="-1.2" cy="1.6" r="1.1" /><circle cx="-1.9" cy="-0.6" r="1.1" />
            </g>
            <path d="M49 69l7 30M71 69l-7 30" stroke={LAPEL} strokeWidth="2.4" strokeLinecap="round" />
            <path d="M47 120h4M69 120h4" stroke={LAPEL} strokeWidth="1.6" strokeLinecap="round" />
          </g>
          {/* head */}
          <g className="g-head">
            <ellipse cx="43.5" cy="41" rx="2.6" ry="4" fill={SKIN_SHADE} />
            <ellipse cx="76.5" cy="41" rx="2.6" ry="4" fill={SKIN_SHADE} />
            <circle cx="43" cy="47.5" r="2.3" fill="none" stroke={GOLD} strokeWidth="1.1" />
            <circle cx="77" cy="47.5" r="2.3" fill="none" stroke={GOLD} strokeWidth="1.1" />
            <ellipse cx="60" cy="40" rx="16.5" ry="20" fill={SKIN} />
            {/* side part, hair swept across the forehead */}
            <path d="M43 36c-1-14 7-22 18-22 11 0 19 8 18 22-3-7-8-11-14-12-6 4-14 8-22 12z" fill={HAIR} />
            <path d="M62 15c6 1 11 5 13 11" fill="none" stroke={HAIR_LIGHT} strokeWidth="1.1" strokeLinecap="round" />
            <path d="M49.5 33.5q4-2.6 8 -0.4M62.5 33.1q4-2.2 8 0.4" fill="none" stroke={HAIR} strokeWidth="2.1" strokeLinecap="round" />
            <g className="g-eyes">
              <ellipse cx="53.5" cy="39.5" rx="2.3" ry="1.9" fill={BLAZER} />
              <ellipse cx="66.5" cy="39.5" rx="2.3" ry="1.9" fill={BLAZER} />
              <circle cx="54.2" cy="38.9" r="0.55" fill={IVORY} />
              <circle cx="67.2" cy="38.9" r="0.55" fill={IVORY} />
            </g>
            <path d="M60 41v5.5l-2 1" fill="none" stroke={SKIN_SHADE} strokeWidth="1.3" strokeLinecap="round" />
            {/* the wide smile, teeth showing */}
            <path d="M52 50.5q8 9 16 0q-8 2.4-16 0z" fill={LIP} />
            <path d="M54 51.2q6 3.4 12 0q-6 1.2-12 0z" fill={IVORY} />
            <ellipse cx="48.5" cy="47" rx="3.2" ry="1.8" fill={LIP} opacity="0.18" />
            <ellipse cx="71.5" cy="47" rx="3.2" ry="1.8" fill={LIP} opacity="0.18" />
          </g>
          {/* hair that falls in front of her left shoulder */}
          <path className="g-hair" d="M75 42c7 18 9 48 6 78-4-2-7-6-8-11 2-22 1-46-4-62z" fill={HAIR} />
          {/* front arm with a tablet */}
          <g className="g-arm a">
            <path d="M40 74c-6 2-9 6-10 12l-3 26c-1 6 3 8 6 3l6-24z" fill={BLAZER} />
            <path d="M31 110l-2 16c-1 4 1 7 4 6l3-1 1-19z" fill={SKIN} />
            <rect x="22" y="118" width="22" height="29" rx="3" fill={BLAZER} transform="rotate(-8 33 132)" />
            <rect x="25" y="121" width="16" height="22" rx="1.5" fill="#c2571a" opacity="0.6" transform="rotate(-8 33 132)" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default function Guide() {
  const [say, setSay] = useState("Hi! Pick how long you have, I’ll keep up.");
  const [shown, setShown] = useState("");
  const [state, setState] = useState({ walk: false, left: false, point: false, wave: false });
  const [quiet, setQuiet] = useState(false);
  const timers = useRef<number[]>([]);

  // type the line out, one character at a time
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(say); return; }
    setShown("");
    setQuiet(false);
    timers.current.push(window.setTimeout(() => setQuiet(true), 22 * say.length + 3800));
    timers.current.push(...[...say].map((_, i) => window.setTimeout(() => setShown(say.slice(0, i + 1)), 22 * i)));
    setState((s) => ({ ...s, wave: true }));
    timers.current.push(window.setTimeout(() => setState((s) => ({ ...s, wave: false })), 1700));
  }, [say]);

  useEffect(() => {
    let t = 0, lastY = scrollY;
    const onSay = (e: Event) => setSay((e as CustomEvent).detail);
    const onScroll = () => {
      const left = scrollY < lastY;
      lastY = scrollY;
      setState((s) => (s.walk && s.left === left ? s : { ...s, walk: true, left }));
      clearTimeout(t);
      t = window.setTimeout(() => setState((s) => ({ ...s, walk: false })), 200);
    };
    const onOver = (e: PointerEvent) => {
      const hit = !!(e.target as HTMLElement).closest?.(".project, .doc, .btn, .contact-rows a");
      setState((s) => (s.point === hit ? s : { ...s, point: hit }));
    };
    addEventListener("guide", onSay);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointerover", onOver);
    return () => { removeEventListener("guide", onSay); removeEventListener("scroll", onScroll); removeEventListener("pointerover", onOver); };
  }, []);

  const typing = shown.length < say.length;
  const cls = ["guide", state.walk && "walk", state.left && "left", state.point && "point", state.wave && "wave", quiet && "quiet"].filter(Boolean).join(" ");
  return (
    <div className={cls} aria-hidden="true">
      <div className="guide-say">
        <span className="guide-orb"><ThinkingOrb state={typing ? "composing" : "breathing"} size={20} theme="dark" /></span>
        <span>{shown}<span className="caret" /></span>
      </div>
      <Figure />
    </div>
  );
}
