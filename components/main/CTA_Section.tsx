import { Session } from 'next-auth';
import Link from 'next/link';
import AnimatedGradientOrbs from '../ui/AnimatedGradientOrbs';
import GridPatternOverlay from '../ui/GridPatternOverlay';
import PulsingBadge from '../ui/PulsingBadge';
import CTA_Button_Light from '../ui/CTA_Button_Light';
import CTA_Button_Dark from '../ui/CTA_Button_Dark';

interface CTA_Props {
    session: Session | null
}

const CTA_Section = ({session}: CTA_Props) => {
  return (
    <>
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-accent/5 to-background overflow-hidden">
      {/* Animated gradient orbs */}
      <AnimatedGradientOrbs />

      {/* Grid pattern overlay */}
      <GridPatternOverlay />

      <div className="container mx-auto px-4 text-center relative z-10 py-20">
        {/* Badge */}
        <PulsingBadge text="Join Our Community" />

        {/* Heading and Description */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Ready to Start
          </span>
          <br />
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
            Your Journey?
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-12 leading-relaxed">
          Join our community of developers and tech enthusiasts.
          <span className="text-accent font-semibold"> Share your knowledge</span>, 
          <span className="text-accent font-semibold"> learn from others,</span> and stay updated
          <span className="text-accent font-semibold"> with the latest in technology</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <CTA_Button_Dark text="Get Started" linkTo="/signup" />
          {!session && (
          <CTA_Button_Light text="Login" linkTo="/login" />
          )}
        </div>
      </div>
    </section>
  </>
  )
}

export default CTA_Section;