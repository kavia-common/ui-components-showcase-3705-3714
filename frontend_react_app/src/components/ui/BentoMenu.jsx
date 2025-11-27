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
  // The gradient will be applied to the tile background element (the wrapper itself).
  const wrapperBase =
    "group rounded-2xl transition hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  // Content: use solid foregrounds for high contrast on top of the gradient tile.
  // Remove any bg-* that could conflict with the gradient background on the wrapper.
  const Content = ({ item }) => (
    <div className="p-5 h-full flex flex-col justify-between rounded-2xl">
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
            <div className="text-sm text-white/85 mt-0.5">{item.description}</div>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-white/90">
        <span>Open</span>
        <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
      </div>
    </div>
  );

  // Stronger brand gradient class (applied directly to tile background)
  // Uses the exact brand gradient and slightly increases intensity by adding a subtle brightness on hover via filter.
  const tileBg = "bg-brand-gradient";

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
              className={`${wrapperBase} ${spanCls} ${tileBg} hover:brightness-[1.06]`}
              href={item.href}
              aria-label={item.ariaLabel || `Open ${item.title}`}
            >
              <Content item={item} />
            </a>
          );
        }

        return (
          <button
            key={idx}
            type="button"
            className={`${wrapperBase} ${spanCls} ${tileBg} text-left hover:brightness-[1.06]`}
            onClick={item.onClick}
            aria-label={item.ariaLabel || `Open ${item.title}`}
          >
            <Content item={item} />
          </button>
        );
      })}
    </div>
  );
}
