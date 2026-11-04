"use client";
import { useEffect, useRef } from "react";

// Scroll down, the row moves sideways. The section is exactly as tall as the row is wide, so nothing is skipped.
export default function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const r = rail.current!, t = track.current!, b = bar.current!;
    const mq = matchMedia("(min-width: 861px) and (prefers-reduced-motion: no-preference)");
    let raf = 0, travel = 0;
    const size = () => {
      if (!mq.matches) { r.style.height = ""; return; }
      travel = Math.max(0, t.scrollWidth - innerWidth + 24);
      r.style.height = `${travel + innerHeight}px`;
      frame();
    };
    const frame = () => {
      raf = 0;
      if (!mq.matches) return;
      const p = Math.min(Math.max(-r.getBoundingClientRect().top / Math.max(1, r.offsetHeight - innerHeight), 0), 1);
      t.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      b.style.scale = `${p} 1`;
      document.documentElement.classList.toggle("walk-left", false);
    };
    const on = () => (raf ||= requestAnimationFrame(frame));
    size();
    document.fonts?.ready.then(size);
    addEventListener("resize", size);
    addEventListener("depth", () => requestAnimationFrame(size));
    addEventListener("scroll", on, { passive: true });
    return () => { removeEventListener("resize", size); removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="rail" ref={rail}>
      <div className="rail-stage">
        <div className="rail-track" ref={track} role="list" aria-label={label}>{children}</div>
        <div className="rail-bar" aria-hidden="true"><span ref={bar} /></div>
      </div>
    </div>
  );
}
