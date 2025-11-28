import React from "react";
import Button from "../components/ui/primitives/Button";

/**
/ PUBLIC_INTERFACE
 * Home page: revamped hero, feature strip, and supporting two-column section.
 * - Preserves navbar/footer and routes.
 * - Uses existing utilities: app-answer-surface, app-answer-border, brand gradient utilities.
 * - Accessible, responsive, and consistent with the Ocean Professional theme.
 */
export default function Home() {
  return (
    <section className="animate-fadeIn space-y-8 sm:space-y-10">
      {/* HERO */}
      <HeroSection />

      {/* FEATURE STRIP */}
      <FeatureStrip />

      {/* SUPPORTING TWO-COLUMN SECTION */}
      <SupportingSection />
    </section>
  );
}

// PUBLIC_INTERFACE
function HeroSection() {
  /**
   * Prominent hero with headline, subheadline, and CTA.
   * Uses the answer-surface for readable light background and brand gradient accents for emphasis.
   */
  return (
    <div className="relative overflow-hidden app-answer-surface app-answer-border">
      {/* Subtle decorative gradient corners (non-essential, decorative only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-gradient opacity-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-brand-gradient opacity-10"
      />

      <div className="relative px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="block app-answer-heading">UI Components</span>
            <span className="block text-brand-gradient">Showcase</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg app-answer-subtle">
            Explore modern, accessible React components styled with the Ocean Professional theme.
            Navigate demos like Accordion, Bento, Carousel, Chatbot, Toast, and more.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              variant="brandSolid"
              size="lg"
              as="a"
              href="/accordion"
              aria-label="Explore the Accordion demo"
              className="shadow-soft"
            >
              Explore Demos
            </Button>
            <Button
              variant="brandOutline"
              size="lg"
              as="a"
              href="/chatbot"
              aria-label="Try the Chatbot demo"
            >
              Try Chatbot
            </Button>
          </div>

          {/* Inline environment hint (kept short and subtle) */}
          <div className="mt-3 text-xs app-answer-subtle">
            Tip: Use the navigation above to jump between individual demo pages.
          </div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FeatureStrip() {
  /**
   * A simple grid of feature tiles (3–4 items) with answer surfaces, subtle borders,
   * small icons, and hover elevation via tile-hover-elevate.
   */
  const features = [
    {
      title: "Accessible",
      desc: "Keyboard, ARIA, and focus-visible baked in.",
      icon: "♿",
    },
    {
      title: "Responsive",
      desc: "Mobile-first with fluid grids and clamps.",
      icon: "📱",
    },
    {
      title: "Composable",
      desc: "Reusable primitives and clear APIs.",
      icon: "🧩",
    },
    {
      title: "Themed",
      desc: "Brand gradient accents + light surfaces.",
      icon: "🎨",
    },
  ];

  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Highlights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, idx) => (
          <article
            key={idx}
            className="group app-answer-surface app-answer-border rounded-2xl p-5 transition tile-hover-elevate"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-white text-text grid place-items-center shadow-soft border border-black/5">
                <span aria-hidden="true">{f.icon}</span>
              </div>
              <div>
                <h3 className="text-base font-semibold app-answer-heading">{f.title}</h3>
                <p className="mt-1 text-sm app-answer-subtle">{f.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// PUBLIC_INTERFACE
function SupportingSection() {
  /**
   * Two-column layout:
   * - Left: decorative gradient panel or illustration proxy
   * - Right: text bullets and a secondary CTA
   */
  const bullets = [
    "Clean, minimal surfaces for comfortable reading.",
    "Brand gradient accents used sparingly for emphasis.",
    "Subtle hover elevation on interactive tiles.",
    "Consistent rounded corners and soft shadows.",
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      {/* Decorative panel/illustration proxy */}
      <div
        className="relative rounded-2xl overflow-hidden border border-black/10 bg-white"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-brand-gradient-soft" />
        <div className="relative p-6 sm:p-8 md:p-10 h-full flex">
          <div className="self-end">
            <div className="inline-flex items-center gap-2 rounded-xl border-brand-gradient-surface bg-white/90 px-3 py-2 shadow-soft">
              <span className="h-6 w-6 rounded-lg bg-white text-text grid place-items-center shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                UI
              </span>
              <span className="text-sm font-semibold text-text">Ocean Professional</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="app-answer-surface app-answer-border rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl app-answer-heading">
          Crafted for clarity and speed
        </h2>
        <p className="mt-2 text-sm sm:text-base app-answer-subtle">
          Build interfaces quickly with accessible, theme-aligned components. Each demo showcases
          practical patterns with readable surfaces and tasteful brand accents.
        </p>

        <ul className="mt-4 space-y-2">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm sm:text-base">
              <span
                className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border-brand-gradient-thin text-text"
                aria-hidden="true"
                title="item"
              >
                ✓
              </span>
              <span className="app-answer-subtle">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button
            as="a"
            href="/bentomenu"
            variant="brandOutline"
            size="md"
            aria-label="Open the Bento Menu demo"
          >
            Open Bento Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
