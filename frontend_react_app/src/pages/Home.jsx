import React from "react";

/**
/ PUBLIC_INTERFACE
 * Home page with a concise welcome/hero section under the Navbar.
 * Routing and Navbar remain unchanged. Uses Ocean Professional theme tokens.
 */
export default function Home() {
  return (
    <section className="animate-fadeIn space-y-6">
      {/* Unified header style */}
      <div className="app-header-major border border-black/5">
        <div className="app-header-inner">
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl app-header-title">
                UI Components Showcase
              </h1>
              <p className="mt-3 text-base sm:text-lg app-header-subtitle">
                Explore accessible, modern components styled with a refined brand palette.
                Use the navigation above to jump into demos like Accordion, Bento, Carousel,
                Chatbot, Toast, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle callout card harmonized to accordion content background */}
      <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur px-4 py-3 shadow-hairline">
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary text-white grid place-items-center shrink-0">
            ✨
          </div>
          <div className="text-sm text-text/80">
            Tip: Panels and content surfaces use lighter tones for comfort and clarity. Try the Accordion demo to see the palette in action.
          </div>
        </div>
      </div>

      {/* Quick hint section with softer spacing and lighter surface */}
      <div className="rounded-xl border border-black/5 bg-white px-4 py-3 text-sm text-text/70">
        Use the Navbar links to jump directly to a component demo.
      </div>
    </section>
  );
}
