'use client';

import { useState, useEffect } from 'react';

interface Stat {
  num: string;
  label: string;
  icon: string;
}

const HeroStats = () => {
  const [stats, setStats] = useState<Stat[]>([
    { num: "24", label: "Articles", icon: "📝" },
    { num: "6", label: "Topics", icon: "🎯" },
    { num: "38", label: "Comments", icon: "💬" },
    { num: "42K+", label: "Words Published", icon: "📚" },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/stats`, { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }

        const data = await response.json();

        setStats([
          { num: data.articles.toString(), label: "Articles", icon: "📝" },
          { num: data.readers, label: "Readers", icon: "👥" },
          { num: data.topics.toString(), label: "Topics", icon: "🎯" },
          { num: data.comments.toString(), label: "Comments", icon: "💬" },
          { num: data.wordsPublished, label: "Words Published", icon: "📚" },
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError(err instanceof Error ? err.message : "An error occurred while fetching stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="group p-6 bg-background/60 backdrop-blur-md border border-foreground/10 rounded-2xl animate-pulse"
          >
            <div className="h-8 w-8 mb-2 bg-foreground/10 rounded-lg mx-auto"></div>
            <div className="h-8 bg-foreground/20 rounded w-3/4 mb-2 mx-auto"></div>
            <div className="h-4 bg-foreground/10 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mb-16">
        <p className="text-red-500">Error loading stats.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group p-6 bg-background/60 backdrop-blur-md border border-foreground/10 rounded-2xl hover:border-accent/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 text-center"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
          <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.num}</div>
          <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
