import { credits, person, projects, writing } from "@/data/site";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="grid">
        <div><span>Site</span><a href="/#thinking">Thinking</a><a href="/#work">Work</a><a href="/#writing">Writing</a><a href="/#contact">Contact</a></div>
        <div><span>Elsewhere</span><a href={person.linkedin}>LinkedIn</a><a href={`mailto:${person.email}`}>Email</a><a href={person.resume}>Résumé</a></div>
        <div><span>Work</span>{projects.slice(0, 4).map((p) => <a key={p.slug} href={`/work/${p.slug}`}>{p.name}</a>)}</div>
        <div className="credits">
          <span>Photographs</span>
          {credits.map((c) => (
            <a key={c.file} href={c.page}>{c.title}, {c.creator}, {c.licence}</a>
          ))}
          <a href="https://commons.wikimedia.org/wiki/File:Flock_of_starlings_(Sturnus_vulgaris).webm">Flock of starlings (film), Karen Roe, CC BY 2.0</a>
        </div>
      </div>
      <div />
      <div>
        <p className="wordmark h-display"><span data-fit>{person.name}</span></p>
        <p className="legal">© 2026 Vatsla Khurana. No model was called to render this page. {writing.length} pieces of writing, {projects.length} pieces of work.</p>
      </div>
    </footer>
  );
}
