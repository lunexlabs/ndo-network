"use client";

import Link from "next/link";

export default function WorkspaceSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6">

      <div className="mb-10">
        <h2 className="text-xl font-bold">NDO Workspace</h2>
      </div>

      <nav className="flex flex-col gap-4 text-sm">

        <Link
          href="/workspace"
          className="hover:text-purple-600 transition"
        >
          Dashboard
        </Link>

        <Link
          href="/workspace/admin"
          className="hover:text-purple-600 transition"
        >
          Admin Tools
        </Link>

        <Link
          href="/workspace/login"
          className="hover:text-purple-600 transition"
        >
          Login
        </Link>

      </nav>

    </aside>
  );
}