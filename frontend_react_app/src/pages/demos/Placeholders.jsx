import React from "react";

/**
 * Factory to create simple placeholder demo pages.
 */
function makeDemo(name, description) {
  // PUBLIC_INTERFACE
  const Demo = () => (
    <div className="ocean-surface p-8">
      <h1 className="text-2xl font-bold">{name} Demo</h1>
      <p className="mt-2 text-text/70">{description}</p>
      <div className="mt-6 p-4 rounded-xl border border-black/5 bg-white">
        <p className="text-sm text-text/60">
          Component implementation pending. This is a placeholder section.
        </p>
      </div>
    </div>
  );
  return Demo;
}

// Keep only placeholders that are still unused elsewhere (none required currently).
export const BreadcrumbsDemo = makeDemo("Breadcrumbs", "Hierarchical navigation aid.");
export const FormWizardDemo = makeDemo("Form Wizard", "Multi-step form workflow.");
export const ToastDemo = makeDemo("Toast", "Ephemeral notifications.");
