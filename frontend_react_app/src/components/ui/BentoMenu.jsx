import React from "react";

/**
/ PUBLIC_INTERFACE
 * BentoMenu: a responsive grid-based menu with accessible cards.
 * Props:
 * - items: Array<{ title: string, description?: string, icon?: ReactNode, onClick?: () => void, href?: string, ariaLabel?: string }>
 * - cols: number (1-4), default 2 on small, 3 on md, customizable via className
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
    "group rounded-2xl transition hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

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

  // Replace "Open" label with an accessible chevron icon control aligned to the right
  const Body = ({ item }) => (
    <div className="px-5 py-4">
      <div className="mt-1 flex items-center justify-between text-sm text-text/80">
        <span className="sr-only">Open</span>
        <ChevronAction
          ariaLabel={item.ariaLabel || `Open ${item.title}`}
          onClick={item.onClick}
          isInteractive={!!item.onClick && !item.href}
        />
      </div>
    </div>
  );

  // Inline chevron icon; interactive if onClick is provided on a button tile
  function ChevronAction({ ariaLabel, onClick, isInteractive }) {
    const baseIcon =
      "inline-flex h-9 w-9 items-center justify-center rounded-full transition shadow-[0_1px_2px_rgba(0,0,0,0.08)]";
    const interactiveFocus =
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
    const nonInteractiveStyle = "cursor-default";
    // On light surface keep contrast high; in gradient headers we used text-white, but here body is light.
    const surfaceStyle = "bg-white hover:bg-white/90 border border-black/10 text-text";

    if (isInteractive) {
      return (
        <button
          type="button"
          className={[baseIcon, interactiveFocus, surfaceStyle].join(" ")}
          aria-label={ariaLabel}
          onClick={(e) => {
            // Keep behavior consistent with previous Open button; stop bubbling to avoid duplicate navigation if needed
            e.stopPropagation?.();
            onClick?.(e);
          }}
        >
          <ChevronRightSvg ariaHidden />
        </button>
      );
    }

    // Non-interactive variant (when using href wrapper): keep as decorative span; a11y is handled by outer link/button
    return (
      <span className={[baseIcon, nonInteractiveStyle, surfaceStyle].join(" ")} aria-hidden="true">
        <ChevronRightSvg ariaHidden />
      </span>
    );
  }

  function ChevronRightSvg({ ariaHidden = false }) {
    return (
      <svg
        className="h-4.5 w-4.5"
        viewBox="0 0 24 24"
        role="presentation"
        aria-hidden={ariaHidden ? "true" : undefined}
      >
        <path
          d="M9 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Render anchor or button preserving layout/hover behaviors
  const TileInner = ({ item }) => (
    <div className={`h-full w-full overflow-hidden rounded-2xl ${tileSurface}`}>
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
              className={`${wrapperBase} ${spanCls} text-left hover:brightness-[1.03]`}
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
            className={`${wrapperBase} ${spanCls} text-left hover:brightness-[1.03]`}
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
