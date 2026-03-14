"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import {
  Check,
  Trash2,
  Star,
  Pin,
  Search
} from "lucide-react";

export default function CommunityNotesPage() {

  const supabase = createClient();

  const [notes, setNotes] = useState<any[]>([]);
  const [filter, setFilter] = useState("pending");
  const [search, setSearch] = useState("");

  /* -----------------------------
     LOAD NOTES
  ----------------------------- */

  async function loadNotes() {

    const { data, error } = await supabase
      .from("fan_wall_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    if (data) setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  /* -----------------------------
     ACTIONS
  ----------------------------- */

  async function approve(id: string) {

    await supabase
      .from("fan_wall_messages")
      .update({ status: "approved" })
      .eq("id", id);

    loadNotes();
  }

  async function remove(id: string) {

    await supabase
      .from("fan_wall_messages")
      .delete()
      .eq("id", id);

    loadNotes();
  }

  async function togglePinned(note: any) {

    await supabase
      .from("fan_wall_messages")
      .update({ pinned: !note.pinned })
      .eq("id", note.id);

    loadNotes();
  }

  async function toggleFeatured(note: any) {

    await supabase
      .from("fan_wall_messages")
      .update({ featured: !note.featured })
      .eq("id", note.id);

    loadNotes();
  }

  /* -----------------------------
     FILTER + SEARCH
  ----------------------------- */

  const filtered = notes
    .filter(note => {

      if (filter === "pending") return note.status === "pending";
      if (filter === "approved") return note.status === "approved";

      return true;
    })
    .filter(note =>
      note.name?.toLowerCase().includes(search.toLowerCase()) ||
      note.message?.toLowerCase().includes(search.toLowerCase())
    );

  /* -----------------------------
     COUNTS
  ----------------------------- */

  const pendingCount = notes.filter(n => n.status === "pending").length;
  const approvedCount = notes.filter(n => n.status === "approved").length;

  return (
    <div className="space-y-10">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-semibold">
          Community Notes
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          Total: {notes.length}
        </div>

      </div>

      {/* SEARCH */}

      <div className="relative w-full max-w-md">

        <Search size={16} className="absolute left-3 top-3 text-gray-400"/>

        <input
          placeholder="Search notes..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="
          w-full pl-9 pr-4 py-2
          border rounded-lg
          bg-white
          text-sm
          "
        />

      </div>

      {/* FILTER TABS */}

      <div className="flex gap-3">

        <FilterButton
          label={`Pending (${pendingCount})`}
          active={filter === "pending"}
          onClick={() => setFilter("pending")}
        />

        <FilterButton
          label={`Approved (${approvedCount})`}
          active={filter === "approved"}
          onClick={() => setFilter("approved")}
        />

        <FilterButton
          label="All"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />

      </div>

      {/* NOTES */}

      <div className="space-y-5">

        {filtered.map((note) => (

          <div
            key={note.id}
            className="
            bg-white
            border
            rounded-xl
            p-6
            shadow-sm
            "
          >

            {/* HEADER */}

            <div className="flex justify-between items-start">

              <div>

                <div className="font-semibold text-gray-900">
                  {note.name}
                </div>

                <div className="text-sm text-gray-500">
                  {note.city}, {note.country}
                </div>

              </div>

              <div className="flex items-center gap-3">

                <StatusBadge status={note.status} />

                <div className="text-xs text-gray-400">
                  {new Date(note.created_at).toLocaleDateString()}
                </div>

              </div>

            </div>

            {/* MESSAGE */}

            <p className="mt-4 text-gray-700">
              {note.message}
            </p>

            {/* ACTIONS */}

            <div className="flex items-center gap-3 mt-5">

              {note.status === "pending" && (
                <ActionButton
                  icon={Check}
                  label="Approve"
                  color="green"
                  onClick={() => approve(note.id)}
                />
              )}

              <ActionButton
                icon={Pin}
                label={note.pinned ? "Unpin" : "Pin"}
                color="blue"
                onClick={() => togglePinned(note)}
              />

              <ActionButton
                icon={Star}
                label={note.featured ? "Unfeature" : "Feature"}
                color="yellow"
                onClick={() => toggleFeatured(note)}
              />

              <ActionButton
                icon={Trash2}
                label="Delete"
                color="red"
                onClick={() => remove(note.id)}
              />

            </div>

          </div>

        ))}

        {filtered.length === 0 && (
          <div className="text-gray-500 text-sm">
            No notes found.
          </div>
        )}

      </div>

    </div>
  );
}

/* -----------------------------
   FILTER BUTTON
----------------------------- */

function FilterButton({
  label,
  active,
  onClick
}: {
  label: string
  active: boolean
  onClick: () => void
}) {

  return (
    <button
      onClick={onClick}
      className={`
      px-4 py-2 text-sm rounded-lg border
      transition
      ${active
        ? "bg-black text-white border-black"
        : "bg-white text-gray-700 border-gray-300"}
      `}
    >
      {label}
    </button>
  );
}

/* -----------------------------
   STATUS BADGE
----------------------------- */

function StatusBadge({ status }: { status: string }) {

  if (status === "pending") {
    return (
      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
        Pending
      </span>
    );
  }

  return (
    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
      Approved
    </span>
  );
}

/* -----------------------------
   ACTION BUTTON
----------------------------- */

function ActionButton({
  icon: Icon,
  label,
  onClick,
  color
}: {
  icon: any
  label: string
  onClick: () => void
  color: string
}) {

  const colors: any = {
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600"
  };

  return (
    <button
      onClick={onClick}
      className={`
      flex items-center gap-1
      text-xs text-white
      px-3 py-1 rounded
      ${colors[color]}
      `}
    >
      <Icon size={14}/>
      {label}
    </button>
  );
}