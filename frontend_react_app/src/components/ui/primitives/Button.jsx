import React from "react";

/**
/ PUBLIC_INTERFACE
 * Button: Ocean Professional button primitive with variants and sizes.
 * Props:
 * - variant: "primary" | "secondary" | "ghost" | "outline" | "danger" | "brand" | "brandOutline" | "brandGlow"
 * - size: "sm" | "md" | "lg"
 * - as: element type to render (default "button")
 * - loading: boolean (adds spinner and aria-busy)
 * - disabled: boolean
 * - leftIcon, rightIcon: ReactNode
 * - className: additional classes
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: As = "button",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-blue-600 shadow-soft",
    secondary:
      "bg-secondary text-white hover:bg-amber-600 shadow-soft",
    ghost:
      "bg-transparent text-text hover:bg-black/5 border border-transparent",
    outline:
      "bg-transparent text-text hover:bg-white/60 border border-black/10",
    danger:
      "bg-red-600 text-white hover:bg-red-700 shadow-soft",

    // Brand variants
    // - brand: gradient background, white text, strong focus ring
    // - brandOutline: gradient border with white surface; good for text-heavy contexts
    // - brandGlow: solid with subtle glow shadow
    brand:
      "bg-brand-gradient text-white shadow-soft hover:brightness-110 focus-visible:ring-white",
    brandOutline:
      "border-brand-gradient bg-white text-text hover:bg-gray-50 focus-visible:ring-[#1840a0]",
    brandGlow:
      "bg-primary text-white glow-brand hover:bg-blue-600 focus-visible:ring-white",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const isDisabled = disabled || loading;

  return (
    <As
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      disabled={As === "button" ? isDisabled : undefined}
      aria-busy={loading ? "true" : undefined}
      {...rest}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className={loading ? "opacity-80" : undefined}>
        {children}
      </span>
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      {loading && (
        <span
          className="ml-1 h-4 w-4 inline-block border-2 border-white/60 border-t-white rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
    </As>
  );
}
