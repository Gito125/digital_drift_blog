import { Session } from "next-auth"
import Link from "next/link"

interface HeroSectionProps {
  session: Session | null
}

const HeroSection = ({ session }: HeroSectionProps) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background via-background to-accent/10 dark:to-accent/5 overflow-hidden">
        {/* Decorative background elements - Enhanced for dark mode */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent dark:bg-accent/80 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent dark:bg-accent/80 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-text-light dark:text-text-dark">
            Exploring the Digital Frontier
          </h1>
          <p className="text-xl text-text/80 dark:text-text/90 max-w-2xl mx-auto mb-10">
            Digital Drift is a Next.js 16 blog platform where we explore cutting-edge technology,
            web development, and the ever-evolving digital landscape.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/blog"
              className="bg-accent px-8 py-3 bg text-text rounded-lg hover:opacity-90 transition-opacity text-lg font-medium shadow-md hover:shadow-lg"
            >
              Explore Blog
            </Link>
            {!session && (
              <Link
                href="/signup"
                className="px-8 py-3 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-lg font-medium shadow-sm"
              >
                Join Us
              </Link>
            )}
          </div>

          {/* Quick stats - Enhanced dark mode styling */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="px-8 py-3 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-lg font-medium shadow-sm">
              <div className="text-3xl font-bold text-accent dark:text-accent/90 mb-1">50+</div>
              <div className="text-sm text-text/70 dark:text-text/80">Articles Published</div>
            </div>
            <div className="px-8 py-3 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-lg font-medium shadow-sm">
              <div className="text-3xl font-bold text-accent dark:text-accent/90 mb-1">10K+</div>
              <div className="text-sm text-text/70 dark:text-text/80">Monthly Readers</div>
            </div>
            <div className="px-8 py-3 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-lg font-medium shadow-sm">
              <div className="text-3xl font-bold text-accent dark:text-accent/90 mb-1">15+</div>
              <div className="text-sm text-text/70 dark:text-text/80">Topics Covered</div>
            </div>
            <div className="px-8 py-3 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-lg font-medium shadow-sm">
              <div className="text-3xl font-bold text-accent dark:text-accent/90 mb-1">5+</div>
              <div className="text-sm text-text/70 dark:text-text/80">Contributors</div>
            </div>
          </div>
        </div>
    </section>
  )
}

export default HeroSection