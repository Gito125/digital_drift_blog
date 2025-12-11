/**
 * TypeScript interface for the Post model
 */
export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string; // Markdown
  excerpt: string;
  author: string; // User ID
  publishedAt: Date | null;
  status: 'draft' | 'published';
  tags: string[]; // Tag IDs
  categories: string[]; // Category IDs
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}
