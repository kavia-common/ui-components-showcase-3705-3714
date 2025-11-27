import React from "react";
import { useToast } from "../../components/ui/ToastProvider";

/**
/ PUBLIC_INTERFACE
 * Toast demo page with buttons to trigger different tones.
 */
export default function ToastDemoPage() {
  const { showToast, clear } = useToast();

  const fire = (tone) => {
    showToast({
      title: tone === "default" ? "Heads up" : tone[0].toUpperCase() + tone.slice(1),
      description:
        tone === "default"
          ? "This is a neutral notification."
          : `This is a ${tone} message.`,
      tone,
    });
  };

  return (
    <section className="space-y-6">
      <header className="rounded-2xl overflow-hidden border border-black/5">
        <div className="bg-brand-gradient">
          <div className="surface-overlay-soft px-6 py-6">
            <h1 className="text-2xl font-bold text-white">Toast</h1>
            <p className="text-white/90 mt-1">
              Ephemeral notifications rendered via a provider with an aria-live region.
            </p>
          </div>
        </div>
      </header>

      <div className="ocean-surface p-6 flex flex-wrap gap-3">
        {["default", "success", "info", "warning", "error"].map((t) => (
          <button
            key={t}
            className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-blue-600 transition"
            onClick={() => fire(t)}
          >
            Show {t}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-xl bg-gray-200 text-text hover:bg-gray-300 transition"
          onClick={() =>
            showToast({
              title: "Sticky",
              description: "This one stays until dismissed.",
              timeout: 0,
              tone: "info",
            })
          }
        >
          Show sticky
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition"
          onClick={clear}
        >
          Clear all
        </button>
      </div>
    </section>
  );
}
