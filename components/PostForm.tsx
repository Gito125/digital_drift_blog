"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post } from '@/models/Post';

interface PostFormProps {
  post?: Post;
  isNew?: boolean;
}

/**
 * A reusable form component for creating and editing posts.
 * It handles form state, submission, and API interaction.
 */
export default function PostForm({ post, isNew = false }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(post?.status || 'draft');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const generateSlug = () => {
    setSlug(title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const postData = { title, slug, content, status };
    const url = isNew ? '/api/posts' : `/api/posts/${post?._id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to ${isNew ? 'create' : 'update'} post.`);
      }

      router.push('/admin/posts');
      router.refresh(); // Refresh the posts list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text/80">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-text/80">Slug</label>
        <div className="flex items-center">
            <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
            required
            />
            <button type="button" onClick={generateSlug} className="ml-2 px-3 py-2 border rounded">Generate</button>
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-text/80">Content (Markdown)</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
          required
        />
      </div>
      
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-text/80">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
          className="mt-1 block w-full p-2 border rounded bg-transparent focus:ring-accent focus:border-accent"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-accent text-white rounded hover:bg-opacity-90 disabled:bg-opacity-50"
        >
          {submitting ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </form>
  );
}
