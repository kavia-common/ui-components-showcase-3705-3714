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

  // Spacing between items; leave per-item styles to the item wrapper for clean separation.
  const containerStyle =
    "flex flex-col space-y-2 rounded-2xl";

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

  // Per-item wrapper surface with either shadow or outline
  const itemWrapperClass =
    variant === "outline"
      ? "bg-surface border border-black/10 rounded-2xl overflow-hidden transform-gpu accordion-hover-elevate"
      : "bg-surface shadow-soft rounded-2xl overflow-hidden transform-gpu accordion-hover-elevate";

  // Header style: subtle glass/blur surface, gradient accent bar on the left, improved spacing,
  // hover/active states, and clear affordance with an icon that rotates on open.
  const headerBase =
    "relative w-full text-left flex items-center justify-between gap-3 px-5 py-4 transition duration-200 ease-out";
  const headerLook =
    "bg-white/70 backdrop-blur-sm text-text hover:bg-white/85 active:bg-white focus:outline-none";
  const headerFocus =
    "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0";
  const headerRadius = "rounded-none"; // wrapper already has rounding; avoid double rounding at edges

  return (
    <div className={itemWrapperClass}>
      <h3 className="m-0">
        <button
          id={buttonId}
          className={[headerBase, headerLook, headerFocus, headerRadius]
            .filter(Boolean)
            .join(" ")}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(idProp)}
        >
          {/* Gradient accent bar on the left for brand presence */}
          <span
            aria-hidden="true"
            className={[
              "absolute left-0 top-0 h-full w-1 bg-brand-gradient",
              // Slightly thicker when open for stronger affordance
              isOpen ? "w-1.5" : "w-1",
            ].join(" ")}
          />
          {/* Title with improved weight and spacing */}
          <span className="font-semibold pr-2">{title}</span>

          {/* Affordance icon: circular soft surface with brand gradient ring and chevron; rotates when open */}
          <span
            className={[
              "ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full",
              "bg-white/80 backdrop-blur-sm",
              "border-brand-gradient ring-brand-inner",
              "transition-transform duration-200 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
              isOpen ? "rotate-90" : "",
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
                stroke="#111827"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      {/* Body/content styling intact; apply only when open. Keep solid readable surface with soft brand overlay class already defined. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          "px-5 pb-5 text-sm text-text/90 transition-all duration-200 ease-out origin-top",
          isOpen ? "block animate-slideUp brand-panel-soft-strong" : "hidden bg-white",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
