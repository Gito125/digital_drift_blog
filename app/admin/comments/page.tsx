"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Comment } from "@/models/Comment";

const PAGE_SIZE = 10;

export default function AdminCommentsPage() {
  const { data: session, status } = useSession();

  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  /* --------------------------- FETCH --------------------------- */

  const fetchComments = async () => {
    if (status === "loading") return;

    if (status !== "authenticated" || session?.user?.role !== "admin") {
      setError("Unauthorized");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/comments?admin=true&page=${page}&limit=${PAGE_SIZE}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to load comments");
      }

      const data = await res.json();
      setComments(data.comments);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [page, status, session]);

  /* --------------------------- ACTIONS --------------------------- */

  const deleteComment = async (id: string) => {
    if (!confirm("Delete this comment permanently?")) return;

    const snapshot = comments;
    setComments((prev) => prev.filter((c) => c._id.toString() !== id));
    setBusyId(id);

    try {
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setComments(snapshot);
      alert("Delete failed. Rolled back.");
    } finally {
      setBusyId(null);
    }
  };

  /* --------------------------- FILTER --------------------------- */

  const visibleComments = useMemo(() => {
    return comments.filter((c) =>
      c.content.toLowerCase().includes(search.toLowerCase())
    );
  }, [comments, search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  /* --------------------------- STATES --------------------------- */

  if (loading || status === "loading") {
    return <p className="text-muted-foreground">Loading comments…</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  /* --------------------------- UI --------------------------- */

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold">Comments</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search comments…"
          className="border rounded-md px-3 py-2 text-sm"
        />
      </header>

      <div className="rounded-xl border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left">Comment</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {visibleComments.map((c) => (
              <tr key={c._id.toString()}>
                <td className="px-6 py-4 max-w-md break-words">
                  {c.content}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {c.userName || "Anonymous"}
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(c.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    disabled={busyId === c._id.toString()}
                    onClick={() => deleteComment(c._id.toString())}
                    className="text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
