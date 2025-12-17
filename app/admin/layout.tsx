import AdminLayoutClient from './admin-layout-client';

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/admin'].title,
  description: seoData.metadata.pages['/admin'].description,
  alternates: {
    canonical: seoData.metadata.pages['/admin'].canonical
  },
  metadataBase: new URL(seoData.metadata.site.baseUrl),
  robots: 'noindex'
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
