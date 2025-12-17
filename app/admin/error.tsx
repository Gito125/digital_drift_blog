'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-red-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-red-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-6 animate-bounce">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M6.343 6.343l11.314 11.314M17.657 6.343L6.343 17.657" />
          </svg>
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">Admin panel error</h1>
        <p className="text-foreground/70 mb-8">An error occurred in the admin panel. Try reloading or return to the dashboard.</p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm font-mono break-words">
            {error.message}
            {error.digest && <div className="text-xs text-foreground/50 mt-2">Error ID: {error.digest}</div>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => reset()} className="px-6 py-3 bg-accent text-background rounded-lg font-semibold hover:scale-105 transition">Retry</button>
          <Link href="/admin/dashboard" className="px-6 py-3 bg-background border border-foreground/10 rounded-lg hover:border-accent transition">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
