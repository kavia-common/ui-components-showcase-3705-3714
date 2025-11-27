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
  return (
    <div
      className={`grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
      role="list"
      aria-label="Bento Menu"
    >
      {items.map((item, idx) => {
        const CardContent = () => (
          <div className="ocean-surface p-5 h-full flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
            <div className="flex items-start gap-3">
              {item.icon ? (
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                  {item.icon}
                </div>
              ) : (
                <div className="h-10 w-10 rounded-xl bg-primary text-white grid place-items-center shrink-0">
                  {item.title?.[0] ?? "•"}
                </div>
              )}
              <div>
                <div className="text-base font-semibold text-text">{item.title}</div>
                {item.description && (
                  <div className="text-sm text-text/70 mt-0.5">{item.description}</div>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-primary">
              <span>Open</span>
              <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={idx}
              className="group rounded-2xl border border-black/5 hover:shadow-card transition"
              href={item.href}
              aria-label={item.ariaLabel || `Open ${item.title}`}
            >
              <CardContent />
            </a>
          );
        }

        return (
          <button
            key={idx}
            type="button"
            className="text-left group rounded-2xl border border-black/5 hover:shadow-card transition"
            onClick={item.onClick}
            aria-label={item.ariaLabel || `Open ${item.title}`}
          >
            <CardContent />
          </button>
        );
      })}
    </div>
  );
}
