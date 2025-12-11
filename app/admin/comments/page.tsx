"use client";

import { useState, useEffect } from 'react';
import { Comment } from '@/models/Comment';

/**
 * Admin Comments Page
 * Displays a table of all comments for moderation.
 */
export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const res = await fetch('/api/comments?filter=all', { cache: 'no-store' });
    const data = await res.json();
    setComments(data.comments);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApproval = async (id: string, approved: boolean) => {
    await fetch(`/api/comments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    });
    fetchComments(); // Refresh list
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
      fetchComments(); // Refresh list
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Comment Moderation</h1>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text/80 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-text/80 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td className="px-6 py-4">{comment.content}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {comment.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {!comment.approved && (
                    <button onClick={() => handleApproval(comment._id, true)} className="text-green-600 hover:underline mr-4">Approve</button>
                  )}
                  <button onClick={() => handleDelete(comment._id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
