import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { User } from "@/models/User";
import { Collection } from "mongodb";

interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * POST /api/users
 * Registers a new user with hashed password.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password }: NewUserRequest = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection: Collection<User> = db.collection<User>("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10

    const newUser: Omit<User, '_id'> = {
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    if (!result.acknowledged) {
      throw new Error("Failed to create user in database.");
    }

    // Optionally, you might want to return a subset of user data,
    // excluding the password hash.
    const createdUser = await usersCollection.findOne({ _id: result.insertedId });
    const userWithoutPassword = {
        _id: createdUser?._id.toHexString(),
        name: createdUser?.name,
        email: createdUser?.email,
        role: createdUser?.role,
        createdAt: createdUser?.createdAt,
        updatedAt: createdUser?.updatedAt,
    }


    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("User registration error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to register user", details: message },
      { status: 500 }
    );
  }
}