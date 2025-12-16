import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient, ObjectId } from 'mongodb';
import { existsSync } from 'fs';
import Tags from './dataToSeed/tags';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');
console.log('Attempting to load environment variables from:', envPath);
console.log('File exists:', existsSync(envPath));

dotenv.config({ path: envPath });

// Verify MONGODB_URI is loaded
console.log('MONGODB_URI after loading .env.local:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');

async function seedTags() {
  let client;

  try {
    console.log('Starting tags seeding...');

    if (!process.env.MONGODB_URI) {
      console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    // Clear existing tags
    await db.collection('tags').deleteMany({});
    console.log('Cleared existing tags');
    
    // Sample tags data
    const tags = Tags;
    
    // Insert tags
    const result = await db.collection('tags').insertMany(tags);
    console.log(`Inserted ${result.insertedCount} tags`);
    
    console.log('Tags seeding completed successfully!');
    return result;
  } catch (error) {
    console.error('Error during tags seeding:', error);
    throw error;
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the seeding function if this file is executed directly
if (require.main === module) {
  seedTags();
}

export default seedTags;