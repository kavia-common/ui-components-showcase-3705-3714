import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ToastProvider from "./components/ui/ToastProvider";

// Implemented demo pages
import AccordionDemoPage from "./pages/demos/AccordionDemo";
import BreadcrumbsDemoPage from "./pages/demos/BreadcrumbsDemo";
import ToastDemoPage from "./pages/demos/ToastDemo";
import FormWizardDemoPage from "./pages/demos/FormWizardDemo";
import BentoMenuDemoPage from "./pages/demos/BentoMenuDemo";
import CarouselDemoPage from "./pages/demos/CarouselDemo";
import ChatbotDemoPage from "./pages/demos/ChatbotDemo";
import TestimonialDemoPage from "./pages/demos/TestimonialDemo";

// PUBLIC_INTERFACE
function App() {
  /** App routes wrapped in MainLayout with Navbar and Footer. */
  return (
    <ToastProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/accordion" element={<AccordionDemoPage />} />
          <Route path="/bentomenu" element={<BentoMenuDemoPage />} />
          <Route path="/breadcrumbs" element={<BreadcrumbsDemoPage />} />
          <Route path="/carousel" element={<CarouselDemoPage />} />
          <Route path="/chatbot" element={<ChatbotDemoPage />} />
          <Route path="/form-wizard" element={<FormWizardDemoPage />} />
          <Route path="/testimonial" element={<TestimonialDemoPage />} />
          <Route path="/toast" element={<ToastDemoPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;
