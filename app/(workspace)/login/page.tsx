"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------------------
     AUTO REDIRECT IF ADMIN
  ---------------------------- */

  useEffect(() => {
    async function checkSession() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin" || profile?.role === "owner") {
        router.push("/ndo-admin-portal");
      }
    }

    checkSession();
  }, [router, supabase]);

  /* ---------------------------
     LOGIN HANDLER
  ---------------------------- */

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    /* ---------------------------
       VERIFY ADMIN ROLE
    ---------------------------- */

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Login failed.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin" && profile?.role !== "owner") {
      await supabase.auth.signOut();
      setError("This account does not have admin access.");
      setLoading(false);
      return;
    }

    router.push("/ndo-admin-portal");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 p-10 rounded-xl w-96 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-6 text-amber-400">
          NDO Network Admin Login
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="w-full bg-black/50 border border-white/20 p-3 mb-4 rounded outline-none focus:border-amber-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full bg-black/50 border border-white/20 p-3 mb-6 rounded outline-none focus:border-amber-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-500 py-3 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}