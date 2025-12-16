'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Link from 'next/link';
import { Post } from '@/models/Post';

export default function BlogSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const searchPosts = async () => {
      if (debouncedSearchTerm) {
        setLoading(true);
        try {
          const res = await fetch(`/api/posts/search?q=${encodeURIComponent(debouncedSearchTerm)}`);
          if (res.ok) {
            const data = await res.json();
            setResults(data.posts);
            setSelectedIndex(-1); // Reset selection when new results come in
          }
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setSelectedIndex(-1);
      }
    };
    searchPosts();
  }, [debouncedSearchTerm]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => {
            const next = prev < results.length - 1 ? prev + 1 : prev;
            // Scroll into view
            if (resultsRef.current[next]) {
              resultsRef.current[next]?.scrollIntoView({ 
                block: 'nearest', 
                behavior: 'smooth' 
              });
            }
            return next;
          });
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => {
            const next = prev > 0 ? prev - 1 : -1;
            // Scroll into view
            if (next >= 0 && resultsRef.current[next]) {
              resultsRef.current[next]?.scrollIntoView({ 
                block: 'nearest', 
                behavior: 'smooth' 
              });
            }
            return next;
          });
          break;

        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            resultsRef.current[selectedIndex]?.click();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results.length, selectedIndex]);

  // Reset results ref array when results change
  useEffect(() => {
    resultsRef.current = resultsRef.current.slice(0, results.length);
  }, [results]);

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
    setResults([]);
    setSelectedIndex(-1);
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <>
      {/* Search Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
        aria-label="Search posts"
      >
        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Modal Overlay + Search Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-md animate-fadeIn"
            onClick={handleClose}
          />

          {/* Search Panel */}
          <div 
            ref={searchRef}
            className="relative w-full max-w-2xl bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-2xl animate-slideDown overflow-hidden"
          >
            {/* Search Header */}
            <div className="p-6 border-b border-foreground/10">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground/60 hover:text-foreground"
                  aria-label="Close search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Quick Stats */}
              {searchTerm && !loading && (
                <div className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>
                    {loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'result' : 'results'} found`}
                  </span>
                </div>
              )}
            </div>

            {/* Search Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="p-8 text-center">
                  <div className="inline-flex items-center gap-3 text-foreground/60">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Searching articles...</span>
                  </div>
                </div>
              )}

              {!loading && results.length > 0 && (
                <ul className="divide-y divide-foreground/10">
                  {results.map((post, index) => (
                    <li key={post._id.toString()}>
                      <Link 
                        ref={(el) => { resultsRef.current[index] = el; }}
                        href={`/blog/${post.slug}`}
                        onClick={handleResultClick}
                        className={`block p-5 text-left hover:bg-accent/5 transition-all group ${
                          selectedIndex === index ? 'bg-accent/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            selectedIndex === index 
                              ? 'bg-accent/30' 
                              : 'bg-accent/10 group-hover:bg-accent/20'
                          }`}>
                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold transition-colors line-clamp-1 ${
                              selectedIndex === index 
                                ? 'text-accent' 
                                : 'text-foreground group-hover:text-accent'
                            }`}>
                              {post.title}
                            </h3>
                            <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-foreground/50">
                              <span className="flex items-center gap-1">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {post.viewCount} views
                              </span>
                              <span>•</span>
                              <span>
                                {post.publishedAt ?
                                  (typeof post.publishedAt === 'string' ?
                                    new Date(post.publishedAt).toLocaleDateString() :
                                    post.publishedAt.toLocaleDateString())
                                  : 'Not published'}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <svg className={`w-5 h-5 flex-shrink-0 transition-all ${
                            selectedIndex === index
                              ? 'text-accent translate-x-1'
                              : 'text-foreground/30 group-hover:text-accent group-hover:translate-x-1'
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {!loading && debouncedSearchTerm && results.length === 0 && (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground/5 rounded-full mb-4">
                    <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-foreground/80 font-medium mb-1">No results found</p>
                  <p className="text-sm text-foreground/60">Try searching with different keywords</p>
                </div>
              )}

              {!loading && !debouncedSearchTerm && (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-foreground/80 font-medium mb-1">Start your search</p>
                  <p className="text-sm text-foreground/60">Type to find articles, tutorials, and more</p>
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className="p-4 border-t border-foreground/10 bg-foreground/5">
              <div className="flex items-center justify-center gap-4 text-xs text-foreground/50">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-background border border-foreground/10 rounded text-foreground/70 font-mono">ESC</kbd>
                  to close
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-background border border-foreground/10 rounded text-foreground/70 font-mono">↑</kbd>
                  <kbd className="px-2 py-1 bg-background border border-foreground/10 rounded text-foreground/70 font-mono">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-background border border-foreground/10 rounded text-foreground/70 font-mono">↵</kbd>
                  to select
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}