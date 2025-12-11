import { Post } from "@/models/Post";
import Link from "next/link";

/**
 * Fetches all posts from the database, regardless of status.
 * This is an admin-only function.
 */
async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000&status=all`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await res.json();
  return data.posts;
}

/**
 * Admin Posts Page
 * Displays a table of all posts with management options.
 */
export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading">Posts</h1>
        <Link href="/admin/posts/new" className="px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90">
          New Post
        </Link>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text/80 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/posts/${post._id}/edit`} className="text-accent hover:underline mr-4">Edit</Link>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
