
import type { Config } from 'tailwindcss'

const colors = {
  light: {
    bg: '#F7F7FF',
    text: '#1A1A1A',
  },
  dark: {
    bg: '#1A1A2E',
    text: '#F7F7FF',
    accent: '#27187E',
  }
}

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        text: 'var(--color-text)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        heading: ['var(--font-azurio)', 'sans-serif'],
        body: ['var(--font-goga)', 'sans-serif'],
        remi: ['var(--font-remi)', 'sans-serif'],
        remisa: ['var(--font-remisa)', 'sans-serif'],
        emphasis: ['var(--font-emilio)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config
