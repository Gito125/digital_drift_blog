"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * @typedef {'light' | 'dark'} Theme
 */
type Theme = 'light' | 'dark';

/**
 * @typedef {object} ThemeContextType
 * @property {Theme} theme - The current theme ('light' or 'dark').
 * @property {() => void} toggleTheme - Function to toggle the theme.
 */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component.
 * Manages the theme state, persists it to local storage, and applies it to the document's html element.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The children to be rendered within the theme provider.
 * @returns {JSX.Element} The ThemeProvider component.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use the theme context.
 * @returns {ThemeContextType} The theme context object.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
