import React from "react";
import Testimonial from "../../components/ui/Testimonial";
import Header from "../../components/Header";

/**
/ PUBLIC_INTERFACE
 * Testimonial demo page showcasing slider with drag and button navigation.
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
    {
      quote: "A reliable foundation for rapid prototyping and production apps.",
      author: "Taylor Kim",
      role: "CTO",
      company: "Harbor Tech",
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const trackRef = React.useRef(null);

  const goTo = (n) => {
    const c = testimonials.length;
    setIdx(((n % c) + c) % c);
  };
  const prev = () => goTo(idx - 1);
  const next = () => goTo(idx + 1);

  // Drag support
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let delta = 0;

    const onDown = (e) => {
      isDown = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      delta = 0;
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      delta = x - startX;
    };
    const onUp = () => {
      if (!isDown) return;
      isDown = false;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next();
        else prev();
      }
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
    };
  }, [idx, testimonials.length]);

  return (
    <section className="space-y-6">
      {/* Header uses brand gradient; solid body for content readability */}
      <Header
        title="Testimonial"
        subtitle="Customer quotes with avatars and details. Now with a slider and drag."
      />

      {/* Keep slider area solid to maintain contrast and focus visibility */}
      <div className="ocean-surface p-4 relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          {testimonials.map((t, i) => (
            <div key={i} className="min-w-full p-2">
              <Testimonial {...t} />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-soft grid place-items-center"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-soft grid place-items-center"
        >
          ›
        </button>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === idx ? "true" : "false"}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2.5 bg-black/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
