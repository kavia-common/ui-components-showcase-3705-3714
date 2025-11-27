import React from "react";

/**
/ PUBLIC_INTERFACE
 * Badge: small status label with tones and variants.
 * Props:
 * - tone: "neutral" | "primary" | "success" | "warning" | "error" | "info"
 * - variant: "solid" | "soft" | "outline"
 * - size: "sm" | "md"
 * - icon: ReactNode
 * - className: additional classes
 */
export default function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  size = "md",
  icon,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center gap-1 rounded-full font-medium";
  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  };

  const tones = {
    neutral: {
      solid: "bg-gray-800 text-white",
      soft: "bg-gray-100 text-gray-800",
      outline: "border border-gray-300 text-gray-800",
    },
    primary: {
      solid: "bg-primary text-white",
      soft: "bg-blue-50 text-blue-700",
      outline: "border border-blue-200 text-blue-700",
    },
    success: {
      solid: "bg-emerald-600 text-white",
      soft: "bg-emerald-50 text-emerald-700",
      outline: "border border-emerald-200 text-emerald-700",
    },
    warning: {
      solid: "bg-amber-600 text-white",
      soft: "bg-amber-50 text-amber-800",
      outline: "border border-amber-200 text-amber-800",
    },
    error: {
      solid: "bg-red-600 text-white",
      soft: "bg-red-50 text-red-700",
      outline: "border border-red-200 text-red-700",
    },
    info: {
      solid: "bg-sky-600 text-white",
      soft: "bg-sky-50 text-sky-700",
      outline: "border border-sky-200 text-sky-700",
    },
    brand: {
      solid: "bg-brand-gradient text-white",
      soft: "bg-blue-50 text-blue-700",
      outline: "border-brand-gradient bg-white text-text",
    },
  };

  return (
    <span
      className={[base, sizes[size], tones[tone][variant], className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
