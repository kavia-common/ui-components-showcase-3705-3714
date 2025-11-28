import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar: keep layout and gradients, remove all rounded corners.
 */
export default function Navbar({ theme, onToggle }) {
  const baseLink =
    "px-3 py-2 rounded-none text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";
  const activeLink =
    "bg-white/90 text-text shadow-soft underline underline-offset-4 decoration-white";
  const inactiveLink = "text-white/90 hover:text-white hover:bg-white/10";

  const linkClass = ({ isActive }) =>
    [baseLink, isActive ? activeLink : inactiveLink].join(" ");

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
      {/* Remove rounding from the header shell */}
      <div className="w-full app-header-major rounded-none">
        <div className="app-header-inner">
          <div className="mx-auto max-w-6xl px-4">
            <div className="h-14 flex items-center justify-between gap-3">
              {/* Brand (left) */}
              <div className="min-w-0">
                <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
                  <div className="h-8 w-8 rounded-none bg-white text-text grid place-items-center font-bold shadow-soft">
                    UI
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-white truncate">
                    Components Showcase
                  </span>
                </NavLink>
              </div>

              {/* Primary links (center on md+) */}
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

              {/* Actions (right) */}
              <div className="flex items-center justify-end gap-2">
                <ThemeToggle theme={theme} onToggle={onToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
