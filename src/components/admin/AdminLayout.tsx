"use client";

export default function AdminLayout({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) {
  return (
    <div className="min-h-screen bg-white text-gray-900 p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          ACTV Admin Dashboard
        </h1>

        <button
          onClick={onLogout}
          className="border px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>

      {children}

    </div>
  );
}