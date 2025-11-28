import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
/ PUBLIC_INTERFACE
 * MainLayout provides a shared shell with Navbar and Footer, applying theme state to the document.
 */
export default function MainLayout() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Apply theme on document root
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    // Keep global app gradient on the shell; major sections (Navbar/Footer) use app-gradient-major.
    <div className="min-h-screen flex flex-col bg-app-gradient text-text">
      <Navbar theme={theme} onToggle={toggleTheme} />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
