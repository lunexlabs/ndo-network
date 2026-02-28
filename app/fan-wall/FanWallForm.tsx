"use client";

import { useState, useTransition } from "react";
import { submitFanMail } from "./actions";
import { useRouter } from "next/navigation";

export default function FanWallForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      const result = await submitFanMail(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setSuccess(true);

      // Refresh messages without page reload
      router.refresh();
    });
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-sm border border-gray-200">
      <form action={handleSubmit} className="space-y-6">

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md text-sm">
            ✅ Your message was submitted successfully!
            It will appear once approved.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm">
            ❌ {error}
          </div>
        )}

        {/* Name */}
        <Input label="Your Name" name="name" />

        {/* City */}
        <Input label="City" name="city" />

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            name="country"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black transition"
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

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Message (Max 300 characters)
          </label>

          <textarea
            name="message"
            required
            maxLength={300}
            rows={4}
            onChange={(e) => setCount(e.target.value.length)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black transition"
          />

          <div className="flex justify-between text-xs mt-2 text-gray-400">
            <span>Messages are reviewed before appearing publicly.</span>
            <span>{count}/300</span>
          </div>
        </div>

        <button
          disabled={pending}
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-md font-medium transition"
        >
          {pending ? "Submitting..." : "Leave Message"}
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        name={name}
        required
        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring-1 focus:ring-black transition"
      />
    </div>
  );
}