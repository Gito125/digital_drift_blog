import React from 'react'

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-16 text-center text-text">Why Digital Drift?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-5 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-lg font-medium shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-accent dark:text-accent/90 text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-text">Quality Content</h3>
              <p className="text-text/80 dark:text-text/90">
                Curated articles on the latest trends in web development, JavaScript frameworks,
                and digital innovation written by industry experts.
              </p>
            </div>

            <div className="p-5 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-lg font-medium shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
              <div className="text-accent dark:text-accent/90 text-4xl mb-4">💡</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-text">Innovation Focus</h3>
              <p className="text-text/80 dark:text-text/90">
                Stay ahead of the curve with insights on emerging technologies,
                frameworks, and methodologies in the digital space.
              </p>
            </div>

            <div className="p-5 bg-bg-light dark:bg-gray-800 text-gray-900 dark:text-text-dark border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 text-lg font-medium shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-accent/5 transition-all hover:border-accent/30 dark:hover:border-accent/40">
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
  )
}

export default FeaturesSection