import { Session } from "next-auth"
import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs"
import GridPatternOverlay from "@/components/ui/GridPatternOverlay"
import PulsingBadge from "@/components/ui/PulsingBadge"
import CTA_Button_Dark from "../ui/CTA_Button_Dark"
import CTA_Button_Light from "../ui/CTA_Button_Light"
import HeroStats from "../ui/HeroStats"

interface HeroSectionProps {
  session: Session | null
}

const HeroSection = ({ session }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-background overflow-hidden">
      {/* Animated gradient orbs */}
      <AnimatedGradientOrbs />

      {/* Grid pattern overlay */}
      <GridPatternOverlay />

      <div className="container mx-auto px-4 text-center relative z-10 py-10 md:py-20">
        {/* Badge */}
        <PulsingBadge text="Now Live: Next.js 16 Blog Platform" />

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Exploring the
          </span>
          <br />
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
            Digital Frontier
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          A cutting-edge blog platform powered by Next.js 16. Dive into the latest in 
          <span className="text-accent font-semibold"> web development</span>, 
          <span className="text-accent font-semibold"> AI</span>, and 
          <span className="text-accent font-semibold"> emerging technologies</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <CTA_Button_Dark text="Explore Blog" linkTo="/blog" />
          {!session && (
            <CTA_Button_Light text="Join Our Community" linkTo="/signup" />
          )}
        </div>

        {/* Dynamic Stats Section */}
        <HeroStats />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection