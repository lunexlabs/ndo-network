import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import LogoutButton from "@/src/components/auth/LogoutButton";
import AccountSettingsForm from "@/src/components/auth/AccountSettingsForm";

type AccountPageProps = {
  searchParams?: {
    message?: string;
  };
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Failed to load profile:", error.message);
  }

  const message = searchParams?.message;

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              Account
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Your settings
            </h1>
          </div>

          <LogoutButton />
        </div>

        {/* Redirect Messages */}
        {message && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {message}
          </div>
        )}

        {/* Account Settings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <AccountSettingsForm
            userId={user.id}
            email={user.email ?? ""}
            initialDisplayName={profile?.display_name ?? ""}
            role={profile?.role ?? "user"}
          />
        </div>

      </div>
    </main>
  );
}