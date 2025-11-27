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
              // Slightly larger icon wrapper for more gradient area
              "ml-3 inline-flex h-7 w-7 items-center justify-center rounded-lg transition-transform",
              isOpen ? "rotate-90" : "",
              // Maintain subtle background for light/dark with better contrast
              "icon-wrapper-contrast",
              // Hover/focus brightness boost without affecting layout
              "hover:brightness-110 focus-visible:brightness-110",
              // Subtle drop shadow for extra separation from background
              "shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
            ].join(" ")}
            aria-hidden="true"
          >
            <svg
              className="h-4.5 w-4.5" /* slightly thicker footprint than 4 */
              viewBox="0 0 24 24"
              role="presentation"
              aria-hidden="true"
            >
              {/* Masked chevron path with thicker stroke and white outline via duplicate stroke */}
              <g>
                {/* Outer thin white outline for contrast across backgrounds */}
                <path
                  d="M9 6l6 6-6 6"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.9"
                  strokeWidth="3.2" /* outline underlay */
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Gradient fill using mask technique to keep brand colors vivid */}
                <defs>
                  <mask id={`chev-only-${buttonId}`}>
                    <rect x="0" y="0" width="24" height="24" fill="black" />
                    <path
                      d="M9 6l6 6-6 6"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.8" /* slightly thicker than before for bolder look */
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  mask={`url(#chev-only-${buttonId})`}
                  fill={`url(#brand-grad-${buttonId})`}
                />
              </g>

              {/* Define a per-icon gradient id to avoid id collisions when multiple accordions render */}
              <defs>
                <linearGradient id={`brand-grad-${buttonId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  {/* Increase contrast by adjusting stops and spacing */}
                  <stop offset="0%" stopColor="#bf1fa3" />     {/* brighter magenta */}
                  <stop offset="22%" stopColor="#a533a8" />
                  <stop offset="55%" stopColor="#5a3bb0" />
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
