"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * Login Page component
 * Allows users to log in with their credentials (email and password).
 */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false, // Do not redirect automatically
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Check if the user is an admin after successful login
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      
      if (session?.user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/'); // Redirect regular users to home
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-heading mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              Invalid credentials. Please try again.
            </p>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text/80">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text/80">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90 disabled:bg-opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text/70">
          Don't have an account?{' '}
          <Link href="/signup" className="text-accent hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
