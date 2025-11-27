import React from "react";

/**
/ PUBLIC_INTERFACE
 * Home page with a concise welcome/hero section under the Navbar.
 * Routing and Navbar remain unchanged. Uses Ocean Professional theme tokens.
 */
export default function Home() {
  return (
    <section className="animate-fadeIn">
      <div className="rounded-2xl border border-black/5 overflow-hidden">
        <div className="bg-brand-gradient">
          <div className="px-6 py-12 sm:px-10 sm:py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                UI Components Showcase
              </h1>
              <p className="mt-3 text-base sm:text-lg text-white/90">
                Explore accessible, modern components styled with a fresh brand gradient. Use the navigation in the bar above to get
                started with demos like Accordion, Bento, Carousel, Chatbot,
                Toast, and more.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-10 py-6 bg-white/80 backdrop-blur">
          <div className="max-w-3xl text-sm text-text/70">
            Tip: Use the Navbar links to jump directly to a component demo.
          </div>
        </div>
      </div>
    </section>
  );
}
