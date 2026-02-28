"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "../../src/lib/supabaseClient";

import { useAdminData } from "../../src/hooks/useAdminData";

import AdminLayout from "../../src/components/admin/AdminLayout";
import SubmissionFilters from "../../src/components/admin/SubmissionFilters";
import SubmissionTable from "../../src/components/admin/SubmissionTable";
import FanFilters from "../../src/components/admin/FanFilters";
import FanTable from "../../src/components/admin/FanTable";
import AdminSearch from "../../src/components/admin/AdminSearch";

type SubmissionFilter =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "archived";

type FanFilter = "pending" | "approved";

export default function AdminPortal() {
  const router = useRouter();
  const supabase = getSupabaseClient(); // ✅ initialize here

  const {
    authorized,
    loading,
    submissions,
    fanMessages,
    refresh,
  } = useAdminData();

  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  const [tab, setTab] = useState<"submissions" | "fanwall">(
    "submissions"
  );

  const [submissionFilter, setSubmissionFilter] =
    useState<SubmissionFilter>("all");

  const [fanFilter, setFanFilter] =
    useState<FanFilter>("pending");

  const [search, setSearch] = useState("");

  /* -----------------------------
     GET ADMIN EMAIL
  ------------------------------ */

  useEffect(() => {
    async function getAdmin() {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email) {
        setAdminEmail(data.session.user.email);
      }
    }
    getAdmin();
  }, [supabase]);

  /* -----------------------------
     FILTERED SUBMISSIONS
  ------------------------------ */

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];

    let filtered = submissions.filter((s: any) => {
      if (submissionFilter === "archived")
        return s.is_archived;

      if (submissionFilter === "all")
        return !s.is_archived;

      return (
        s.status === submissionFilter &&
        !s.is_archived
      );
    });

    if (search.trim()) {
      const q = search.toLowerCase();

      filtered = filtered.filter((s: any) =>
        s.island_name?.toLowerCase().includes(q) ||
        s.creator_name?.toLowerCase().includes(q) ||
        s.season?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [submissions, submissionFilter, search]);

  /* -----------------------------
     FILTERED FAN MESSAGES
  ------------------------------ */

  const filteredFanMessages = useMemo(() => {
    if (!fanMessages) return [];

    let filtered = fanMessages
      .filter((f: any) => f.status !== "rejected")
      .filter((f: any) => f.status === fanFilter);

    if (search.trim()) {
      const q = search.toLowerCase();

      filtered = filtered.filter((f: any) =>
        f.name?.toLowerCase().includes(q) ||
        f.city?.toLowerCase().includes(q) ||
        f.country?.toLowerCase().includes(q) ||
        f.message?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [fanMessages, fanFilter, search]);

  /* -----------------------------
     AUTH
  ------------------------------ */

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return <div className="p-10">Loading...</div>;
  if (!authorized) return null;

  async function post(endpoint: string, body: any) {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, adminEmail }),
    });
    refresh();
  }

  return (
    <AdminLayout onLogout={logout}>
      {/* UI unchanged */}
    </AdminLayout>
  );
}