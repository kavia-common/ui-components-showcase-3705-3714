import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
/ PUBLIC_INTERFACE
 * useToast hook: returns { toasts, showToast, dismiss, clear }
 */
const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

/**
/ PUBLIC_INTERFACE
 * ToastProvider: wraps app and provides toast state + renderer.
 * Props:
 * - position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
 * - duration: default duration in ms
 */
export default function ToastProvider({
  children,
  position = "top-right",
  duration = 3500,
}) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const showToast = useCallback(
    ({ title, description, tone = "default", timeout }) => {
      const id = ++idRef.current;
      const toast = {
        id,
        title,
        description,
        tone,
        timeout: timeout ?? duration,
        createdAt: Date.now(),
      };
      setToasts((prev) => [...prev, toast]);
      if (toast.timeout > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.timeout);
      }
      return id;
    },
    [duration]
  );

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clear = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ toasts, showToast, dismiss, clear }), [toasts, showToast, dismiss, clear]);

  const positionClass = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
  }[position];

  // aria-live region for SR announcements
  const [liveMsg, setLiveMsg] = useState("");
  useEffect(() => {
    if (toasts.length > 0) {
      const latest = toasts[toasts.length - 1];
      setLiveMsg(`${latest.title || "Notification"}${latest.description ? `: ${latest.description}` : ""}`);
      const tm = setTimeout(() => setLiveMsg(""), 500);
      return () => clearTimeout(tm);
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={`fixed z-50 flex flex-col gap-2 ${positionClass}`}
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onClose={() => dismiss(t.id)} />
        ))}
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveMsg}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Internal card renderer
 */
function ToastCard({ toast, onClose }) {
  const toneStyles = {
    default: "border-black/10",
    success: "border-green-500/30",
    warning: "border-amber-500/30",
    error: "border-red-500/30",
    info: "border-blue-500/30",
  };
  const icon = {
    success: "✓",
    warning: "⚠",
    error: "⨯",
    info: "ℹ",
    default: "•",
  }[toast.tone ?? "default"];

  return (
    <div className={`min-w-[260px] max-w-[360px] rounded-2xl bg-surface shadow-card border ${toneStyles[toast.tone ?? "default"]} p-4 animate-slideUp`}>
      <div className="flex items-start gap-3">
        <div className="h-7 w-7 rounded-xl bg-primary text-white grid place-items-center shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          {toast.title && <div className="font-semibold text-text">{toast.title}</div>}
          {toast.description && <div className="text-sm text-text/70 mt-0.5">{toast.description}</div>}
        </div>
        <button
          className="ml-2 text-text/50 hover:text-text rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Dismiss notification"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
