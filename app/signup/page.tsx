"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Enhanced Signup Page Component
 * 
 * Features:
 * - Modern glassmorphism design with hero-style background
 * - Real-time password strength indicator
 * - Smooth animations and transitions
 * - Enhanced dark mode support
 * - Password visibility toggle
 * - Form validation feedback
 * - Success modal
 * - Decorative background elements matching hero section
 */
export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  /**
   * Calculate password strength
   * Returns: weak, medium, strong
   */
  const getPasswordStrength = (pwd: string): 'weak' | 'medium' | 'strong' | null => {
    if (!pwd) return null;
    if (pwd.length < 6) return 'weak';
    if (pwd.length < 10) return 'medium';
    return 'strong';
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to register user.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      {/* Animated gradient orbs - Matching hero */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-br from-accent/60 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/40 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm animate-fadeIn">
          <div className="bg-background border border-foreground/10 rounded-2xl p-8 shadow-2xl max-w-sm mx-4 transform animate-scaleIn">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Success!</h3>
              <p className="text-foreground/70 mb-4">
                Your account has been created successfully.
              </p>
              <p className="text-sm text-foreground/60">Redirecting to login...</p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Card with glassmorphism effect */}
        <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-foreground/10 p-8 md:p-10 transform transition-all duration-300 hover:shadow-accent/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              Join Digital Drift
            </h1>
            <p className="text-foreground/70">
              Create your account to start exploring
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 animate-shake">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Name field */}
            <div className="space-y-2">
              <label 
                htmlFor="name" 
                className="block text-sm font-semibold text-foreground/90"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50">
                  <span>👤</span>
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="block w-full pl-12 pr-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-foreground/90"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50">
                  <span>📧</span>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-12 pr-4 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password field with strength indicator */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-foreground/90"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/50">
                  <span>🔒</span>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="block w-full pl-12 pr-12 py-3 border border-foreground/20 rounded-xl bg-background/50 text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/50 hover:text-foreground transition-colors"
                >
                  <span className="text-lg">{showPassword ? "🙈" : "👁️"}</span>
                </button>
              </div>
              
              {/* Password strength indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      passwordStrength === 'weak' ? 'bg-red-500' :
                      passwordStrength === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                      (passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') : 
                      'bg-foreground/10'
                    }`}></div>
                    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                      passwordStrength === 'strong' ? 'bg-green-500' : 'bg-foreground/10'
                    }`}></div>
                  </div>
                  <p className={`text-xs font-medium ${
                    passwordStrength === 'weak' ? 'text-red-600 dark:text-red-400' :
                    passwordStrength === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  }`}>
                    Password strength: {passwordStrength}
                    {passwordStrength === 'weak' && ' - Use at least 6 characters'}
                    {passwordStrength === 'medium' && ' - Consider adding more characters'}
                    {passwordStrength === 'strong' && ' - Great password!'}
                  </p>
                </div>
              )}
            </div>

            {/* Terms and conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-foreground/20 text-accent focus:ring-accent"
              />
              <label htmlFor="terms" className="text-sm text-foreground/70">
                I agree to the{' '}
                <Link href="/terms" className="text-accent hover:underline font-medium">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-accent hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 bg-accent hover:opacity-90 text-background rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-foreground/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background/80 text-foreground/60">or sign up with</span>
            </div>
          </div>

          {/* Social signup options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 hover:bg-foreground/5 transition-all duration-200 group"
            >
              <span className="text-xl">🌐</span>
              <span className="text-sm font-medium text-foreground">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-foreground/20 rounded-xl bg-background/50 hover:bg-foreground/5 transition-all duration-200 group"
            >
              <span className="text-xl">💼</span>
              <span className="text-sm font-medium text-foreground">GitHub</span>
            </button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-foreground/70">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              Sign in instead
            </Link>
          </p>
        </div>

        {/* Bottom decoration */}
        <div className="mt-6 text-center text-xs text-foreground/50">
          <p>Secured by Digital Drift • Protected Connection</p>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}