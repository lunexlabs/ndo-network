"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { createClient } from "@/src/lib/supabase/client";

export default function DashboardHeader() {

  const supabase = createClient();

  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [loading, setLoading] = useState(true);

  const timezone = "America/Chicago";

  /* -----------------------------
     CLOCK
  ----------------------------- */

  useEffect(() => {

    function updateClock() {

      const now = new Date();

      const formatted = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      setClock(formatted);

    }

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);

  }, []);

  /* -----------------------------
     LOAD USER
  ----------------------------- */

  useEffect(() => {

    async function loadUser() {

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setEmail(user.email || null);

      if (user.last_sign_in_at) {

        const last = new Date(user.last_sign_in_at).toLocaleString("en-US", {
          timeZone: timezone,
          dateStyle: "medium",
          timeStyle: "short"
        });

        setLastLogin(last);
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (profile) {

        setDisplayName(profile.display_name || null);

        if (profile.avatar_url) {
          setAvatar(profile.avatar_url);
        }

      }

      setLoading(false);
    }

    loadUser();

  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4 h-[80px]">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    );
  }

  return (
    <div className="mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT SECTION */}

        <div className="flex items-start gap-4">

          {/* AVATAR */}

          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">

            <Image
              src={avatar}
              alt="avatar"
              width={48}
              height={48}
              className="object-cover"
            />

          </div>

          {/* TITLE */}

          <div>

            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-600 text-sm">

              Welcome back,
              {" "}
              <span className="font-medium">
                <strong>{displayName}</strong>
              </span>

              {lastLogin && (
                <span className="text-gray-400">
                  {" • "}Last login {lastLogin}
                </span>
              )}

            </p>

          </div>

        </div>


        {/* CLOCK */}

        <div className="text-left lg:text-center">

          <p className="text-xs text-gray-500 tracking-wide">
            Creator Time
          </p>

          <p className="text-3xl font-light tracking-wide">
            {clock}
          </p>

        </div>


        {/* SEARCH */}

        <div className="relative w-full lg:w-64">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="
              w-full
              bg-gray-100
              pl-9 pr-4
              py-2
              rounded-lg
              outline-none
            "
          />

        </div>

      </div>

    </div>
  );
}