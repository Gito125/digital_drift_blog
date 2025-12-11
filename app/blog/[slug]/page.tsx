import { Post } from "@/models/Post";
import { notFound } from "next/navigation";
import { marked } from 'marked';
import type { Metadata } from 'next';

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

  return {
    title: `${post.title} | Digital Drift`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
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

  const contentHtml = marked(post.content);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto">
        <h1 className="font-heading">{post.title}</h1>
        <div className="text-sm text-text/60 mb-8">
            <span>{new Date(post.publishedAt!).toLocaleDateString()}</span>
            <span className="mx-2">|</span>
            <span>{post.viewCount} views</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <div className="max-w-3xl mx-auto">
        <ShareButtons title={post.title} slug={post.slug} />
        <CommentSection postId={post._id} />
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
