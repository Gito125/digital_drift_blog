import React from 'react'

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-16 text-center text-foreground">Why Digital Drift?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-lg hover:border-accent/50 hover:shadow-xl transition-all group">
              <div className="text-accent text-4xl mb-4 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">Quality Content</h3>
              <p className="text-foreground/70">
                Curated articles on the latest trends in web development, JavaScript frameworks,
                and digital innovation written by industry experts.
              </p>
            </div>

            <div className="p-6 bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-lg hover:border-accent/50 hover:shadow-xl transition-all group">
              <div className="text-accent text-4xl mb-4 group-hover:scale-110 transition-transform">💡</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">Innovation Focus</h3>
              <p className="text-foreground/70">
                Stay ahead of the curve with insights on emerging technologies,
                frameworks, and methodologies in the digital space.
              </p>
            </div>

            <div className="p-6 bg-background/50 backdrop-blur-sm border border-foreground/10 rounded-lg hover:border-accent/50 hover:shadow-xl transition-all group">
              <div className="text-accent text-4xl mb-4 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-foreground">Community Driven</h3>
              <p className="text-foreground/70">
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