import React from "react";

/**
 * Simple footer using Ocean Professional colors.
 */
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/5 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-text/70">
          © {new Date().getFullYear()} UI Components Showcase. All rights reserved.
        </p>
        <div className="text-sm text-text/60">
          Theme: Ocean Professional • Built with React + Tailwind
        </div>
      </div>
    </footer>
  );
}
