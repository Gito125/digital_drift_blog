"use client";

import { useEffect, useMemo, useState } from "react";
import { Comment } from "@/models/Comment";

type Filter = "all" | "pending" | "approved";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  /* --------------------------- DATA FETCH --------------------------- */

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // For admin to fetch all system comments, use filter as "all" with no postId
      // This makes the API endpoint return all comments in the system
      const res = await fetch("/api/comments?filter=all", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load comments");

      const data = await res.json();
      setComments(data.comments);
    } catch (err) {
      setError("Could not fetch comments. Try refreshing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  /* --------------------------- ACTIONS --------------------------- */

  const updateComment = async (id: string, approved: boolean) => {
    setBusyId(id);

    // optimistic update
    setComments((prev) =>
      prev.map((c) => (c._id === id ? { ...c, approved } : c))
    );

    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved }),
      });

      if (!res.ok) throw new Error();
    } catch {
      // rollback on failure
      setComments((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, approved: !approved } : c
        )
      );
      alert("Action failed. Rolled back.");
    } finally {
      setBusyId(null);
    }
  };

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;

    const snapshot = comments;
    setComments((prev) => prev.filter((c) => c._id !== id));
    setBusyId(id);

    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();
    } catch {
      setComments(snapshot);
      alert("Delete failed. Restored comment.");
    } finally {
      setBusyId(null);
    }
  };

  /* --------------------------- FILTERING --------------------------- */

  const visibleComments = useMemo(() => {
    return comments
      .filter((c) =>
        filter === "all"
          ? true
          : filter === "approved"
          ? c.approved
          : !c.approved
      )
      .filter((c) =>
        c.content.toLowerCase().includes(search.toLowerCase())
      );
  }, [comments, filter, search]);

  /* --------------------------- STATES --------------------------- */

  if (loading) {
    return <p className="text-muted">Loading comments…</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  /* --------------------------- UI --------------------------- */

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-heading">Comment Moderation</h1>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search comments…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Search comments"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </header>

      {/* FILTER TABS */}
      <div className="flex gap-2 flex-wrap">
        {(["all", "pending", "approved"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
            aria-pressed={filter === f}
          >
            {f[0].toUpperCase() + f.slice(1)} ({comments.filter(c =>
              f === "all" ? true :
              f === "approved" ? c.approved : !c.approved
            ).length})
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-border overflow-hidden">
        {visibleComments.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-muted text-sm">No comments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Comment</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Date</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {visibleComments.map((comment) => (
                  <tr key={comment._id} className="align-top hover:bg-muted/5">
                    <td className="px-6 py-4 max-w-md">
                      <div className="font-medium text-foreground mb-1">
                        By user {comment.userId}
                      </div>
                      <p className="text-foreground break-words">
                        {comment.content}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          comment.approved
                            ? "bg-emerald-500/15 text-emerald-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}
                      >
                        {comment.approved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-muted">
                      {new Date(comment.createdAt as any).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    <td className="px-6 py-4 text-right space-x-4">
                      {!comment.approved && (
                        <button
                          disabled={busyId === comment._id}
                          onClick={() =>
                            updateComment(comment._id, true)
                          }
                          className="text-emerald-600 hover:underline disabled:opacity-50"
                          aria-label={`Approve comment ${comment._id}`}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        disabled={busyId === comment._id}
                        onClick={() => deleteComment(comment._id)}
                        className="text-destructive hover:underline disabled:opacity-50"
                        aria-label={`Delete comment ${comment._id}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
