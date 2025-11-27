import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Gradient Navbar with primary brand, navigation links and theme toggle.
 * Active state is clearly indicated with background, text, and underline accent.
 */
export default function Navbar({ theme, onToggle }) {
  const baseLink =
    "px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";
  const activeLink =
    "bg-white/90 text-text shadow-soft underline underline-offset-4 decoration-white";
  const inactiveLink =
    "text-white/90 hover:text-white hover:bg-white/10";

  const linkClass = ({ isActive }) =>
    [baseLink, isActive ? activeLink : inactiveLink].join(" ");

  return (
    <nav className="sticky top-0 z-40">
      {/* Brand gradient background with a subtle translucent overlay to ensure readability */}
      <div className="w-full bg-brand-gradient">
        <div className="backdrop-blur-sm bg-black/0">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
              <div className="h-8 w-8 rounded-xl bg-white/90 text-text grid place-items-center font-bold shadow-soft">
                UI
              </div>
              <span className="text-lg font-semibold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">Components Showcase</span>
            </NavLink>

          <div className="hidden md:flex items-center gap-2" role="navigation" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/accordion" className={linkClass}>
              Accordion
            </NavLink>
            <NavLink to="/bentomenu" className={linkClass}>
              Bento
            </NavLink>
            <NavLink to="/breadcrumbs" className={linkClass}>
              Breadcrumbs
            </NavLink>
            <NavLink to="/carousel" className={linkClass}>
              Carousel
            </NavLink>
            <NavLink to="/chatbot" className={linkClass}>
              Chatbot
            </NavLink>
            <NavLink to="/form-wizard" className={linkClass}>
              Form Wizard
            </NavLink>
            <NavLink to="/testimonial" className={linkClass}>
              Testimonial
            </NavLink>
            <NavLink to="/toast" className={linkClass}>
              Toast
            </NavLink>
          </div>

          <div className="hidden md:flex items-center gap-2" role="navigation" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/accordion" className={linkClass}>
              Accordion
            </NavLink>
            <NavLink to="/bentomenu" className={linkClass}>
              Bento
            </NavLink>
            <NavLink to="/breadcrumbs" className={linkClass}>
              Breadcrumbs
            </NavLink>
            <NavLink to="/carousel" className={linkClass}>
              Carousel
            </NavLink>
            <NavLink to="/chatbot" className={linkClass}>
              Chatbot
            </NavLink>
            <NavLink to="/form-wizard" className={linkClass}>
              Form Wizard
            </NavLink>
            <NavLink to="/testimonial" className={linkClass}>
              Testimonial
            </NavLink>
            <NavLink to="/toast" className={linkClass}>
              Toast
            </NavLink>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </div>

    {/* Mobile quick links */}
    <div className="md:hidden border-t border-white/10 bg-white/10 backdrop-blur-sm" role="navigation" aria-label="Mobile">
      <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap gap-2">
        {[
          { to: "/", label: "Home", end: true },
          { to: "/accordion", label: "Accordion" },
          { to: "/bentomenu", label: "Bento" },
          { to: "/breadcrumbs", label: "Breadcrumbs" },
          { to: "/carousel", label: "Carousel" },
          { to: "/chatbot", label: "Chatbot" },
          { to: "/form-wizard", label: "Form Wizard" },
          { to: "/testimonial", label: "Testimonial" },
          { to: "/toast", label: "Toast" },
        ].map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
  );
}
