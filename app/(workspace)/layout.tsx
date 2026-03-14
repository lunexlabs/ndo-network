"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/src/components/workspace/Sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* MOBILE SIDEBAR OVERLAY */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`
        fixed lg:static z-50
        h-full w-64 bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <Sidebar close={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN AREA */}

      <div className="flex-1 flex flex-col">

        {/* MOBILE TOPBAR */}

        <div className="lg:hidden flex items-center gap-3 p-4 border-b bg-white">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          <span className="font-semibold">NDO Workspace</span>

        </div>

        {/* CONTENT */}

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}