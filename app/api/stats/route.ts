import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { Category } from "@/models/Category";
import { Comment } from "@/models/Comment";
import { Collection } from "mongodb";

/**
 * Helper function to format numbers for display (e.g., 12345 -> "12K+")
 * @param count The number to format
 * @returns Formatted string
 */
const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K+`;
  }
  return count.toString();
};

/**
 * GET /api/stats
 * Returns statistics for the blog including number of articles, comments, categories, etc.
 * Interacts directly with MongoDB for efficiency.
 */
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const postsCollection = db.collection<Post>('posts');
    const commentsCollection = db.collection<Comment>('comments');
    const categoriesCollection = db.collection<Category>('categories');

    // Fetch total number of published posts
    const totalPosts = await postsCollection.countDocuments({ status: 'published' });

    // Fetch total number of comments (approved or not, depending on requirement)
    // For public stats, usually total comments (approved) is shown
    const totalComments = await commentsCollection.countDocuments({ approved: true });

    // Fetch total number of categories
    const totalCategories = await categoriesCollection.countDocuments();

    // Calculate total word count and total views for published posts
    const publishedPosts = await postsCollection.find({ status: 'published' }).project({ content: 1, viewCount: 1 }).toArray();

    let totalWords = 0;
    let totalViews = 0;

    publishedPosts.forEach(post => {
      if (post.content) {
        totalWords += post.content.split(/\s+/).length;
      }
      totalViews += (post.viewCount || 0);
    });
    
    return NextResponse.json({
      articles: totalPosts,
      comments: totalComments,
      topics: totalCategories,
      wordsPublished: formatCount(totalWords),
      readers: formatCount(totalViews),
    });
  } catch (error) {
    console.error("Error in GET /api/stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
