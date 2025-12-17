'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to your monitoring service
    console.error('Root error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-red-500/40 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-red-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-full mb-8 animate-bounce">
          <svg className="w-12 h-12 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">Something went wrong!</h1>
        <p className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg mx-auto">
          We encountered an unexpected error. Don&apos;t worry — our team has been notified and we&apos;re working on it.
        </p>

        {/* Error Details (Development only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-left max-w-lg mx-auto">
            <p className="text-sm text-red-600 dark:text-red-400 font-mono break-words">{error.message}</p>
            {error.digest && <p className="text-xs text-foreground/50 mt-2">Error ID: {error.digest}</p>}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="group px-8 py-4 bg-accent text-background rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 text-lg font-semibold shadow-xl hover:shadow-2xl"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </span>
          </button>

          <Link
            href="/"
            className="group px-8 py-4 bg-background/80 backdrop-blur-sm border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent hover:bg-accent/5 hover:scale-105 active:scale-95 transition-all duration-200 text-lg font-semibold shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </span>
          </Link>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-foreground/50">
          If this problem persists, please{' '}
          <Link href="/contact" className="text-accent hover:underline font-medium">contact support</Link>.
        </p>
      </div>
    </div>
  );
}
