"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Enhanced Login Page Component
 * 
 * Features:
 * - Modern glassmorphism design
 * - Smooth animations and transitions
 * - Enhanced dark mode support
 * - Password visibility toggle
 * - Loading states with spinner
 * - Decorative background elements
 * 
 * Allows users to log in with their credentials (email and password).
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      
      if (session?.user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background via-background to-accent/10 dark:to-accent/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Card with glassmorphism effect */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-10 transform transition-all duration-300 hover:shadow-accent/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-2xl mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text mb-2">
              Welcome Back
            </h1>
            <p className="text-text/70 dark:text-text/80">
              Sign in to continue to Digital Drift
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 animate-shake">
                <span className="text-lg">⚠️</span>
                <span>Invalid credentials. Please try again.</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-text/90"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/50">
                  <span>📧</span>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-900/50 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent/70 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-text/90"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text/50">
                  <span>🔒</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-900/50 text-text placeholder:text-text/50 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent/70 focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text/50 hover:text-text transition-colors"
                >
                  <span className="text-lg">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-sm text-accent hover:text-accent/80 dark:hover:text-accent/90 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-accent hover:bg-accent/90 dark:bg-accent/95 dark:hover:bg-accent text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-text/60">or continue with</span>
            </div>
          </div>

          {/* Social login options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <span className="text-xl">🌐</span>
              <span className="text-sm font-medium text-text">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
            >
              <span className="text-xl">💼</span>
              <span className="text-sm font-medium text-text">GitHub</span>
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-center text-sm text-text/70 dark:text-text/80">
            Don't have an account?{' '}
            <Link 
              href="/signup" 
              className="text-accent hover:text-accent/80 dark:hover:text-accent/90 font-semibold transition-colors"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="mt-6 text-center text-xs text-text/50">
          <p>Secured by Digital Drift • Protected Connection</p>
        </div>
      </div>
    </div>
  );
}