'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

/**
 * A toggle button component that allows users to switch between dark and light modes.
 * It uses next-themes to manage the theme state and reflects system preferences.
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-400 transition-colors duration-200"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}
