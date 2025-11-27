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

  // We add a subtle brand-gradient treatment:
  // - A very light translucent gradient background on the header for both states
  // - On hover/focus: slightly stronger translucency to indicate interactivity
  // - When open: an accent "gradient border" ring using an outer wrapper (relative + pseudo gradient with padding)
  // All text remains dark for readability on light backgrounds; focus-visible ring ensures accessibility.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <div
          className={[
            "group relative",
            isOpen
              ? // When open, create a gradient border effect using padding wrapper
                "p-[1px] rounded-xl bg-[linear-gradient(45deg,#af2497_10%,#902d9a_20%,#1840a0_100%)] mx-4 mt-4"
              : "mx-0 mt-0",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            id={buttonId}
            className={[
              "w-full px-5 py-4 flex items-center justify-between text-left",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl",
              // Subtle translucent gradient background with good contrast for text
              // Base state:
              "bg-[linear-gradient(45deg,#af2497_10%,#902d9a_20%,#1840a0_100%)]",
              "bg-[length:100%_100%] bg-no-repeat",
              // Make it translucent to keep it subtle; use white overlay for readability
              "bg-opacity-[0.10] [--tw-bg-opacity:1] relative",
              // Create an inner overlay to soften the gradient: white in light mode, slight dark in dark mode
              "before:absolute before:inset-0 before:rounded-xl before:bg-white/80 dark:before:bg-white/70",
              // Hover/Focus states increase gradient visibility slightly while preserving legibility
              "hover:before:bg-white/85 hover:bg-opacity-[0.12]",
              "group-focus-visible:before:bg-white/85",
              // If open, place the actual header on top of border wrapper
              isOpen ? "rounded-xl" : "",
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
