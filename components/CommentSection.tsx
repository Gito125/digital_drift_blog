"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Comment } from '@/models/Comment';

interface CommentSectionProps {
  postId: string;
}

/**
 * Comment section component
 * Displays comments and submission form for authenticated users
 */
export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (!res.ok) throw new Error('Failed to load comments.');
        const data = await res.json();

        // Show all comments if user is logged in (including their own unapproved comments)
        // Only show approved comments if user is not logged in
        if (session?.user?.id) {
          setComments(data.comments);
        } else {
          // Only show approved comments if user is not logged in
          setComments(data.comments.filter((comment: Comment) => comment.approved));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId, session?.user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: newComment }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to post comment.');
      }

      const data = await res.json();
      // Since new comments are not approved by default, we don't add them to the list.
      // We can show a message to the user instead.
      setNewComment('');
      alert('Your comment has been submitted for moderation.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-heading mb-4">Comments</h2>
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <textarea
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-accent focus:border-transparent"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-accent/80 rounded-lg text-center text-white">
          <p className="mb-2">Please log in to leave a comment</p>
          <a href="/login" className="inline-block px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity">
            Log In
          </a>
        </div>
      )}

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className={`p-4 border rounded-lg ${!comment.approved ? 'opacity-70 bg-gray-50 dark:bg-gray-700/30' : ''}`}>
              <p>{comment.content}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-text/60">
                  {/* We need user data to show name, for now it's just the date */}
                  Posted on {typeof comment.createdAt === 'string' ?
                    new Date(comment.createdAt).toLocaleDateString() :
                    comment.createdAt.toLocaleDateString()}
                </p>
                {!comment.approved && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
