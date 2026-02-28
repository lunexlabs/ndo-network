"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export function useAdminData() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [fanMessages, setFanMessages] = useState<any[]>([]);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const supabase = getSupabaseClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/ndo-admin-login");
      return;
    }

    const adminEmail =
      process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase();

    if (session.user.email?.toLowerCase() !== adminEmail) {
      await supabase.auth.signOut();
      router.push("/");
      return;
    }

    setAuthorized(true);
    await fetchData();
    setLoading(false);
  }

  async function fetchData() {
    const [subsRes, fanRes] = await Promise.all([
      fetch("/api/admin/get-submissions"),
      fetch("/api/admin/get-fanwall"),
    ]);

    if (subsRes.ok) setSubmissions(await subsRes.json());
    if (fanRes.ok) setFanMessages(await fanRes.json());
  }

  return {
    authorized,
    loading,
    submissions,
    fanMessages,
    refresh: fetchData,
  };
}