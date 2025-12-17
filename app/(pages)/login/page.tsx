import LoginClient from './login-client';

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/login'].title,
  description: seoData.metadata.pages['/login'].description,
  keywords: seoData.metadata.pages['/login'].keywords,
  alternates: {
    canonical: seoData.metadata.pages['/login'].canonical
  }
};

export default function LoginPage() {
  return <LoginClient />;
}
