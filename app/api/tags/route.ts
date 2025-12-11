import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Tag } from "@/models/Tag";

/**
 * GET /api/tags
 * Fetches all tags
 */
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const tags = await db.collection<Tag>('tags').find().sort({ name: 1 }).toArray();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}

/**
 * POST /api/tags
 * Creates a new tag (admin only)
 * TODO: Add PUT and DELETE for full CRUD
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
        return NextResponse.json({ error: "Missing required fields: name and slug" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const existingTag = await db.collection('tags').findOne({ slug });
    if (existingTag) {
        return NextResponse.json({ error: "Slug must be unique" }, { status: 409 });
    }

    const newTag: Omit<Tag, '_id'> = {
      name,
      slug,
      count: 0,
    };

    const result = await db.collection('tags').insertOne(newTag);
    const tag = { ...newTag, _id: result.insertedId };

    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    console.error("Failed to create tag:", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
