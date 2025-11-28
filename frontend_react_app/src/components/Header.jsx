import React from "react";

/**
/ PUBLIC_INTERFACE
 * Header: Shared gradient/glass header for pages/sections.
 * Props:
 * - title: string (required)
 * - subtitle?: string | ReactNode
 * - className?: string (extra classes for outer wrapper)
 * - children?: ReactNode (right-side or extra content inside the header)
 */
export default function Header({ title, subtitle, className = "", children }) {
  return (
    <header className={["app-answer-surface app-answer-border", className].filter(Boolean).join(" ")}>
      <div className="px-6 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl app-answer-heading">{title}</h1>
              {subtitle ? (
                <p className="mt-1 text-sm sm:text-base app-answer-subtle">{subtitle}</p>
              ) : null}
            </div>
            {children ? (
              <div className="mt-2 sm:mt-0 flex items-center gap-2">{children}</div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
