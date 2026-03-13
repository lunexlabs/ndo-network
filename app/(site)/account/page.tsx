"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/src/lib/supabase/client";
import { uploadAvatar } from "@/src/lib/avatar/uploadAvatar";

export default function AccountPage() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("");

  const [avatar, setAvatar] = useState("/default-avatar.jpg");
  const [uploading, setUploading] = useState(false);

  /* ----------------------------- */
  /* LOAD USER */
  /* ----------------------------- */

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("display_name, role, avatar_url")
        .eq("id", user.id)
        .single();

      if (data) {
        setDisplayName(data.display_name || "");
        setRole(data.role || "");

        if (data.avatar_url && data.avatar_url.startsWith("http")) {
          setAvatar(data.avatar_url);
        }
      }
    }

    loadUser();
  }, []);

  /* ----------------------------- */
  /* AVATAR UPLOAD */
  /* ----------------------------- */

  async function handleAvatarUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file = event.target.files?.[0];
      if (!file || !user) return;

      setUploading(true);

      const avatarUrl = await uploadAvatar(file, user.id);

      await supabase
        .from("profiles")
        .update({
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      setAvatar(avatarUrl);
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
    }
  }

  /* ----------------------------- */
  /* SAVE SETTINGS */
  /* ----------------------------- */

  async function saveSettings() {
    if (!user) return;

    await supabase
      .from("profiles")
      .update({
        display_name: displayName,
      })
      .eq("id", user.id);

    alert("Settings saved");
  }

  /* ----------------------------- */
  /* SIGN OUT */
  /* ----------------------------- */

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-6">

      {/* HEADER */}

      <div className="flex justify-between items-start mb-12">

        <div>
          <p className="text-xs uppercase tracking-widest text-purple-600 mb-3">
            Account
          </p>

          <h1 className="text-4xl font-bold">
            Your settings
          </h1>

          {/* UUID + ROLE */}

          {user && (
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <div>
                <span className="font-medium text-gray-700">User ID:</span>{" "}
                {user.id}
              </div>

              <div>
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {role}
              </div>
            </div>
          )}

        </div>

        <button
          onClick={signOut}
          className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100 transition"
        >
          Sign out
        </button>

      </div>

      {/* SETTINGS CARD */}

      <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm space-y-10">

        {/* DISPLAY NAME + AVATAR */}

        <div className="flex items-center gap-6">

          {/* AVATAR */}

          <label className="relative group cursor-pointer">

            <div className="w-20 h-20 rounded-full overflow-hidden border bg-gray-100 flex items-center justify-center hover:ring-2 hover:ring-purple-500 transition">

              <Image
                src={avatar}
                alt="Avatar"
                width={80}
                height={80}
                className="object-cover rounded-full"
              />

            </div>

            {/* HOVER OVERLAY */}

            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs">
              {uploading ? "Uploading..." : "Change"}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />

          </label>

          {/* DISPLAY NAME */}

          <div className="flex-1">

            <label className="text-sm text-gray-600">
              Display name
            </label>

            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full mt-2 border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

        </div>

        {/* EMAIL */}

        <div>

          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            disabled
            value={user?.email || ""}
            className="w-full mt-2 border border-gray-200 rounded-md px-4 py-3 bg-gray-100"
          />

        </div>

        {/* SAVE BUTTON */}

        <div className="pt-4">

          <button
            onClick={saveSettings}
            className="bg-black text-white px-6 py-3 rounded-md hover:opacity-90 transition"
          >
            Save settings
          </button>

        </div>

      </div>

    </div>
  );
}