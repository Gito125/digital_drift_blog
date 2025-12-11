import { Post } from "@/models/Post";
import clientPromise from "./mongodb";

/**
 * Fetches all published posts for sitemap generation and other public-facing lists.
 */
export async function getAllPublishedPosts(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection<Post>('posts')
    .find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .toArray();

  return posts;
}
