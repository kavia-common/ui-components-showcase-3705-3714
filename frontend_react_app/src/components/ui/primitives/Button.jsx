import React from "react";

/**
/ PUBLIC_INTERFACE
 * Button: Ocean Professional button primitive with variants and sizes.
 * Props:
 * - variant: "primary" | "secondary" | "ghost" | "outline" | "danger" | "brandSolid" | "brandOutline" | "brandGhost"
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

  // Map legacy variant names to new ones so existing usage keeps working
  const normalizedVariant = (() => {
    if (variant === "brand") return "brandSolid";
    if (variant === "brandGlow") return "brandSolid"; // closest visual intent
    return variant;
  })();

  const variants = {
    primary: "bg-primary text-white hover:bg-blue-600 shadow-soft",
    secondary: "bg-secondary text-white hover:bg-amber-600 shadow-soft",
    ghost: "bg-transparent text-text hover:bg-black/5 border border-transparent",
    outline: "bg-transparent text-text hover:bg-white/60 border border-black/10",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-soft",

    // New brand variants per guidelines
    // - brandSolid: full gradient fill, white text
    // - brandOutline: solid white surface with gradient border, transparent background otherwise
    // - brandGhost: transparent background, solid text with gradient underline on hover
    brandSolid:
      "bg-brand-gradient text-white shadow-soft hover:brightness-110 focus-visible:ring-white",
    brandOutline:
      "border-brand-gradient bg-transparent text-text hover:bg-white/60 focus-visible:ring-[#1840a0]",
    brandGhost:
      "bg-transparent text-text border border-transparent hover:[text-decoration:underline] hover:[text-decoration-color:transparent] hover:underline decoration-2 decoration-transparent relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-brand-gradient after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-2.5",
  };

  const isDisabled = disabled || loading;

  return (
    <As
      className={[base, variants[normalizedVariant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      disabled={As === "button" ? isDisabled : undefined}
      aria-busy={loading ? "true" : undefined}
      {...rest}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className={loading ? "opacity-80" : undefined}>{children}</span>
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
