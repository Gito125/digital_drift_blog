import { Post } from "@/models/Post";
import { notFound } from "next/navigation";
import { marked } from 'marked';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';

/**
 * Fetches a single post by slug from the API
 * @param slug The slug of the post to fetch
 * @returns {Promise<Post>}
 */
async function getPostBySlug(slug: string): Promise<Post> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch post');
  }
  const data = await res.json();
  return data.post;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  // Convert publishedAt to a Date object if it's a string
  const publishedAtDate = post.publishedAt ?
    typeof post.publishedAt === 'string' ? new Date(post.publishedAt) : post.publishedAt
    : null;

  return {
    title: `${post.title} | Digital Drift`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: publishedAtDate ? publishedAtDate.toISOString() : undefined,
      url: `/blog/${post.slug}`,
    },
  };
}

import CommentSection from "@/components/CommentSection";

import ShareButtons from "@/components/ShareButtons";

/**
 * Dynamic blog post page
 * Fetches post by slug and renders markdown content
 */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const session = await getServerSession(authOptions);

  const contentHtml = marked(post.content);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">{post.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-text/80 mt-2">
            <span>
              {post.publishedAt ?
                (typeof post.publishedAt === 'string' ?
                  new Date(post.publishedAt).toLocaleDateString() :
                  post.publishedAt.toLocaleDateString())
                : 'Not published'}
            </span>
            <span className="hidden sm:block mx-2">•</span>
            <span>{post.viewCount} views</span>
            <span className="hidden sm:block mx-2">•</span>
            <span className="mt-1 sm:mt-0">By {post.author}</span>
          </div>
        </div>

        <div className="prose prose-lg prose-headings:text-text prose-p:text-text prose-a:text-accent dark:prose-invert max-w-none">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 mb-6">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <CommentSection postId={post._id} />
        </div>
      </div>
    </div>
  );
}

/**
 * Generate static paths for all posts
 * This helps Next.js to pre-render all blog posts at build time
 */
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`);
  const { posts } = await res.json();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
