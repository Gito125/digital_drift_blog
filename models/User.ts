/**
 * TypeScript interface for the User model
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string; // Password hash
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
