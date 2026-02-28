"use client";

export default function AdminStats({
  submissions,
  fanMessages,
}: {
  submissions: any[];
  fanMessages: any[];
}) {
  const pendingSubmissions = submissions.filter(
    (s) => s.status === "pending" && !s.deleted_at
  ).length;

  const approvedSubmissions = submissions.filter(
    (s) => s.status === "approved" && !s.deleted_at
  ).length;

  const archived = submissions.filter(
    (s) => s.is_archived
  ).length;

  const pendingFan = fanMessages.filter(
    (f) => f.status === "pending" && !f.deleted_at
  ).length;

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <Stat label="Pending Islands" value={pendingSubmissions} />
      <Stat label="Approved Islands" value={approvedSubmissions} />
      <Stat label="Archived" value={archived} />
      <Stat label="Pending Fan Messages" value={pendingFan} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-6 text-center">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-500 mt-2">{label}</div>
    </div>
  );
}