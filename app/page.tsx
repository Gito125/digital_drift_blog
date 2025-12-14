import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import RecentPostsSection from '@/components/RecentPostsSection';
import HeroSection from '@/components/main/HeroSection';

/**
 * Digital Drift Home Page Component
 * 
 * Main landing page featuring:
 * - Hero section with CTA buttons
 * - Feature highlights showcasing platform benefits
 * - Recent blog posts preview
 * - Newsletter subscription section
 * - Technology stack showcase
 * - Call-to-action footer
 * 
 * Enhanced with proper dark mode contrast and theme-aware styling
 * 
 * @returns Server Component rendering the homepage
 */
export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <HeroSection session={session} />

      {/* Features Section - Improved dark mode cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-16 text-center text-text">Why Digital Drift?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/70 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-accent dark:text-accent/90 text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-text">Quality Content</h3>
              <p className="text-text/80 dark:text-text/90">
                Curated articles on the latest trends in web development, JavaScript frameworks,
                and digital innovation written by industry experts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/70 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-accent dark:text-accent/90 text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-text">Innovation Focus</h3>
              <p className="text-text/80 dark:text-text/90">
                Stay ahead of the curve with insights on emerging technologies,
                frameworks, and methodologies in the digital space.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800/80 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700/70 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-accent dark:text-accent/90 text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-text">Community Driven</h3>
              <p className="text-text/80 dark:text-text/90">
                Join a vibrant community of developers and tech enthusiasts.
                Share knowledge, ask questions, and connect with like-minded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics We Cover Section - Enhanced contrast */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-text">Topics We Cover</h2>
            <p className="text-text/80 dark:text-text/90">
              Explore a wide range of technology topics curated for developers and tech enthusiasts
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 
              'AI & Machine Learning', 'Web Performance', 'DevOps', 
              'UI/UX Design', 'API Development', 'Cloud Computing',
              'Cybersecurity', 'Mobile Development', 'Web3', 'Testing'
            ].map((topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-white dark:bg-gray-800/70 text-text border border-gray-200 dark:border-gray-700/70 rounded-full text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold mb-4 text-text">Latest from the Blog</h2>
            <p className="text-text/80 dark:text-text/90">
              Discover our most recent articles covering everything from Next.js best practices
              to the latest in web development trends.
            </p>
          </div>

          <RecentPostsSection />

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 bg-white dark:bg-gray-800/80 text-text border border-gray-300 dark:border-gray-600/70 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors font-medium shadow-sm hover:shadow-md"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase - Enhanced card contrast */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-text">Built with Modern Tech</h2>
            <p className="text-text/80 dark:text-text/90">
              Digital Drift is powered by cutting-edge technologies for optimal performance and developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800/70 p-6 rounded-lg border border-gray-200 dark:border-gray-700/70 text-center hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-4xl mb-3">⚛️</div>
              <h4 className="font-semibold text-text mb-1">Next.js 16</h4>
              <p className="text-xs text-text/70 dark:text-text/80">React Framework</p>
            </div>
            <div className="bg-white dark:bg-gray-800/70 p-6 rounded-lg border border-gray-200 dark:border-gray-700/70 text-center hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-4xl mb-3">🔷</div>
              <h4 className="font-semibold text-text mb-1">TypeScript</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Type Safety</p>
            </div>
            <div className="bg-white dark:bg-gray-800/70 p-6 rounded-lg border border-gray-200 dark:border-gray-700/70 text-center hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-4xl mb-3">🍃</div>
              <h4 className="font-semibold text-text mb-1">MongoDB</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Database</p>
            </div>
            <div className="bg-white dark:bg-gray-800/70 p-6 rounded-lg border border-gray-200 dark:border-gray-700/70 text-center hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-semibold text-text mb-1">Tailwind CSS</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Styling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Enhanced CTA styling */}
      <section className="py-20 bg-accent dark:bg-accent/95 text-white relative overflow-hidden">
        {/* Decorative elements for depth */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto mb-8 text-lg">
            Join our community of developers and tech enthusiasts. Share your knowledge, 
            learn from others, and stay updated with the latest in technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!session ? (
              <>
                <Link
                  href="/signup"
                  className="px-8 py-3 bg-white dark:bg-white text-accent rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
                >
                  Create Account
                </Link>
                <Link
                  href="/blog"
                  className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white hover:text-accent transition-all text-lg font-medium shadow-md hover:shadow-lg"
                >
                  Browse Articles
                </Link>
              </>
            ) : (
              <Link
                href="/blog"
                className="px-8 py-3 bg-white dark:bg-white text-accent rounded-lg hover:bg-gray-50 dark:hover:bg-gray-100 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Continue Reading
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}