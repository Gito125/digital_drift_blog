import React from 'react'

const TopicsSection = () => {
  return (
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
                className="px-4 py-2 bg-bg-light dark:bg-gray-800/70 text-text border border-gray-200 dark:border-gray-700/70 rounded-full text-sm font-medium hover:bg-accent hover:text-white hover:border-accent dark:hover:bg-accent dark:hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
    </section>
  )
}

export default TopicsSection