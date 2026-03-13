"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useAdminData() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [fanMessages, setFanMessages] = useState<any[]>([]);

  async function loadData() {
    try {
      console.log("Loading admin data...");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        setLoading(false);
        return;
      }

      if (!session) {
        console.log("No session. Redirecting.");
        router.push("/ndo-admin-login");
        setLoading(false);
        return;
      }

      console.log("Session found:", session.user.email);

      setAuthorized(true);

      const { data: submissionsData, error: submissionsError } =
        await supabase.from("actv_submissions").select("*");

      if (submissionsError) {
        console.error("Submissions error:", submissionsError);
      }

      const { data: fanData, error: fanError } =
        await supabase.from("fan_wall_messages").select("*");

      if (fanError) {
        console.error("Fan messages error:", fanError);
      }

      setSubmissions(submissionsData || []);
      setFanMessages(fanData || []);

    } catch (err) {
      console.error("Admin data crash:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    loading,
    authorized,
    submissions,
    fanMessages,
    refresh: loadData,
  };
}