import { ObjectId } from "mongodb";

/**
 * TypeScript interface for the Tag model
 */
export interface Tag {
  _id: ObjectId;
  name: string;
  slug: string;
  count: number; // Number of posts with this tag
}