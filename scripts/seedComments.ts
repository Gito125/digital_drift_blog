import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from 'mongodb';
import { existsSync } from 'fs';
import Comments from './dataToSeed/comments';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');
console.log('Attempting to load environment variables from:', envPath);
console.log('File exists:', existsSync(envPath));

dotenv.config({ path: envPath });

// Verify MONGODB_URI is loaded
console.log('MONGODB_URI after loading .env.local:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');

async function seedComments() {
  let client: MongoClient | null = null;

  try {
    console.log('Starting comments seeding...');

    if (!process.env.MONGODB_URI) {
      console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // Clear existing comments
    await db.collection('comments').deleteMany({});
    console.log('Cleared existing comments');
    
    // Sample comments data (20 comments as requested)
    const comments = Comments;
    
    // Insert comments
    const result = await db.collection('comments').insertMany(comments);
    console.log(`Inserted ${result.insertedCount} comments`);
    
    console.log('Comments seeding completed successfully!');
    return result;
  } catch (error) {
    console.error('Error during comments seeding:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedComments();
}

export default seedComments;