"use client";

import { useState, useMemo } from "react";

type Submission = {
  id: string;
  island_name: string;
  creator_name: string;
  email: string;
  season: string;
  status: string;
  is_archived?: boolean;
};

export default function SubmissionsPanel({
  submissions,
  refresh,
}: {
  submissions: Submission[];
  refresh: () => void;
}) {
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected" | "archived"
  >("all");

  const [page, setPage] = useState(1);
  const perPage = 5;

  /* -------------------------
     FILTER LOGIC
  -------------------------- */

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      if (filter === "archived") return s.is_archived;
      if (filter === "all") return !s.is_archived;
      return s.status === filter && !s.is_archived;
    });
  }, [submissions, filter]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const paginated = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  /* -------------------------
     ACTIONS
  -------------------------- */

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/update-submission-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    refresh();
  }

  async function archive(id: string) {
    await fetch("/api/admin/archive-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refresh();
  }

  async function unarchive(id: string) {
    await fetch("/api/admin/unarchive-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refresh();
  }

  async function deleteSubmission(id: string) {
    if (!confirm("Delete permanently?")) return;

    await fetch("/api/admin/delete-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refresh();
  }

  /* -------------------------
     UI
  -------------------------- */

  return (
    <>
      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mb-6">
        {["all", "pending", "approved", "rejected", "archived"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f as any);
              setPage(1);
            }}
            className={`px-4 py-1 rounded text-sm capitalize ${
              filter === f
                ? "bg-black text-white"
                : "border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Island</th>
              <th className="p-3 text-center">Creator</th>
              <th className="p-3 text-center">Season</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.island_name}</td>
                <td className="p-3 text-center">{s.creator_name}</td>
                <td className="p-3 text-center">{s.season}</td>
                <td className="p-3 text-center capitalize">
                  {s.is_archived ? "archived" : s.status}
                </td>
                <td className="p-3 flex gap-3 justify-center">

                  {s.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(s.id, "approved")}
                        className="text-green-600"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(s.id, "rejected")}
                        className="text-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {s.status === "approved" && !s.is_archived && (
                    <button
                      onClick={() => archive(s.id)}
                      className="text-purple-600"
                    >
                      Archive
                    </button>
                  )}

                  {s.is_archived && (
                    <button
                      onClick={() => unarchive(s.id)}
                      className="text-blue-600"
                    >
                      Unarchive
                    </button>
                  )}

                  {s.status === "rejected" && (
                    <button
                      onClick={() => deleteSubmission(s.id)}
                      className="text-red-700"
                    >
                      Delete
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}