/**
 * TypeScript interface for the Comment model
 * Note: When received from the API, Date fields are strings but are converted to Date objects when needed.
 */
export interface Comment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date | string;
  approved: boolean;
}
