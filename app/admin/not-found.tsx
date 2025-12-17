"use client";

import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-4">Admin Page Not Found</h1>
          <p className="text-foreground/70 text-center mb-8">This admin page doesn't exist. You might have followed an old link or the page may have been moved.</p>

          {/* Quick Links */}
          <div className="mb-8 p-6 bg-foreground/5 rounded-xl">
            <p className="text-sm font-semibold text-foreground mb-4 text-center">Quick Navigation:</p>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/dashboard" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium text-foreground">Dashboard</span>
              </Link>

              <Link href="/admin/posts" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-foreground">Posts</span>
              </Link>

              <Link href="/admin/categories" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm font-medium text-foreground">Categories</span>
              </Link>

              <Link href="/admin/comments" className="flex items-center gap-2 p-3 bg-background border border-foreground/10 rounded-lg hover:border-accent hover:bg-accent/5 transition-all group">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-sm font-medium text-foreground">Comments</span>
              </Link>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/admin/dashboard" className="flex-1 px-6 py-3 bg-accent text-background rounded-xl hover:opacity-90 transition-all font-semibold shadow-lg flex items-center justify-center gap-2">Go to Dashboard</Link>
            <Link href="/" className="flex-1 px-6 py-3 bg-background border-2 border-foreground/20 text-foreground rounded-xl hover:border-accent hover:bg-accent/5 transition-all font-semibold shadow-lg flex items-center justify-center gap-2">Exit to Site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
