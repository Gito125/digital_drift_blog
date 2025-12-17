"use client";

import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[420px] h-[420px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl text-center">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 .896-4 2v4c0 1.104 1.79 2 4 2s4-.896 4-2v-4c0-1.104-1.79-2-4-2zM12 2v2" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-foreground/70 mb-8">The article you're looking for doesn't exist or has been removed.</p>

          <div className="mb-8 p-6 bg-foreground/5 rounded-xl">
            <p className="text-sm font-semibold text-foreground mb-4 text-center">Quick Links:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/blog" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition">Browse Blog</Link>
              <Link href="/" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition">Home</Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/blog" className="flex-1 px-6 py-3 bg-accent text-white rounded-xl hover:opacity-90 transition font-semibold text-center">Browse Articles</Link>
            <Link href="/contact" className="flex-1 px-6 py-3 bg-background border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent transition text-center">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
