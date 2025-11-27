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

  // Solid surface with a bold gradient header strip on the left; no gradient overlays on content.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <button
          id={buttonId}
          className={[
            "relative w-full px-5 py-4 pl-6 flex items-center justify-between text-left transition",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#af2497]",
            "bg-white hover:bg-gray-50",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(idProp)}
        >
          {/* Gradient left border/strip */}
          <span
            aria-hidden="true"
            className={[
              "absolute left-0 top-0 h-full w-1.5 rounded-r",
              isOpen ? "bg-brand-gradient" : "bg-black/10 group-hover:bg-black/20",
            ].join(" ")}
          />
          <span className="font-medium text-text">{title}</span>
          <span
            className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-lg text-white transition-transform ${
              isOpen ? "rotate-90 bg-brand-gradient" : "bg-primary"
            }`}
            aria-hidden="true"
          >
            ▸
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`px-5 pb-5 text-sm text-text/80 transition-all origin-top ${
          isOpen ? "block animate-slideUp" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
