import React from "react";

/**
/ PUBLIC_INTERFACE
 * Home page with a concise welcome/hero section under the Navbar.
 * Routing and Navbar remain unchanged. Uses Ocean Professional theme tokens.
 */
export default function Home() {
  return (
    <section className="animate-fadeIn">
      <div className="rounded-2xl border border-black/5 bg-ocean-gradient">
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-text">
              UI Components Showcase
            </h1>
            <p className="mt-3 text-base sm:text-lg text-text/70">
              Explore accessible, modern components styled with the Ocean
              Professional theme. Use the navigation in the bar above to get
              started with demos like Accordion, Bento, Carousel, Chatbot,
              Toast, and more.
            </p>
            <div className="mt-6 text-sm text-text/60">
              Tip: Use the Navbar links to jump directly to a component demo.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
