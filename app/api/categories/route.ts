import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { Category } from "@/models/Category";

/**
 * GET /api/categories
 * Fetches paginated categories
 *
 * Query params:
 * - page: number (default: 1)
 * - limit: number (default: 20)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<Category>('categories');

    const categories = await collection
      .find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await collection.countDocuments({});

    return NextResponse.json({
      categories,
      total,
      page,
      limit
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

/**
 * POST /api/categories
 * Creates a new category (admin only)
 * TODO: Add PUT and DELETE for full CRUD
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
        return NextResponse.json({ error: "Missing required fields: name and slug" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const existingCategory = await db.collection('categories').findOne({ slug });
    if (existingCategory) {
        return NextResponse.json({ error: "Slug must be unique" }, { status: 409 });
    }

    const newCategory: Omit<Category, '_id'> = {
      name,
      slug,
      description: description || '',
    };

    const result = await db.collection('categories').insertOne(newCategory);
    const category = { ...newCategory, _id: result.insertedId };

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
