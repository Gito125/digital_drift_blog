import { Session } from 'next-auth';
import Link from 'next/link';

interface CTA_Props {
    session: Session | null
}

const CTA_Section = ({session}: CTA_Props) => {
  return (
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
  )
}

export default CTA_Section