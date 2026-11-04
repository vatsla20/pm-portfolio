export default function Contact() {
  return (
    <section id="contact" className="sec contact" data-say="Say hello. A real person answers.">
      <div data-reveal>
        <h2 className="display h2">Let&apos;s Connect</h2>
        <p>
          I&apos;m actively exploring product management opportunities and would love to chat about the opportunities particularly in B2B SaaS industry,
          AI-powered enterprise products, and platform solutions, particularly in developer tools, enterprise AI, and data-driven products.
        </p>
      </div>
      <div className="contact-rows" data-reveal>
        <a href="mailto:vatsla20.k@gmail.com"><b>Email</b><span className="muted">vatsla20.k@gmail.com</span></a>
        <a href="https://www.linkedin.com/in/vatsla-khurana-025845214/" target="_blank" rel="noopener noreferrer"><b>LinkedIn</b><span className="muted">/in/vatsla-khurana</span></a>
      </div>
      <p className="colophon">Portfolio built with Next.js, deployed on Vercel</p>
    </section>
  );
}
