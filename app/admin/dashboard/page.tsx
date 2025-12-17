/**
 * Admin Dashboard Page
 * High-level overview of platform activity.
 */

import DashboardStats from "@/components/admin/DashboardStats";

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/admin/dashboard'].title,
  description: seoData.metadata.pages['/admin/dashboard'].description,
  metadataBase: new URL(seoData.metadata.site.baseUrl),
  robots: 'noindex',
};

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-heading">Dashboard</h1>
        <p className="text-muted mt-1">
          Overview of platform activity and content health
        </p>
      </header>

      {/* REAL-TIME STATS */}
      <DashboardStats />

      {/* FUTURE SECTIONS PLACEHOLDER */}
      <section className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
        Analytics charts, traffic sources, and growth trends will appear here.
      </section>
    </div>
  );
}
