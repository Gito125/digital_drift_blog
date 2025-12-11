import { Post } from "@/models/Post";
import Link from "next/link";

/**
 * Fetches published posts from the API
 * @param page The page number to fetch
 * @returns {Promise<{posts: Post[], total: number}>}
 */
async function getPosts(page: number = 1): Promise<{ posts: Post[], total: number, page: number, limit: number }> {
  // This fetch call would be to our own API, but for simplicity in a server component,
  // we can directly access the database logic. However, calling the API is a good practice
  // for consistency and reusability. Let's call the API.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${page}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

/**
 * Blog list page
 * Displays a paginated list of published posts
 */
export default async function BlogPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, total, limit } = await getPosts(page);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading mb-8">Blog</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <article key={post._id} className="border-b pb-4">
            <h2 className="text-2xl font-heading mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                {post.title}
              </Link>
            </h2>
            <p className="text-text/80 mb-2">
              {post.excerpt}
            </p>
            <div className="text-sm text-text/60">
              <span>{new Date(post.publishedAt!).toLocaleDateString()}</span>
              <span className="mx-2">|</span>
              <span>{post.viewCount} views</span>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8">
        {page > 1 && (
          <Link href={`/blog?page=${page - 1}`} className="px-4 py-2 border rounded-md hover:bg-text/10">
            Previous
          </Link>
        )}
        <span className="mx-4">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link href={`/blog?page=${page + 1}`} className="px-4 py-2 border rounded-md hover:bg-text/10">
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
