import { projects, titleOf, writing } from "@/data/site";
import Fragment from "./Fragment";
import Camera from "./Camera";

// The work, laid out on a board. Scrolling moves a camera: right, down, left, down, right, then back up.
const layout: Record<string, [number, number]> = {
  "anomaly-detection": [0, 0],
  "conversational-analytics": [1, 0],
  "daily-pm-briefing": [1, 1],
  "dentist-ai": [0, 1],
  "candidate-verification": [0, 2],
  "identity-patent": [1, 2],
  "tenant-decommissioning": [2, 0],
};
const order = Object.keys(layout);

export default function Board() {
  const stops = order.map((slug) => ({ slug, name: titleOf(slug), at: layout[slug] }));
  return (
    <Camera stops={stops}>
      {order.map((slug) => {
        const p = projects.find((x) => x.slug === slug)!;
        const [x, y] = layout[slug];
        return (
          <article key={slug} id={slug} className="cell" data-slug={slug} data-orb={p.orb} style={{ "--x": x, "--y": y } as React.CSSProperties}>
            <div className="cell-l">
              <h3>{p.name}</h3>
              <p className="lead">{p.t30}</p>
              <p className="small muted d60" style={{ marginTop: 10 }}>{p.where}, {p.when}</p>
              <p className="dfull" style={{ marginTop: 18, maxWidth: "52ch" }}>{p.problem}</p>
              <ul className="d60" aria-label="What I did">
                {p.myCall.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <div className="rel" data-rel={p.related.join(" ")}>
                <a className="btn primary" href={`/work/${p.slug}`}>Read the case</a>
                {p.related.map((r) =>
                  writing.some((d) => d.slug === r) ? (
                    <a key={r} className="btn" href="#writing" data-doc={r}>Related: {titleOf(r)}</a>
                  ) : (
                    <a key={r} className="btn" href={`#${r}`} data-jump={r}>Related: {titleOf(r)}</a>
                  ),
                )}
              </div>
            </div>
            <div className="cell-r">
              <Fragment p={p} />
              <p className="call d60"><b>Where AI earned its place</b>{p.aiCall}</p>
              <p className="call d60"><b>The cost and context call</b>{p.costCall}</p>
              <p className="dfull">{p.outcome}</p>
            </div>
          </article>
        );
      })}
    </Camera>
  );
}
