/**
 * Admin Dashboard Page
 * Displays an overview of site analytics.
 */
export default async function DashboardPage() {
  // In the future, we'll fetch and display real data here.
  const stats = {
    totalPosts: 0,
    totalComments: 0,
    totalViews: 0,
  };

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h2 className="text-4xl font-bold">{stats.totalPosts}</h2>
          <p className="text-text/80">Total Posts</p>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h2 className="text-4xl font-bold">{stats.totalComments}</h2>
          <p className="text-text/80">Total Comments</p>
        </div>
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <h2 className="text-4xl font-bold">{stats.totalViews}</h2>
          <p className="text-text/80">Total Views</p>
        </div>
      </div>
    </div>
  );
}
