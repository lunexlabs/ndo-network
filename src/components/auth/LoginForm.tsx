"use client";

import { useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

type LoginFormProps = {
  initialMessage?: string;
};

export default function LoginForm({ initialMessage }: LoginFormProps) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    error: string | null;
    success: string | null;
  }>({
    error: null,
    success: initialMessage ?? null,
  });

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setStatus({ error: null, success: null });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setStatus({
        error: error.message,
        success: null,
      });
      return;
    }

    // force reload so auth state is available everywhere
    window.location.href = "/";
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">

      {/* EMAIL */}

      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* PASSWORD */}

      <div>
        <label
          htmlFor="login-password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* ERROR */}

      {status.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {status.error}
        </p>
      )}

      {/* SUCCESS */}

      {status.success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          {status.success}
        </p>
      )}

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>
  );
}