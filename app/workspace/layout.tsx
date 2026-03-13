import type { ReactNode } from "react";
import WorkspaceSidebar from "@/src/components/workspace/WorkspaceSidebar";

type Props = {
  children: ReactNode;
};

export default function WorkspaceLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <WorkspaceSidebar />

      {/* Page */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}