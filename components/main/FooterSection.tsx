import Link from 'next/link'
import React from 'react'
import AnimatedGradientOrbs from "@/components/ui/AnimatedGradientOrbs"
import GridPatternOverlay from "@/components/ui/GridPatternOverlay"
import PulsingBadge from "@/components/ui/PulsingBadge"

const FooterSection = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-background via-accent/5 to-background border-t border-foreground/10 overflow-hidden pt-20">
      <GridPatternOverlay />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Us */}
          <div className="col-span-2 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              Digital Drift
            </h3>
            <p className="text-foreground/70 max-w-md">
              A cutting-edge blog platform exploring the digital frontier. Powered by Next.js 16, React 19, and a passion for technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-foreground/70 hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-accent transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-foreground/70 hover:text-accent transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link href="/sitemap.xml" className="text-foreground/70 hover:text-accent transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors" aria-label="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <p className="text-foreground/60 text-sm order-first md:order-last">
            © {currentYear} Digital Drift. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection