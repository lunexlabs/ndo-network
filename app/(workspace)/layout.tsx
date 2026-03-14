"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/src/components/workspace/Sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* -----------------------------
     PREVENT BODY SCROLL
  ----------------------------- */

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  return (
    <div className="min-h-dvh bg-gray-50 flex">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <div
        className={`
        fixed lg:static
        top-0 left-0
        z-50
        h-full
        w-[260px]
        bg-[#F4F6FB]
        border-r border-gray-200
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <Sidebar close={() => setSidebarOpen(false)} />
      </div>

      {/* MAIN AREA */}

      <div className="flex-1 flex flex-col min-w-0">

        {/* MOBILE TOPBAR */}

        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b bg-white">

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <Menu size={20} />
          </button>

          <span className="font-semibold tracking-tight">
            NDO Workspace
          </span>

        </div>

        {/* CONTENT */}

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}