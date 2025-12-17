"use"

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-4">Page Not Found</h1>
          <p className="text-foreground/70 text-center mb-8">
            The page you&apos;re looking for couldn&apos;t be found. It may have been moved or removed.
          </p>

          <div className="mb-8 p-6 bg-foreground/5 rounded-xl">
            <p className="text-sm font-semibold text-foreground mb-4 text-center">Quick Navigation:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium text-foreground">Home</span>
              </Link>

              <Link href="/blog" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-foreground">Browse Blog</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1 px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg text-center">Go Home</Link>
            <Link href="/contact" className="flex-1 px-6 py-3 bg-background border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent hover:bg-accent/5 transition-all font-semibold shadow-lg text-center">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
