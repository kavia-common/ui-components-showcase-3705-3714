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

  // Solid header with a thin brand-gradient left strip for accent.
  // Chevron indicator uses brand gradient via SVG mask, ensuring strong contrast and hover/focus affordances.
  return (
    <div className="bg-white">
      <h3 className="m-0">
        <button
          id={buttonId}
          className={[
            "relative w-full pl-5 pr-5 py-4 flex items-center justify-between text-left transition",
            "bg-white text-text",
            "hover:bg-gray-50",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            isOpen ? "border-b border-black/5" : "",
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

          {/* Gradient chevron icon wrapper:
              - uses mask + bg-brand-gradient for a solid gradient icon
              - bg-black/5 circle behind for contrast on light; subtle change on hover/focus
              - rotates when open for state indication
          */}
          <span
            className={[
              "ml-3 inline-flex h-6 w-6 items-center justify-center rounded-lg transition-transform",
              isOpen ? "rotate-90" : "",
              "bg-black/5 hover:bg-black/10 focus-visible:bg-black/10",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              role="presentation"
              aria-hidden="true"
            >
              {/* Masked chevron path; the rect with bg-brand-gradient is revealed through the mask */}
              <defs>
                <mask id={`chev-mask-${buttonId}`}>
                  <rect x="0" y="0" width="24" height="24" fill="white" />
                  {/* Cut out everything except the chevron by drawing the chevron in black on a black background and inverting */}
                </mask>
              </defs>
              {/* Use a path for a right-pointing chevron; we fill with white in mask space by using currentColor.
                  We'll implement a direct mask by using the path as a maskContentUnits="userSpaceOnUse" */}
              <g>
                <mask id={`chev-only-${buttonId}`}>
                  <rect x="0" y="0" width="24" height="24" fill="black" />
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
                {/* Gradient rect that will be visible only where the chevron path is */}
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  mask={`url(#chev-only-${buttonId})`}
                  fill="url(#brand-grad)"
                />
              </g>

              {/* Define gradient; scoped to this icon for consistent rendering */}
              <defs>
                <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="10%" stopColor="#af2497" />
                  <stop offset="20%" stopColor="#902d9a" />
                  <stop offset="100%" stopColor="#1840a0" />
                </linearGradient>
              </defs>
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
