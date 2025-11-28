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
 * - Container: subtle glass/answer-surface with softer shadow and rounded-md for a premium look.
 * - Links: no default border; on hover/focus-visible show thin gradient underline and a very light background veil.
 * - Separators: slightly smaller chevrons with refined spacing.
 * - Current crumb: tasteful gradient chip/pill with aria-current="page".
 * - Typography: concise, navbar-consistent (text-sm, medium weight); maintain high contrast.
 * - Accessibility: focus-visible rings, aria-current, proper nav/ol semantics.
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      {/* Premium container: soft glass answer surface, subtle border, rounded-md and soft shadow */}
      <div className="app-answer-surface app-answer-border rounded-md shadow-hairline px-3 py-2 sm:px-4 sm:py-3">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-1.5 text-sm leading-6">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;

            return (
              <li
                key={`${item.label}-${idx}`}
                className="flex items-center min-w-0"
              >
                {isLast || !item.to ? (
                  // Current crumb: gradient chip/pill for emphasis; keep aria-current for accessibility
                  <span
                    className={[
                      "truncate max-w-[24ch]",
                      "px-2 py-1 rounded-full",
                      "bg-white/70 backdrop-blur-[2px] border-brand-gradient-surface",
                      "text-transparent bg-clip-text bg-brand-gradient font-semibold",
                    ].join(" ")}
                    aria-current={isLast ? "page" : undefined}
                    title={item.label}
                  >
                    {item.label}
                  </span>
                ) : (
                  // Link items: navbar-like type rhythm; gradient underline on hover/focus-visible
                  <Link
                    to={item.to}
                    className={[
                      "inline-flex items-center max-w-[22ch] truncate",
                      "text-text/80 hover:text-text font-medium",
                      "px-1.5 py-1 rounded-md relative",
                      // Thin gradient underline on hover/focus-visible (no default border)
                      "after:content-[''] after:absolute after:left-1.5 after:right-1.5 after:-bottom-[2px] after:h-[2px] after:scale-x-0",
                      "after:bg-brand-gradient after:transition-transform after:origin-left",
                      "hover:after:scale-x-100 focus-visible:after:scale-x-100",
                      // Very light background veil on hover/focus-visible
                      "hover-bg-subtle",
                      // Keep accessible ring
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
                      "transition",
                    ].join(" ")}
                    title={item.label}
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && <ChevronSeparator />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** Small chevron separator with refined size and spacing to match navbar rhythm. */
function ChevronSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mx-1 sm:mx-1.5 inline-flex items-center text-text/40"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[14px] w-[14px]"
        role="presentation"
        aria-hidden="true"
      >
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
