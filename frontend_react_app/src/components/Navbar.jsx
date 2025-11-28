import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar: outer shell remains square; inner interactive elements are rounded for better tactility.
 * Overflow-safe across all breakpoints with safe gutters and viewport-aware menus.
 * Requirements enforced:
 * - Navbar itself never scrolls horizontally
 * - Dropdown uses fixed overlay, constrained to viewport with its own scroll
 * - Mobile menu is an overlay that scrolls internally; navbar never scrolls
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
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Track viewport-relative position of trigger to place a fixed dropdown panel.
  const [menuPos, setMenuPos] = useState({ left: 8, right: "auto", top: 0, width: 0 });

  // PUBLIC_INTERFACE
  function computeAndSetMenuPosition() {
    /**
     * Compute dropdown viewport-aligned coordinates from the trigger (getBoundingClientRect)
     * and set fixed overlay coordinates with an 8–12px offset and side alignment.
     */
    const btn = triggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    const gap = 10; // keep between 8–12px
    const idealMin = 256; // 16rem
    const maxPanelWidth = Math.min(vw - 16, 420); // keep margins, max ~26rem
    const panelWidth = Math.max(idealMin, Math.min(maxPanelWidth, rect.width + 40)); // match trigger-ish width

    const nearRightEdge = rect.left + panelWidth > vw - 8;
    const top = Math.min(vh - 8, rect.bottom + gap);

    if (nearRightEdge) {
      const right = Math.max(8, vw - rect.right);
      setMenuPos({ left: "auto", right, top, width: panelWidth });
    } else {
      const left = Math.max(8, rect.left);
      setMenuPos({ left, right: "auto", top, width: panelWidth });
    }
  }

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
    computeAndSetMenuPosition();

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
    const onResizeScroll = () => computeAndSetMenuPosition();
    window.addEventListener("resize", onResizeScroll);
    window.addEventListener("scroll", onResizeScroll, true);
    return () => {
      window.removeEventListener("resize", onResizeScroll);
      window.removeEventListener("scroll", onResizeScroll, true);
    };
  }, [open]);

  return (
    <nav
      className="sticky inset-x-0 top-0 z-[55]"
      aria-label="Site"
    >
      {/* Outer wrapper spans full viewport width, never overflows horizontally */}
      <div
        className="app-header-major rounded-none w-full max-w-screen overflow-x-hidden"
        // Ensure the navbar wrapper itself never scrolls horizontally or vertically
        style={{ overflowY: "visible" }}
      >
        <div className="app-header-inner" style={{ overflow: "visible" }}>
          {/* Respect gutters at all breakpoints; clamp to content container */}
          <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {/* Internal row must never force width > 100%; allow wrapping on narrow widths */}
            <div className="h-14 flex items-center justify-between gap-3 flex-wrap w-full">
              {/* Brand (left) - allow shrink to avoid pushing others; truncate long text */}
              <div className="min-w-0 shrink overflow-visible">
                <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
                  {/* Inner item may be rounded */}
                  <div className="h-8 w-8 rounded-lg bg-white text-text grid place-items-center font-bold shadow-soft">
                    UI
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-white truncate max-w-[50vw] sm:max-w-none">
                    Components Showcase
                  </span>
                </NavLink>
              </div>

              {/* Primary links + More (center on md+) - allow wrapping and prevent overflow */}
              <div
                className="hidden md:flex items-center justify-center gap-1.5 flex-shrink min-w-0"
                role="navigation"
                aria-label="Primary"
              >
                <div className="flex items-center gap-1.5 flex-wrap">
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
                </div>

                {/* Dropdown trigger (positioned element should not affect layout width) */}
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

                  {/* Dropdown panel: fixed, viewport-constrained, pointer-events managed */}
                  {open && (
                    <>
                      {/* Click-away backdrop solely to simplify outside-click on mobile without blocking navbar visuals */}
                      <div
                        className="fixed inset-0 z-[99]"
                        aria-hidden="true"
                        onClick={() => setOpen(false)}
                      />
                      <div
                        id="nav-more-menu"
                        ref={menuRef}
                        role="menu"
                        aria-label="More components"
                        className={[
                          "fixed z-[100] pointer-events-auto",
                          // Responsive width constraints
                          "min-w-[16rem] max-w-[90vw]",
                          // Internal width matched to computed width for visual balance
                          "w-auto",
                          // Viewport-aware height with internal scroll
                          "max-h-[min(70vh,28rem)] overflow-y-auto",
                          // Clean panel styling
                          "rounded-xl shadow-card bg-white border border-black/10",
                          "animate-slideDown",
                          "text-slate-900",
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
                          width: menuPos.width ? `${menuPos.width}px` : undefined,
                        }}
                      >
                        <ul className="py-1" role="none">
                          {moreItems.map((item, idx) => (
                            <li key={item.to} role="none">
                              <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                  [
                                    "block w-full text-left px-4 py-2.5 text-sm",
                                    "rounded-md",
                                    isActive
                                      ? "bg-gray-50 text-slate-900"
                                      : "text-slate-900 hover:bg-gray-50",
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
                    </>
                  )}
                </div>
              </div>

              {/* Actions (right) - prevent layout growth */}
              <div className="flex items-center justify-end gap-2 shrink-0">
                {/* Mobile menu occupies its own absolute panel; does not expand row width */}
                <MobileMenu
                  primary={primaryNav}
                  more={moreItems}
                  onAfterNavigate={() => setOpen(false)}
                />
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
 * - Panel scrolls internally; navbar itself remains non-scrollable.
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
            "absolute right-0 mt-2 z-[100]",
            // Full-width on very narrow viewports while keeping gutter
            "w-[min(100vw-1rem,24rem)] min-w-[14rem] max-w-[95vw]",
            // Internal scrolling; navbar doesn't scroll
            "max-h-[80vh] overflow-y-auto",
            "rounded-xl shadow-card app-answer-surface app-answer-border",
            "animate-slideDown",
            "text-slate-800",
          ].join(" ")}
          style={{
            maxWidth: "95vw",
          }}
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
