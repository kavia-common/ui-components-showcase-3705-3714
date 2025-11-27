import React from "react";
import Chatbot from "../../components/ui/Chatbot";

/**
/ PUBLIC_INTERFACE
 * Chatbot demo page using mock responses.
 * This demo renders only a floating action button (FAB) by default. The chat panel
 * mounts when the FAB is clicked and fully unmounts when closed, ensuring no on-page
 * headings or informational text are shown by default.
 *
 * Panel behavior:
 * - Fixed at bottom-right on desktop, nearly full width on small screens
 * - Constrained height within viewport with internal scroll for messages
 * - Header and input remain visible using sticky positioning
 * - Safe-area insets respected for modern mobile devices
 * - z-index sits under toasts (which use z-50) and above navbar (z-40)
 */
export default function ChatbotDemoPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Floating Action Button (FAB) — always visible */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        // z-40 keeps it below toasts (z-50) but above most content
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] h-14 w-14 rounded-full bg-primary text-white shadow-floating hover:bg-blue-600 transition grid place-items-center z-40"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Floating Chatbot Panel — render only when open */}
      {open && (
        <div
          // Positioning: fixed bottom-right, responsive width, viewport-constrained height
          className={[
            "fixed z-40 transition-all opacity-100 translate-y-0",
            "right-[max(1rem,env(safe-area-inset-right))]",
            "bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)]", // sit above FAB on phones
            // Width: small screens ~full minus 1rem, md+ clamp to 26rem
            "w-[min(calc(100vw-1rem),22rem)]",
            "sm:w-[min(calc(100vw-1rem),22rem)]",
            "md:w-[min(calc(100vw-1rem),26rem)]",
            // Height: use viewport units with a cap
            "max-h-[85vh]",
          ].join(" ")}
          role="dialog"
          aria-modal="false"
          aria-label="Floating chatbot panel"
        >
          {/* Panel container with internal layout for sticky header and input */}
          <div className="ocean-surface overflow-hidden flex flex-col"
               style={{
                 // Ensure panel respects safe-area inset on the inside too
                 paddingBottom: "env(safe-area-inset-bottom)",
               }}
          >
            {/* Sticky header to remain visible */}
            <div className="sticky top-0 z-10">
              <div className="px-5 py-3 border-b border-black/5 bg-white/80 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-primary text-white grid place-items-center">🤖</div>
                    <div className="font-semibold text-text">Assistant</div>
                  </div>
                  <button
                    className="text-text/60 hover:text-text rounded p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    aria-label="Close chatbot panel"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Messages region: grows and scrolls */}
            <div className="flex-1 min-h-0">
              {/* Mount Chatbot with header/footer hidden; we only use its body */}
              <Chatbot
                title="Assistant"
                systemPrompt="Floating panel"
                onSend={(msg) => console.log("Floating chat:", msg)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
