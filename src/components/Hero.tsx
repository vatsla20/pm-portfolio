import Budget from "./Budget";
import { ThinkingOrb } from "./Orb";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="name display">
        <span className="sr">Vatsla Khurana</span>
        <span className="word" aria-hidden="true"><span data-fit>Vatsla</span></span>
        <span className="word" aria-hidden="true"><span data-fit>Khurana</span></span>
      </h1>

      <div className="hero-panels" data-reveal>
        <div className="panel light">
          <div>
            <p className="open" style={{ color: "#0d0d0d" }}>Open to product management opportunities</p>
            <p className="lead" style={{ marginTop: 18, maxWidth: "34ch", fontWeight: 600 }}>
              Software Engineer transitioning into Product Management, building AI-powered enterprise products and scalable platform solutions.
            </p>
            <p className="muted d60" style={{ marginTop: 14, maxWidth: "60ch" }}>
              Currently working at SAP on enterprise-scale cloud and AI initiatives, with hands-on experience in platform engineering, automation, and AI-driven product development.
              Passionate about product strategy, customer experience, and building impactful technology solutions.
            </p>
          </div>
          <div className="hero-cta">
            <a href="#projects" className="btn primary">View My Work</a>
            <a href="#contact" className="btn" style={{ background: "#0d0d0d" }}>Get in Touch</a>
            <span className="hero-social">
              <a href="https://www.linkedin.com/in/vatsla-khurana-025845214/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="mailto:vatsla20.k@gmail.com" aria-label="Email">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </span>
          </div>
        </div>
        <div className="panel" style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <Budget />
            <ThinkingOrb state="working" size={64} theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
