import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs";
import GridPatternOverlay from "@/components/ui/GridPatternOverlay";

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/privacy'].title,
  description: seoData.metadata.pages['/privacy'].description,
  keywords: seoData.metadata.pages['/privacy'].keywords,
  alternates: {
    canonical: seoData.metadata.pages['/privacy'].canonical
  }
};

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="relative py-8 lg:py-10 container mx-auto px-4 z-10">
        <AnimatedGradientOrbs />
        <GridPatternOverlay />
        <div className="relative max-w-4xl mx-auto bg-background/80 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-foreground/10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
            <p>
              Your privacy is important to us. It is Digital Drift's policy to respect your privacy regarding any information we may collect from you across our website.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
            <p>
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
            <p>
              We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. Cookies</h2>
            <p>
              We use cookies to improve your experience on our site. By using our site, you consent to our use of cookies.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Links to Other Sites</h2>
            <p>
              Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Your Consent</h2>
            <p>
              By using our site, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
