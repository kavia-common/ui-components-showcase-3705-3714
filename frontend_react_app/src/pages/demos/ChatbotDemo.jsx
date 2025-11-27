import React from "react";
import Chatbot from "../../components/ui/Chatbot";
import env from "../../config/env";

/**
/ PUBLIC_INTERFACE
 * Chatbot demo page using mock responses.
 */
export default function ChatbotDemoPage() {
  const [open, setOpen] = React.useState(false);

  return (
    <section className="space-y-6">
      <header className="ocean-surface p-6">
        <h1 className="text-2xl font-bold">Chatbot</h1>
        <p className="text-text/70 mt-1">
          Conversational UI with typing indicator and mock responses.
        </p>
        <div className="mt-3 text-xs text-text/60">
          <div>API Base: <span className="font-mono">{env.apiBase}</span></div>
          <div>WS URL: <span className="font-mono">{env.wsUrl}</span></div>
          <div>Mode: <span className="font-mono">{env.nodeEnv}</span></div>
        </div>
      </header>

      {/* Inline chatbot for page demo */}
      <Chatbot
        title="Ocean Assistant"
        systemPrompt="Helpful UI demo assistant"
        onSend={(msg) => console.log("User sent:", msg)}
      />

      {/* Floating Action Button (FAB) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-white shadow-floating hover:bg-blue-600 transition grid place-items-center z-49"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Floating Chatbot Panel */}
      <div
        className={`fixed bottom-24 right-6 w-[min(92vw,380px)] max-h-[70vh] transition-all z-49 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2 hidden"
        }`}
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
    </section>
  );
}
