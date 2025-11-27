import React from "react";
import BentoMenu from "../../components/ui/BentoMenu";

/**
/ PUBLIC_INTERFACE
 * Bento Menu demo page with Ocean theme styling.
 */
export default function BentoMenuDemoPage() {
  const items = [
    { title: "Accordion", description: "Collapsible content", href: "/accordion", icon: "🧩", span: "sm:col-span-2 row-span-2" },
    { title: "Breadcrumbs", description: "Navigation trail", href: "/breadcrumbs", icon: "🧭", span: "row-span-1" },
    { title: "Carousel", description: "Sliding content", href: "/carousel", icon: "🎞️", span: "row-span-2" },
    { title: "Chatbot", description: "Conversational UI", href: "/chatbot", icon: "🤖", span: "row-span-1" },
    { title: "Form Wizard", description: "Multi-step forms", href: "/form-wizard", icon: "🪄", span: "row-span-1" },
    { title: "Testimonial", description: "Customer quotes", href: "/testimonial", icon: "💬", span: "sm:col-span-2 row-span-1" },
  ];

  return (
    <section className="space-y-6">
      <header className="rounded-2xl overflow-hidden border border-black/5">
        <div className="bg-brand-gradient">
          <div className="surface-overlay-soft px-6 py-6">
          <h1 className="text-2xl font-bold text-white">Bento Menu</h1>
          <p className="text-white/90 mt-1">
            A modern grid-based navigation menu. Fully responsive and keyboard accessible.
          </p>
        </div>
        </div>
      </header>

      <BentoMenu items={items} />
    </section>
  );
}
