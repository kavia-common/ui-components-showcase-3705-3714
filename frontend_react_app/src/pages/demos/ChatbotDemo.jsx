import React from "react";
import Chatbot from "../../components/ui/Chatbot";

/**
/ PUBLIC_INTERFACE
 * Chatbot demo page using mock responses.
 * This demo renders only a floating action button (FAB) by default. The chat panel
 * mounts when the FAB is clicked and fully unmounts when closed, ensuring no on-page
 * headings or informational text are shown by default.
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
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-floating hover:bg-blue-600 transition grid place-items-center z-49"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Floating Chatbot Panel — render only when open */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-[min(92vw,380px)] max-h-[70vh] transition-all z-49 opacity-100 translate-y-0"
          role="dialog"
          aria-modal="false"
          aria-label="Floating chatbot panel"
        >
          <div className="ocean-surface overflow-hidden">
            <Chatbot
              title="Assistant"
              systemPrompt="Floating panel"
              onSend={(msg) => console.log("Floating chat:", msg)}
            />
          </div>
        </div>
      )}
    </>
  );
}
