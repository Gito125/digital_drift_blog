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
        setComments(data.comments);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

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
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-heading mb-4">Comments</h2>
      {session ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-accent text-white rounded hover:bg-opacity-90"
          >
            Submit Comment
          </button>
        </form>
      ) : (
        <p className="mb-8">
          <a href="/login" className="text-accent underline">Log in</a> to post a comment.
        </p>
      )}

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-4 border rounded-lg">
              <p>{comment.content}</p>
              <p className="text-sm text-text/60 mt-2">
                {/* We need user data to show name, for now it's just the date */}
                Posted on {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          !loading && <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
