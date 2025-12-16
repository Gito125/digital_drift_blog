'use client'

import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useEffect } from 'react';
import CTA_Button from './CTA_Button';
import AdminMenu from './AdminMenu';
import SignoutButton from './SignoutButton';


interface MobileMenuProps {
  session: Session | null,
  setDropdownOpen: (open: boolean) => void,
  mobileMenuOpen: boolean,
  setMobileMenuOpen: (open: boolean) => void,
  status: "authenticated" | "loading" | "unauthenticated"
}

export default function MobileMenu({ session, status, setDropdownOpen, setMobileMenuOpen, mobileMenuOpen }: MobileMenuProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-fadeIn"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-background border-l border-foreground/10 shadow-2xl animate-slideInRight flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <h2 className="text-xl font-bold text-foreground">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors text-foreground"
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col p-6 space-y-2 overflow-y-auto">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-all font-medium"
              >
                Home
              </Link>
              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-all font-medium"
              >
                Blog
              </Link>

              {/* Divider */}
              <div className="py-4">
                <div className="border-t border-foreground/10"></div>
              </div>

              {/* Auth Section */}
              {status === 'authenticated' && session?.user ? (
                <div className="space-y-2">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-foreground/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-background font-bold shadow-md">
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Hi, </p>
                        <p className="font-bold text-foreground">{session.user.name}</p>
                      </div>
                    </div>
                  </div>

                  <AdminMenu session={session} closeMenu={closeMobileMenu} />
                  
                  <SignoutButton handleLogout={handleLogout} />
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 rounded-lg text-foreground hover:bg-accent/10 hover:text-accent transition-all font-medium"
                  >
                    Login
                  </Link>
                  <CTA_Button text="Sign Up" linkTo="/signup" />
                </>
              )}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-foreground/10">
              <p className="text-sm text-foreground/60 text-center">
                © 2026 Digital Drift
              </p>
            </div>
          </div>
        </div>
      )}

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInRight {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  )
}