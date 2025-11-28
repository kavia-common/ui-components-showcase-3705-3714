import React from "react";
import BentoMenu from "../../components/ui/BentoMenu";
import Header from "../../components/Header";

/**
/ PUBLIC_INTERFACE
 * Bento Menu demo page with Ocean theme styling.
 */
export default function BentoMenuDemoPage() {
  const items = [
    {
      title: "Accordion",
      description: "Collapsible content",
      bodyText: "Expand and collapse panels with accessible semantics.",
      href: "/accordion",
      icon: "🧩",
      span: "sm:col-span-2 row-span-2",
    },
    {
      title: "Breadcrumbs",
      description: "Navigation trail",
      bodyText: "Show users where they are and how to navigate back.",
      href: "/breadcrumbs",
      icon: "🧭",
      span: "row-span-1",
    },
    {
      title: "Carousel",
      description: "Sliding content",
      bodyText: "Cycle through images or content with swipe and keys.",
      href: "/carousel",
      icon: "🎞️",
      span: "row-span-2",
    },
    {
      title: "Chatbot",
      description: "Conversational UI",
      bodyText: "Chat panel with mock replies and a floating trigger.",
      href: "/chatbot",
      icon: "🤖",
      span: "row-span-1",
    },
    {
      title: "Form Wizard",
      description: "Multi-step forms",
      bodyText: "Guide users through steps with validation and progress.",
      href: "/form-wizard",
      icon: "🪄",
      span: "row-span-1",
    },
    {
      title: "Testimonial",
      description: "Customer quotes",
      bodyText: "Highlight quotes with avatars and company details.",
      href: "/testimonial",
      icon: "💬",
      span: "sm:col-span-2 row-span-1",
    },
  ];

  return (
    <section className="space-y-6">
      <Header
        title="Bento Menu"
        subtitle="A modern grid-based navigation menu. Fully responsive and keyboard accessible."
      />

      <BentoMenu items={items} />
    </section>
  );
}
