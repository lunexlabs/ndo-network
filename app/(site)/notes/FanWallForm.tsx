"use client";

import { useState, useEffect, useTransition } from "react";
import { submitNote } from "./actions";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

type Props = {
  onSuccess?: () => void;
};

export default function FanWallForm({ onSuccess }: Props) {

  const router = useRouter();
  const supabase = createClient();

  const [pending, startTransition] = useTransition();

  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  /* -----------------------------
     LOAD USER
  ----------------------------- */

  useEffect(() => {
    async function loadUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      if (data?.display_name) {
        setDisplayName(data.display_name);
      }

    }

    loadUser();
  }, [supabase]);

  /* -----------------------------
     SUBMIT
  ----------------------------- */

  async function handleSubmit(formData: FormData) {

    setError(null);
    setSuccess(false);

    if (user && displayName) {
      formData.set("name", displayName);
      formData.set("user_id", user.id);
    }

    startTransition(async () => {

      const result = await submitNote(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setSuccess(true);

      router.refresh();

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1200);
      }

    });

  }

  return (
    <div className="w-full max-w-xl mx-auto">

      <form
        action={handleSubmit}
        className="bg-white rounded-2xl p-10 shadow-xl border border-gray-200 space-y-6"
      >

        {/* HEADER */}

        <div className="text-center">

          <h2 className="text-2xl font-bold text-gray-900">
            Leave a Note
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Share a message with the NDO community.
          </p>

        </div>

        {/* USER INFO */}

        {user && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-700">
            Posting as <strong>{displayName}</strong>
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-md text-green-700 text-sm">
            🎉 Your note was submitted! It will appear after approval.
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-md text-red-700 text-sm">
            ❌ {error}
          </div>
        )}

        {/* NAME (GUEST ONLY) */}

        {!user && (
          <Input
            label="Your Name"
            name="name"
            placeholder="Enter your name"
          />
        )}

        {/* CITY */}

        <Input
          label="City"
          name="city"
          placeholder="Where are you from?"
        />

        {/* COUNTRY */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>

          <select
            name="country"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
          >

            <option value="">Select Country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>France</option>
            <option>Brazil</option>
            <option>Mexico</option>
            <option>Japan</option>
            <option>India</option>
            <option>Other</option>

          </select>

        </div>

        {/* MESSAGE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Note
          </label>

          <textarea
            name="message"
            required
            maxLength={300}
            rows={4}
            placeholder="Leave a note for the community..."
            onChange={(e) => setCount(e.target.value.length)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <div className="flex justify-between text-xs mt-2 text-gray-400">
            <span>Notes are reviewed before appearing publicly.</span>
            <span>{count}/300</span>
          </div>

        </div>

        {/* SUBMIT BUTTON */}

        <button
          disabled={pending}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >

          {pending ? "Posting..." : "Post Note"}

        </button>

      </form>

    </div>
  );
}

/* --------------------------------
   INPUT COMPONENT
-------------------------------- */

function Input({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {

  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        name={name}
        required
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}