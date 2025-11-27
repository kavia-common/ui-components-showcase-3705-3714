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

export const AccordionDemo = makeDemo("Accordion", "Expandable/collapsible content panels.");
export const BentoMenuDemo = makeDemo("Bento Menu", "Grid-based modern navigation layout.");
export const BreadcrumbsDemo = makeDemo("Breadcrumbs", "Hierarchical navigation aid.");
export const CarouselDemo = makeDemo("Carousel", "Sliding content or images.");
export const ChatbotDemo = makeDemo("Chatbot", "Conversational interface.");
export const FormWizardDemo = makeDemo("Form Wizard", "Multi-step form workflow.");
export const TestimonialDemo = makeDemo("Testimonial", "Customer feedback display.");
export const ToastDemo = makeDemo("Toast", "Ephemeral notifications.");
