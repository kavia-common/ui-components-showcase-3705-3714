import React from "react";

/**
/ PUBLIC_INTERFACE
 * Testimonial: card to display customer quote with avatar and meta.
 * Props:
 * - quote: string
 * - author: string
 * - role?: string
 * - company?: string
 * - avatarUrl?: string
 */
export default function Testimonial({
  quote,
  author,
  role,
  company,
  avatarUrl,
}) {
  return (
    <figure className="ocean-surface p-6 border border-black/5">
      <blockquote className="text-lg text-text/90">“{quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-primary/10 grid place-items-center text-primary font-semibold">
          {avatarUrl ? (
            <img src={avatarUrl} alt={`${author} avatar`} className="h-full w-full object-cover" />
          ) : (
            (author || "?").slice(0, 1)
          )}
        </div>
        <div>
          <div className="font-semibold text-text">{author}</div>
          <div className="text-sm text-text/60">
            {[role, company].filter(Boolean).join(" • ") || "Customer"}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
