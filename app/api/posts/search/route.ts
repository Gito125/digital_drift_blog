import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { ObjectId } from "mongodb";

/**
 * GET /api/posts/search
 * Searches for published posts by title, content, excerpt, and tags.
 * 
 * Query params:
 * - q: string (search query)
 * - limit: number (optional, default 10, max 50)
 * 
 * Features:
 * - Full-text search using MongoDB text index
 * - Fallback to regex search if text index doesn't exist
 * - Relevance scoring
 * - Published posts only
 * - Returns minimal data for performance
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limitParam = searchParams.get("limit");
    
    // Validate query
    if (!query || query.trim().length === 0) {
      return NextResponse.json({ posts: [], query: "" });
    }

    // Sanitize and validate limit
    const limit = Math.min(
      parseInt(limitParam || "10", 10) || 10,
      50 // Max 50 results
    );

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>('posts');

    let posts: Array<Post & { _id: ObjectId; score?: number }> = [];

    try {
      // Try text search first (requires text index)
      posts = await collection.find(
        { 
          status: 'published',
          $text: { $search: query.trim() }
        },
        { 
          projection: { 
            title: 1, 
            slug: 1, 
            excerpt: 1,
            author: 1,
            publishedAt: 1,
            viewCount: 1,
            tags: 1,
            score: { $meta: "textScore" }
          } 
        }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(limit)
      .toArray();

    } catch (textSearchError) {
      // Fallback to regex search if text index doesn't exist
      console.warn("Text index not found, falling back to regex search. Create index with: db.posts.createIndex({ title: 'text', content: 'text', excerpt: 'text' })");
      
      const searchRegex = new RegExp(query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      
      posts = await collection.find(
        {
          status: 'published',
          $or: [
            { title: { $regex: searchRegex } },
            { excerpt: { $regex: searchRegex } },
            { content: { $regex: searchRegex } },
            { tags: { $regex: searchRegex } }
          ]
        },
        {
          projection: {
            title: 1,
            slug: 1,
            excerpt: 1,
            author: 1,
            publishedAt: 1,
            viewCount: 1,
            tags: 1
          }
        }
      )
      .limit(limit)
      .toArray();
    }

    // Transform _id to string for JSON serialization
    const formattedPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),
      publishedAt: post.publishedAt ? 
        (post.publishedAt instanceof Date ? post.publishedAt.toISOString() : post.publishedAt) 
        : null
    }));

    return NextResponse.json({ 
      posts: formattedPosts,
      query: query.trim(),
      count: formattedPosts.length,
      hasMore: formattedPosts.length === limit
    });

  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to search posts",
        message: error instanceof Error ? error.message : "Unknown error",
        posts: [],
        query: "",
        count: 0
      },
      { status: 500 }
    );
  }
}