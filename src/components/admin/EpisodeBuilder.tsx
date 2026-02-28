"use client";

export default function EpisodeBuilder({
  approvedSubmissions,
  refresh,
}: {
  approvedSubmissions: any[];
  refresh: () => void;
}) {
  async function assignEpisode(id: string, episode: number) {
    await fetch("/api/admin/assign-episode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, episode }),
    });

    refresh();
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Episode Builder
      </h2>

      {approvedSubmissions.map((s) => (
        <div key={s.id} className="border p-4 mb-4">
          {s.island_name}
          <button
            onClick={() => assignEpisode(s.id, 4)}
            className="ml-4 text-blue-600"
          >
            Assign to Episode 4
          </button>
        </div>
      ))}
    </div>
  );
}