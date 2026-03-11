"use server";

import { createClient } from "@supabase/supabase-js";

/* ----------------------------------
   SAFE SERVER CLIENT FACTORY
----------------------------------- */

function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.warn("Supabase env vars missing (likely build phase)");
    return null;
  }

  return createClient(url, serviceKey);
}

/* ----------------------------------
   UTIL
----------------------------------- */

function clean(value: FormDataEntryValue | null) {
  return value?.toString().trim() || "";
}

/* ----------------------------------
   SUBMIT FAN MAIL
----------------------------------- */

export async function submitFanMail(formData: FormData) {
  try {

    console.log("Fan mail submission received");

    const supabase = getServerSupabase();

    if (!supabase) {
      console.warn("Supabase client unavailable");
      return { error: "Server not ready." };
    }

    const name = clean(formData.get("name"));
    const city = clean(formData.get("city"));
    const country = clean(formData.get("country"));
    const message = clean(formData.get("message"));

    /* --------------------------
       VALIDATION
    --------------------------- */

    if (!name || !city || !country || !message) {
      return { error: "All fields are required." };
    }

    if (name.length > 60) {
      return { error: "Name is too long." };
    }

    if (message.length > 300) {
      return { error: "Message must be under 300 characters." };
    }

    /* --------------------------
       RATE LIMIT
       (Max 3 submissions per minute per name)
    --------------------------- */

    const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();

    const { count, error: rateError } = await supabase
      .from("fan_wall_messages")
      .select("*", { count: "exact", head: true })
      .eq("name", name)
      .gte("created_at", oneMinuteAgo);

    if (rateError) {
      console.error("Rate limit query failed:", rateError);
      return { error: "Unable to verify submission limits." };
    }

    if (count && count >= 3) {
      return {
        error: "Too many submissions. Please wait before posting again."
      };
    }

    /* --------------------------
       INSERT MESSAGE
    --------------------------- */

    const { error: insertError } = await supabase
      .from("fan_wall_messages")
      .insert([
        {
          name,
          city,
          country,
          message,
          status: "pending"
        }
      ]);

    if (insertError) {
      console.error("Fan wall insert error:", insertError);
      return { error: "Submission failed." };
    }

    console.log("Fan wall submission saved");

    return { success: true };

  } catch (err) {
    console.error("Fan wall server crash:", err);
    return { error: "Something went wrong." };
  }
}

/* ----------------------------------
   GET APPROVED MESSAGES
----------------------------------- */

export async function getApprovedMessages() {
  try {

    const supabase = getServerSupabase();

    if (!supabase) {
      console.warn("Supabase unavailable during build");
      return [];
    }

    const { data, error } = await supabase
      .from("fan_wall_messages")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Fan wall fetch error:", error);
      return [];
    }

    return data ?? [];

  } catch (err) {
    console.error("Fan wall fetch crash:", err);
    return [];
  }
}