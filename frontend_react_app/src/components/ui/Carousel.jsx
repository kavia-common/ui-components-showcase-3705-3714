import React, { useEffect, useRef, useState } from "react";

/**
/ PUBLIC_INTERFACE
 * Carousel: horizontally sliding content with controls and indicators.
 * Props:
 * - items: Array<{ id?: string, content: ReactNode, alt?: string }>
 * - autoPlay: boolean (default true)
 * - interval: number ms (default 4000)
 * - showIndicators: boolean (default true)
 * - showArrows: boolean (default true)
 */
export default function Carousel({
  items = [],
  autoPlay = true,
  interval = 4000,
  showIndicators = true,
  showArrows = true,
}) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);
  const trackRef = useRef(null);
  const count = items.length;

  const goTo = (n) => {
    if (count === 0) return;
    const next = (n + count) % count;
    setIdx(next);
  };

  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  // Autoplay management
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [idx, autoPlay, interval, count]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Basic touch support
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0;
    let endX = 0;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      const delta = endX - startX;
      if (Math.abs(delta) > 40) {
        if (delta < 0) next();
        else prev();
      }
      startX = 0;
      endX = 0;
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [idx]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-surface" aria-roledescription="carousel">
      <div
        ref={trackRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
        role="group"
        aria-label="Slides"
      >
        {items.map((it, i) => (
          <div key={it.id ?? i} className="min-w-full p-4" role="tabpanel" aria-hidden={i !== idx}>
            <div className="h-64 sm:h-80 md:h-96 rounded-xl bg-gray-100 overflow-hidden grid place-items-center">
              {typeof it.content === "string" ? (
                <img
                  src={it.content}
                  alt={it.alt || `Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                it.content
              )}
            </div>
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-soft grid place-items-center"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white shadow-soft grid place-items-center"
          >
            ›
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === idx ? "true" : "false"}
              className={`h-2.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-2.5 bg-black/20"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
