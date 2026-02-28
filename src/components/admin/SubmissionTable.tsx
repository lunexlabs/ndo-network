"use client";

import { useState, useEffect } from "react";

type Submission = {
  id: string;
  island_name: string;
  creator_name: string;
  season: string;
  status: string;
  is_archived?: boolean;
};

export default function SubmissionTable({
  data,
  onApprove,
  onReject,
  onArchive,
  onUnarchive,
  onDelete,
}: {
  data: Submission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* ----------------------------
     SELECTION LOGIC
  ----------------------------- */

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((s) => s.id));
    }
  }

  useEffect(() => {
    setSelectedIds([]);
  }, [data]);

  /* ----------------------------
     BULK ACTIONS
  ----------------------------- */

  function bulkApprove() {
    selectedIds.forEach((id) => onApprove(id));
  }

  function bulkReject() {
    selectedIds.forEach((id) => onReject(id));
  }

  function bulkArchive() {
    selectedIds.forEach((id) => onArchive(id));
  }

  function bulkDelete() {
    if (!confirm("Delete selected permanently?")) return;
    selectedIds.forEach((id) => onDelete(id));
  }

  /* ----------------------------
     EMPTY STATE
  ----------------------------- */

  if (!data || data.length === 0) {
    return (
      <div className="border rounded-lg p-8 text-center text-gray-500">
        No submissions found.
      </div>
    );
  }

  /* ----------------------------
     UI
  ----------------------------- */

  return (
    <div>

      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="flex gap-4 mb-4 bg-gray-100 p-3 rounded">
          <span className="text-sm font-medium">
            {selectedIds.length} selected
          </span>

          <button
            onClick={bulkApprove}
            className="text-green-600 hover:underline"
          >
            Approve
          </button>

          <button
            onClick={bulkReject}
            className="text-red-600 hover:underline"
          >
            Reject
          </button>

          <button
            onClick={bulkArchive}
            className="text-purple-600 hover:underline"
          >
            Archive
          </button>

          <button
            onClick={bulkDelete}
            className="text-red-700 hover:underline"
          >
            Delete
          </button>
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === data.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="p-3 text-left">Island</th>
              <th className="p-3 text-center">Creator</th>
              <th className="p-3 text-center">Season</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr key={s.id} className="border-t">

                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                  />
                </td>

                <td className="p-3">{s.island_name}</td>

                <td className="p-3 text-center">
                  {s.creator_name}
                </td>

                <td className="p-3 text-center">
                  {s.season}
                </td>

                <td className="p-3 text-center capitalize">
                  {s.is_archived ? "archived" : s.status}
                </td>

                <td className="p-3 flex gap-3 justify-center">

                  {s.status === "pending" && (
                    <>
                      <button
                        onClick={() => onApprove(s.id)}
                        className="text-green-600 hover:underline"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => onReject(s.id)}
                        className="text-red-600 hover:underline"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {s.status === "approved" &&
                    !s.is_archived && (
                      <button
                        onClick={() => onArchive(s.id)}
                        className="text-purple-600 hover:underline"
                      >
                        Archive
                      </button>
                    )}

                  {s.is_archived && (
                    <button
                      onClick={() => onUnarchive(s.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Unarchive
                    </button>
                  )}

                  {s.status === "rejected" && (
                    <button
                      onClick={() => onDelete(s.id)}
                      className="text-red-700 hover:underline"
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
    </div>
  );
}