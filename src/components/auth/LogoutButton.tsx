"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:border-black"
    >
      Sign out
    </button>
  );
}