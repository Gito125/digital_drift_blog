import React from 'react'

export const TechnologyStackSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-text">Built with Modern Tech</h2>
            <p className="text-text/80 dark:text-text/90">
              Digital Drift is powered by cutting-edge technologies for optimal performance and developer experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div className="px-6 py-4 bg-bg-light dark:bg-gray-800/70 text-text border border-gray-200 rounded-xl dark:border-gray-700/70 text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer">
              <div className="text-4xl mb-3">⚛️</div>
              <h4 className="font-semibold text-text mb-1">Next.js 16</h4>
              <p className="text-xs text-text/70 dark:text-text/80">React Framework</p>
            </div>
            <div className="px-6 py-4 bg-bg-light dark:bg-gray-800/70 text-text border border-gray-200 rounded-xl dark:border-gray-700/70 text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer">
              <div className="text-4xl mb-3">🔷</div>
              <h4 className="font-semibold text-text mb-1">TypeScript</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Type Safety</p>
            </div>
            <div className="px-6 py-4 bg-bg-light dark:bg-gray-800/70 text-text border border-gray-200 rounded-xl dark:border-gray-700/70 text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer">
              <div className="text-4xl mb-3">🍃</div>
              <h4 className="font-semibold text-text mb-1">MongoDB</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Database</p>
            </div>
            <div className="px-6 py-4 bg-bg-light dark:bg-gray-800/70 text-text border border-gray-200 rounded-xl dark:border-gray-700/70 text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-semibold text-text mb-1">Tailwind CSS</h4>
              <p className="text-xs text-text/70 dark:text-text/80">Styling</p>
            </div>
          </div>
        </div>
    </section>
  )
}
