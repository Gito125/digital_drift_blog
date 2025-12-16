import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * PUT /api/comments/{id}
 * Updates a comment's approval status (admin only)
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }

    const body = await request.json();
    const { approved } = body;

    if (typeof approved !== 'boolean') {
        return NextResponse.json({ error: "Invalid 'approved' status" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('comments').updateOne(
      { _id: new ObjectId(id) },
      { $set: { approved } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(`Failed to update comment ${await (await params).id}:`, error);
    return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
  }
}

/**
 * DELETE /api/comments/{id}
 * Deletes a comment (admin only)
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('comments').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(`Failed to delete comment ${await (await params).id}:`, error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
