import React from "react";

/**
/ PUBLIC_INTERFACE
 * Card: Ocean Professional card primitive with optional sections.
 * Props:
 * - variant: "surface" | "outline" | "ghost" | "brand" | "brandOutline" | "brandGlow"
 * - className: outer container classes
 * - header, footer: ReactNode
 * - children: content
 */
export default function Card({
  variant = "surface",
  className = "",
  header,
  children,
  footer,
  ...rest
}) {
  const styles = {
    surface: "bg-surface shadow-soft border border-black/5",
    outline: "bg-white border border-black/10",
    ghost: "bg-transparent border border-transparent",
    brand: "bg-white border border-transparent",
    brandOutline: "bg-white border-brand-gradient",
    brandGlow: "bg-white border border-transparent glow-brand",
  };

  return (
    <section
      className={[
        "rounded-2xl overflow-hidden",
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {header && (
        <div className="px-5 py-4 border-b border-black/5 bg-white">
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-black/5 bg-white">
          {footer}
        </div>
      )}
    </section>
  );
}
