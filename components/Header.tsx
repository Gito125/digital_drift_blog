'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeProvider';

/**
 * Header component that appears at the top of each page
 * Contains navigation links, user authentication features, and theme toggle functionality
 */
export default function Header() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setDropdownOpen(false);
    setMobileMenuOpen(false); // Close mobile menu after logout
  };

  return (
    <header className="py-6 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-accent dark:text-accent">
            Digital Drift
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors"
            >
              Blog
            </Link>

            {status === 'authenticated' && session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-text hover:text-accent dark:hover:text-accent transition-colors shadow-sm dark:shadow-[#505050]"
                  aria-label="User menu"
                  aria-expanded={dropdownOpen}
                >
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-50 border border-gray-200 dark:border-gray-700">
                    {session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-sm text-text hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 dark:text-accent"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors"
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
              className="p-2 rounded-md text-text hover:bg-gray-100 dark:hover:bg-gray-700"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              {status === 'authenticated' && session?.user ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="font-body text-text">
                      Welcome, {session.user.name}
                    </span>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-red-400 font-bold text-sm mr-2">
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </div>
                  </div>

                  {/* {session.user.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block font-body text-text hover:text-accent dark:hover:text-accent transition-colors py-2 pl-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )} */}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left font-body text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors py-2 pl-4"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="font-body text-text hover:text-accent dark:hover:text-accent transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}