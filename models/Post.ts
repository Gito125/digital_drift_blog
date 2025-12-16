import { ObjectId } from "mongodb";

/**
 * TypeScript interface for the Post model
 * Note: When received from the API, Date fields are strings but are converted to Date objects when needed.
 */
export interface Post {
  _id: ObjectId;
  title: string;
  slug: string;
  content: string; // Markdown
  excerpt: string;
  author: string; // User ID
  publishedAt: Date | string | null;
  status: 'draft' | 'published';
  tags: string[]; // Tag IDs
  categories: string[]; // Category IDs
  viewCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}