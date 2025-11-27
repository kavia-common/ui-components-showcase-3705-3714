import React, { useState, useId } from "react";

/**
/ PUBLIC_INTERFACE
 * Accordion component: accessible collapsible sections.
 * Props:
 * - items: Array<{ id?: string, title: string, content: React.ReactNode, defaultOpen?: boolean }>
 * - variant: "soft" | "outline" (visual style)
 */
export default function Accordion({ items = [], variant = "soft" }) {
  const [openIds, setOpenIds] = useState(
    items.filter((it) => it.defaultOpen).map((it, idx) => it.id ?? String(idx))
  );

  const toggle = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const containerStyle =
    "divide-y divide-black/5 rounded-2xl overflow-hidden " +
    (variant === "outline" ? "border border-black/10 bg-surface" : "shadow-soft bg-surface");

  return (
    <div className={containerStyle} role="region" aria-label="Accordion">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          idProp={item.id ?? String(idx)}
          title={item.title}
          isOpen={openIds.includes(item.id ?? String(idx))}
          onToggle={toggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ idProp, title, isOpen, onToggle, children }) {
  const reactId = useId();
  const buttonId = `${reactId}-button-${idProp}`;
  const panelId = `${reactId}-panel-${idProp}`;

  // Header: solid brand gradient background with strong contrast (white text/icons).
  // Content panel: stays solid surface for readability.
  // Expanded state shows a subtle inner ring; hover/focus use brighter ring/shadow.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <button
          id={buttonId}
          className={[
            // Layout
            "relative w-full px-5 py-4 flex items-center justify-between text-left transition",
            // Background & text for header
            "bg-brand-gradient text-white",
            // Focus-visible: stronger, high-contrast ring; hover adds subtle lift
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 hover:brightness-[1.06]",
            // Expanded subtle inner ring/border using inset shadow for differentiation
            isOpen ? "shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.65)]" : "shadow-none",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(idProp)}
        >
          <span className="font-medium">{title}</span>
          <span
            className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-lg text-white transition-transform bg-white/20 ${
              isOpen ? "rotate-90" : ""
            }`}
            aria-hidden="true"
          >
            ▸
          </span>

          {/* Gradient border halo on hover/focus (visual only, not interactive) */}
          <span
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0 rounded-none",
              "ring-0 focus-within:ring-0",
              "transition",
              "focus-visible:shadow-[0_0_0_2px_rgba(255,255,255,0.85)]",
            ].join(" ")}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`px-5 pb-5 text-sm text-text/90 transition-all origin-top bg-white ${
          isOpen ? "block animate-slideUp" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
