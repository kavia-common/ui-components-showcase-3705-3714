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

  /**
   * ExploreChevronIcon replicates the exact Accordion header affordance:
   * - Wrapper: inline-flex h-8 w-8, rounded-full, bg-white/80 + backdrop-blur-sm
   * - Gradient border ring: border-brand-gradient and ring-brand-inner
   * - Transition: transform duration-200 ease-out
   * - SVG: 18px chevron using the right-pointing path with #111827 stroke, 2.4 width, round caps/joins
   * - Rotation: static for Bento (no expand state), but keep the same classes for consistency
   */
  function ExploreChevronIcon({ decorative = true, label = "Explore" }) {
    return (
      <span
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded-full",
          "bg-white/80 backdrop-blur-sm",
          "border-brand-gradient ring-brand-inner",
          "transition-transform duration-200 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.08)]",
        ].join(" ")}
        role={decorative ? "presentation" : "img"}
        aria-hidden={decorative ? "true" : undefined}
        aria-label={decorative ? undefined : label}
      >
        <svg
          className="h-4.5 w-4.5"
          viewBox="0 0 24 24"
          role="presentation"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="#111827"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  // Body shows the concise 1–2 line description in the lighter answer surface and places the icon bottom-right.
  const Body = ({ item }) => {
    const hasLink = !!item.href || !!item.onClick;
    const decorative = hasLink; // keep decorative if tile itself is interactive

    return (
      <div className="px-5 py-4 relative">
        {item.bodyText ? (
          <>
            <p className="text-sm leading-5 text-text/80 pr-8">
              {item.bodyText}
            </p>
            {/* Exact Accordion-like affordance, anchored bottom-right; non-interactive */}
            <span
              className="pointer-events-none absolute bottom-2 right-2 z-10"
              aria-hidden={decorative ? "true" : undefined}
            >
              <ExploreChevronIcon decorative={decorative} />
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
              <ExploreChevronIcon decorative={decorative} />
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
