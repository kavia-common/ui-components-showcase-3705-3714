import React from "react";
import Breadcrumbs from "../../components/ui/Breadcrumbs";
import Header from "../../components/Header";

/**
/ PUBLIC_INTERFACE
 * Breadcrumbs demo page with Ocean theme styling.
 */
export default function BreadcrumbsDemoPage() {
  return (
    <section className="space-y-6">
      <Header
        title="Breadcrumbs"
        subtitle="Hierarchical navigation trail to indicate the current location."
      />

      {/* Demo 1 */}
      <div className="app-answer-surface app-answer-border p-5 space-y-3 rounded-2xl">
        <Breadcrumbs
          items={[
            { label: "Hero Section", to: "/" },
            { label: "Components", to: "/accordion" },
            { label: "Breadcrumbs" },
          ]}
        />
        <div className="text-sm app-answer-subtle">
          Use router Links for intermediate segments and a static label for the current page.
        </div>
      </div>

      {/* Demo 2 */}
      <div className="app-answer-surface app-answer-border p-5 space-y-3 rounded-2xl">
        <Breadcrumbs
          items={[
            { label: "Hero Section", to: "/" },
            { label: "Demos", to: "/toast" },
            { label: "Form Wizard", to: "/form-wizard" },
            { label: "Summary" },
          ]}
        />
        <div className="text-sm app-answer-subtle">
          Works with any number of segments. Responsive and wraps on small screens. Hover or tab through links to see the subtle brand-gradient underline/border.
        </div>
      </div>
    </section>
  );
}
