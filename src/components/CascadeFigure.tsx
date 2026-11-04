"use client";
import { useEffect, useRef } from "react";
import fig from "@/figure/cascade.json";
import "@/figure/iso.css";
import { tiers } from "@/data/site";

type V3 = [number, number, number];
const SPEED = 110; // world units per second

// The token's route for a request of tier t: out of the hopper, across each cup too small for it,
// down each step, into the first cup that holds it.
function route(t: number): V3[][] {
  const { X, W, H, CX, COIN, start } = fig;
  const r = COIN[t];
  const legs: V3[][] = [[[start[0], start[1], H[0]], [start[0], 0, H[0]]]];
  let here: V3 = [start[0], 0, H[0]];
  for (let i = 0; i <= t; i++) {
    const cup: V3 = [CX[i], 0, H[i]];
    legs.push([here, cup]);
    if (i === t) { legs.push([cup, [CX[i], 0, H[i] - 1]]); break; }
    const edge: V3 = [X[i] + W[i] + r * 0.4, 0, H[i]];
    const land: V3 = [X[i + 1] + r + 3, 0, H[i + 1]];
    legs.push([cup, edge], [edge, land, [1, 0, 0]]); // third entry marks a hop
    here = land;
  }
  return legs;
}

export default function CascadeFigure({ tier }: { tier: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = stage.current!.querySelector("svg")!;
    const coins = [...svg.querySelectorAll<SVGGElement>("[data-coin]")];
    const coin = coins[tier];
    coins.forEach((c, i) => (c.style.display = i === tier ? "" : "none"));
    const place = ([x, y, z]: V3) => {
      const sx = x * fig.ax[0] + y * fig.ay[0] + z * fig.az[0];
      const sy = x * fig.ax[1] + y * fig.ay[1] + z * fig.az[1];
      coin.setAttribute("transform", `translate(${sx.toFixed(2)} ${sy.toFixed(2)})`);
    };
    const legs = route(tier);
    const lengths = legs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
    const total = lengths.reduce((s, l) => s + l, 0);
    const say = (moving: boolean) => {
      if (readout.current) readout.current.textContent = moving ? "sorting…" : `stopped at ${tiers[tier].tool.split(",")[0].toLowerCase()} · ${tiers[tier].cost}`;
    };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(legs.at(-1)![1]);
      say(false);
      return;
    }
    let raf = 0, t0 = 0;
    const frame = (now: number) => {
      t0 ||= now;
      let d = ((now - t0) / 1000) * SPEED;
      say(d < total);
      for (let i = 0; i < legs.length; i++) {
        const [a, b, hop] = legs[i];
        if (d > lengths[i] && i < legs.length - 1) { d -= lengths[i]; continue; }
        const u = Math.min(d / lengths[i], 1);
        // rolling is linear; a hop lifts off the edge, then falls faster as it drops
        const p: V3 = [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * (hop ? u * u : u)];
        if (hop) p[2] += Math.sin(Math.PI * u) * 4;
        place(p);
        if (u < 1 || i < legs.length - 1) raf = requestAnimationFrame(frame);
        return;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [tier]);

  return (
    <figure className="iso-figure iso cascade-fig">
      <div className="iso-plate">
        <div className="iso-plate-corners" aria-hidden="true">
          <span className="iso-plate-corner" data-corner="fig">Fig 1</span>
          <span className="iso-plate-corner" data-corner="title">The cascade</span>
          <span className="iso-plate-corner" data-corner="hint">Pick a request</span>
          <span className="iso-plate-corner" data-corner="readout" ref={readout} aria-live="polite" />
        </div>
        <div ref={stage} className="iso-stage" dangerouslySetInnerHTML={{ __html: fig.svg }} />
      </div>
      <figcaption className="iso-legend">
        <span className="iso-caption">
          Four terraces, cheapest at the back. The token only fits a cup its own size or larger, so a request that needs little
          stops early; each lower terrace is bigger and vented because it costs more to run.
        </span>
      </figcaption>
    </figure>
  );
}
