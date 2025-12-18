import { Post } from "@/models/Post";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import BlogSearch from "@/components/blog/BlogSearch";
import { Suspense } from "react";
import clientPromise from "@/lib/mongodb";
import { BlogListSkeleton } from "@/components/blog/BlogSkeletons";

// MetaData
import { Metadata } from 'next';
import seoData from '@/config/seo-metadata.json';

export const metadata: Metadata = {
  title: seoData.metadata.pages['/blog'].title,
  description: seoData.metadata.pages['/blog'].description,
  metadataBase: new URL('https://digital-drift-blog.vercel.app'),
  openGraph: {
    title: seoData.metadata.pages['/blog'].ogTitle,
    description: seoData.metadata.pages['/blog'].ogDescription,
    url: 'https://digital-drift-blog.vercel.app/blog',
    images: [
      {
        url: 'https://digital-drift-blog.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Drift Blog',
      }
    ],
  },
};

/**
 * Fetch published posts directly from MongoDB
 * @param page The page number to fetch
 */
async function getPosts(
  page: number = 1
): Promise<{ posts: Post[]; total: number; page: number; limit: number }> {
  const limit = 10;

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>("posts");

    const query = { status: "published" as const };

    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return { posts, total, page, limit };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Failed to fetch posts from DB:", err);
    throw new Error(`Failed to fetch posts from DB: ${err?.message ?? String(err)}`);
  }
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
        {posts.length > 0 ? (
          posts.map((post) => (
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
          ))
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground/5 rounded-full mb-4">
              <svg className="w-8 h-8 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-foreground/70 font-medium">No posts published yet</p>
            <p className="text-foreground/50 text-sm mt-2">Check back soon for new content!</p>
          </div>
        )}
      </div>

      {/* Pagination - only show if there are posts */}
      {posts.length > 0 && totalPages > 1 && (
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
      )}
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