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
   SUBMIT NOTE
----------------------------------- */

export async function submitNote(formData: FormData) {
  try {
    console.log("Note submission received");

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
        error: "Too many submissions. Please wait before posting again.",
      };
    }

    /* --------------------------
       INSERT NOTE
    --------------------------- */

    const { error: insertError } = await supabase
      .from("fan_wall_messages")
      .insert([
        {
          name,
          city,
          country,
          message,
          status: "pending",
          is_featured: false,
          is_pinned: false,
        },
      ]);

    if (insertError) {
      console.error("Note insert error:", insertError);
      return { error: "Submission failed." };
    }

    console.log("Note saved");

    return { success: true };

  } catch (err) {
    console.error("Note server crash:", err);
    return { error: "Something went wrong." };
  }
}

/* ----------------------------------
   GET NOTES
----------------------------------- */

export async function getNotes() {
  try {
    const supabase = getServerSupabase();

    if (!supabase) {
      console.warn("Supabase unavailable during build");
      return {
        pinned: [],
        notes: [],
      };
    }

    const { data, error } = await supabase
      .from("fan_wall_messages")
      .select("*")
      .eq("status", "approved")
      .limit(200);

    if (error) {
      console.error("Notes fetch error:", error);
      return {
        pinned: [],
        notes: [],
      };
    }

    if (!data) {
      return {
        pinned: [],
        notes: [],
      };
    }

    /* --------------------------
       PINNED NOTES
    --------------------------- */

    const pinned = data.filter((note) => note.is_pinned);

    /* --------------------------
       COMMUNITY NOTES
       (Featured + normal mixed)
    --------------------------- */

    const others = data.filter((note) => !note.is_pinned);

    /* --------------------------
       RANDOMIZE ORDER
    --------------------------- */

    const shuffled = others.sort(() => Math.random() - 0.5);

    return {
      pinned,
      notes: shuffled,
    };

  } catch (err) {
    console.error("Notes fetch crash:", err);

    return {
      pinned: [],
      notes: [],
    };
  }
}