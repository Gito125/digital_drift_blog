import { MetadataRoute } from 'next';
import { Post } from '@/models/Post';
import clientPromise from '@/lib/mongodb';

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/**
 * Fetches all published posts for sitemap generation.
 */
async function getAllPublishedPosts(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection<Post>('posts')
    .find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .toArray();

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...postEntries,
  ];
}
