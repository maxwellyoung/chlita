"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
      <button
        onClick={reset}
        className="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
