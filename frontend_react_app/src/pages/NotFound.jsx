import React from "react";
import { Link } from "react-router-dom";

/**
/ PUBLIC_INTERFACE
 * 404 Not Found page with navigation back to home.
 */
export default function NotFound() {
  return (
    <div className="ocean-surface p-8 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-text/70">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex mt-4 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-600 transition shadow-soft"
      >
        Go back home
      </Link>
    </div>
  );
}
