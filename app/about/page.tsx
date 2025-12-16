import FooterSection from "@/components/main/FooterSection";
import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs";
import GridPatternOverlay from "@/components/ui/GridPatternOverlay";

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
              Digital Drift is a forward-thinking blog platform dedicated to exploring the vast and ever-evolving digital landscape. 
              Our mission is to provide high-quality, in-depth content for developers, tech enthusiasts, and lifelong learners.
            </p>
            <p>
              Powered by the latest web technologies including Next.js 16, React 19, and TailwindCSS 4, this platform itself is a testament to what modern web development can achieve. We believe in building performant, accessible, and beautiful user experiences.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">Our Vision</h2>
            <p>
              We envision a community where knowledge is shared freely and collaboratively. Digital Drift aims to be more than just a blog; it's a hub for discussion, a place to discover new ideas, and a resource to help you stay ahead in the fast-paced world of technology.
            </p>
            <p>
              Whether you're interested in the intricacies of front-end frameworks, the power of back-end architecture, the potential of AI, or the principles of great design, you'll find a home here.
            </p>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default AboutPage;
