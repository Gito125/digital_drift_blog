import PostForm from "@/components/PostForm";

/**
 * New Post Page
 * Renders the form for creating a new blog post.
 */
export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading mb-8">New Post</h1>
      <PostForm isNew={true} />
    </div>
  );
}
