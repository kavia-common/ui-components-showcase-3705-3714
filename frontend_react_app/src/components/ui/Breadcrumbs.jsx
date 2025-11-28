import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs component
 * Props:
 * - items: Array<{ label: string, to?: string }>
 * If 'to' is omitted on last item, it is rendered as current page.
 *
 * Visual/UX:
 * - Uses the answer palette surface + subtle border for the container.
 * - Links: base has no border/background; hover/focus-visible add a subtle bg highlight and a thin 2px brand-gradient border (via hover-gradient-border).
 * - Current crumb: gradient text accent and aria-current="page".
 * - Separators: subtle chevrons with consistent spacing/typography.
 * - Accessibility: focus-visible rings, aria-current, proper nav/ol semantics.
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <div className="app-answer-surface app-answer-border px-3 py-2 sm:px-4 sm:py-3 rounded-2xl">
        <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm leading-6">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li
                key={`${item.label}-${idx}`}
                className="flex items-center min-w-0"
              >
                {isLast || !item.to ? (
                  <span
                    className="truncate font-semibold text-brand-gradient"
                    aria-current={isLast ? "page" : undefined}
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.to}
                    className={[
                      // Base: no border/background, keep subtle text tone
                      "inline-flex items-center max-w-[22ch] truncate text-text/75",
                      "rounded-md px-1.5 py-1",
                      // On hover/focus-visible: subtle bg highlight + thin gradient border (2px)
                      "hover-bg-subtle hover-gradient-border",
                      // Keep accessible ring
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
                      // Smooth transition
                      "transition",
                    ].join(" ")}
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && (
                  <ChevronSeparator />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** Small chevron separator kept subtle and aligned with link typography. */
function ChevronSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mx-1.5 sm:mx-2 inline-flex items-center text-text/40"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        role="presentation"
        aria-hidden="true"
      >
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
