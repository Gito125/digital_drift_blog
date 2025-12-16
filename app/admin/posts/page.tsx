"use client";

import { useState, useEffect } from "react";
import { Post } from "@/models/Post";
import Link from "next/link";
import CTA_Button from "@/components/ui/CTA_Button";

/**
 * Admin Posts Page
 * Displays a table of all posts with management options.
 */
export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000&status=all`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching posts");
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm("Delete this post permanently? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete post");
      }

      // Remove the deleted post from the UI
      setPosts(posts.filter(post => post._id !== id));
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert(error instanceof Error ? error.message : "Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-heading">Posts</h1>
          <CTA_Button text="New Post" linkTo="/admin/posts/new"/>
        </div>

        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-heading">Posts</h1>

                  <CTA_Button text="New Post" linkTo="/admin/posts/new"/>

      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-border overflow-hidden">
        {posts.length === 0 ? (
          <p className="p-6 text-sm text-muted">
            No posts yet. Create your first post to get started.
          </p>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Title</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Date</th>
                <th className="px-6 py-3 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 font-medium">
                    {post.title}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-amber-500/15 text-amber-600"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-muted">
                    {new Date(
                      typeof post.createdAt === "string"
                        ? post.createdAt
                        : post.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-4">
                    <Link
                      href={`/admin/posts/${post._id}/edit`}
                      className="text-primary hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      className="text-destructive hover:underline"
                      onClick={() => deletePost(post._id)}
                      title="Delete this post"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
