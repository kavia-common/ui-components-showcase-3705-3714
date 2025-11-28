import React from "react";

/**
/ PUBLIC_INTERFACE
 * BentoMenu: a responsive grid-based menu with accessible cards.
 * Props:
 * - items: Array<{
 *     title: string,
 *     description?: string,     // short subtitle in header (kept on gradient)
 *     bodyText?: string,        // 1–2 line concise description in the lighter body area
 *     icon?: ReactNode,
 *     onClick?: () => void,
 *     href?: string,
 *     ariaLabel?: string,
 *     span?: string
 *   }>
 * - className: additional classes for container
 */
export default function BentoMenu({ items = [], className = "" }) {
  // Define a repeating mosaic pattern for uneven grid spans
  // Each item can override with item.span e.g. "md:col-span-2 row-span-2"
  const defaultPattern = [
    "sm:col-span-2 row-span-2", // Hero tile
    "sm:col-span-1 row-span-1",
    "sm:col-span-1 row-span-1",
    "sm:col-span-1 row-span-2",
    "sm:col-span-1 row-span-1",
    "sm:col-span-2 row-span-1",
  ];

  // Wrapper styles: preserve focus and hover elevation.
  const wrapperBase =
    "group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 tile-hover-elevate";

  // Tile container uses the lighter answer surface
  const tileSurface = "app-answer-surface app-answer-border";

  // Header: gradient strip with white text; body remains on light surface
  const Header = ({ item }) => (
    <div className="bento-tile-header px-5 py-4">
      <div className="flex items-start gap-3">
        {item.icon ? (
          <div className="h-10 w-10 rounded-xl bg-white/15 text-white grid place-items-center shrink-0 ring-1 ring-white/25">
            {item.icon}
          </div>
        ) : (
          <div className="h-10 w-10 rounded-xl bg-white text-text grid place-items-center shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
            {item.title?.[0] ?? "•"}
          </div>
        )}
        <div>
          <div className="text-base font-semibold text-white">{item.title}</div>
          {item.description && (
            <div className="text-sm text-white/90 mt-0.5">{item.description}</div>
          )}
        </div>
      </div>
    </div>
  );

  // Body shows the concise 1–2 line description in the lighter answer surface.
  // Keep layout and behavior intact; ensure accessible contrast and consistent placement.
  const ExploreIcon = ({ decorative = true, label = "Explore" }) => {
    /**
     * Chevron-in-circle built with currentColor so gradient text utility applies.
     * Uses gradient text fill via bg-clip-text + text-transparent on a wrapper span.
     * Adds a subtle outline for visibility against light surfaces.
     */
    const svg = (
      <svg
        className="w-6 h-6 inline-block"
        viewBox="0 0 24 24"
        role="img"
        aria-label={decorative ? undefined : label}
        aria-hidden={decorative ? "true" : undefined}
        focusable={decorative ? "false" : "true"}
      >
        {/* Use currentColor so the gradient text fill from the wrapper applies */}
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.18" />
        <path
          d="M10 8l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );

    return (
      <span className="relative inline-flex">
        {/* Outline/fallback layer to ensure contrast on very light backgrounds */}
        <span
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            filter: "drop-shadow(0 0 0.75px rgba(0,0,0,0.32))",
          }}
        >
          {svg}
        </span>
        <span className="icon-gradient-major icon-gradient-text inline-flex relative">
          {svg}
        </span>
      </span>
    );
  };

  const Body = ({ item }) => {
    const hasLink = !!item.href || !!item.onClick;
    // If the tile itself is interactive, keep the icon decorative to avoid duplicating focus stops.
    // If the tile is non-interactive, expose the icon label for SR discoverability.
    const decorative = hasLink;

    return (
      <div className="px-5 py-4 relative">
        {item.bodyText ? (
          <>
            <p className="text-sm leading-5 text-text/80 pr-8">
              {item.bodyText}
            </p>

            {/* Larger explore icon anchored to bottom-right of the tile body.
                - Non-interactive (decorative) when the entire tile is the control.
                - Provides ARIA label if tile is not interactive. */}
            <span
              className="pointer-events-none absolute bottom-2 right-2 z-10"
              aria-hidden={decorative ? "true" : undefined}
            >
              <ExploreIcon decorative={decorative} />
            </span>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm pr-8">
              <p className="text-text/80">Learn more</p>
              <span className="text-text/50 text-xs" aria-hidden="true">
                {hasLink ? "Open" : ""}
              </span>
            </div>
            <span
              className="pointer-events-none absolute bottom-2 right-2 z-10"
              aria-hidden={decorative ? "true" : undefined}
            >
              <ExploreIcon decorative={decorative} />
            </span>
          </>
        )}
      </div>
    );
  };

  // Render anchor or button preserving layout/hover behaviors
  const TileInner = ({ item }) => (
    <div
      className={`h-full w-full overflow-hidden rounded-2xl relative ${tileSurface}`}
    >
      <Header item={item} />
      <Body item={item} />
    </div>
  );

  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(120px,auto)] ${className}`}
      role="list"
      aria-label="Bento Menu"
    >
      {items.map((item, idx) => {
        const spanCls = item.span || defaultPattern[idx % defaultPattern.length];

        if (item.href) {
          return (
            <a
              key={idx}
              className={`${wrapperBase} ${spanCls} text-left transform-gpu`}
              href={item.href}
              aria-label={item.ariaLabel || `Open ${item.title}`}
            >
              <TileInner item={item} />
            </a>
          );
        }

        return (
          <button
            key={idx}
            type="button"
            className={`${wrapperBase} ${spanCls} text-left transform-gpu`}
            onClick={item.onClick}
            aria-label={item.ariaLabel || `Open ${item.title}`}
          >
            <TileInner item={item} />
          </button>
        );
      })}
    </div>
  );
}
