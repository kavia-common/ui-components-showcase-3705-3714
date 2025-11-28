import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs component
 * Props:
 * - items: Array<{ label: string, to?: string }>
 * If 'to' is omitted on last item, it is rendered as current page.
 *
 * Styling goals:
 * - Minimal inline layout (no heavy container chrome)
 * - Chevron separators with balanced spacing
 * - No default borders; on hover/focus-visible show a thin (~2px) brand-gradient underline
 * - Current crumb subtly emphasized (gradient text or thin underline), keep aria-current
 * - Typography aligns with navbar links (uppercase, text-sm, medium)
 * - Good contrast across light/gradient contexts
 * - Mobile responsive: wraps by default; enables horizontal scroll if long
 */
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full"
    >
      <ol
        className={[
          // Inline, minimalist: no extra box; let it wrap naturally
          "flex items-center gap-0",
          // Wrap on small screens; if very long, allow horizontal scroll without breaking layout
          "flex-wrap",
          "text-sm font-medium uppercase tracking-normal",
          // Ensure consistent line height with navbar links
          "leading-6",
          // Provide a safe scroll container in pathological long trails (activates when wrapping still overflows)
          "overflow-x-auto",
        ].join(" ")}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${item.label}-${idx}`} className="flex items-center min-w-0">
              {isLast || !item.to ? (
                <span
                  className={[
                    "truncate max-w-[28ch]",
                    // Subtle emphasis for current crumb: gradient text while maintaining readability
                    "text-brand-gradient",
                    // Fallback text color for browsers that might not support background-clip
                    "supports-[background-clip:text]:text-transparent",
                  ].join(" ")}
                  aria-current={isLast ? "page" : undefined}
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : (
                <CrumbLink to={item.to} label={item.label} />
              )}

              {!isLast && <ChevronSeparator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Inline crumb link with brand-gradient underline on hover/focus-visible.
 * Keeps base state borderless and minimal.
 */
function CrumbLink({ to, label }) {
  return (
    <Link
      to={to}
      title={label}
      className={[
        "relative truncate max-w-[26ch]",
        // Base color with good contrast on light and gradient contexts
        "text-text/80 hover:text-text",
        // Padding to give underline room without layout jump
        "px-0.5 py-0.5 rounded-sm",
        // Keyboard focus ring for accessibility
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
        // Brand gradient underline on hover/focus-visible only
        "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0",
        "after:h-[2px] after:scale-x-0 after:origin-left",
        "after:transition-transform after:duration-150",
        "hover:after:scale-x-100 focus-visible:after:scale-x-100",
        "after:bg-[linear-gradient(45deg,_#af2497_10%,_#902d9a_20%,_#1840a0_100%)]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

/** Chevron separator with balanced spacing and consistent size. */
function ChevronSeparator() {
  return (
    <span
      aria-hidden="true"
      className="mx-2 inline-flex items-center text-text/40"
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
