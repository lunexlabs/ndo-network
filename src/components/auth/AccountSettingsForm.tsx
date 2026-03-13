"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

type AccountSettingsFormProps = {
  userId: string;
  email: string;
  initialDisplayName: string;
  role: string;
};

export default function AccountSettingsForm({
  userId,
  email,
  initialDisplayName,
  role,
}: AccountSettingsFormProps) {
  const supabase = createClient();

  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Profile updated.");
  }

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          title="Email"
          value={email}
          disabled
          className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Display name</label>
        <input
          title="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Role</label>
        <input
          title="Role"
          value={role}
          disabled
          className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 capitalize text-gray-500"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {message && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save settings"}
      </button>
    </form>
  );
}