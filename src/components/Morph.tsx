"use client";
import { useEffect, useRef } from "react";

// Tech faces a letter flickers through before it settles into the site's own face.
const FACES = ["var(--f-doto)", "var(--f-pixel)", "var(--f-major)", "var(--f-orbit)", "var(--f-digit)"];
const pick = () => FACES[(Math.random() * FACES.length) | 0];

/**
 * Text whose letters flip through tech typefaces and grow into place.
 * - grow: start small and scale up when it first comes into view
 * - idle: every few seconds one letter flips on its own
 * - hover: the letter under the pointer flips
 * Each letter's width is locked to its final face, so the line never jumps.
 */
export default function Morph({ text, className, grow = true, idle = false, as: Tag = "span" }: {
  text: string; className?: string; grow?: boolean; idle?: boolean; as?: "span" | "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const letters = [...root.querySelectorAll<HTMLElement>("[data-l]")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { root.classList.add("settled"); return; }
    const timers = new Set<number>();
    const later = (fn: () => void, ms: number) => { const id = window.setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); };

    const lock = () => letters.forEach((l) => { l.style.width = ""; l.style.fontFamily = ""; l.style.width = `${l.offsetWidth}px`; });
    const flip = (l: HTMLElement, steps: number, gap = 70) => {
      if (l.dataset.busy) return;
      l.dataset.busy = "1";
      for (let s = 0; s < steps; s++) later(() => (l.style.fontFamily = pick()), s * gap);
      later(() => { l.style.fontFamily = ""; delete l.dataset.busy; }, steps * gap);
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      lock();
      root.classList.add("go");
      letters.forEach((l, i) => flip(l, 5 + ((Math.random() * 6) | 0), 60 + i * 2));
      later(() => root.classList.add("settled"), 1200);
    };
    document.fonts.ready.then(() => {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return;
        const html = document.documentElement;
        if (html.classList.contains("ready")) start();
        else addEventListener("site-ready", start, { once: true });
        io.disconnect();
      }, { rootMargin: "0px 0px -15% 0px" });
      io.observe(root);
    });

    const over = (e: PointerEvent) => { const l = (e.target as HTMLElement).closest<HTMLElement>("[data-l]"); if (l) flip(l, 4); };
    root.addEventListener("pointerover", over);
    const tick = idle ? window.setInterval(() => !document.hidden && flip(letters[(Math.random() * letters.length) | 0], 4), 3200) : 0;
    addEventListener("resize", lock);
    return () => { timers.forEach(clearTimeout); clearInterval(tick); root.removeEventListener("pointerover", over); removeEventListener("resize", lock); };
  }, [idle]);

  return (
    <Tag ref={ref as never} className={`morph${grow ? " grow" : ""}${className ? ` ${className}` : ""}`} aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="morph-w" aria-hidden="true">
          {[...word].map((ch, i) => (
            <span key={i} data-l style={{ "--i": i + w * 6 } as React.CSSProperties}>{ch}</span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
