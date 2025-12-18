'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * A toggle button component that allows users to switch between dark and light modes.
 * It uses next-themes to manage the theme state and reflects system preferences.
 * 
 * Uses client-only rendering to prevent hydration mismatches between server/client.
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component only renders on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(targetTheme)
  }

  // Show placeholder until client-side mount completes
  if (!mounted) {
    return (
      <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200 p-2 dark:bg-gray-700/25" />
    )
  }

  return (
    <button
      aria-label="Switch Theme"
      onClick={toggleTheme}
      className="cursor-pointer rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-400"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}