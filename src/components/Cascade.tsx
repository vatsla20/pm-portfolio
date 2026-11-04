"use client";
import { useState } from "react";
import { requests, tiers } from "@/data/site";

// Drop a request in; it stops at the first tier that can answer it.
export default function Cascade() {
  const [pick, setPick] = useState(1);
  const r = requests[pick];
  return (
    <>
      <div className="asks" role="group" aria-label="Pick a request">
        {requests.map((q, i) => (
          <button key={q.ask} type="button" className="btn" aria-pressed={i === pick} onClick={() => setPick(i)}>
            {q.ask}
          </button>
        ))}
      </div>
      <div className="tiers">
        <span className="drop" aria-hidden="true" style={{ translate: `0 ${r.tier * 25 + 9}%` }} />
        <ol aria-label="Tiers, cheapest first">
        {tiers.map((t, i) => (
          <li key={t.name} className={`tier ${i === r.tier ? "hit" : i < r.tier ? "passed" : "skipped"}`}>
            <b>{t.name}</b>
            <span className="cost" aria-label={`relative cost ${t.cost}`}>{t.cost}</span>
            <span>{t.tool}</span>
          </li>
        ))}
        </ol>
      </div>
      <p className="cascade-read" aria-live="polite">
        <span className="semi">Stopped at {tiers[r.tier].tool.toLowerCase()}.</span> {r.why}{" "}
        {r.tier < 3 && <span className="muted">{3 - r.tier} more expensive {3 - r.tier === 1 ? "tier" : "tiers"} never ran.</span>}
      </p>
    </>
  );
}
