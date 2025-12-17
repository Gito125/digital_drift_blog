import ThemeDemoClient from './theme-demo-client';

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/theme-demo'].title,
  description: seoData.metadata.pages['/theme-demo'].description,
  keywords: seoData.metadata.pages['/theme-demo'].keywords
};

export default function ThemeDemoPage() {
  return <ThemeDemoClient />;
}