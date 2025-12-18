// app/blog/[slug]/page.tsx
import { Post } from "@/models/Post";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";
import { formatNumber } from "@/lib/utils";
import Markdown from "@/components/md/Markdown";
import clientPromise from "@/lib/mongodb";
import { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogPostSkeleton } from "@/components/blog/BlogSkeletons";

/**
 * Fetch a post by slug directly from MongoDB.
 * No fetch—direct DB for build/runtime consistency. Filters to published only.
 */
async function getPostBySlug(slug: string): Promise<Post> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<Post>("posts");

  const post = await collection.findOne({ slug, status: "published" });

  if (!post) {
    notFound();
  }

  return post;
}

type Props = {
  params: Promise<{ slug: string }>
}

/**
 * Generate metadata for this blog post page.
 * Works ahead of rendering so social previews and titles are correct.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  return {
    title: `${post.title} | Digital Drift`,
    description: post.excerpt,
    metadataBase: new URL('https://digital-drift-blog.vercel.app'),
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://digital-drift-blog.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: 'https://digital-drift-blog.vercel.app/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      ...(post.publishedAt ? { publishedTime: post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt } : {}),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: 'https://digital-drift-blog.vercel.app/og-image.png',
    },
  };
}

/**
 * Blog Post Content Component
 * Separated to enable Suspense boundary
 */
async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug);
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* Article Card */}
      <article className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-foreground/10 p-6 md:p-10 mb-8 transition-all duration-300 hover:shadow-accent/10">
        {/* Header area */}
        <div className="mb-8 pb-6 border-b border-foreground/10">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
            {/* Published date */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {post.publishedAt
                  ? (
                      typeof post.publishedAt === "string"
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                        : post.publishedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    )
                  : "Not published"}
              </span>
            </div>

            <span className="text-foreground/30">•</span>

            {/* Views */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatNumber(post.viewCount ?? 0)} views</span>
            </div>

            <span className="text-foreground/30">•</span>

            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-accent">
                  {typeof post.author === "string" && post.author.length ? post.author.charAt(0).toUpperCase() : "A"}
                </span>
              </div>
              <span className="font-medium text-foreground/80">{typeof post.author === "string" ? post.author : "Author"}</span>
            </div>
          </div>
        </div>

        {/* Markdown content (server-side rendering via Markdown component) */}
        <div className="prose prose-lg prose-lg prose-headings:text-foreground prose-headings:font-heading prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-accent hover:prose-a:underline prose-strong:text-foreground prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10 prose-blockquote:border-l-accent prose-blockquote:text-foreground/70 prose-img:rounded-xl prose-img:shadow-lg dark:prose-invert max-w-none">
          <Markdown content={post.content} />
        </div>
      </article>

      {/* Share + Comments Card */}
      <div className="bg-background/80 backdrop-blur-xl rounded-2xl shadow-xl border border-foreground/10 p-6 md:p-8">
        {/* Share */}
        <div className="mb-8">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share this article
          </h3>

          <div className="flex flex-wrap gap-3">
            <ShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>

        {/* Comments */}
        <div className="border-t border-foreground/10 pt-8">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-6 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Comments
          </h3>

          <CommentSection postId={post._id.toString()} />
        </div>
      </div>
    </>
  );
}

/**
 * Blog Post page (Server Component)
 * - Renders hero-style background + responsive article card
 * - Uses Markdown component (server-side) to render the markdown body
 * - Renders share buttons and comment section
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      {/* Floating gradient orbs to match hero/CTA visual language */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-accent/40 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-accent/30 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Grid overlay (subtle texture) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none"
        aria-hidden
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl relative z-10">
        <Suspense fallback={<BlogPostSkeleton />}>
          <BlogPostContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * generateStaticParams
 * - Prepares static params for all published posts so Next.js can prerender pages at build time.
 * - Direct DB query—no fetch, works at build time. Fetch all (or limit if massive blog).
 */
export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>("posts");

    const posts = await collection
      .find({ status: "published" }, { projection: { slug: 1 } })
      .limit(1000)
      .toArray();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}