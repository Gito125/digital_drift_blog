import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Comment } from "@/models/Comment";
import { User } from "@/models/User";
import { ObjectId } from "mongodb";

/**
 * GET /api/comments
 * Fetches comments - either all comments (for admin) or comments for a specific post
 *
 * Query params:
 * - postId: string (required for non-admins, optional for admin)
 * - filter: string ("all", optional - admin only)
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
      // Admin can fetch all comments (no postId required for this case)
      query = {};
    } else if (session?.user?.id) {
      // Authenticated users can see their own comments and approved comments for a specific post
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
      // Non-authenticated users can only see approved comments for a specific post
      if (!postId || !ObjectId.isValid(postId)) {
        return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
      }
      query = { postId: postId, approved: true };
    }

    const comments = await collection.find(query).sort({ createdAt: -1 }).toArray();

    // If there are comments, fetch user information for display
    if (comments.length > 0) {
      const client = await clientPromise;
      const db = client.db();

      // Extract unique user IDs from the comments
      const userIds = [...new Set(comments.map(comment => comment.userId))].filter(id => id);

      if (userIds.length > 0) {
        // Fetch user details to get names
        const users = await db.collection<User>('users').find(
          { _id: { $in: userIds.map(id => new ObjectId(id)) } },
          { projection: { name: 1, email: 1 } }
        ).toArray();

        // Create a map of user IDs to names
        const userMap: Record<string, { name?: string, email?: string }> = {};
        users.forEach(user => {
          if (user._id) {
            const idStr = user._id.toString();
            userMap[idStr] = { name: user.name, email: user.email };
          }
        });

        // Attach user names to comments
        const commentsWithUsers = comments.map(comment => {
          const user = userMap[comment.userId] || {};
          const userName = user.name || user.email?.split('@')[0] || `User ${comment.userId?.substring(0, 6)}`;
          return {
            ...comment,
            userName: userName
          };
        });

        return NextResponse.json({ comments: commentsWithUsers });
      }
    }

    // If there are no comments or no userIds to enhance, return as-is
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
