import { Post } from "@/models/Post";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import { Metadata } from "next";
import BlogSearch from "@/components/blog/BlogSearch";
import { Suspense } from "react";
import clientPromise from "@/lib/mongodb"; // Add this import

export const metadata: Metadata = {
  title: "Blog - The Latest from Digital Drift",
  description:
    "Explore the latest articles, tutorials, and insights from Digital Drift. Stay updated on web development, tech trends, and our journey into the digital frontier.",
};

/**
 * Fetch published posts directly from MongoDB
 * @param page The page number to fetch
 */
async function getPosts(
  page: number = 1
): Promise<{ posts: Post[]; total: number; page: number; limit: number }> {
  const limit = 10; // Hardcode to match API default

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>("posts");

    const query = { status: "published" };

    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return { posts, total, page, limit };
  } catch (err: any) {
    throw new Error(`Failed to fetch posts from DB: ${err?.message ?? String(err)}`);
  }
}

/**
 * Skeleton component for blog list loading state
 */
function BlogListSkeleton() {
  return (
    <>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="group p-6 bg-background/60 backdrop-blur-md border border-foreground/10 rounded-xl animate-pulse"
          >
            <div className="h-8 bg-foreground/20 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-foreground/10 rounded w-2/3 mb-4"></div>
            <div className="flex items-center gap-4">
              <div className="h-4 bg-foreground/10 rounded w-24"></div>
              <div className="h-4 bg-foreground/10 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center items-center mt-12 gap-4">
        <div className="h-10 bg-foreground/10 rounded-lg w-24"></div>
        <div className="h-10 bg-foreground/10 rounded w-32"></div>
        <div className="h-10 bg-foreground/10 rounded-lg w-24"></div>
      </div>
    </>
  );
}

/**
 * Blog list content component
 */
async function BlogList({ page }: { page: number }) {
  const { posts, total, limit } = await getPosts(page);

  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return (
    <>
      <div className="grid gap-8 max-w-4xl mx-auto">
        {posts.map((post) => (
          <article
            key={post._id.toString()}
            className="group bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-xl p-6 hover:border-accent/50 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl font-heading font-semibold mb-3">
              <Link
                href={`/blog/${post.slug}`}
                className="text-foreground group-hover:text-accent transition-colors duration-200"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-foreground/70 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-foreground/50">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.publishedAt
                  ? typeof post.publishedAt === "string"
                    ? new Date(post.publishedAt).toLocaleDateString()
                    : post.publishedAt.toLocaleDateString()
                  : "Not published"}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {formatNumber(post.viewCount)}
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-4">
        {page > 1 && (
          <Link
            href={`/blog?page=${page - 1}`}
            className="px-6 py-3 bg-background border border-foreground/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all text-foreground font-medium"
          >
            ← Previous
          </Link>
        )}
        <span className="px-4 py-3 text-foreground/70 font-medium">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/blog?page=${page + 1}`}
            className="px-6 py-3 bg-background border border-foreground/20 rounded-lg hover:border-accent/50 hover:shadow-md transition-all text-foreground font-medium"
          >
            Next →
          </Link>
        )}
      </div>
    </>
  );
}

/**
 * Blog list page
 * Displays a paginated list of published posts
 */
export default async function BlogPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await props.searchParams;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-accent/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="mb-12 text-center relative">
          <h1 className="text-5xl py-1.5 font-heading font-bold bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Explore insights, tutorials, and stories from the digital frontier
          </p>
          <div className="absolute top-0 right-0">
            <BlogSearch />
          </div>
        </div>

        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList page={page} />
        </Suspense>
      </div>
    </div>
  );
}