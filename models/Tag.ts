/**
 * TypeScript interface for the Tag model
 */
export interface Tag {
  _id: string;
  name: string;
  slug: string;
  count: number; // Number of posts with this tag
}
