import React from "react";
import BentoMenu from "../../components/ui/BentoMenu";

/**
/ PUBLIC_INTERFACE
 * Bento Menu demo page with Ocean theme styling.
 */
export default function BentoMenuDemoPage() {
  const items = [
    { title: "Accordion", description: "Collapsible content", href: "/accordion", icon: "🧩" },
    { title: "Breadcrumbs", description: "Navigation trail", href: "/breadcrumbs", icon: "🧭" },
    { title: "Carousel", description: "Sliding content", href: "/carousel", icon: "🎞️" },
    { title: "Chatbot", description: "Conversational UI", href: "/chatbot", icon: "🤖" },
    { title: "Form Wizard", description: "Multi-step forms", href: "/form-wizard", icon: "🪄" },
    { title: "Testimonial", description: "Customer quotes", href: "/testimonial", icon: "💬" },
  ];

  return (
    <section className="space-y-6">
      <header className="ocean-surface p-6">
        <h1 className="text-2xl font-bold">Bento Menu</h1>
        <p className="text-text/70 mt-1">
          A modern grid-based navigation menu. Fully responsive and keyboard accessible.
        </p>
      </header>

      <BentoMenu items={items} />
    </section>
  );
}
