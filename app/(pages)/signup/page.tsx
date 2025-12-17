import SignupClient from './signup-client';

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/signup'].title,
  description: seoData.metadata.pages['/signup'].description,
  keywords: seoData.metadata.pages['/signup'].keywords,
  openGraph: {
    title: seoData.metadata.pages['/signup'].ogTitle,
    description: seoData.metadata.pages['/signup'].ogDescription,
  },
  alternates: {
    canonical: seoData.metadata.pages['/signup'].canonical
  },
  metadataBase: new URL(seoData.metadata.site.baseUrl),
};

export default function SignupPage() {
  return <SignupClient />;
}
