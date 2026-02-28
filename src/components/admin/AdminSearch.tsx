"use client";

export default function AdminSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="border px-4 py-2 w-full max-w-md mb-6"
    />
  );
}