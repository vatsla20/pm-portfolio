"use client";
import { useEffect, useRef } from "react";

const N = 84, K = 7; // like a starling: each bird reads its seven nearest neighbours, never the whole flock

// Follows the pointer. Over anything with data-rel it splits and flies to the related items on screen.
export default function Swarm() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const c = ref.current!, g = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio, 1.5);
    const size = () => { c.width = innerWidth * dpr; c.height = innerHeight * dpr; };
    size();
    addEventListener("resize", size);

    const b = Array.from({ length: N }, () => ({ x: innerWidth * 0.8 + Math.random() * 80, y: innerHeight * 0.85 + Math.random() * 60, vx: 0, vy: 0, t: 0 }));
    let px = innerWidth * 0.75, py = innerHeight * 0.7, lastMove = 0;
    let targets: { x: number; y: number }[] = [];
    let color = "#ff2e88", raf = 0, tick = 0;
    const nb: number[][] = [];

    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY; lastMove = performance.now();
      const host = (e.target as HTMLElement).closest<HTMLElement>("[data-rel]");
      targets = [];
      if (host) for (const s of host.dataset.rel!.split(" ")) {
        document.querySelectorAll<HTMLElement>(`[data-slug="${s}"]`).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) targets.push({ x: r.left + 24, y: r.top + 24 });
        });
      }
    };
    addEventListener("pointermove", move, { passive: true });

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      if (tick++ % 30 === 0) color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || color;
      const idle = now - lastMove > 2500;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, innerWidth, innerHeight);
      g.fillStyle = color;
      g.globalAlpha = 0.55; // the flock stays behind the reading, never on top of it
      for (let i = 0; i < N; i++) {
        const p = b[i];
        // target: a related item, or the pointer; when idle, a slow loop around where the pointer rested
        let tx = px, ty = py;
        if (targets.length) { const t = targets[i % targets.length]; tx = t.x; ty = t.y; }
        else if (idle) { const a = now / 1400 + (i / N) * Math.PI * 2; tx += Math.cos(a) * 70; ty += Math.sin(a * 1.3) * 40; }
        // seven nearest neighbours only, re-chosen every few frames (birds don't re-count every instant)
        if (tick % 6 === i % 6 || !nb[i]) nb[i] = b.map((q, j) => ({ j, d: (q.x - p.x) ** 2 + (q.y - p.y) ** 2 })).sort((m, n) => m.d - n.d).slice(1, K + 1).map((n) => n.j);
        const near = nb[i].map((j) => ({ j, d: (b[j].x - p.x) ** 2 + (b[j].y - p.y) ** 2 }));
        let ax = 0, ay = 0, cx = 0, cy = 0, sx = 0, sy = 0;
        for (const { j, d } of near) {
          const q = b[j];
          ax += q.vx; ay += q.vy; cx += q.x; cy += q.y;
          if (d < 196) { sx += p.x - q.x; sy += p.y - q.y; }
        }
        p.vx += (ax / K - p.vx) * 0.05 + (cx / K - p.x) * 0.002 + sx * 0.03 + (tx - p.x) * 0.004 + (Math.random() - 0.5) * 0.3;
        p.vy += (ay / K - p.vy) * 0.05 + (cy / K - p.y) * 0.002 + sy * 0.03 + (ty - p.y) * 0.004 + (Math.random() - 0.5) * 0.3;
        const sp = Math.hypot(p.vx, p.vy), max = 7;
        if (sp > max) { p.vx *= max / sp; p.vy *= max / sp; }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx; p.y += p.vy;
        g.fillRect(p.x - 1.2, p.y - 1.2, 2.4, 2.4);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("pointermove", move); };
  }, []);
  return <canvas ref={ref} className="swarm" aria-hidden="true" />;
}
