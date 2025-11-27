import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Gradient Navbar with primary brand, navigation links and theme toggle.
 */
export default function Navbar({ theme, onToggle }) {
  const baseLink =
    "px-3 py-2 rounded-lg text-sm font-medium transition";
  const activeLink =
    "bg-white/70 text-text shadow-soft";
  const inactiveLink =
    "text-text/80 hover:text-text hover:bg-white/50";

  const linkClass = ({ isActive }) =>
    [baseLink, isActive ? activeLink : inactiveLink].join(" ");

  return (
    <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full bg-ocean-gradient">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-primary text-white grid place-items-center font-bold shadow-soft">
              UI
            </div>
            <span className="text-lg font-semibold text-text">Components Showcase</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/accordion" className={linkClass}>
              Accordion
            </NavLink>
            <NavLink to="/bentomenu" className={linkClass}>
              Bento Menu
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

      {/* Mobile quick links */}
      <div className="md:hidden border-t border-black/5 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap gap-2">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/accordion", label: "Accordion" },
            { to: "/bentomenu", label: "Bento" },
            { to: "/breadcrumbs", label: "Breadcrumbs" },
            { to: "/carousel", label: "Carousel" },
            { to: "/chatbot", label: "Chatbot" },
            { to: "/form-wizard", label: "Wizard" },
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
