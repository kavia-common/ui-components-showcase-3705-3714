import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs component
 * Props:
 * - items: Array<{ label: string, to?: string }>
 * If 'to' is omitted on last item, it is rendered as current page.
 *
 * Reverted visual/UX (pre-premium):
 * - No glass/answer-surface container; render inline list only.
 * - Simple text links with underline on hover.
 * - Standard chevron separators with default spacing.
 * - Current crumb is plain text with aria-current="page" and stronger text color.
 * - Keep semantics and responsiveness (wrap on small screens).
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center text-sm leading-6">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${item.label}-${idx}`} className="flex items-center min-w-0">
              {isLast || !item.to ? (
                <span
                  className="truncate max-w-[28ch] text-text font-medium"
                  aria-current={isLast ? "page" : undefined}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="truncate max-w-[26ch] text-text/70 hover:text-text underline-offset-2 hover:underline focus:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] rounded-sm px-0.5"
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
    </nav>
  );
}

/** Chevron separator restored to prior size and spacing. */
function ChevronSeparator() {
  return (
    <span aria-hidden="true" className="mx-2 inline-flex items-center text-text/40">
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
