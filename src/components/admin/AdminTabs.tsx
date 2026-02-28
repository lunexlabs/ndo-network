export default function AdminTabs({
  tab,
  setTab,
}: {
  tab: string;
  setTab: (value: any) => void;
}) {
  return (
    <div className="flex gap-6 mb-6 border-b pb-2">
      <button
        onClick={() => setTab("submissions")}
        className={tab === "submissions"
          ? "font-semibold border-b-2 border-black pb-2"
          : "text-gray-500"}
      >
        Island Submissions
      </button>

      <button
        onClick={() => setTab("fanwall")}
        className={tab === "fanwall"
          ? "font-semibold border-b-2 border-black pb-2"
          : "text-gray-500"}
      >
        Fan Wall Messages
      </button>
    </div>
  );
}