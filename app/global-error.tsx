"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900">
        <div className="max-w-md w-full p-8 bg-white rounded shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">{error.message || "An unexpected error occurred. Please try again."}</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={() => reset()}
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
} 