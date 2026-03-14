"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";

import {
  User,
  Shield,
  MessageSquare,
  HelpCircle,
  LogOut
} from "lucide-react";

export default function AccountDropdown() {
  const supabase = createClient();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);

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

      if (data) setProfile(data);
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
    setLoggingOut(true);

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  /* -------------------------
     OPEN WORKSPACE TAB
  ------------------------- */

  function openWorkspace() {
    setOpen(false);

    window.open("/workspace", "_blank", "noopener,noreferrer");
  }

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">

      {/* BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2"
      >
        <img
          src={profile?.avatar_url || "/default-avatar.png"}
          alt="User Avatar"
          className="w-8 h-8 rounded-md object-cover"
        />

        <span className="text-sm font-medium text-gray-800">
          {profile?.display_name || "Account"}
        </span>

        <span className="text-xs">▾</span>
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
          absolute right-0 mt-3 w-64 rounded-xl
          bg-white/96 backdrop-blur-xl
          border border-white/40
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          overflow-hidden
          "
        >

          {/* PROFILE HEADER */}

          <div className="flex items-center gap-3 p-4 border-b border-white/40">

            <img
              src={profile?.avatar_url || "/default-avatar.png"}
              alt="Profile Avatar"
              className="w-10 h-10 rounded-md object-cover"
            />

            <div>

              <div className="font-medium text-gray-900">
                {profile?.display_name || "User"}
              </div>

              <div className="text-xs text-gray-600">
                {user.email}
              </div>

            </div>

          </div>

          {/* LINKS */}

          <DropdownItem
            icon={User}
            label="Account Settings"
            onClick={() => {
              setOpen(false);
              router.push("/account");
            }}
          />

          {(profile?.role === "admin" || profile?.role === "owner") && (
            <DropdownItem
              icon={Shield}
              label="Workspace Portal"
              onClick={openWorkspace}
            />
          )}

          <DropdownItem
            icon={MessageSquare}
            label="Fan Wall"
            onClick={() => {
              setOpen(false);
              router.push("/notes");
            }}
          />

          <DropdownItem
            icon={HelpCircle}
            label="Help Center"
            onClick={() => {
              setOpen(false);
              router.push("/contact");
            }}
          />

          {/* LOGOUT */}

          <div className="border-t border-white/40">

            <DropdownItem
              icon={LogOut}
              label={loggingOut ? "Signing out..." : "Sign Out"}
              danger
              onClick={logout}
            />

          </div>

        </div>
      )}
    </div>
  );
}

/* -------------------------
   DROPDOWN ITEM
------------------------- */

function DropdownItem({
  label,
  icon: Icon,
  onClick,
  danger = false
}: {
  label: string;
  icon: any;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
      flex items-center gap-3 w-full text-left px-4 py-3
      ${danger ? "text-red-500" : "text-gray-800"}
      hover:bg-white/30 transition
      `}
    >

      <Icon size={16} />

      {label}

    </button>
  );
}