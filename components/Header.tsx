'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeProvider';
import MobileMenu from './ui/MobileMenu';
import { useRef, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import CTA_Button from './ui/CTA_Button';

/**
 * Header component that appears at the top of each page
 * Contains navigation links, user authentication features, and theme toggle functionality
*/
export default function Header() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 py-4 md:py-6 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-heading font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Digital Drift
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="font-body text-foreground hover:text-accent transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="font-body text-foreground hover:text-accent transition-colors font-medium"
              >
                Blog
              </Link>

              {status === 'authenticated' && session?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-background hover:opacity-90 transition-all shadow-md hover:shadow-lg font-semibold"
                    aria-label="User menu"
                    aria-expanded={dropdownOpen}
                  >
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-xl shadow-xl py-1 z-50 animate-fadeIn">
                      {session.user.role === 'admin' && (
                        <Link
                          href="/admin/dashboard"
                          className="block px-4 py-3 text-sm text-foreground hover:bg-accent/10 hover:text-accent border-b border-foreground/10 transition-colors font-medium"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-body text-foreground hover:text-accent transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <ThemeToggle />
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-foreground hover:bg-foreground/5 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu session={session} status={status} setDropdownOpen={setDropdownOpen} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </>
  );
}