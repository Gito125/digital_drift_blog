import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { ObjectId } from "mongodb";

/**
 * GET /api/posts/slug/{slug}
 * Fetches a single published post by its slug and increments view count
 */
export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Post>('posts');

    const post = await collection.findOne({ slug: slug, status: 'published' });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment view count
    await collection.updateOne(
        { _id: new ObjectId(post._id) },
        { $inc: { viewCount: 1 } }
    );

    return NextResponse.json({ post });
  } catch (error) {
    console.error(`Failed to fetch post ${await context.params.then(p => p.slug)}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}