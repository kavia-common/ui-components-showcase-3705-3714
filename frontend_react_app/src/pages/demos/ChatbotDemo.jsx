import React from "react";
import Chatbot from "../../components/ui/Chatbot";
import env from "../../config/env";

/**
/ PUBLIC_INTERFACE
 * Chatbot demo page using mock responses.
 */
export default function ChatbotDemoPage() {
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

      <Chatbot
        title="Ocean Assistant"
        systemPrompt="Helpful UI demo assistant"
        onSend={(msg) => console.log("User sent:", msg)}
      />
    </section>
  );
}
