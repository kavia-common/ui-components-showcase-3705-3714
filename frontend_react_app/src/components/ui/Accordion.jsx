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

  // Keep solid surfaces; use a subtle container treatment
  // Apply vertical spacing between items without affecting each item's internal padding.
  // Use flex + space-y utilities instead of relying solely on borders for separation.
  const containerStyle =
    "flex flex-col space-y-2 rounded-2xl " +
    (variant === "outline" ? "" : ""); // keep variant styling on each item instead of the container

  return (
    <div className={containerStyle} role="region" aria-label="Accordion">
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          idProp={item.id ?? String(idx)}
          title={item.title}
          isOpen={openIds.includes(item.id ?? String(idx))}
          onToggle={toggle}
          variant={variant}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ idProp, title, isOpen, onToggle, children, variant = "soft" }) {
  const reactId = useId();
  const buttonId = `${reactId}-button-${idProp}`;
  const panelId = `${reactId}-panel-${idProp}`;

  // Item wrapper: apply per-item surface/border/shadow so outer container can manage spacing safely.
  // Keep rounded corners and separation without interfering with inner padding or focus outlines.
  const itemWrapperClass =
    variant === "outline"
      ? "bg-surface border border-black/10 rounded-2xl overflow-hidden"
      : "bg-surface shadow-soft rounded-2xl overflow-hidden";

  // Header: maintain thin left brand strip. Icon: full gradient background with white chevron.
  return (
    <div className={itemWrapperClass}>
      <h3 className="m-0">
        <button
          id={buttonId}
          className={[
            "relative w-full pl-5 pr-5 py-4 flex items-center justify-between text-left transition",
            "bg-white text-text",
            "hover:bg-gray-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            // keep clean edge; item wrapper already has its own border/shadow
          ]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(idProp)}
        >
          {/* Thin brand gradient strip on the left */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-1 bg-brand-gradient rounded-tr-sm rounded-br-sm"
          />
          <span className="font-medium">{title}</span>

          {/* New icon: circular gradient background with white chevron; rotates on open */}
          <span
            className={[
              "ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform",
              isOpen ? "rotate-90" : "",
              "bg-brand-gradient",
              "shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              role="presentation"
              aria-hidden="true"
            >
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="white"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
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
