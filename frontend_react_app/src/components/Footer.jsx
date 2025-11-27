import React from "react";

/**
 * Simple footer using Ocean Professional colors.
 */
export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="border-t border-black/10"></div>
      <div className="bg-surface">
        <div>
          <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-text/80">
              © {new Date().getFullYear()} UI Components Showcase. All rights reserved.
            </p>
            <div className="text-sm text-text/60">
              Theme: Ocean Professional • Built with React + Tailwind
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
