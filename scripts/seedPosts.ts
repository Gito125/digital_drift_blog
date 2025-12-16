import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { MongoClient } from "mongodb";
import { existsSync } from 'fs';
import posts from './dataToSeed/posts'

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');
console.log('Attempting to load environment variables from:', envPath);
console.log('File exists:', existsSync(envPath));
// eslint-disable-next-line @typescript-eslint/no-require-imports
console.log('File exists:', require('fs').existsSync(envPath));

dotenv.config({ path: envPath });

// Verify MONGODB_URI is loaded
console.log('MONGODB_URI after loading .env.local:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');

// Sample blog posts about tech and computer science
const generatedPosts = posts;

async function seedBlogPosts() {
  console.log('MONGODB_URI environment variable:', process.env.MONGODB_URI ? 'Found' : 'NOT FOUND');
  if (!process.env.MONGODB_URI) {
    console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const client: MongoClient | null = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const postsCollection = db.collection("posts");

    // Check if sample posts already exist
    const existingCount = await postsCollection.countDocuments({
      slug: { $in: generatedPosts.map(post => post.slug) }
    });

    if (existingCount > 0) {
      console.log(`${existingCount} sample posts already exist. Skipping seed.`);
      return;
    }

    // Insert sample posts
    const result = await postsCollection.insertMany(generatedPosts);
    console.log(`Successfully inserted ${result.insertedCount} sample blog posts.`);
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

// Run the seeding function
seedBlogPosts();
// 1. **MLOps** - Machine learning operations and pipelines
// 2. **Blockchain Enterprise** - Beyond cryptocurrency applications
// 3. **Edge Computing** - Processing at the data source
// 4. **Kubernetes Security** - Container orchestration hardening
// 5. **WebAssembly** - Web performance revolution
// 6. **GraphQL vs REST** - API architecture comparison
// 7. **Microservices** - Patterns and anti-patterns
// 8. **Zero-Knowledge Proofs** - Privacy-preserving cryptography
// 9. **Rust** - Systems programming with memory safety
// 10. **Distributed Tracing** - Microservices observability
// 11. **Progressive Web Apps** - Native-web convergence
// 12. **Database Sharding** - Horizontal scaling strategies
// 13. **Terraform** - Infrastructure as Code best practices
// 14. **Apache Kafka** - Real-time data processing
// 15. **API Rate Limiting** - Resource protection strategies
// 16. **Computer Vision** - Deep learning for images
// 17. **Git Workflows** - Team collaboration patterns
// 18. **Redis Optimization** - Performance tuning techniques
// 19. **OAuth/OpenID** - Modern authentication protocols
// 20. **Site Reliability Engineering** - Building resilient systems