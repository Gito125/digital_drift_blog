import { Session } from "next-auth"
import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs"
import GridPatternOverlay from "@/components/ui/GridPatternOverlay"
import PulsingBadge from "@/components/ui/PulsingBadge"
import CTA_Button_Dark from "../ui/CTA_Button_Dark"
import CTA_Button_Light from "../ui/CTA_Button_Light"

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

        {/* Stats - Redesigned */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            { num: "50+", label: "Articles", icon: "📝" },
            { num: "10K+", label: "Readers", icon: "👥" },
            { num: "15+", label: "Topics", icon: "🎯" },
            { num: "5+", label: "Contributors", icon: "✨" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group p-6 bg-background/60 backdrop-blur-md border border-foreground/10 rounded-2xl hover:border-accent/50 hover:bg-background/80 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.num}</div>
              <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

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