import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Portal from "./ui/primitives/Portal";

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

  // Delay timers to avoid flicker when moving pointer between trigger and panel
  const hoverTimers = useRef({ open: null, close: null });

  // Focusable selector constant to avoid any templating/escaping mistakes.
  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Track viewport-relative position of trigger to place a fixed dropdown panel.
  // Defaults keep it off the top until computed.
  const [menuPos, setMenuPos] = useState({ left: "auto", right: 8, top: -9999, width: 0 });

  // PUBLIC_INTERFACE
  function computeAndSetMenuPosition() {
    /**
     * Compute dropdown viewport-aligned coordinates from the trigger (getBoundingClientRect)
     * and set body-level fixed overlay coordinates with an 8–10px offset, aligned to the trigger's right edge.
     * Desktop/laptop: right-aligned under trigger; Mobile behavior handled by MobileMenu component.
     */
    const btn = triggerRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth || document.documentElement.clientWidth;
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Small vertical gap from the trigger
    const gap = 10; // 8–10px
    // Responsive constraints
    const idealMin = 256; // 16rem
    const maxPanelWidth = Math.min(vw - 16, 420); // viewport margin + practical max
    // Try to keep near trigger width but respect min/max constraints
    const panelWidth = Math.max(idealMin, Math.min(maxPanelWidth, Math.max(rect.width, 280)));

    // Align the panel's right edge with trigger's right edge
    const right = Math.max(8, vw - rect.right);
    const top = Math.min(vh - 8, rect.bottom + gap);

    // If left would overflow due to narrow space, relying on min/max-w clamps keeps it safe.
    setMenuPos({ left: "auto", right, top, width: panelWidth });
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

  // Cleanup any pending timers when component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimers.current.open) clearTimeout(hoverTimers.current.open);
      if (hoverTimers.current.close) clearTimeout(hoverTimers.current.close);
    };
  }, []);

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
        className="app-header-major rounded-none w-full max-w-screen"
        // Ensure the navbar shell never clips overlays; avoid overflow:hidden that could clip body-level overlays.
        style={{ overflow: "visible" }}
      >
        {/* Keep inner overlay-friendly */}
        <div className="app-header-inner" style={{ overflow: "visible" }}>
          {/* Respect gutters at all breakpoints; clamp to content container */}
          <div className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
            {/* Internal row: brand on the left, everything else aligned right */}
            <div className="h-14 flex items-center justify-between gap-3 w-full">
              {/* Brand on the left, never overflows */}
              <div className="min-w-0 shrink overflow-visible">
                <NavLink to="/" className="flex items-center gap-2" aria-label="Home">
                  <div className="h-8 w-8 rounded-lg bg-white text-text grid place-items-center font-bold shadow-soft">
                    UI
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-white truncate max-w-[50vw] sm:max-w-none">
                    Components Showcase
                  </span>
                </NavLink>
              </div>

              {/* Right-aligned cluster: desktop links + more + theme + mobile menu */}
              <div className="flex items-center gap-2 min-w-0">
                {/* Primary links + More (desktop) */}
                <div
                  className="hidden md:flex items-center justify-end gap-1.5 flex-shrink min-w-0"
                  role="navigation"
                  aria-label="Primary"
                >
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
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

                  {/* Dropdown trigger (right side) */}
                  <div
                    className="relative"
                    onMouseEnter={() => {
                      if (!window.matchMedia("(min-width: 768px)").matches) return;
                      // Cancel any pending close
                      if (hoverTimers.current.close) {
                        clearTimeout(hoverTimers.current.close);
                        hoverTimers.current.close = null;
                      }
                      hoverTimers.current.open = setTimeout(() => {
                        computeAndSetMenuPosition();
                        setOpen(true);
                      }, 80); // small delay to smooth hover
                    }}
                    onMouseLeave={() => {
                      if (!window.matchMedia("(min-width: 768px)").matches) return;
                      // Cancel any pending open
                      if (hoverTimers.current.open) {
                        clearTimeout(hoverTimers.current.open);
                        hoverTimers.current.open = null;
                      }
                      hoverTimers.current.close = setTimeout(() => {
                        setOpen(false);
                      }, 120); // small close delay to prevent flicker
                    }}
                    onFocusCapture={(e) => {
                      if (!window.matchMedia("(min-width: 768px)").matches) return;
                      if (e.target && (triggerRef.current?.contains(e.target) || e.currentTarget === e.target)) {
                        computeAndSetMenuPosition();
                        setOpen(true);
                      }
                    }}
                  >
                    <button
                      ref={triggerRef}
                      type="button"
                      className={[
                        // Match desktop link styling for consistency with Home/Accordion/etc.
                        baseLink,
                        open ? activeLink : inactiveLink,
                        "inline-flex items-center gap-2"
                      ].join(" ")}
                      aria-haspopup="menu"
                      aria-expanded={open ? "true" : "false"}
                      aria-controls="nav-more-menu"
                      onClick={() => {
                        // Keep click/tap toggle for accessibility and mobile.
                        setOpen((v) => {
                          const next = !v;
                          if (next) computeAndSetMenuPosition();
                          return next;
                        });
                      }}
                    >
                      <span className="select-none">More</span>
                      {/* Chevron arrow that rotates when open */}
                      <span
                        className={[
                          "inline-flex h-5 w-5 items-center justify-center rounded-full",
                          "bg-white/20 text-white",
                          "transition-transform duration-200 ease-out",
                          open ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          role="presentation"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Dropdown panel: fixed portal; compute position relative to right-aligned trigger */}
                    {open && (
                      <Portal>
                        <>
                          <div
                            className="fixed inset-0 z-[998] bg-black/15 pointer-events-auto"
                            aria-hidden="true"
                            onClick={() => setOpen(false)}
                            onMouseEnter={() => {
                              // hovering backdrop should not auto-close; leave as-is
                              if (hoverTimers.current.close) {
                                clearTimeout(hoverTimers.current.close);
                                hoverTimers.current.close = null;
                              }
                            }}
                          />
                          <div
                            id="nav-more-menu"
                            ref={menuRef}
                            role="menu"
                            aria-label="More components"
                            className={[
                              "fixed pointer-events-auto",
                              "z-[1000]",
                              "min-w-[16rem] max-w-[90vw]",
                              "max-h-[min(70vh,28rem)] overflow-y-auto",
                              "rounded-xl",
                              // Use exact requested brand gradient with slight transparency; no blur
                              "dropdown-bg-major-translucent",
                              "animate-slideDown",
                              // Higher contrast body text over translucent gradient: use white text for maximum contrast
                              "text-white",
                            ].join(" ")}
                            style={{
                              left: typeof menuPos.left === "number" ? `${menuPos.left}px` : menuPos.left,
                              right: typeof menuPos.right === "number" ? `${menuPos.right}px` : menuPos.right,
                              top: `${menuPos.top}px`,
                              width: menuPos.width ? `${menuPos.width}px` : undefined,
                            }}
                            onMouseEnter={() => {
                              // Cancel pending close when entering panel
                              if (hoverTimers.current.close) {
                                clearTimeout(hoverTimers.current.close);
                                hoverTimers.current.close = null;
                              }
                            }}
                            onMouseLeave={() => {
                              // Small delay on leaving the panel to allow moving back to trigger
                              if (hoverTimers.current.close) clearTimeout(hoverTimers.current.close);
                              hoverTimers.current.close = setTimeout(() => {
                                setOpen(false);
                              }, 120);
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
                                        // Base: no static borders; keep background transparent at rest
                                        isActive
                                          ? "bg-gray-50 text-slate-900"
                                          : "text-white",
                                        // Subtle highlight on hover/focus, separate from gradient border
                                        "hover-bg-subtle",
                                        // Apply ~2px brand gradient border only on hover/focus-visible
                                        "hover-gradient-border",
                                        // Maintain keyboard accessibility ring
                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1840a0] focus-visible:ring-offset-0",
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
                        </>
                      </Portal>
                    )}
                  </div>
                </div>

                {/* Actions cluster on the far right: theme and mobile menu */}
                <div className="flex items-center justify-end gap-2 shrink-0">
                  <ThemeToggle theme={theme} onToggle={onToggle} />
                  <MobileMenu
                    primary={primaryNav}
                    more={moreItems}
                    onAfterNavigate={() => setOpen(false)}
                  />
                </div>
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
            // Higher contrast text in mobile panel - white for stronger contrast on gradient/glass
            "text-white",
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
                        : "text-white",
                      // Subtle background highlight on hover/focus-visible
                      "hover-bg-subtle",
                      // Apply ~2px brand gradient border ONLY on hover/focus-visible (no default border)
                      "hover-gradient-border",
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
