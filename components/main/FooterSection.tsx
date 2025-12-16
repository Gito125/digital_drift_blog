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
          {/* SOCIAL LINKS */}
          <div className="flex gap-5">
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* X (x.com) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* WhatsApp Share */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                "Check out Digital Drift — Exploring the Digital Frontier https://digitaldrift.dev"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                <path d="M16.003 3C9.383 3 4 8.383 4 15.003c0 2.646.861 5.094 2.317 7.075L4 29l7.096-2.276A11.94 11.94 0 0 0 16.003 27C22.617 27 28 21.617 28 15.003 28 8.383 22.617 3 16.003 3zm0 21.67a9.92 9.92 0 0 1-4.85-1.27l-.347-.205-4.213 1.352 1.373-4.1-.226-.368a9.87 9.87 0 1 1 8.263 4.59zm5.45-7.39c-.298-.15-1.763-.87-2.036-.968-.273-.1-.472-.15-.67.15-.198.297-.77.968-.945 1.165-.174.2-.347.223-.645.074-.298-.15-1.257-.462-2.393-1.47-.885-.79-1.48-1.765-1.653-2.062-.174-.297-.018-.457.13-.605.133-.133.298-.347.447-.52.15-.174.2-.297.298-.496.1-.2.05-.372-.025-.522-.075-.15-.67-1.61-.918-2.206-.242-.582-.487-.503-.67-.512l-.572-.01c-.198 0-.522.074-.796.372-.273.297-1.044 1.02-1.044 2.49 0 1.47 1.07 2.89 1.22 3.09.15.198 2.107 3.216 5.1 4.51.712.307 1.267.49 1.7.63.714.227 1.364.195 1.878.118.572-.085 1.763-.72 2.01-1.413.248-.695.248-1.29.174-1.413-.075-.124-.273-.198-.572-.347z" />
              </svg>
            </a>
          </div>

          {/* COPYRIGHT */}
          <p className="text-foreground/60 text-sm order-first md:order-last">
            © {currentYear} Digital Drift. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default FooterSection