import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * GET /api/comments
 * Admin-only paginated fetch
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("comments");

    const [comments, total] = await Promise.all([
      collection
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(),
    ]);

    return NextResponse.json({ comments, total });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/comments
 * Auto-published comment
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { postId, content } = await request.json();

    if (!postId || !content || !ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const comment = {
      postId,
      userId: session.user.id,
      content,
      createdAt: new Date(),
    };

    await db.collection("comments").insertOne(comment);

    return NextResponse.json({ comment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
