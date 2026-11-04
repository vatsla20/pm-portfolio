import AskAI from "./AskAI";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="mark" href="/" aria-label="VK, Vatsla Khurana, home">VK</a>
      <ul>
        <li><a href="/#thinking" className="hide-s">Thinking</a></li>
        <li><a href="/#work">Work</a></li>
        <li><a href="/#writing">Writing</a></li>
        <li><a href="/#contact">Contact</a></li>
        <li><AskAI /></li>
      </ul>
    </nav>
  );
}
