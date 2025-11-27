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
  // Normalize legacy brand variants to non-intrusive gradient accents
  const normalized = (() => {
    if (variant === "brandGlow") return "surface";
    return variant;
  })();

  const styles = {
    surface: "bg-surface shadow-soft border border-black/5",
    outline: "bg-white border border-black/10",
    ghost: "bg-transparent border border-transparent",
    // Brand variants: use thin gradient top border or subtle header band only
    brand: "bg-white border border-black/10",
    brandOutline: "bg-white border border-black/10",
  };

  const headerBand =
    normalized === "brand" || normalized === "brandOutline" ? (
      <div className="h-1 w-full bg-brand-gradient" aria-hidden="true" />
    ) : null;

  return (
    <section
      className={[
        "rounded-2xl overflow-hidden",
        styles[normalized] || styles.surface,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {headerBand}
      {header && (
        <div className="px-5 py-4 border-b border-black/5 bg-white">
          {header}
        </div>
      )}
      <div className="p-5 bg-white">{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-black/5 bg-white">
          {footer}
        </div>
      )}
    </section>
  );
}
