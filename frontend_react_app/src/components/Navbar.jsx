import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Gradient Navbar with brand (left), primary navigation (center), and actions (right).
 * - Responsive: links collapse into a stacked mobile row below the bar on small screens.
 * - Consistent height and spacing with accessible focus states and strong text/icon contrast.
 * - Uses major gradient for the outer bar and glassy inner overlay.
 *
 * Note: Routing/behavior unchanged; this is strictly layout/styling and semantics.
 */
export default function Navbar({ theme, onToggle }) {
  // Common link styles for both desktop and mobile link lists
  const baseLink =
    "px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";
  const activeLink =
    "bg-white/90 text-text shadow-soft underline underline-offset-4 decoration-white";
  const inactiveLink = "text-white/90 hover:text-white hover:bg-white/10";

  const linkClass = ({ isActive }) =>
    [baseLink, isActive ? activeLink : inactiveLink].join(" ");

  // Single source of truth for nav items to keep desktop and mobile in sync
  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/accordion", label: "Accordion" },
    { to: "/bentomenu", label: "Bento" },
    { to: "/breadcrumbs", label: "Breadcrumbs" },
    { to: "/carousel", label: "Carousel" },
    { to: "/chatbot", label: "Chatbot" },
    { to: "/form-wizard", label: "Form Wizard" },
    { to: "/testimonial", label: "Testimonial" },
    { to: "/toast", label: "Toast" },
  ];

  return (
    <nav className="sticky top-0 z-40" aria-label="Site">
      {/* Major gradient bar with translucent inner surface for glassy look */}
      <div className="w-full app-header-major">
        <div className="app-header-inner">
          {/* Shell row: left (brand) — center (primary nav) — right (actions) */}
          <div className="mx-auto max-w-6xl px-4">
            <div className="h-14 flex items-center justify-between gap-3">
              {/* Left: Brand */}
              <div className="min-w-0">
                <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
                  <div className="h-8 w-8 rounded-xl bg-white text-text grid place-items-center font-bold shadow-soft">
                    UI
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-white truncate">
                    Components Showcase
                  </span>
                </NavLink>
              </div>

              {/* Middle: Primary navigation (desktop) */}
              <div
                className="hidden md:flex items-center justify-center gap-1.5"
                role="navigation"
                aria-label="Primary"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={linkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-end gap-2">
                <ThemeToggle theme={theme} onToggle={onToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked links under the bar */}
      <div
        className="md:hidden border-t border-white/15 bg-white"
        role="navigation"
        aria-label="Mobile"
      >
        <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]",
                  isActive
                    ? "bg-primary text-white shadow-soft"
                    : "text-text hover:bg-black/5",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
