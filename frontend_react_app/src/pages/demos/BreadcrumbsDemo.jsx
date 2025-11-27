import React from "react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs demo page with Ocean theme styling.
 */
export default function BreadcrumbsDemoPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl overflow-hidden border border-black/5">
        <div className="bg-brand-gradient">
          <div className="surface-overlay-soft px-6 py-6">
          <h1 className="text-2xl font-bold text-white">Breadcrumbs</h1>
          <p className="text-white/90 mt-1">
            Hierarchical navigation trail to indicate the current location.
          </p>
        </div>
        </div>
      </header>

      <div className="ocean-surface p-5 space-y-4">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Components", to: "/accordion" },
            { label: "Breadcrumbs" },
          ]}
        />
        <div className="text-sm text-text/70">
          Use router Links for intermediate segments and a static label for the current page.
        </div>
      </div>

      <div className="ocean-surface p-5 space-y-4">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Demos", to: "/toast" },
            { label: "Form Wizard", to: "/form-wizard" },
            { label: "Summary" },
          ]}
        />
        <div className="text-sm text-text/70">
          Works with any number of segments. Responsive and wraps on small screens.
        </div>
      </div>

      <div className="ocean-surface p-5">
        <Link
          className="inline-flex px-4 py-2 rounded-xl bg-primary text-white hover:bg-blue-600 transition"
          to="/"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
