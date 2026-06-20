export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-surface/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Let&apos;s Connect</h2>
        <div className="w-16 h-1 bg-accent rounded mx-auto mb-8" />

        <p className="text-muted leading-relaxed mb-8">
          I&apos;m actively exploring product management opportunities and would love
          to chat about the opportunities particularly in B2B SaaS industry, AI-powered enterprise products, and platform solutions, particularly in developer tools, enterprise AI, and data-driven products.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="mailto:vatsla20.k@gmail.com"
            className="p-4 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 group"
          >
            <div className="text-accent group-hover:text-accent-light mb-2">
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">Email</p>
            <p className="text-xs text-muted mt-1">vatsla20.k@gmail.com</p>
          </a>

          <a
            href="https://www.linkedin.com/in/vatsla-khurana-025845214/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 group"
          >
            <div className="text-accent group-hover:text-accent-light mb-2">
              <svg
                className="w-6 h-6 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">LinkedIn</p>
            <p className="text-xs text-muted mt-1">/in/vatsla-khurana</p>
          </a>

        </div>

        <p className="text-xs text-muted/60">
          Portfolio built with Next.js & Tailwind CSS, deployed on Vercel
        </p>
      </div>
    </section>
  );
}
