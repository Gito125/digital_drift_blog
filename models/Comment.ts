/**
 * TypeScript interface for the Comment model
 */
export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  approved: boolean;
}
