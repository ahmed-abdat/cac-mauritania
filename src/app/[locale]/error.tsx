'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          We&apos;re sorry, but it seems like we&apos;ve encountered an unexpected error. Don&apos;t worry, our team has been notified.
        </p>
        <button
          onClick={reset}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Try again
        </button>
        <details className="mt-6">
          <summary className="text-sm text-gray-500 cursor-pointer">Error details</summary>
          <pre className="mt-2 text-xs text-gray-400 overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
    </div>
  );
}
