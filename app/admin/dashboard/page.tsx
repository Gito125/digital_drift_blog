/**
 * Admin Dashboard Page
 * High-level overview of platform activity.
 */

import { getPlatformStats } from "@/lib/analytics";

type Stat = {
  label: string;
  value: number;
  hint?: string;
};

export default async function DashboardPage() {
  let mainStats: Stat[] = [];
  let commentStats: Stat[] = [];
  let errorMessage: string | null = null;

  try {
    // Fetch real analytics from the database
    const { totalPosts, totalComments, totalApprovedComments, totalPendingComments, totalViews } = await getPlatformStats();

    mainStats = [
      { label: "Total Posts", value: totalPosts },
      { label: "Total Comments", value: totalComments },
      { label: "Total Views", value: totalViews, hint: "All-time" },
    ];

    commentStats = [
      { label: "Approved Comments", value: totalApprovedComments },
      { label: "Pending Comments", value: totalPendingComments },
    ];
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    errorMessage = "Failed to load statistics. Please try again later.";

    // Set default values in case of error
    mainStats = [
      { label: "Total Posts", value: 0 },
      { label: "Total Comments", value: 0 },
      { label: "Total Views", value: 0, hint: "All-time" },
    ];

    commentStats = [
      { label: "Approved Comments", value: 0 },
      { label: "Pending Comments", value: 0 },
    ];
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-heading">Dashboard</h1>
        <p className="text-muted mt-1">
          Overview of platform activity and content health
        </p>
      </header>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

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

      {/* FUTURE SECTIONS PLACEHOLDER */}
      <section className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted">
        Analytics charts, traffic sources, and growth trends will appear here.
      </section>
    </div>
  );
}
