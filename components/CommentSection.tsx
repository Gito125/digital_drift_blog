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

  // Define an extended comment type that includes userName
  type CommentWithUser = Comment & { userName?: string };
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        setError(null);
        const res = await fetch(`/api/comments?postId=${postId}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to load comments.');
        }
        const data = await res.json();

        // Show all comments if user is logged in (including their own unapproved comments)
        // Only show approved comments if user is not logged in
        if (session?.user?.id) {
          setComments(data.comments);
        } else {
          // Only show approved comments if user is not logged in
          setComments(data.comments.filter((comment: CommentWithUser) => comment.approved));
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();

    // Set up polling to refresh comments every 30 seconds
    const intervalId = setInterval(fetchComments, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [postId, session?.user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Add user ID to the comment
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: newComment,
          userId: session?.user?.id,
          approved: true, // Automatically approve comments from logged-in users
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to post comment.');
      }

      const data = await res.json();
      // Clear the form and show success message
      setNewComment('');
      setSuccess('Your comment has been submitted for moderation.');
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
      // Refetch comments to show the new one (if the user is the author)
      // We need to refetch with the same logic as the initial fetch
      const updatedRes = await fetch(`/api/comments?postId=${postId}`);
      if (updatedRes.ok) {
        const updatedData = await updatedRes.json();

        // Show all comments if user is logged in (including their own unapproved comments)
        // Only show approved comments if user is not logged in
        if (session?.user?.id) {
          setComments(updatedData.comments);
        } else {
          // Only show approved comments if user is not logged in
          setComments(updatedData.comments.filter((comment: CommentWithUser) => comment.approved));
        }
      }
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
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Add a comment
            </label>
            <textarea
              id="comment"
              className="w-full p-3 border border-border bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent min-h-[100px]"
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-accent/80 rounded-lg text-center">
          <p className="mb-2 text-white">Please log in to leave a comment</p>
          <a href="/login" className="inline-block px-4 py-2 bg-white text-accent rounded-lg hover:bg-gray-100 transition-colors">
            Log In
          </a>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive dark:text-destructive-foreground rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <p className="text-muted">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => {
            const firstName = comment.userName ? comment.userName.split(' ')[0] : `User ${comment.userId?.substring(0, 6)}`;
            const initial = firstName ? firstName.charAt(0).toUpperCase() : 'U';

            return (
              <div key={comment._id.toString()} className={`p-4 border border-border rounded-lg ${!comment.approved ? 'opacity-70 bg-muted/20' : ''}`}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">
                      {initial}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">
                        {session?.user?.id === comment.userId
                          ? 'You'
                          : firstName}
                      </p>
                      {/* {!comment.approved && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-600 dark:text-amber-400">
                          Pending
                        </span>
                      )} */}
                    </div>
                    <p className="text-foreground mb-2">{comment.content}</p>
                    <p className="text-xs text-foreground">
                      {typeof comment.createdAt === 'string' ?
                        new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) :
                        comment.createdAt.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-foreground/60">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
