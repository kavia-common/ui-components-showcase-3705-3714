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
    (variant === "outline" ? "border border-black/10" : "shadow-soft bg-surface");

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

  // Brand gradient accent with accessible overlay and clear focus styles.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <div className={["group relative", isOpen ? "mx-4 mt-4" : "mx-0 mt-0"].join(" ")}>
          {/* Gradient ring wrapper only when open */}
          <div className={isOpen ? "p-[1px] rounded-xl border-brand-gradient glow-brand" : ""}>
            <button
              id={buttonId}
              className={[
                "w-full px-5 py-4 flex items-center justify-between text-left rounded-xl",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                // Soft inner surface with subtle gradient wash
                "relative bg-white",
                "after:absolute after:inset-0 after:rounded-xl after:pointer-events-none",
                "after:bg-brand-gradient after:opacity-[0.10]",
                "hover:after:opacity-[0.14] transition",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(idProp)}
            >
              <span className="relative z-[1] font-medium text-text">{title}</span>
              <span
                className={`relative z-[1] ml-3 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
                aria-hidden="true"
              >
                ▸
              </span>
            </button>
          </div>
        </div>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`px-5 pb-5 text-sm text-text/80 transition-all origin-top ${
          isOpen ? "block animate-slideUp" : "hidden"
        }`}
      >
        {/* Expanded panel accent line */}
        {isOpen && <div className="h-1 w-12 rounded-full bg-brand-gradient opacity-30 mt-3 mb-3" aria-hidden="true" />}
        {children}
      </div>
    </div>
  );
}
