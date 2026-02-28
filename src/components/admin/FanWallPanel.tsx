"use client";

import { useState, useMemo } from "react";

type FanMessage = {
  id: string;
  name: string;
  city?: string;
  country?: string;
  message: string;
  status: string;
  created_at: string;
};

export default function FanWallPanel({
  fanMessages,
  refresh,
}: {
  fanMessages: FanMessage[];
  refresh: () => void;
}) {
  const [filter, setFilter] = useState<"pending" | "approved">("pending");

  const filtered = useMemo(() => {
    return fanMessages
      .filter((f) => f.status !== "rejected")
      .filter((f) => f.status === filter);
  }, [fanMessages, filter]);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/update-fanwall-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    refresh();
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete permanently?")) return;

    await fetch("/api/admin/delete-fanwall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refresh();
  }

  return (
    <>
      {/* FILTER TABS */}
      <div className="flex gap-4 mb-6">
        {["pending", "approved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
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

      {/* LIST */}
      <div className="space-y-4">
        {filtered.map((f) => (
          <div
            key={f.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {f.name} • {f.city}, {f.country}
              </p>
              <p className="text-sm text-gray-600">
                {f.message}
              </p>
            </div>

            <div className="flex gap-3">

              {f.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(f.id, "approved")
                    }
                    className="text-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(f.id, "rejected")
                    }
                    className="text-red-600"
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                onClick={() => deleteMessage(f.id)}
                className="text-red-700"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}