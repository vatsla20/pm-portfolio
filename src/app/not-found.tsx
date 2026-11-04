import { ThinkingOrb } from "@/components/Orb";
export const metadata = { title: "Not in context, Vatsla Khurana" };


export default function NotFound() {
  return (
    <main id="main" className="case" data-chapter="midnight" style={{ minHeight: "100svh" }}>
      <section data-chapter="midnight" aria-labelledby="nf-h">
        <ThinkingOrb state="searching" size={64} />
        <h1 id="nf-h" style={{ marginTop: 32 }}>Not in context</h1>
        <p className="lead" style={{ maxWidth: "34ch", marginTop: 24 }}>This page was never retrieved, because it doesn’t exist. Nothing was made up to fill the gap.</p>
        <div className="case-bar"><a className="btn primary" href="/">Back to the start</a></div>
      </section>
    </main>
  );
}
