import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Home page listing quick links to all demo routes.
 */
export default function Home() {
  const demos = [
    { to: "/accordion", title: "Accordion", desc: "Expandable panels for content" },
    { to: "/bentomenu", title: "Bento Menu", desc: "Modern bento-grid navigation" },
    { to: "/breadcrumbs", title: "Breadcrumbs", desc: "Hierarchical navigation" },
    { to: "/carousel", title: "Carousel", desc: "Slide through content" },
    { to: "/chatbot", title: "Chatbot", desc: "Conversational UI" },
    { to: "/form-wizard", title: "Form Wizard", desc: "Multi-step forms" },
    { to: "/testimonial", title: "Testimonial", desc: "Customer quotes" },
    { to: "/toast", title: "Toast", desc: "Transient notifications" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="ocean-surface p-8">
        <h1 className="text-3xl font-bold">Welcome to UI Components Showcase</h1>
        <p className="mt-2 text-text/70">
          Explore component demos styled with the Ocean Professional theme.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demos.map((demo) => (
          <Link key={demo.to} to={demo.to} className="ocean-surface p-5 group">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold">{demo.title}</h2>
              <span className="text-primary transition group-hover:translate-x-0.5">→</span>
            </div>
            <p className="mt-1 text-sm text-text/70">{demo.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
