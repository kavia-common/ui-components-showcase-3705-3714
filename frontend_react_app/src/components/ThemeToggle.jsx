import React from "react";

// PUBLIC_INTERFACE
export default function ThemeToggle({ theme, onToggle }) {
  /** Toggle button to switch between light and dark theme. */
  return (
    <button
      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-blue-600 transition shadow-soft"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
