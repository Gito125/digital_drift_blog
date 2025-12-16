import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from "mongodb";
import bcrypt from 'bcryptjs';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function seedAdminUser() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if admin user already exists
    const existingAdmin = await usersCollection.findOne({ email: "iamgideon125@gmail.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists. Skipping creation.");
      return;
    }

    // Create a default admin user
    const hashedPassword = await bcrypt.hash("L,j,j7!ybW#sG$]J", 10);
    
    const adminUser = {
      name: "Ogwang Gift Gideon",
      email: "iamgideon125@gmail.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(adminUser);
    console.log(`Successfully created admin user with ID: ${result.insertedId}`);
    
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the seeding function
seedAdminUser();