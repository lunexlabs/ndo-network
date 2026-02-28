"use client";

type Filter =
  | "all"
  | "pending"
  | "approved"
  | "rejected"
  | "archived";

export default function SubmissionFilters({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (filter: Filter) => void;
}) {
  const filters: Filter[] = [
    "all",
    "pending",
    "approved",
    "rejected",
    "archived",
  ];

  return (
    <div className="flex gap-4 mb-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-4 py-1 rounded text-sm capitalize transition ${
            value === f
              ? "bg-black text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}