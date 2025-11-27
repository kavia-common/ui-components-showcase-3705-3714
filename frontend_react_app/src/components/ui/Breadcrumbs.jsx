import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs component
 * Props:
 * - items: Array<{ label: string, to?: string }>
 * If 'to' is omitted on last item, it is rendered as current page.
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="text-sm" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-text/70">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
              {isLast || !item.to ? (
                <span
                  className="font-medium text-text"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-text text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-text/40">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
