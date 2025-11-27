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
    {
      title: "Can multiple panels be open at the same time?",
      content: (
        <p>
          Yes. This accordion allows multiple sections to be expanded simultaneously for quick comparisons.
        </p>
      ),
    },
    {
      title: "How do I set a section to be open by default?",
      content: (
        <p>
          Provide <code>defaultOpen: true</code> on the item you want initially expanded.
        </p>
      ),
    },
    {
      title: "Does it support keyboard interactions?",
      content: (
        <p>
          Absolutely. Focus headers with Tab and toggle using Enter or Space. Screen readers announce states via ARIA.
        </p>
      ),
    },
  ];
  return (
    <section className="space-y-6">
      <header className="rounded-2xl overflow-hidden border border-black/5">
        <div className="bg-brand-gradient">
          <div className="surface-overlay-soft px-6 py-6">
            <h1 className="text-2xl font-bold text-white">Accordion</h1>
            <p className="text-white/90 mt-1">
              Expand and collapse content panels with accessible semantics.
            </p>
          </div>
        </div>
      </header>

      <Accordion items={items} variant="soft" />

      <div className="text-sm text-text/70">
        Tip: Use Tab to focus headers and Enter/Space to toggle.
      </div>
    </section>
  );
}
