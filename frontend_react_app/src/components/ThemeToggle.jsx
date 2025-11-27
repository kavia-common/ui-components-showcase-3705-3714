import React from "react";

// PUBLIC_INTERFACE
export default function ThemeToggle({ theme, onToggle }) {
  /** Toggle button to switch between light and dark theme. */
  return (
    <button
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] border-brand-gradient bg-transparent text-text hover:bg-white/60"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
