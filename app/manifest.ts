import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Digital Drift - Exploring the Digital Frontier',
    short_name: 'Digital Drift',
    description:
      'A cutting-edge tech blog covering web development, AI, cloud computing, and emerging technologies. Stay ahead with expert insights and tutorials.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary' as const,
    background_color: '#ffffff',
    theme_color: '#ffffff',
    lang: 'en',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: [
      'technology',
      'education',
      'news',
      'productivity',
      'books',
      'reference',
    ],
  }
}