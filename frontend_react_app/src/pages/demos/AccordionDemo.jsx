import React from "react";
import Accordion from "../../components/ui/Accordion";

/**
/ PUBLIC_INTERFACE
 * Accordion demo page with Ocean theme styling.
 */
export default function AccordionDemoPage() {
  const items = [
    {
      title: "What is the Ocean theme?",
      content: (
        <p>
          A modern aesthetic using blue and amber accents, subtle shadows and smooth transitions.
        </p>
      ),
      defaultOpen: true,
    },
    {
      title: "Is the accordion accessible?",
      content: (
        <p>
          Yes. It uses proper aria attributes, keyboard focus styles and semantic buttons.
        </p>
      ),
    },
    {
      title: "Can I customize styles?",
      content: (
        <p>
          Absolutely. Pass variant or apply custom classes around the component as needed.
        </p>
      ),
    },
  ];
  return (
    <section className="space-y-6">
      <header className="ocean-surface p-6">
        <h1 className="text-2xl font-bold">Accordion</h1>
        <p className="text-text/70 mt-1">
          Expand and collapse content panels with accessible semantics.
        </p>
      </header>

      <Accordion items={items} variant="soft" />

      <div className="text-sm text-text/70">
        Tip: Use Tab to focus headers and Enter/Space to toggle.
      </div>
    </section>
  );
}
