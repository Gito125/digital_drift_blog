import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { ObjectId } from "mongodb";

/**
 * GET /api/comments
 * Fetches all approved comments for a given post
 * 
 * Query params:
 * - postId: string (required)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const filter = searchParams.get("filter");

    const session = await getServerSession(authOptions);
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Comment>('comments');
    
    let query: any = {};

    // @ts-ignore
    if (session?.user?.role === 'admin' && filter === 'all') {
      // Admin can fetch all comments
      query = { postId: postId };
    } else if (session?.user?.id) {
      // Authenticated users can see their own comments and approved comments
      if (!postId || !ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
      }
      query = {
        postId: postId,
        $or: [
          { approved: true },
          { userId: session.user.id }
        ]
      };
    } else {
      // Non-authenticated users can only see approved comments
      if (!postId || !ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
      }
      query = { postId: postId, approved: true };
    }

    const comments = await collection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

/**
 * POST /api/comments
 * Creates a new comment (authenticated users only)
 * Comments are unapproved by default
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { postId, content } = body;

    if (!postId || !content || !ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db();

    const newComment: Omit<Comment, '_id'> = {
      postId,
      userId: session.user?.id || "",
      content,
      createdAt: new Date(),
      approved: false, // Default to unapproved
    };

    const result = await db.collection('comments').insertOne(newComment);
    const comment = { ...newComment, _id: result.insertedId };

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
