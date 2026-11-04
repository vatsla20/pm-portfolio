// Builds the cascade figure: a stepped sorting machine. A token leaves the hopper and stops in the first cup
// big enough to hold it. Cheapest tier at the back; each tier is larger, and vented, because it costs more to run.
// Run: node src/figure/build-cascade.mjs  →  writes src/figure/cascade.json
import { writeFileSync } from "node:fs";
import * as k from "./iso-kit.mjs";

const WIDTH = 640, HEIGHT = 400;
const W = [36, 42, 50, 60], H = [58, 44, 30, 16], GAP = 3, X0 = -100;
const X = W.reduce((xs, w, i) => [...xs, i ? xs[i - 1] + W[i - 1] + GAP : X0], []);
const D = 44, Y = -D / 2;
const CUP = [4.6, 6.2, 7.8, 9.4];          // seat radius per tier, smallest first
const COIN = CUP.map((r) => r - 0.8);      // a request of tier t is a token that only fits cup t and up
const CX = X.map((x, i) => x + W[i] / 2 + 3);
const COIN_H = 2.2;
const BASE = { x: -114, y: -36, w: 226, d: 72, r: 8 }, BASE_H = 10, FOOT_H = 5;
const HOP = { x: X[0] + 9, y: -12, r: 7.5, h: 30 };

const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), [HOP.x, HOP.y, H[0] + HOP.h + 4], [X[3] + W[3], 22, H[3]]],
  WIDTH, HEIGHT, { pad: 14, azimuth: 40 },
);
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const Dt = (pts, style) => k.dotsSvg(pts, style);
const byDepth = (pts) => [...pts].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const path = (pts) => "M" + pts.map((p) => at(p).map((v) => v.toFixed(1)).join(" ")).join("L") + "Z";

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BASE, 20))) {
    out.push(S(k.cylinder(x, y, 7, -BASE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.4), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(Dt(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // ruler strip along the front: the cost axis, cheapest at the back-left
  const strip = { x: -62, y: 25, w: 160, d: 6, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const t = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.6, 0.6, [1.8, 3.4], P);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  out.push(Dt([at([strip.x + 2, strip.y + 3, 0.6]), at([strip.x + strip.w - 2, strip.y + 3, 0.6])], { size: 0.45 }));
  // label plate with one engraved line
  const plate = { x: -106, y: 22, w: 38, d: 10, r: 1 };
  out.push(S(k.slabOf(plate, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(k.faceTextSvg(k.topMatrix([plate.x + 4, plate.y + 6.4], 0.8, P, "x"), "cheapest first", { size: 3, tone: "mid" }));
  out.push(Dt([at([plate.x + 2, plate.y + 2, 0.8]), at([plate.x + plate.w - 2, plate.y + 2, 0.8])], { size: 0.4 }));
  return out.join("");
}

function terrace(i) {
  const plan = { x: X[i], y: Y, w: W[i], d: D, r: 2 };
  const top = H[i], out = [];
  out.push(S(k.slabOf(plan, 0, top, P, 4, 0.6), { tone: i === 0 ? "hi" : "mid", crease: "lo" }));
  out.push(L(k.planOutline(k.insetPlan(plan, 3), top, P, 3), { tone: "faint" }));
  // vents on the front face: one row per tier of cost, closed slots
  const vents = [];
  for (let r = 0; r <= i; r++) {
    const z = 5 + r * 3.4, x0 = X[i] + 5, x1 = X[i] + W[i] - 5;
    if (z + 1.4 > top - 3) break;
    vents.push(path([[x0, D / 2, z], [x1, D / 2, z], [x1, D / 2, z + 1.4], [x0, D / 2, z + 1.4]]));
  }
  out.push(L(vents.join(""), { tone: "lo" }));
  // seam where the top plate meets the body
  out.push(L(k.sideSeam(plan, top - 2.2, P, 4), { tone: "faint" }));
  // the cup: a counterbored seat, sized for its tier
  out.push(L(k.ring(CX[i], 0, CUP[i] + 1.6, top, P, 40), { tone: "lo" }));
  out.push(L(k.ring(CX[i], 0, CUP[i], top, P, 40), { tone: "mid" }));
  out.push(Dt([at([CX[i], 0, top])], { size: 0.4, tone: "lo" }));
  // four screws on the top plate
  const sc = k.corners(plan, 4);
  out.push(Dt(sc.map(([x, y]) => at([x, y, top])), { size: 0.45 }));
  return out.join("");
}

function hopper() {
  const { x, y, r, h } = HOP, z0 = H[0], out = [];
  out.push(S(k.cylinder(x, y, r + 1.4, z0, 2, P, 40), { tone: "mid" }));
  out.push(S(k.cylinder(x, y, r, z0 + 2, h - 2, P, 40, 0.5), { tone: "mid", crease: "none" }));
  out.push(L([z0 + 9, z0 + 20].map((z) => k.sideArc(x, y, r, z, P, 24)).join(""), { tone: "lo" }));
  out.push(L(k.knurl(x, y, r, z0 + h - 4, z0 + h, 40, P), { tone: "lo" }));
  out.push(L(k.ring(x, y, r - 1.2, z0 + h, P, 40), { tone: "lo" }));
  out.push(L([0, 1, 2].map((n) => k.ring(x, y, COIN[3] - n * 0.9, z0 + h, P, 32)).join(""), { tone: "faint" }));
  // chute lip that feeds the lane
  out.push(S(k.slabOf({ x: x - 4, y: y + r - 1, w: 8, d: 5, r: 1 }, z0, 1.6, P, 2), { tone: "mid", crease: "none" }));
  return out.join("");
}

// one token per tier size, built at the world origin and moved with a translate
const coins = COIN.map((r, t) =>
  `<g data-coin="${t}" style="display:none">${S(k.cylinder(0, 0, r, 0, COIN_H, P, 40, 0.4), { tone: "hi", lit: true })}${L(k.ring(0, 0, r - 1.2, COIN_H, P, 32), { tone: "lit" })}</g>`,
);

const svg = k.figureSvg({
  width: WIDTH, height: HEIGHT,
  label: "A stepped sorting machine with four terraces, cheapest at the back. A token leaves the hopper and rolls across each cup too small for it, drops down a step, and stops in the first cup that can hold it. Each lower terrace is larger and carries more vents, because it costs more to run.",
  body: [base(), ...[0, 1, 2, 3].map(terrace), hopper(), ...coins],
});

const axis = (v) => k.axisVector(P, v);
writeFileSync(new URL("./cascade.json", import.meta.url), JSON.stringify({
  svg, ax: axis([1, 0, 0]), ay: axis([0, 1, 0]), az: axis([0, 0, 1]),
  X, W, H, CX, CUP, COIN, start: [HOP.x, HOP.y + HOP.r + 1, H[0]], GAP,
}));
console.log("wrote cascade.json", svg.length, "bytes");
