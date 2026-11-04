import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import Budget from "@/components/Budget";
import Cascade from "@/components/Cascade";
import Board from "@/components/Board";
import Library from "@/components/Library";
import Loader from "@/components/Loader";
import { Figure } from "@/components/Guide";
import Footer from "@/components/Footer";
import Band from "@/components/Band";
import { path, person, projects } from "@/data/site";

// Real count for the loader: every word in the published documents plus the case studies.
function wordsOfWork() {
  const dir = join(process.cwd(), "public/documents");
  const files = readdirSync(dir, { recursive: true }).map(String).filter((f) => f.endsWith(".html"));
  const docs = files.reduce((n, f) => {
    const text = readFileSync(join(dir, f), "utf8").replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ");
    return n + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  const cases = JSON.stringify(projects).split(/\s+/).length;
  return docs + cases;
}

export default function Home() {
  return (
    <>
      <main id="main">
        <section className="hero" data-chapter="sky" data-say="Pick your time. I’ll pack the page to fit." aria-label="Introduction">
          <Loader total={wordsOfWork()} />
          <img src="/img/flock-1.jpg" srcSet="/img/flock-1-900.jpg 900w, /img/flock-1.jpg 1600w" sizes="100vw" alt="A murmuration of rosy starlings over Kankaria Lake, Ahmedabad, at dusk" width={1600} height={1200} fetchPriority="high" />
          <div className="hero-text">
            <Budget line={person.line} />
            <div>
              <h1 className="name h-display">
                <span className="sr">{person.name}</span>
                <span data-v="full" data-fit aria-hidden="true">{person.name}</span>
                <span data-v="60" data-fit aria-hidden="true">{person.short}</span>
                <span data-v="30" data-fit aria-hidden="true">{person.initials}</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="sec intro" id="thinking" data-chapter="sky" data-say="Most of my calls start with this question." aria-labelledby="intro-h">
          <div data-reveal>
            <h2 id="intro-h" className="h2">Not everything needs AI.</h2>
            <div className="captions">
              <p>Where the steps repeat, a script runs them. Deterministic, cheap, explainable.</p>
              <p>Where judgement is needed, a model earns its place, and evals hold it to a predictable bar.</p>
            </div>
          </div>
          <div className="panorama">
            <img src="/img/flock-2.jpg" srcSet="/img/flock-2-900.jpg 900w, /img/flock-2.jpg 1600w" sizes="100vw" alt="A loose flock of birds crossing the sky over Basai Wetland, Gurgaon" width={2000} height={1328} loading="lazy" />
          </div>
        </section>

        <section className="sec cascade" data-chapter="midnight" data-say="Drop a request in. Watch where it stops." aria-labelledby="cascade-h">
          <div data-reveal>
            <h2 id="cascade-h" className="h2">Where a request stops</h2>
            <p className="lead" style={{ marginTop: 24, maxWidth: "40ch" }}>
              Cheapest first. Every tier can end the run. The patent I filed is built on this.
            </p>
          </div>
          <div className="grid">
            <Cascade />
          </div>
          <p className="small muted" style={{ marginTop: 40 }}>Costs are relative and for illustration.</p>
        </section>

        <Board />

        <section className="sec" id="writing" data-chapter="mint" data-say="Filter, then open one. They link to each other." aria-labelledby="writing-h">
          <div data-reveal className="sec-head">
            <h2 id="writing-h" className="h2">Writing, as a working library</h2>
            <p className="lead">
              The Splitwise pieces are one study: discovery, teardown, PRD, roadmap, then the same feature told four ways.
            </p>
          </div>
          <Library />
        </section>

        <section className="sec" data-chapter="midnight" data-say="Seven neighbours. That’s all a starling reads." aria-labelledby="flock-h">
          <h2 id="flock-h" className="h2">Seven neighbours, not the whole flock</h2>
          <Band />
          <p className="band-cap">
            Each starling tracks about seven neighbours, never the whole flock, and the murmuration still turns as one (Ballerini and others, PNAS, 2008).
            <span className="d60"> That is how I size context: what this decision needs, nothing it doesn’t. The dots following your cursor work the same way.</span>
          </p>
        </section>

        <section className="sec path" id="path" data-chapter="sky" data-say="Every stop left a tool behind." aria-labelledby="path-h">
          <h2 id="path-h">Every role left a tool behind</h2>
          <div className="grid">
            <div className="path-img">
              <img src="/img/flock-6.jpg" srcSet="/img/flock-6-900.jpg 900w, /img/flock-6.jpg 1600w" sizes="(max-width: 900px) 60vw, 30vw" alt="A murmuration shaped like a wave over the reeds at Fairburn Ings, at dusk" width={1200} height={1600} loading="lazy" />
            </div>
            <ul className="path-rows">
              {path.map((r, i) => (
                <li key={r.what} className={i > 7 ? "dfull" : i > 3 ? "d60" : undefined}>
                  <span className="muted">{r.kind}</span>
                  <span>{r.what}</span>
                  <span className="when">{r.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sec about" data-chapter="sky" data-say="That’s me, roughly to scale." aria-labelledby="about-h">
          <h2 id="about-h" className="h2">A generalist, on purpose</h2>
          <div className="grid">
            <div className="facts">
              <span>{person.city}</span>
              <span>Building at SAP since 2021</span>
              <a className="link" href={`mailto:${person.email}`}>{person.email}</a>
            </div>
            <div className="bio">
              <p>
                <span className="por" aria-hidden="true"><Figure /></span>
                <b>Vatsla Khurana</b> runs the proof of concept first, brings it to the table early, and builds from the customer’s side.
              </p>
              <p className="d60">
                I moved into product the long way: a log viewer for AI Launchpad, an 80% faster dashboard at Integration Suite,
                a zero-to-one AI platform at API Management, and automation and cloud at Signavio. Security, dev, AI and agents each left a tool.
              </p>
              <p className="dfull">
                Away from work: studying, and travelling to places where nature does the engineering. A flock of starlings is still the best system design I know.
              </p>
            </div>
          </div>
        </section>

        <section className="sec contact" id="contact" data-chapter="deep" data-say="Say hello. A real person answers." aria-labelledby="contact-h">
          <div className="rows">
            <h2 id="contact-h">Write to me</h2>
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <a href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={person.resume} target="_blank" rel="noopener">Résumé, PDF</a>
            <p>{person.city}</p>
            <a className="hello" href={`mailto:${person.email}?subject=Hello%20Vatsla&body=I%20saw%20your%20portfolio%20and%20`}>
              Hello <span className="round" aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
