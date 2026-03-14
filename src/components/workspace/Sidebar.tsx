"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Users,
  Settings,
  Shield,
  Grid2x2
} from "lucide-react";

const version = process.env.NEXT_PUBLIC_WORKSPACE_VERSION || "0.1.0";

const navItems = [
  {
    label: "Dashboard",
    href: "/workspace",
    icon: LayoutDashboard,
  },
  {
    label: "Community Notes",
    href: "/workspace/community-notes",
    icon: MessageSquare,
  },
  {
    label: "ACTV Submissions",
    href: "/workspace/actv-submissions",
    icon: Video,
  },
  {
    label: "Users",
    href: "/workspace/users",
    icon: Users,
  },
  {
    label: "Admin Tools",
    href: "/workspace/admin",
    icon: Shield,
  },
  {
    label: "Settings",
    href: "/workspace/settings",
    icon: Settings,
  },
];

export default function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className="w-[260px] h-screen bg-[#F4F6FB] border-r border-gray-200 flex flex-col">

      {/* HEADER */}

      <div className="px-6 py-6">

        <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">

          {/* NDO colored */}

          <span>
            <span className="text-green-400">N</span>
            <span className="text-red-400">D</span>
            <span className="text-orange-400">O</span>
          </span>

          {/* Workspace gradient */}

          <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
            Workspace
          </span>

        </div>

        <p className="text-[11px] text-gray-400 mt-1">
          Version {version}
        </p>

      </div>


      {/* NAVIGATION */}

      <nav className="flex flex-col gap-2 px-3">

        {navItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                transition
                ${active
                  ? "bg-white shadow-sm text-black"
                  : "text-gray-600 hover:bg-white"}
              `}
            >

              {/* ACTIVE LEFT BAR */}

              {active && (
                <div className="absolute left-0 w-1 h-6 bg-teal-400 rounded-r" />
              )}

              <Icon size={18} />

              {item.label}

            </Link>
          );
        })}

      </nav>


      {/* BOTTOM GRID BUTTON */}

      <div className="mt-auto flex justify-center pb-6">

        <button
          title="Workspace overview"
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-lg
            text-gray-500
            hover:bg-white
            transition
          "
        >
          <Grid2x2 size={20} />
        </button>

      </div>

    </aside>
  );
}