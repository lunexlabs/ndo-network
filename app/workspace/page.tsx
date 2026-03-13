"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/src/lib/supabase/client";

export default function WorkspaceHome() {
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("/default-avatar.png");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);

      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username || "");

        if (data.avatar_url) {
          setAvatar(data.avatar_url);
        }
      }
    }

    loadUser();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        NDO Workspace
      </h1>

      <p className="text-gray-600 mb-10">
        Admin tools and dashboard
      </p>

      {/* USER CARD */}

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-6 shadow-sm">

        {/* Avatar */}

        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
          <Image
            src={avatar}
            alt="User avatar"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        {/* Info */}

        <div>
          <p className="text-sm text-gray-500">
            Signed in as
          </p>

          <p className="font-semibold text-lg">
            {username || "User"}
          </p>

          <p className="text-sm text-gray-600">
            {user?.email}
          </p>
        </div>

      </div>

    </div>
  );
}