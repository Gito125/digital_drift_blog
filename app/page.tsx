import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import RecentPostsSection from '@/components/RecentPostsSection';
import HeroSection from '@/components/main/HeroSection';
import FeaturesSection from '@/components/main/FeaturesSection';
import TopicsSection from '@/components/main/TopicsSection';
import { TechnologyStackSection } from '@/components/main/TechnologyStackSection';
import CTA_Section from '@/components/main/CTA_Section';
import CTA_Button from '@/components/ui/CTA_Button';

/**
 * Digital Drift Home Page Component
 * 
 * Main landing page featuring:
 * - Hero section with CTA buttons
 * - Feature highlights showcasing platform benefits
 * - Recent blog posts preview
 * - Newsletter subscription section
 * - Technology stack showcase
 * - Call-to-action footer
 * 
 * Enhanced with proper dark mode contrast and theme-aware styling
 * 
 * @returns Server Component rendering the homepage
 */
export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <HeroSection session={session} />

      {/* Features Section - Improved dark mode cards */}
      <FeaturesSection />

      {/* Topics We Cover Section - Enhanced contrast */}
      <TopicsSection />

      {/* Recent Posts Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-text">Latest from the Blog</h2>
            <p className="text-text/80 dark:text-text/90">
              Discover our most recent articles covering everything from Next.js best practices
              to the latest in web development trends.
            </p>
          </div>

          <RecentPostsSection />

          <div className="text-center mt-12">
            <CTA_Button text='View All Articles' linkTo='/blog'/>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase - Enhanced card contrast */}
      <TechnologyStackSection />

      {/* Call to Action Section - Enhanced CTA styling */}
      <CTA_Section session={session} />
    </div>
  );
}