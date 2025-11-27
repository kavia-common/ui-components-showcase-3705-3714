/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#2563EB",
        secondary: "#F59E0B",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#0EA5E9",
        // Surfaces
        background: "#f9fafb",
        surface: "#ffffff",
        // Content
        text: "#111827",
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(to right, rgba(59,130,246,0.1), #f9fafb)",
        // New brand gradient per request
        "brand-gradient": "linear-gradient(45deg, #af2497 10%, #902d9a 20%, #1840a0 100%)",
      },
      boxShadow: {
        hairline: "0 0 0 1px rgba(0,0,0,0.04)",
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
        card: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        floating: "0 12px 24px -8px rgba(2,6,23,0.15)",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "0.875rem",
        "2xl": "1rem",
        pill: "9999px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pop: {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 300ms ease-out",
        slideUp: "slideUp 300ms ease-out",
        slideDown: "slideDown 250ms ease-out",
        pop: "pop 180ms ease-out",
        shimmer: "shimmer 2s linear infinite",
        "spin-slow": "spinSlow 1.2s linear infinite",
      },
      gradientColorStops: {
        ocean: {
          from: "rgba(59,130,246,0.1)",
          to: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
