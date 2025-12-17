import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs";
import GridPatternOverlay from "@/components/ui/GridPatternOverlay";

// Metadata
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/about'].title,
  description: seoData.metadata.pages['/about'].description,
  keywords: seoData.metadata.pages['/about'].keywords,
  openGraph: {
    title: seoData.metadata.pages['/about'].ogTitle,
    description: seoData.metadata.pages['/about'].ogDescription,
  },
  alternates: {
    canonical: seoData.metadata.pages['/about'].canonical
  }
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="relative py-20 lg:py-40 container mx-auto px-4 z-10">
        <AnimatedGradientOrbs />
        <GridPatternOverlay />
        <div className="relative max-w-4xl mx-auto bg-background/80 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-foreground/10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            About Digital Drift
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
            <p>
              <strong>Digital Drift</strong> is a forward-thinking blog platform dedicated to exploring the vast and ever-evolving digital landscape. 
              It exists for developers, engineers, and curious minds who want more than surface-level explanations—people who value depth, clarity, and real understanding.
            </p>

            <p>
              Built with modern web technologies such as <strong>Next.js 16</strong>, <strong>React 19</strong>, and <strong>Tailwind CSS 4</strong>, the platform itself is a living example of the ideas it discusses. 
              Performance, accessibility, and thoughtful design are not afterthoughts here—they are core principles.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Our Mission</h2>

            <p>
              Our mission is simple: <strong>turn complexity into clarity</strong>.
              Digital Drift focuses on breaking down modern technology—software architecture, web systems, AI, and engineering concepts—into insights that are practical, honest, and grounded in real-world use.
            </p>

            <p>
              We aim to help readers not just consume information, but <em>build intuition</em>. 
              Every article is written to sharpen thinking, encourage experimentation, and support long-term technical growth.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Our Vision</h2>

            <p>
              We envision a community where knowledge is shared openly and curiosity is rewarded. 
              Digital Drift strives to be more than a blog—it’s a space for discussion, reflection, and continuous improvement in a fast-moving tech world.
            </p>

            <p>
              Whether you're diving into front-end systems, back-end architecture, AI-driven tools, or the philosophy of good engineering, 
              Digital Drift is built to evolve with you.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AboutPage;
