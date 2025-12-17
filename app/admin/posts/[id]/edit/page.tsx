import PostForm from "@/components/PostForm";
import { Post } from "@/models/Post";
import { notFound } from "next/navigation";

/**
 * Fetches a single post by its ID from the API.
 * This is for admin editing, so it doesn't need to be published.
 * @param id The ID of the post to fetch
 * @returns {Promise<Post>}
 */
async function getPostById(id: string): Promise<Post> {
  const res = await fetch(`/api/posts/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch post');
  }
  const data = await res.json();
  return data.post;
}


/**
 * Edit Post Page
 * Fetches post data and renders the form for editing.
 */
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
