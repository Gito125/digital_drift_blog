import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { ObjectId } from "mongodb";

/**
 * GET /api/posts
 * Fetches a paginated list of published posts
 * 
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 10)
 * - category: string (optional filter)
 * - tag: string (optional filter)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const status = searchParams.get("status");

    const session = await getServerSession(authOptions);

    let query: any = { status: 'published' };

    if (session && session.user?.role === 'admin' && status === 'all') {
      query = {}; // Admin can see all posts
    }

    if (category) {
      query.categories = category;
    }
    if (tag) {
      query.tags = tag;
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>('posts');

    const posts = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return NextResponse.json({ posts, total, page, limit });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Creates a new blog post (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, content, excerpt, slug, status, tags, categories } = body;

    if (!title || !content || !slug) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();

    // Check for slug uniqueness
    const existingPost = await db.collection('posts').findOne({ slug });
    if (existingPost) {
        return NextResponse.json({ error: "Slug must be unique" }, { status: 409 });
    }

    const newPost: Omit<Post, '_id'> = {
      title,
      slug,
      content,
      excerpt: excerpt || content.substring(0, 100),
      author: session.user?.id || "",
      publishedAt: status === 'published' ? new Date() : null,
      status,
      tags: tags || [],
      categories: categories || [],
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('posts').insertOne(newPost);
    const post = { ...newPost, _id: result.insertedId };

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Failed to create post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
