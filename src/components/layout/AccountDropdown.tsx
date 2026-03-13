"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AccountDropdown() {
  const supabase = createClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* -------------------------
     LOAD USER
  ------------------------- */

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

      setProfile(data);
    }

    loadUser();
  }, []);

  /* -------------------------
     CLICK OUTSIDE CLOSE
  ------------------------- */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  /* -------------------------
     LOGOUT
  ------------------------- */

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <img
          title="User Avatar"
          src={profile?.avatar_url || "/default-avatar.png"}
          className="w-8 h-8 rounded-md"
        />

        <span className="text-sm font-medium text-gray-800">
          {profile?.display_name || "Account"}
        </span>

        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div
          className="
          absolute right-0 mt-3 w-64 rounded-xl
          bg-white/96
          backdrop-blur-xl
          border border-white/40
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          overflow-hidden
          "
        >

          {/* PROFILE */}
          <div className="flex items-center gap-3 p-4 border-b border-white/40">

            <img
              title="User Avatar"
              src={profile?.avatar_url || "/default-avatar.png"}
              className="w-10 h-10 rounded-md"
            />

            <div>
              <div className="font-medium text-gray-900">
                {profile?.display_name}
              </div>

              <div className="text-xs text-gray-600">
                {user.email}
              </div>
            </div>

          </div>

          {/* LINKS */}

          <DropdownItem
            label="Account Settings"
            onClick={() => {
              setOpen(false);
              router.push("/account");
            }}
          />

          {(profile?.role === "admin" || profile?.role === "owner") && (
            <DropdownItem
              label="Admin Portal"
              onClick={() => {
                setOpen(false);
                router.push("/ndo-admin-portal");
              }}
            />
          )}

          <DropdownItem
            label="Fan Wall"
            onClick={() => {
              setOpen(false);
              router.push("/fans");
            }}
          />

          <DropdownItem
            label="Help Center"
            onClick={() => {
              setOpen(false);
              router.push("/contact");
            }}
          />

          {/* LOGOUT */}

          <div className="border-t border-white/40">

            <button
              onClick={logout}
              className="w-full text-left px-4 py-3 text-red-500 hover:bg-white/30"
            >
              Sign Out
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
      block w-full text-left px-4 py-3
      text-gray-800
      hover:bg-white/30
      transition
      "
    >
      {label}
    </button>
  );
}