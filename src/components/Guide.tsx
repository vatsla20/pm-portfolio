"use client";
import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";

const SKIN = "#b97a57", SKIN_SHADE = "#a3684a", HAIR = "#2a1c15", TOP = "#c2571a", INK = "#1c1a17", IVORY = "#f4eee3";

// An illustrated guide, cut out like a sticker: she sways, breathes, blinks, walks while you scroll,
// waves when a new section arrives and points at whatever you hover.
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
      <ellipse cx="60" cy="238" rx="30" ry="4" fill={INK} opacity="0.18" />
      <g filter="url(#cutout)">
        <g className="g-sway">
          {/* ponytail, behind the head */}
          <path className="g-tail" d="M74 30c14 4 18 22 14 40-2 9-7 15-11 17 3-10 3-24-4-34-3-5-5-12 1-23z" fill={HAIR} />
          {/* back arm */}
          <g className="g-arm b">
            <path d="M80 72c6 2 9 6 10 12l3 26c1 6-3 8-6 3l-6-24z" fill={TOP} />
            <path d="M89 108l4 18c1 4-1 7-4 6l-3-1-2-21z" fill={SKIN_SHADE} />
          </g>
          {/* legs */}
          <g className="g-leg a"><path d="M50 138h11l-1 82h-9z" fill={INK} /><path d="M49 218h12c4 0 8 3 8 7H48z" fill={IVORY} stroke={INK} strokeWidth="1.2" /></g>
          <g className="g-leg b"><path d="M60 138h11l-1 82h-9z" fill="#2b2824" /><path d="M60 218h11c4 0 8 3 8 7H59z" fill={IVORY} stroke={INK} strokeWidth="1.2" /></g>
          {/* body */}
          <g className="g-breathe">
            <path d="M52 62h16v10H52z" fill={SKIN_SHADE} />
            <path d="M40 76c0-7 8-11 20-11s20 4 20 11l3 62c0 4-3 6-6 6H43c-3 0-6-2-6-6z" fill={TOP} />
            <path d="M50 66c3 6 7 9 10 9s7-3 10-9" fill="none" stroke={IVORY} strokeWidth="2.2" strokeLinecap="round" />
            <path d="M44 120h32" stroke="#a84a16" strokeWidth="1.4" opacity="0.6" />
          </g>
          {/* head */}
          <g className="g-head">
            <ellipse cx="42.5" cy="40" rx="3" ry="4.4" fill={SKIN_SHADE} />
            <ellipse cx="77.5" cy="40" rx="3" ry="4.4" fill={SKIN_SHADE} />
            <circle cx="42" cy="46" r="1.6" fill={TOP} />
            <circle cx="78" cy="46" r="1.6" fill={TOP} />
            <ellipse cx="60" cy="40" rx="17" ry="20.5" fill={SKIN} />
            <path d="M42 36c-1-14 8-22 19-22 12 0 20 8 18 22-4-6-9-10-16-11-4 5-12 9-21 11z" fill={HAIR} />
            <g className="g-eyes">
              <ellipse cx="53.5" cy="41" rx="1.9" ry="2.4" fill={INK} />
              <ellipse cx="66.5" cy="41" rx="1.9" ry="2.4" fill={INK} />
            </g>
            <path d="M50 35.5q3.5-2 7 0M63 35.5q3.5-2 7 0" fill="none" stroke={HAIR} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M60 43v4.5l-1.8 1" fill="none" stroke={SKIN_SHADE} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M54.5 52q5.5 4.5 11 0" fill="none" stroke="#7c3b22" strokeWidth="1.7" strokeLinecap="round" />
            <ellipse cx="49" cy="48" rx="3" ry="1.7" fill={TOP} opacity="0.22" />
            <ellipse cx="71" cy="48" rx="3" ry="1.7" fill={TOP} opacity="0.22" />
          </g>
          {/* front arm with a tablet */}
          <g className="g-arm a">
            <path d="M40 72c-6 2-9 6-10 12l-3 26c-1 6 3 8 6 3l6-24z" fill={TOP} />
            <path d="M31 108l-3 18c-1 4 1 7 4 6l3-1 2-21z" fill={SKIN} />
            <rect className="g-tab" x="22" y="118" width="22" height="29" rx="3" fill={INK} transform="rotate(-8 33 132)" />
            <rect className="g-tab" x="25" y="121" width="16" height="22" rx="1.5" fill={TOP} opacity="0.55" transform="rotate(-8 33 132)" />
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
