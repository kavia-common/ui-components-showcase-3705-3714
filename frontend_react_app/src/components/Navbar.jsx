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
  const inactiveLink = "text-white/95 hover:text-white hover:bg-white/10";

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

  // Focusable selector constant to avoid any templating/escaping mistakes.
  // Uses single quotes for the JS string; attribute selector uses double quotes inside which are valid CSS.
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Track viewport-relative position of trigger to place a fixed dropdown panel.
  const [menuPos, setMenuPos] = useState({ left: 8, right: "auto", top: 0 });

  // Compute dropdown position relative to viewport and handle right-edge alignment
  const updateMenuPosition = () => {
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const idealWidth = 240; // ~sm:w-56
    const nearRightEdge = rect.left + idealWidth > vw - 8;
    const top = Math.min(vh - 8, rect.bottom + 8); // 8px gap below trigger

    if (nearRightEdge) {
      // Align right: compute 'right' from viewport edge
      const right = Math.max(8, vw - rect.right);
      setMenuPos({ left: "auto", right, top });
    } else {
      const left = Math.max(8, rect.left);
      setMenuPos({ left, right: "auto", top });
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      const menuEl = menuRef.current;
      const triggerEl = triggerRef.current;
      if (!menuEl || !triggerEl) return;
      if (!menuEl.contains(e.target) && !triggerEl.contains(e.target)) {
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
      const menuEl = menuRef.current;
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (!menuEl) return;

      // optional arrow navigation
      let focusable = null;
      try {
        focusable = menuEl.querySelectorAll(FOCUSABLE_SELECTOR);
      } catch (err) {
        // In case of any unexpected selector issue, fallback to a simpler, safe selector
        focusable = menuEl.querySelectorAll("a[href], button");
      }
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

  // On open, compute initial position and move focus to first item
  useEffect(() => {
    if (!open) return;
    updateMenuPosition();

    // Delay focus until after the menu is painted to avoid nulls
    const tm = setTimeout(() => {
      const menuEl = menuRef.current;
      if (!menuEl) return;
      let first = null;
      try {
        first = menuEl.querySelector(FOCUSABLE_SELECTOR);
      } catch {
        first = menuEl.querySelector("a[href], button");
      }
      first?.focus();
    }, 0);
    return () => clearTimeout(tm);
  }, [open]);

  // Recompute position on resize/scroll while open to keep panel anchored to trigger.
  useEffect(() => {
    if (!open) return;
    const onResizeScroll = () => updateMenuPosition();
    window.addEventListener("resize", onResizeScroll);
    window.addEventListener("scroll", onResizeScroll, true);
    return () => {
      window.removeEventListener("resize", onResizeScroll);
      window.removeEventListener("scroll", onResizeScroll, true);
    };
  }, [open]);

  return (
    <nav className="sticky top-0 z-[55]" aria-label="Site">
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

                  {/* Dropdown panel rendered as fixed to avoid overflow clipping and ensure visibility */}
                  {open && (
                    <div
                      id="nav-more-menu"
                      ref={menuRef}
                      role="menu"
                      aria-label="More components"
                      className={[
                        // Use fixed so it is relative to viewport; prevents clipping by overflow parents
                        "fixed z-[100]",
                        // Width constraints and readability
                        "min-w-[14rem] w-auto max-w-[90vw] sm:w-56",
                        // Height constraints with scroll
                        "max-h-[min(70vh,28rem)] overflow-y-auto",
                        // Surface and border
                        "rounded-xl shadow-card app-answer-surface app-answer-border",
                        // Animation
                        "animate-slideDown",
                        // Ensure readable text on light surface
                        "text-slate-800",
                      ].join(" ")}
                      style={{
                        left:
                          typeof menuPos.left === "number"
                            ? `${menuPos.left}px`
                            : menuPos.left,
                        right:
                          typeof menuPos.right === "number"
                            ? `${menuPos.right}px`
                            : menuPos.right,
                        top: `${menuPos.top}px`,
                      }}
                    >
                      <ul className="py-1" role="none">
                        {moreItems.map((item, idx) => (
                          <li key={item.to} role="none">
                            <NavLink
                              to={item.to}
                              className={({ isActive }) =>
                                [
                                  "block w-full text-left px-3 py-2 text-sm",
                                  "rounded-md",
                                  isActive
                                    ? "bg-white text-slate-900 shadow-soft"
                                    : "text-slate-900 hover:bg-white",
                                  idx !== moreItems.length - 1 ? "border-b border-black/5" : "",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
                                ]
                                  .filter(Boolean)
                                  .join(" ")
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
      const panelEl = panelRef.current;
      const btnEl = btnRef.current;
      if (!panelEl || !btnEl) return;
      if (!panelEl.contains(e.target) && !btnEl.contains(e.target)) {
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
          className={[
            // Position at edge; on mobile use full width; on sm+ keep to content width
            "absolute right-0 mt-2 z-[100]",
            "w-[min(100vw-1rem,24rem)] sm:w-64 min-w-[14rem] max-w-[95vw]",
            // Viewport-aware height and internal scroll
            "max-h-[70vh] overflow-y-auto",
            // Surface and border
            "rounded-xl shadow-card app-answer-surface app-answer-border",
            "animate-slideDown",
            "text-slate-800",
          ].join(" ")}
        >
          <ul className="py-1" role="none">
            {[...primary, ...more].map((item, idx, arr) => (
              <li key={item.to} role="none">
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "block w-full text-left px-3 py-2 text-sm rounded-md",
                      isActive
                        ? "bg-white text-slate-900 shadow-soft"
                        : "text-slate-900 hover:bg-white",
                      idx !== arr.length - 1 ? "border-b border-black/5" : "",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
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
