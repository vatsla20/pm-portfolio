"use client";
import { useEffect, useRef, useState } from "react";

type Stop = { slug: string; name: string; at: [number, number] };
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const dirOf = (a: [number, number], b: [number, number]) => {
  const dx = Math.sign(b[0] - a[0]), dy = Math.sign(b[1] - a[1]);
  const h = dx > 0 ? "right" : dx < 0 ? "left" : "", v = dy > 0 ? "down" : dy < 0 ? "up" : "";
  return dx && dy ? `diagonally ${v} and ${h}` : h || v;
};

export default function Camera({ stops, children }: { stops: Stop[]; children: React.ReactNode }) {
  const board = useRef<HTMLElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const el = board.current!, w = world.current!;
    const mq = matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
    let raf = 0, last = -1;

    const frame = () => {
      raf = 0;
      if (!mq.matches) return;
      const r = el.getBoundingClientRect();
      const run = el.offsetHeight - innerHeight;
      const p = Math.min(Math.max(-r.top / run, 0), 1) * (stops.length - 1);
      const i = Math.min(Math.floor(p), stops.length - 2);
      const t = ease(Math.min(Math.max((p - i - 0.2) / 0.6, 0), 1)); // hold at each stop, travel between
      const a = stops[i].at, b = stops[i + 1].at;
      const x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
      const s = 1 - 0.22 * Math.sin(Math.PI * t); // pull back mid-travel so the neighbours show
      const W = innerWidth, H = innerHeight;
      w.style.transform = `translate(${W / 2}px, ${H / 2}px) scale(${s}) translate(${-(x + 0.5) * W}px, ${-(y + 0.5) * H}px)`;
      const near = Math.round(p);
      if (near !== last) {
        last = near;
        setCur(near);
        const next = stops[near + 1];
        if (r.top < innerHeight / 2 && r.bottom > innerHeight / 2)
          dispatchEvent(new CustomEvent("guide", { detail: next ? `Related work sits ${dirOf(stops[near].at, next.at)}. Keep scrolling.` : "That's the board. Writing is next." }));
      }
      const moving = t > 0.02 && t < 0.98;
      document.documentElement.classList.toggle("walking", moving);
      document.documentElement.classList.toggle("walk-left", b[0] < a[0]);
    };
    const on = () => (raf ||= requestAnimationFrame(frame));
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);

    // Related chips: move the camera to that stop instead of jumping.
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("[data-jump],[data-doc]");
      if (!a) return;
      if (a.dataset.doc) {
        setTimeout(() => dispatchEvent(new CustomEvent("open-doc", { detail: a.dataset.doc })), 500);
        return;
      }
      if (!mq.matches) return;
      e.preventDefault();
      const k = stops.findIndex((s) => s.slug === a.dataset.jump);
      const top = el.getBoundingClientRect().top + scrollY + (k / (stops.length - 1)) * (el.offsetHeight - innerHeight);
      scrollTo({ top, behavior: "smooth" });
    };
    el.addEventListener("click", click);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      el.removeEventListener("click", click);
      cancelAnimationFrame(raf);
    };
  }, [stops]);

  return (
    <section id="work" ref={board} className="board" data-chapter="deep" style={{ "--stops": stops.length } as React.CSSProperties}>
      <div className="stage">
        <div className="board-head">
          <h2>Work, and what it connects to</h2>
          <p aria-live="polite">{stops[cur]?.name}, {cur + 1} of {stops.length}</p>
        </div>
        <p className="board-dir" aria-hidden="true">
          {stops[cur + 1] ? `Next, ${dirOf(stops[cur].at, stops[cur + 1].at)}: ${stops[cur + 1].name}` : "End of the board"}
        </p>
        <div className="world" ref={world}>{children}</div>
      </div>
    </section>
  );
}
