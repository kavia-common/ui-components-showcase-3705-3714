import React from "react";
import Testimonial from "../../components/ui/Testimonial";

/**
/ PUBLIC_INTERFACE
 * Testimonial demo page showcasing different layouts.
 */
export default function TestimonialDemoPage() {
  const testimonials = [
    {
      quote:
        "These UI components made our development faster while keeping a polished look.",
      author: "Alex Johnson",
      role: "Frontend Lead",
      company: "BlueWave Inc.",
    },
    {
      quote: "Clean design, great accessibility, and easy to customize.",
      author: "Priya Patel",
      role: "Product Designer",
      company: "Ripple Labs",
    },
    {
      quote: "The Ocean theme looks professional and modern across all screens.",
      author: "Marco Rossi",
      role: "Engineering Manager",
      company: "SeaSight",
    },
  ];

  return (
    <section className="space-y-6">
      <header className="ocean-surface p-6">
        <h1 className="text-2xl font-bold">Testimonial</h1>
        <p className="text-text/70 mt-1">
          Customer quotes with avatars and details. Fully responsive cards.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <Testimonial key={i} {...t} />
        ))}
      </div>
    </section>
  );
}
