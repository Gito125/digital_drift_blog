import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

// Load environment variables from .env.local you can adjust the path as needed e.g., .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");
console.log("Attempting to load environment variables from:", envPath);
console.log("File exists:", existsSync(envPath));

dotenv.config({ path: envPath });

async function main() {
  try {
    console.log("Starting database seeding process...");
    console.log(
      "MONGODB_URI environment variable:",
      process.env.MONGODB_URI ? "Found" : "NOT FOUND"
    );
    if (!process.env.MONGODB_URI) {
      console.log(
        "Available environment variables:",
        Object.keys(process.env).filter((key) => key.includes("MONGO"))
      );
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    // Dynamically import and run seed functions
    const { default: seedCategories } = await import("./seedCategories");
    const { default: seedTags } = await import("./seedTags");
    const { default: seedComments } = await import("./seedComments");

    // Seed categories (19)
    await seedCategories();
    console.log("Categories seeded successfully\n");

    // Seed tags (34)
    await seedTags();
    console.log("Tags seeded successfully\n");

    // Seed comments (20)
    await seedComments();
    console.log("Comments seeded successfully\n");

    console.log("All seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

// Run the seeding process
if (require.main === module) {
  main();
}

export default main;
