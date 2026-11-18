import Morph from "./Morph";

export default function Contact() {
  return (
    <section id="contact" className="band on-dark contact" data-say="Say hello. A real person answers.">
      <div className="wrap">
        <div className="sec-head">
          <Morph as="h2" text="Let's Connect" className="h2" />
          <p>
            I&apos;m actively exploring product management opportunities and would love to chat about the opportunities particularly in B2B SaaS industry,
            AI-powered enterprise products, and platform solutions, particularly in developer tools, enterprise AI, and data-driven products.
          </p>
        </div>
        <div className="contact-rows" data-stagger>
          <a href="mailto:vatsla20.k@gmail.com" style={{ "--n": 0 } as React.CSSProperties}><b>Email</b><span>vatsla20.k@gmail.com</span></a>
          <a href="https://www.linkedin.com/in/vatsla-khurana-025845214/" target="_blank" rel="noopener noreferrer" style={{ "--n": 1 } as React.CSSProperties}><b>LinkedIn</b><span>/in/vatsla-khurana</span></a>
        </div>
      </div>
    </section>
  );
}
