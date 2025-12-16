import React from 'react'

const TopicsSection = () => {
  return (
    <section className="py-20 bg-foreground/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4 text-foreground">Topics We Cover</h2>
            <p className="text-foreground/70">
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
                className="px-4 py-2 bg-background border border-foreground/10 rounded-full text-sm font-medium text-foreground hover:bg-accent hover:text-background hover:border-accent transition-all shadow-sm hover:shadow-md cursor-pointer"
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