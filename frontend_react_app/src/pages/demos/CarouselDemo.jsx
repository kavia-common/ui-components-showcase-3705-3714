import React from "react";
import Carousel from "../../components/ui/Carousel";
import Header from "../../components/Header";

/**
/ PUBLIC_INTERFACE
 * Carousel demo page with images and custom content slides.
 */
export default function CarouselDemoPage() {
  const slides = [
    {
      content:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      alt: "Ocean waves",
    },
    {
      content:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
      alt: "Mountain valley",
    },
    {
      content: (
        <div className="h-full w-full grid place-items-center bg-gradient-to-br from-blue-50 to-amber-50">
          <div className="ocean-surface p-6 border border-black/5 text-center">
            <div className="text-2xl font-bold text-primary">Custom Slide</div>
            <p className="text-sm text-text/70 mt-2">
              You can render any content inside the carousel.
            </p>
          </div>
        </div>
      ),
      alt: "Custom slide",
    },
  ];

  return (
    <section className="space-y-6">
      <Header
        title="Carousel"
        subtitle="Slide through content with autoplay, indicators, keyboard and swipe support."
      />

      <Carousel items={slides} />
    </section>
  );
}
