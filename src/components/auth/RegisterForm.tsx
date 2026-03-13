"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

export default function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    error: string | null;
    success: string | null;
  }>({
    error: null,
    success: null,
  });

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ error: null, success: null });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setStatus({ error: error.message, success: null });
      return;
    }

    if (data.session) {
      router.push("/account");
      router.refresh();
      return;
    }

    setStatus({
      error: null,
      success: "Account created. Check your email to confirm your account.",
    });
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label
          htmlFor="register-display-name"
          className="mb-2 block text-sm font-medium"
        >
          Display name
        </label>
        <input
          id="register-display-name"
          type="text"
          autoComplete="nickname"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div>
        <label
          htmlFor="register-email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      <div>
        <label
          htmlFor="register-password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {status.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.error}
        </p>
      )}

      {status.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {status.success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}