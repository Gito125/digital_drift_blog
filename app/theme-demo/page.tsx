'use client';

import { useTheme } from 'next-themes';

export default function ThemeDemoPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">Theme Demo</h1>
      
      <div className="mb-6 p-4 rounded-lg bg-background text-text border border-gray-200 dark:border-gray-700">
        <p className="text-text mb-4">Current theme: <span className="font-semibold">{theme}</span></p>

        <div className="space-x-4">
          <button
            onClick={() => setTheme('light')}
            className="px-4 py-2 bg-background text-text border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            Light Theme
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-4 py-2 bg-background text-text border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Dark Theme
          </button>
          <button
            onClick={() => setTheme('system')}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-text rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            System Theme
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-xl font-heading font-semibold mb-3 text-text">Card Title</h2>
          <p className="text-text mb-4">This is a sample card with text using the theme's text color.</p>
          <button className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition-opacity">
            Sample Button
          </button>
        </div>
        
        <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
          <h2 className="text-xl font-heading font-semibold mb-3 text-text">Another Card</h2>
          <p className="text-text mb-4">Notice how the background and text colors adjust to the selected theme.</p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
            <p className="text-sm text-text">Nested content with different background</p>
          </div>
        </div>
      </div>
    </div>
  );
}