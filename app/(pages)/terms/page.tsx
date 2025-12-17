import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs";
import GridPatternOverlay from "@/components/ui/GridPatternOverlay";

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/terms'].title,
  description: seoData.metadata.pages['/terms'].description,
  keywords: seoData.metadata.pages['/terms'].keywords,
  alternates: {
    canonical: seoData.metadata.pages['/terms'].canonical
  }
};

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="relative py-8 lg:py-10 container mx-auto px-4 z-10">
        <AnimatedGradientOrbs />
        <GridPatternOverlay />
        <div className="relative max-w-4xl mx-auto bg-background/80 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-foreground/10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">1. Terms</h2>
            <p>
              By accessing the website at Digital Drift, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Digital Drift's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">3. Disclaimer</h2>
            <p>
              The materials on Digital Drift's website are provided on an 'as is' basis. Digital Drift makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">4. Limitations</h2>
            <p>
              In no event shall Digital Drift or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Digital Drift's website.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of our jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
