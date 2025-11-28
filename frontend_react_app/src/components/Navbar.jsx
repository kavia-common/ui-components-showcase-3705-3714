import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar: outer shell remains square; inner interactive elements are rounded for better tactility.
 * - Keeps primary links visible (Home, Accordion, Bento, Breadcrumbs).
 * - Adds an accessible "More" dropdown for remaining demos with keyboard and click-outside handling.
 */
export default function Navbar({ theme, onToggle }) {
  // Small-to-medium rounding with accessible focus states for links
  const baseLink =
    "px-3 py-2 rounded-md text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-0";
  const activeLink =
    "bg-white/90 text-text shadow-soft underline underline-offset-4 decoration-white";
  const inactiveLink = "text-white/90 hover:text-white hover:bg-white/10";

  const linkClass = ({ isActive }) =>
    [baseLink, isActive ? activeLink : inactiveLink].join(" ");

  // Primary links to keep visible
  const primaryNav = [
    { to: "/", label: "Home", end: true },
    { to: "/accordion", label: "Accordion" },
    { to: "/bentomenu", label: "Bento" },
    { to: "/breadcrumbs", label: "Breadcrumbs" },
  ];

  // Remaining items go into dropdown
  const moreItems = [
    { to: "/carousel", label: "Carousel" },
    { to: "/chatbot", label: "Chatbot" },
    { to: "/form-wizard", label: "Form Wizard" },
    { to: "/testimonial", label: "Testimonial" },
    { to: "/toast", label: "Toast" },
  ];

  // Dropdown state and refs for accessibility
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!menuRef.current || !triggerRef.current) return;
      if (
        !menuRef.current.contains(e.target) &&
        !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // Keyboard navigation and Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      // optional arrow navigation
      const focusable = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const list = Array.from(focusable);
      const idx = list.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = list[(idx + 1 + list.length) % list.length];
        next?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = list[(idx - 1 + list.length) % list.length];
        prev?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Open menu and move focus to first item on open
  useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }
  }, [open]);

  return (
    <nav className="sticky top-0 z-40" aria-label="Site">
      {/* Keep the Navbar container square */}
      <div className="w-full app-header-major rounded-none">
        <div className="app-header-inner">
          <div className="mx-auto max-w-6xl px-4">
            <div className="h-14 flex items-center justify-between gap-3">
              {/* Brand (left) */}
              <div className="min-w-0">
                <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
                  {/* Brand mark rounded for inner element only */}
                  <div className="h-8 w-8 rounded-lg bg-white text-text grid place-items-center font-bold shadow-soft">
                    UI
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-white truncate">
                    Components Showcase
                  </span>
                </NavLink>
              </div>

              {/* Primary links + More (center on md+) */}
              <div
                className="hidden md:flex items-center justify-center gap-1.5"
                role="navigation"
                aria-label="Primary"
              >
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={linkClass}
                  >
                    {item.label}
                  </NavLink>
                ))}

                {/* Dropdown trigger uses major gradient accent subtly via border ring utility */}
                <div className="relative">
                  <button
                    ref={triggerRef}
                    type="button"
                    className={[
                      "px-3 py-2 rounded-md text-sm font-medium transition",
                      "text-white/90 hover:text-white",
                      "bg-white/10 hover:bg-white/15",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                      "border-brand-gradient",
                    ].join(" ")}
                    aria-haspopup="menu"
                    aria-expanded={open ? "true" : "false"}
                    aria-controls="nav-more-menu"
                    onClick={() => setOpen((v) => !v)}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="h-5 w-5 rounded-full border-brand-gradient-thin bg-transparent grid place-items-center"
                        aria-hidden="true"
                      >
                        ⋯
                      </span>
                      More
                    </span>
                  </button>

                  {/* Dropdown panel: uses lighter answer-palette surface */}
                  {open && (
                    <div
                      id="nav-more-menu"
                      ref={menuRef}
                      role="menu"
                      aria-label="More components"
                      className={[
                        "absolute left-0 mt-2 w-56 rounded-xl shadow-card z-50",
                        "app-answer-surface app-answer-border",
                        "animate-slideDown",
                      ].join(" ")}
                    >
                      <ul className="py-1" role="none">
                        {moreItems.map((item) => (
                          <li key={item.to} role="none">
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                [
                                  "block w-full text-left px-3 py-2 text-sm rounded-md",
                                  isActive
                                    ? "bg-white text-text shadow-soft"
                                    : "text-text/80 hover:bg-white",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]",
                                ].join(" ")
                              }
                              role="menuitem"
                              onClick={() => setOpen(false)}
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions (right) */}
              <div className="flex items-center justify-end gap-2">
                {/* On small screens, provide condensed nav including More as a single select-like menu */}
                <MobileMenu
                  primary={primaryNav}
                  more={moreItems}
                  onAfterNavigate={() => setOpen(false)}
                />
                {/* Theme toggle already rounded; ensure accessible focus */}
                <ThemeToggle theme={theme} onToggle={onToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
/ PUBLIC_INTERFACE
 * MobileMenu: compact dropdown for small screens keeping primary links + "More".
 * - Uses a single button to open a panel with all links for simplicity and accessibility.
 */
function MobileMenu({ primary, more, onAfterNavigate }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const clickAway = (e) => {
      if (
        !panelRef.current?.contains(e.target) &&
        !btnRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", clickAway);
    return () => document.removeEventListener("mousedown", clickAway);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden relative">
      <button
        ref={btnRef}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md bg-white/10 text-white/90 hover:text-white hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        Menu
      </button>
      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label="Navigation"
          className="absolute right-0 mt-2 w-64 rounded-xl shadow-card z-50 app-answer-surface app-answer-border animate-slideDown"
        >
          <ul className="py-1" role="none">
            {[...primary, ...more].map((item) => (
              <li key={item.to} role="none">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "block w-full text-left px-3 py-2 text-sm rounded-md",
                      isActive ? "bg-white text-text shadow-soft" : "text-text/80 hover:bg-white",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0]",
                    ].join(" ")
                  }
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onAfterNavigate?.();
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
