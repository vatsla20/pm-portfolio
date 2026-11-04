import type { Project } from "@/data/site";

// Small, honest pieces of each product's interface. Sample data is labelled as sample.
const hours = Array.from({ length: 24 }, (_, h) => 40 + 34 * Math.sin(((h - 6) / 24) * Math.PI * 2) ** 2 + (h > 8 && h < 11 ? 22 : 0));

function Forecast() {
  const x = (h: number) => (h / 23) * 300;
  const y = (v: number) => 110 - v;
  const line = hours.map((v, h) => `${h ? "L" : "M"}${x(h).toFixed(1)},${y(v).toFixed(1)}`).join("");
  const band = hours.map((v, h) => `${h ? "L" : "M"}${x(h).toFixed(1)},${y(v + 12).toFixed(1)}`).join("") +
    hours.slice().reverse().map((v, i) => `L${x(23 - i).toFixed(1)},${y(v - 12).toFixed(1)}`).join("") + "Z";
  return (
    <div data-ui>
      <div className="ui-top"><span>Calls per minute, Monday</span><span className="muted">Sample</span></div>
      <svg viewBox="0 0 300 120" role="img" aria-label="Traffic inside its forecast band, with one point outside it at 9 pm">
        <path d={band} fill="var(--surface)" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx={x(21)} cy={y(hours[21] + 30)} r="5" fill="var(--accent)" />
      </svg>
      <p>The 9am surge sits inside the forecast. The 9pm point does not, so only that one is raised.</p>
    </div>
  );
}

function Names() {
  const rows = [
    ["Vatsla Khurana", "Exact", "Stop"],
    ["वत्सला खुराना", "Phonetic, across scripts", "Stop"],
    ["Vatsala Khurrana", "Phonetic", "Stop"],
    ["V. K. Kumar", "Conflict in the document graph", "Escalate"],
  ];
  return (
    <div data-ui>
      <div className="ui-top"><span>Name on each document</span><span className="muted">Sample</span></div>
      <table>
        <thead><tr><th>Seen as</th><th>Settled by</th><th>Result</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td className="ok">{r[2]}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

function Evals() {
  const rows = [["Hindi", "40%"], ["Code-switched", "30%"], ["English", "30%"]];
  const gates = ["Intent", "Slot filling", "Grounding, no invented slots", "Graceful escalation", "Clinical-advice refusal, added after the gap"];
  return (
    <div data-ui>
      <div className="ui-top"><span>Golden set</span><span className="muted">Launch gates</span></div>
      <table><tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td className="ok">{r[1]}</td></tr>)}</tbody></table>
      <ul style={{ margin: "10px 0 0", paddingLeft: "1.1em" }}>{gates.map((g) => <li key={g}>{g}</li>)}</ul>
    </div>
  );
}

function Steps() {
  const s = ["Freeze tenant", "Export and retain per policy", "Revoke credentials", "Release resources", "Sign the audit record"];
  return (
    <div data-ui>
      <div className="ui-top"><span>Decommission run</span><span className="muted">Sample</span></div>
      <table><tbody>{s.map((t, i) => <tr key={t}><td>{t}</td><td className="ok">{i < 4 ? "Done, logged" : "Signed"}</td></tr>)}</tbody></table>
      <p style={{ marginTop: 10 }}>Model calls: 0</p>
    </div>
  );
}

function Sources() {
  const s = [["Feeds, RSS and Atom", "curl"], ["Hacker News", "curl + jq"], ["Reddit", "curl + jq"], ["YouTube", "curl"], ["Company blogs", "curl"], ["Same story, four headlines", "Model"]];
  return (
    <div data-ui>
      <div className="ui-top"><span>Morning run</span><span className="muted">What does the work</span></div>
      <table><tbody>{s.map((r) => <tr key={r[0]}><td>{r[0]}</td><td className="ok">{r[1]}</td></tr>)}</tbody></table>
    </div>
  );
}

function Query() {
  return (
    <div data-ui>
      <div className="ui-top"><span>Ask your APIs</span><span className="muted">Sample</span></div>
      <p className="semi">Which proxies slowed down after Tuesday’s deploy?</p>
      <p style={{ marginTop: 8 }}>Retrieved: latency for this tenant, Tuesday to today. Not retrieved: everything else.</p>
    </div>
  );
}

function Patent({ p }: { p: Project }) {
  return (
    <div data-ui>
      <div className="ui-top"><span>Patent pending</span><span>#86836268</span></div>
      <p className="patent-title">{p.title}</p>
    </div>
  );
}

export default function Fragment({ p }: { p: Project }) {
  switch (p.fragment) {
    case "forecast": return <Forecast />;
    case "names": return <Names />;
    case "evals": return <Evals />;
    case "steps": return <Steps />;
    case "sources": return <Sources />;
    case "query": return <Query />;
    case "patent": return <Patent p={p} />;
  }
}
