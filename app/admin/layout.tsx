import Link from 'next/link';

/**
 * Admin Layout
 * Provides a consistent sidebar navigation for all admin pages.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4">
        <h1 className="text-2xl font-heading mb-8">Admin</h1>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</Link>
          <Link href="/admin/posts" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">Posts</Link>
          <Link href="/admin/categories" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">Categories</Link>
          <Link href="/admin/comments" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">Comments</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
