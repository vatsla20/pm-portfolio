"use client";
import { useEffect, useRef, useState } from "react";

// Scroll down, the row glides sideways. Movement eases toward the scroll position instead of
// jumping with it, and each card grows and brightens as it reaches the centre.
export default function Rail({ children, label, count }: { children: React.ReactNode; label: string; count: number }) {
  const rail = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [at, setAt] = useState(1);

  useEffect(() => {
    const r = rail.current!, t = track.current!, b = bar.current!, st = stage.current!;
    let TOP = 96;
    const cards = [...t.children] as HTMLElement[];
    const mq = matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let raf = 0, travel = 0, x = 0, live = false;

    const size = () => {
      if (!mq.matches) { r.style.height = ""; return; }
      travel = Math.max(0, t.scrollWidth - innerWidth);
      TOP = Math.max(96, (innerHeight - st.offsetHeight) / 2 + 30); // sit in the middle of the screen, whatever its height
      st.style.top = `${TOP}px`;
      r.style.height = `${travel * 1.15 + st.offsetHeight}px`; // a little extra scroll so each card can be read
      kick();
    };
    const target = () => {
      const p = Math.min(Math.max((TOP - r.getBoundingClientRect().top) / Math.max(1, r.offsetHeight - st.offsetHeight), 0), 1);
      return { p, x: p * travel };
    };
    const frame = () => {
      raf = 0;
      if (!mq.matches) return;
      const goal = target();
      x += (goal.x - x) * 0.11;
      if (Math.abs(goal.x - x) < 0.3) x = goal.x;
      t.style.transform = `translate3d(${-x}px, 0, 0)`;
      b.style.scale = `${goal.p} 1`;
      const mid = innerWidth / 2;
      let best = 0, bestD = Infinity;
      cards.forEach((c, i) => {
        const box = c.getBoundingClientRect();
        const d = Math.abs(box.left + box.width / 2 - mid) / innerWidth;
        if (d < bestD) { bestD = d; best = i; }
        const k = Math.min(d * 1.6, 1);
        c.style.transform = `scale(${1 - k * 0.08}) translateY(${k * 18}px)`;
        c.style.opacity = String(1 - k * 0.45);
      });
      setAt(best + 1);
      if (x !== goal.x || live) raf = requestAnimationFrame(frame);
    };
    const kick = () => (raf ||= requestAnimationFrame(frame));
    const io = new IntersectionObserver(([e]) => { live = e.isIntersecting; if (live) kick(); });
    io.observe(r);
    size();
    document.fonts?.ready.then(size);
    addEventListener("resize", size);
    addEventListener("depth", () => requestAnimationFrame(size));
    addEventListener("scroll", kick, { passive: true });
    return () => { io.disconnect(); removeEventListener("resize", size); removeEventListener("scroll", kick); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="rail" ref={rail}>
      <div className="rail-stage" ref={stage}>
        <div className="rail-track" ref={track} role="list" aria-label={label}>{children}</div>
        <div className="rail-foot" aria-hidden="true">
          <span>{at} of {count}</span>
          <span className="rail-bar"><span ref={bar} /></span>
          <span>Keep scrolling</span>
        </div>
      </div>
    </div>
  );
}
