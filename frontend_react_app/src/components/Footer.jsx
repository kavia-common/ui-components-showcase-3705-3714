import React from "react";

/**
 * Footer reverted to its prior compact arrangement:
 * - Gradient shell with a glassy inner overlay.
 * - Three-column content on sm+ and stacked on mobile.
 * - Update: remove rounded corners entirely for a square-corner footer.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12" aria-labelledby="site-footer-heading">
      <div className="border-t border-black/10" aria-hidden="true"></div>

      {/* Remove any rounded corners from the outer footer shell */}
      <div className="app-header-major rounded-none">
        <div className="app-header-inner">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <h2 id="site-footer-heading" className="sr-only">
              Footer
            </h2>

            {/* Inner panel surface with no rounded corners */}
            <div className="app-answer-surface app-answer-border px-6 py-6 rounded-none">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2">
                    {/* Keep the small logo square too */}
                    <div className="h-9 w-9 rounded-none bg-primary text-white grid place-items-center font-bold shadow-soft">
                      UI
                    </div>
                    <div className="text-lg font-semibold text-text">
                      Components Showcase
                    </div>
                  </div>
                  <p className="mt-2 text-sm app-answer-subtle">
                    Modern, accessible components styled with the Ocean Professional theme.
                  </p>
                  <p className="mt-3 text-xs app-answer-subtle">
                    © {year} UI Components Showcase. All rights reserved.
                  </p>
                </div>

                {/* Quick links */}
                <nav aria-label="Footer navigation" className="sm:mx-auto">
                  <div className="text-sm font-semibold text-text mb-2">
                    Quick links
                  </div>
                  <ul className="space-y-1 text-sm">
                    <FooterLink href="/" label="Home" />
                    <FooterLink href="/accordion" label="Accordion" />
                    <FooterLink href="/bentomenu" label="Bento Menu" />
                    <FooterLink href="/carousel" label="Carousel" />
                    <FooterLink href="/chatbot" label="Chatbot" />
                    <FooterLink href="/form-wizard" label="Form Wizard" />
                    <FooterLink href="/testimonial" label="Testimonial" />
                    <FooterLink href="/toast" label="Toast" />
                  </ul>
                </nav>

                {/* Social / Contact */}
                <div className="sm:justify-self-end">
                  <div className="text-sm font-semibold text-text mb-2">
                    Connect
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-2 rounded-none px-2 py-1 app-answer-subtle hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]"
                        aria-label="Email us"
                      >
                        ✉ Email
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-none px-2 py-1 app-answer-subtle hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]"
                        aria-label="Visit our GitHub"
                      >
                        ⎇ GitHub
                      </a>
                    </li>
                    <li>
                      <span className="inline-flex items-center gap-2 rounded-none px-2 py-1 app-answer-subtle">
                        Theme: Ocean Professional
                      </span>
                    </li>
                    <li>
                      <span className="inline-flex items-center gap-2 rounded-none px-2 py-1 app-answer-subtle">
                        Built with React + Tailwind
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-white/85">
                Crafted with attention to accessibility and responsive design.
              </div>
              <div className="text-xs text-white/80">
                Ocean gradient applied to shell; content surfaces remain light.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Footer link item with consistent hover/focus behavior, no rounding.
 */
function FooterLink({ href, label }) {
  return (
    <li>
      <a
        href={href}
        className="inline-flex items-center gap-2 rounded-none px-2 py-1 text-text/70 hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]"
        aria-label={`Go to ${label}`}
      >
        <span aria-hidden="true" className="text-text/40">→</span>
        {label}
      </a>
    </li>
  );
}
