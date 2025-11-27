import React, { useEffect, useRef, useState } from "react";

/**
/ PUBLIC_INTERFACE
 * Chatbot: simple conversational UI with mock responses and typing indicator.
 * Props:
 * - title: string
 * - systemPrompt: string (ignored for mock but displayed in aria-description)
 * - onSend?: (message) => void
 */
export default function Chatbot({ title = "Assistant", systemPrompt = "You are a helpful assistant.", onSend }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me about the UI demos. ✨" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    onSend?.(text);

    // Mock typing and reply
    setTyping(true);
    await new Promise((r) => setTimeout(r, 700));

    const reply = mockReply(text);
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    setTyping(false);
  };

  const onKeyDown = (e) => {
    if ((e.key === "Enter" || e.keyCode === 13) && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      className="ocean-surface p-0 overflow-hidden"
      role="region"
      aria-label="Chatbot"
      aria-description={systemPrompt}
    >
      <div className="px-5 py-3 border-b border-black/5 bg-white/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-primary text-white grid place-items-center">🤖</div>
          <div className="font-semibold text-text">{title}</div>
        </div>
        <span className="text-xs text-text/60">Mock mode</span>
      </div>

      <div
        ref={scrollerRef}
        className="h-72 sm:h-96 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.content} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="p-3 border-t border-black/5 bg-white flex items-end gap-2"
        aria-label="Message composer"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Ask something..."
          className="flex-1 resize-none rounded-xl border border-black/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40"
          aria-label="Message input"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-blue-600 transition disabled:opacity-50"
          disabled={!input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-soft ${
          isUser ? "bg-primary text-white rounded-br-sm" : "bg-white text-text rounded-bl-sm border border-black/5"
        }`}
      >
        <span className="whitespace-pre-wrap text-sm">{text}</span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-text/60 text-sm">
      <div className="h-2 w-2 rounded-full bg-text/40 animate-bounce [animation-delay:0ms]" />
      <div className="h-2 w-2 rounded-full bg-text/40 animate-bounce [animation-delay:150ms]" />
      <div className="h-2 w-2 rounded-full bg-text/40 animate-bounce [animation-delay:300ms]" />
      <span>Assistant is typing...</span>
    </div>
  );
}

function mockReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes("accordion")) {
    return "Accordion shows collapsible content with accessible semantics. Try the Accordion demo page.";
  }
  if (lower.includes("bento")) {
    return "The Bento Menu presents navigation as a modern grid of cards with icons.";
  }
  if (lower.includes("carousel")) {
    return "Carousel slides content with autoplay, indicators and keyboard support.";
  }
  if (lower.includes("toast")) {
    return "Toast are ephemeral notifications with different tones like success or error.";
  }
  if (lower.includes("form")) {
    return "The Form Wizard guides users through multi-step submission with validation.";
  }
  if (lower.includes("testimonial")) {
    return "Testimonials highlight customer quotes with avatars and company details.";
  }
  return "I can help you explore the UI demos. Ask about accordion, bento, carousel, toast, form wizard, or testimonial!";
}
