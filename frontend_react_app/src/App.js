import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import {
  AccordionDemo,
  BentoMenuDemo,
  BreadcrumbsDemo,
  CarouselDemo,
  ChatbotDemo,
  FormWizardDemo,
  TestimonialDemo,
  ToastDemo,
} from "./pages/demos/Placeholders";

// PUBLIC_INTERFACE
function App() {
  /** App routes wrapped in MainLayout with Navbar and Footer. */
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/accordion" element={<AccordionDemo />} />
        <Route path="/bentomenu" element={<BentoMenuDemo />} />
        <Route path="/breadcrumbs" element={<BreadcrumbsDemo />} />
        <Route path="/carousel" element={<CarouselDemo />} />
        <Route path="/chatbot" element={<ChatbotDemo />} />
        <Route path="/form-wizard" element={<FormWizardDemo />} />
        <Route path="/testimonial" element={<TestimonialDemo />} />
        <Route path="/toast" element={<ToastDemo />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
