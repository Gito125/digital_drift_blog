import { ObjectId } from "mongodb";

/**
 * TypeScript interface for the Category model
 */
export interface Category {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
}