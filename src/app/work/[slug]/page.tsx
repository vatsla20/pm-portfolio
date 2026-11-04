import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Budget from "@/components/Budget";
import Fragment from "@/components/Fragment";
import Footer from "@/components/Footer";
import Band from "@/components/Band";
import { credits, projects, titleOf, writing } from "@/data/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.name}, Vatsla Khurana`, description: p.t30, alternates: { canonical: `/work/${slug}` } } : {};
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const photo = credits[i % credits.length];
  const hrefOf = (s: string) => (writing.some((d) => d.slug === s) ? writing.find((d) => d.slug === s)!.href : `/work/${s}`);
  return (
    <>
      <main id="main" className="case" data-chapter="deep">
        <section data-chapter="deep" aria-labelledby="case-h">
          <h1 id="case-h">{p.name}</h1>
          <p className="lead" style={{ maxWidth: "36ch", marginTop: 24 }}>{p.t30}</p>
          <p className="small muted" style={{ marginTop: 10 }}>{p.where}, {p.when}</p>
          <div style={{ marginTop: 32 }}><Budget scope="main" /></div>
          <div className="panorama">
            <img src={photo.file} srcSet={`${photo.file.replace(".jpg", "-900.jpg")} 900w, ${photo.file} 1600w`} sizes="100vw" alt={photo.title} width={1800} height={1200} fetchPriority="high" />
          </div>
          <div className="grid">
            <div className="case-l">
              <section className="d60" data-reveal><h2>The problem</h2><p>{p.problem}</p></section>
              <section data-reveal><h2>What I did myself</h2><ul>{p.myCall.map((c) => <li key={c}>{c}</li>)}</ul></section>
              <section className="d60" data-reveal><h2>Where AI earned its place</h2><p>{p.aiCall}</p></section>
              <section className="d60" data-reveal><h2>The cost and context call</h2><p>{p.costCall}</p></section>
              <section data-reveal><h2>What came of it</h2><p>{p.outcome}</p></section>
              <section className="dfull">
                <h2>{p.title}</h2>
              </section>
            </div>
            <aside className="case-r">
              <Fragment p={p} />
              <div className="dfull">
                <h2>Left out of this context, on purpose</h2>
                <div className="redact">{p.outOfContext.map((o) => <span key={o}>{o}<span aria-hidden="true">Withheld</span></span>)}</div>
              </div>
            </aside>
          </div>
          <div style={{ marginTop: 120 }}>
            <h2 className="h2">The same flock, seen from here</h2>
            <Band />
          </div>
          <div className="case-bar">
            {p.related.map((r) => <a key={r} className="btn" href={hrefOf(r)}>Related: {titleOf(r)}</a>)}
            <a className="btn primary" href={`/work/${next.slug}`}>Next: {next.name}</a>
            <a className="btn" href="/#work">Back to the board</a>
          </div>
        </section>
      </main>
      <div style={{ height: 160 }} />
      <Footer />
    </>
  );
}
