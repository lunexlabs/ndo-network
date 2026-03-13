import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

export type AppRole = "user" | "moderator" | "admin" | "owner";

type AdminProfile = {
  id: string;
  email: string | null;
  display_name: string | null;
  role: AppRole;
};

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?message=Please log in to continue.");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, display_name, role")
    .eq("id", user.id)
    .single<AdminProfile>();

  if (error || !profile) {
    redirect("/account?message=We could not load your profile.");
  }

  if (profile.role !== "admin" && profile.role !== "owner") {
    redirect("/account?message=You do not have permission to access the admin portal.");
  }

  return {
    supabase,
    user,
    profile,
  };
}