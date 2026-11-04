"use client";
import { useEffect, useState } from "react";
import { requests, tiers } from "@/data/site";
import CascadeFigure from "./CascadeFigure";

// Drop a request in; it stops at the first tier that can answer it. Tours the requests until someone picks one.
export default function Cascade() {
  const [pick, setPick] = useState(1);
  const [touched, setTouched] = useState(false);
  const r = requests[pick];

  useEffect(() => {
    if (touched || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPick((p) => (p + 1) % requests.length), 4200);
    return () => clearInterval(id);
  }, [touched]);

  return (
    <>
      <div className="asks" role="group" aria-label="Pick a request">
        {requests.map((q, i) => (
          <button key={q.ask} type="button" className="btn" aria-pressed={i === pick} onClick={() => { setTouched(true); setPick(i); }}>
            {q.ask}
          </button>
        ))}
        <p className="cascade-read" aria-live="polite">
          <span className="semi">Stopped at {tiers[r.tier].tool.toLowerCase()}, {tiers[r.tier].cost}.</span> {r.why}{" "}
          {r.tier < 3 && <span className="muted">{3 - r.tier} more expensive {3 - r.tier === 1 ? "tier" : "tiers"} never ran.</span>}
        </p>
      </div>
      <div className="tiers">
        <CascadeFigure tier={r.tier} />
        <ol className="tier-keys" aria-label="Tiers, cheapest first">
          {tiers.map((t, i) => (
            <li key={t.name} className={i === r.tier ? "hit" : undefined}><b>{t.cost}</b> {t.tool}</li>
          ))}
        </ol>
      </div>
    </>
  );
}
