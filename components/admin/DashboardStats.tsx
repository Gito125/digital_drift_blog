"use client";

import { useState, useEffect } from "react";

type Stat = {
  label: string;
  value: number;
  hint?: string;
};

interface DashboardStats {
  totalPosts: number;
  totalComments: number;
  totalApprovedComments: number;
  totalPendingComments: number;
  totalViews: number;
}

export default function DashboardStats() {
  const [mainStats, setMainStats] = useState<Stat[]>([]);
  const [commentStats, setCommentStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setError(null);
      const res = await fetch('/api/admin/stats');
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch stats');
      }
      
      const data: DashboardStats = await res.json();
      
      setMainStats([
        { label: "Total Posts", value: data.totalPosts },
        { label: "Total Comments", value: data.totalComments },
        { label: "Total Views", value: data.totalViews, hint: "All-time" },
      ]);
      
      setCommentStats([
        { label: "Approved Comments", value: data.totalApprovedComments },
        { label: "Pending Comments", value: data.totalPendingComments },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err instanceof Error ? err.message : "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch stats initially
    fetchStats();
    
    // Set up polling to refresh stats every 30 seconds
    const intervalId = setInterval(fetchStats, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      {/* MAIN STATS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainStats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-border bg-background p-6"
          >
            {/* subtle accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20" />

            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>

              <span className="text-4xl font-bold tracking-tight">
                {stat.value.toLocaleString()}
              </span>

              {stat.hint && (
                <span className="text-xs text-muted">
                  {stat.hint}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
      
      {/* COMMENT MODERATION STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {commentStats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-border bg-background p-6"
          >
            {/* subtle accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 to-primary/20" />

            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>

              <span className="text-4xl font-bold tracking-tight">
                {stat.value.toLocaleString()}
              </span>

              {stat.hint && (
                <span className="text-xs text-muted">
                  {stat.hint}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}