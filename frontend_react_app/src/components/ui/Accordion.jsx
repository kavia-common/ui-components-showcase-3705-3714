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

  // Solid, accessible header styling without broad gradient usage.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <div className={["group relative", isOpen ? "mx-4 mt-4" : "mx-0 mt-0"].join(" ")}>
          <div className={isOpen ? "p-[1px] rounded-xl border border-black/10" : ""}>
            <button
              id={buttonId}
              className={[
                "w-full px-5 py-4 flex items-center justify-between text-left rounded-xl",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                "bg-white border border-black/5",
                "hover:bg-gray-50 transition",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(idProp)}
            >
              <span className="font-medium text-text">{title}</span>
              <span
                className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white transition-transform ${
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
        {children}
      </div>
    </div>
  );
}
