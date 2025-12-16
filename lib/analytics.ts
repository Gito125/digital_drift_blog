/**
 * Analytics utilities for retrieving platform statistics
 * Provides functions to fetch aggregated data from MongoDB collections
 */

import clientPromise from "./mongodb";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";

/**
 * Retrieves platform statistics including total posts, comments and views
 *
 * @returns Object containing total counts for posts, comments, and views
 * @throws Error if database connection fails
 */
export async function getPlatformStats(): Promise<{
  totalPosts: number;
  totalComments: number;
  totalApprovedComments: number;
  totalPendingComments: number;
  totalViews: number;
}> {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Count total posts (published only)
    const totalPosts = await db.collection<Post>('posts').countDocuments({ status: 'published' });

    // Count total comments (both approved and pending)
    const totalComments = await db.collection<Comment>('comments').countDocuments({});
    const totalApprovedComments = await db.collection<Comment>('comments').countDocuments({ approved: true });
    const totalPendingComments = await db.collection<Comment>('comments').countDocuments({ approved: false });

    // Calculate total views across all posts
    const result = await db.collection<Post>('posts').aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, totalViews: { $sum: '$viewCount' } } }
    ]).toArray();

    const totalViews = result.length > 0 ? result[0].totalViews || 0 : 0;

    return {
      totalPosts,
      totalComments,
      totalApprovedComments,
      totalPendingComments,
      totalViews
    };
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    throw new Error("Failed to fetch platform statistics");
  }
}

/**
 * Retrieves additional platform metrics
 * 
 * @returns Object containing extended metrics like draft posts, pending comments, etc.
 * @throws Error if database connection fails
 */
export async function getExtendedPlatformMetrics(): Promise<{
  draftPosts: number;
  pendingComments: number;
  authors: number;
}> {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Count draft posts
    const draftPosts = await db.collection<Post>('posts').countDocuments({ status: 'draft' });

    // Count pending comments (not approved)
    const pendingComments = await db.collection<Comment>('comments').countDocuments({ approved: false });

    // Count total authors (unique authors)
    const authorsResult = await db.collection<Post>('posts').distinct('author');
    const authors = authorsResult.length;

    return {
      draftPosts,
      pendingComments,
      authors
    };
  } catch (error) {
    console.error("Error fetching extended platform metrics:", error);
    throw new Error("Failed to fetch extended platform metrics");
  }
}

/**
 * Retrieves top performing posts based on view count
 * 
 * @param limit Number of top posts to return (default: 5)
 * @returns Array of top posts with their titles and view counts
 * @throws Error if database connection fails
 */
export async function getTopPosts(limit: number = 5): Promise<Array<{
  title: string;
  slug: string;
  viewCount: number;
}>> {
  try {
    const client = await clientPromise;
    const db = client.db();

    const topPosts = await db.collection<Post>('posts').find(
      { status: 'published' },
      { projection: { title: 1, slug: 1, viewCount: 1 } }
    )
      .sort({ viewCount: -1 })
      .limit(limit)
      .toArray();

    return topPosts.map(post => ({
      title: post.title,
      slug: post.slug,
      viewCount: post.viewCount || 0
    }));
  } catch (error) {
    console.error("Error fetching top posts:", error);
    throw new Error("Failed to fetch top posts");
  }
}