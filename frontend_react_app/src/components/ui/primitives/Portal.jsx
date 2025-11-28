import React, { useEffect, useState } from "react";

/**
/ PUBLIC_INTERFACE
 * Portal: Renders children into document.body (or a specified container) to escape ancestor overflow and stacking contexts.
 * Props:
 * - container?: HTMLElement (default: document.body)
 * - children: React.ReactNode
 */
export default function Portal({ container, children }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    // Only run in browser
    if (typeof document === "undefined") return;
    setTarget(container || document.body || null);
  }, [container]);

  if (!target) return null;

  // PUBLIC_INTERFACE
  function createPortal(childrenNode, containerNode) {
    /** Create a simple portal without relying on react-dom createPortal for environments
     * where it's not preferred to import directly. However, in React apps, the built-in
     * ReactDOM.createPortal is the conventional approach. We fallback to a manual container.
     */
    // Prefer ReactDOM.createPortal if available:
    try {
      // Dynamically import to avoid SSR issues.
      const { createPortal: rdCreatePortal } = require("react-dom");
      if (rdCreatePortal) {
        return rdCreatePortal(childrenNode, containerNode);
      }
    } catch {
      // no-op: fallback below
    }

    // Fallback: render inline if portal fails (still outside navbar if container is body)
    return <div>{childrenNode}</div>;
  }

  return createPortal(children, target);
}
