// api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/models/Post";

/**
 * GET /api/posts
 * Fetches a paginated list of published posts (or all for admins)
 * 
 * Query params:
 * - page: number (default: 1, min: 1)
 * - limit: number (default: 10, min: 1, max: 50 to prevent abuse)
 * - category: string (optional, filters posts with this category in array)
 * - tag: string (optional, filters posts with this tag in array)
 * - status: string (optional, 'all' for admins to fetch everything; specific status for admins)
 * 
 * Security: Non-admins always filter to 'published'. Admins can override.
 * Performance: Projects only essential fields (excludes content for list views).
 * Edge Cases: Handles invalid/NaN params gracefully; caps limit to avoid OOM.
 * Sorting: Uses publishedAt for published posts, createdAt otherwise for relevance.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawPage = searchParams.get("page") ?? "1";
    const rawLimit = searchParams.get("limit") ?? "10";
    const page = Math.max(1, Number.isInteger(parseInt(rawPage, 10)) ? parseInt(rawPage, 10) : 1);
    const limit = Math.min(50, Math.max(1, Number.isInteger(parseInt(rawLimit, 10)) ? parseInt(rawLimit, 10) : 10));
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const status = searchParams.get("status");

    const session = await getServerSession(authOptions);

    let query: any = { status: 'published' };
    if (session && session.user?.role === 'admin') {
      if (status === 'all') {
        query = {};
      } else if (status) {
        query.status = status; // Allow admins to filter by specific status
      }
    }

    if (category) {
      query.categories = { $elemMatch: { $eq: category } }; // Matches array elements
    }
    if (tag) {
      query.tags = { $elemMatch: { $eq: tag } }; // Matches array elements
    }

    const sortField = query.status === 'published' ? 'publishedAt' : 'createdAt';

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>('posts');

    const posts = await collection
      .find(query, { projection: { content: 0 } }) // Exclude heavy content field
      .sort({ [sortField]: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments(query);

    return NextResponse.json({ posts, total, page, limit });
  } catch (error: any) {
    console.error("Failed to fetch posts:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      url: request.url,
    });
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts
 * Creates a new blog post (admin only)
 * 
 * Body (JSON):
 * - title: string (required, max 200 chars)
 * - content: string (required)
 * - excerpt: string (optional; auto-generated if missing)
 * - slug: string (required, max 100 chars; auto-normalized to lowercase/dashes)
 * - status: string (required, e.g., 'draft' or 'published')
 * - tags: array<string> (optional)
 * - categories: array<string> (optional)
 * 
 * Security: Admin role required; throws 401 otherwise.
 * Validation: Checks required fields, lengths, array types, slug uniqueness.
 * Auto-Gen: Excerpt strips HTML/tags and truncates to 150 chars.
 * Edge Cases: Handles non-array tags/categories; sets publishedAt only if 'published'.
 * Normalization: Slug converted to SEO-friendly format.
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
    const { title, content, excerpt, status } = body;
    let { slug, tags, categories } = body;

    if (!title || !content || !slug || title.length > 200 || slug.length > 100) {
      return NextResponse.json({ error: "Invalid or missing required fields" }, { status: 400 });
    }

    // Normalize slug
    slug = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    // Ensure arrays
    tags = Array.isArray(tags) ? tags : [];
    categories = Array.isArray(categories) ? categories : [];

    // Auto-gen excerpt: Strip HTML and truncate
    const cleanExcerpt = excerpt || (content.replace(/<[^>]+>/g, '').substring(0, 150) + '...');

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
      excerpt: cleanExcerpt,
      author: session.user?.id ?? "", // Fallback to empty; consider throwing if missing
      publishedAt: status === 'published' ? new Date() : null,
      status,
      tags,
      categories,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('posts').insertOne(newPost);
    const post = { ...newPost, _id: result.insertedId };

    return NextResponse.json({ post }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create post:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}