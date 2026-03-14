"use client";

import { useEffect, useState } from "react";
import PageContainer from "@/src/components/workspace/PageContainer";
import Card from "@/src/components/workspace/Card";
import { createClient } from "@/src/lib/supabase/client";

export default function SubmissionsPage() {

  const supabase = createClient();

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [modalImage, setModalImage] = useState<string | null>(null);

  async function loadSubmissions() {

    const { data, error } = await supabase
      .from("actv_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setSubmissions(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {

    await supabase
      .from("actv_submissions")
      .update({ status })
      .eq("id", id);

    loadSubmissions();
  }

  function parseScreenshots(screenshots: any) {

    if (!screenshots) return [];

    if (Array.isArray(screenshots)) return screenshots;

    if (typeof screenshots === "string") {
      return screenshots.split(",");
    }

    return [];
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  const filtered =
    filter === "all"
      ? submissions
      : submissions.filter((s) => (s.status || "pending") === filter);

  const counts = {
    all: submissions.length,
    pending: submissions.filter((s) => (s.status || "pending") === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
    archived: submissions.filter((s) => s.status === "archived").length,
  };

  return (
    <PageContainer title="ACTV Submissions">

      <Card>

        <h2 className="text-lg font-semibold mb-4">
          Submissions Queue
        </h2>

        {/* FILTERS */}

        <div className="flex gap-2 mb-6 flex-wrap">

          {["all","pending","approved","rejected","archived"].map((f) => (

            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded border ${
                filter === f
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {f.toUpperCase()} ({counts[f as keyof typeof counts]})
            </button>

          ))}

        </div>

        {loading && (
          <p className="text-gray-500">Loading submissions...</p>
        )}

        {!loading && filtered.length > 0 && (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="border-b bg-gray-50 text-gray-600">

                <tr>

                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Island</th>
                  <th className="p-3 text-left">Creator</th>
                  <th className="p-3 text-left">Dream Address</th>
                  <th className="p-3 text-left">Theme</th>
                  <th className="p-3 text-left">Season</th>
                  <th className="p-3 text-left">Finished</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-right">Actions</th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((s, index) => (

                  <>
                  <tr
                    key={s.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3 text-gray-400">
                      {index + 1}
                    </td>

                    <td className="p-3 text-xs font-mono text-gray-500">
                      {s.id}
                    </td>

                    <td className="p-3 font-medium">

                      <button
                        onClick={() =>
                          setExpanded(expanded === s.id ? null : s.id)
                        }
                        className="underline hover:text-blue-600 text-left"
                      >
                        {s.island_name}
                      </button>

                    </td>

                    <td className="p-3">{s.creator_name}</td>

                    <td className="p-3">{s.dream_address}</td>

                    <td className="p-3">{s.theme}</td>

                    <td className="p-3">{s.season}</td>

                    <td className="p-3">
                      {s.finished ? "✅ Yes" : "⏳ No"}
                    </td>

                    <td className="p-3 capitalize">
                      {s.status || "pending"}
                    </td>

                    <td className="p-3 text-gray-500">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>

                    <td className="p-3">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => updateStatus(s.id, "approved")}
                          className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => updateStatus(s.id, "rejected")}
                          className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => updateStatus(s.id, "archived")}
                          className="px-3 py-1 text-xs rounded bg-gray-600 text-white hover:bg-gray-700"
                        >
                          Archive
                        </button>

                      </div>

                    </td>

                  </tr>

                  {expanded === s.id && (

                    <tr className="bg-gray-50">

                      <td colSpan={11} className="p-6">

                        <div className="grid grid-cols-2 gap-6 text-sm">

                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Email
                            </p>
                            <p>{s.email}</p>
                          </div>

                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Discord
                            </p>
                            <p>{s.discord}</p>
                          </div>

                          <div className="col-span-2">
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Description
                            </p>
                            <p className="text-gray-700">
                              {s.description}
                            </p>
                          </div>

                          {/* SCREENSHOTS */}

                          {parseScreenshots(s.screenshots).length > 0 && (

                            <div className="col-span-2">

                              <p className="text-gray-400 text-xs uppercase mb-3">
                                Screenshots
                              </p>

                              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">

                                {parseScreenshots(s.screenshots).map((img: string, i: number) => (

                                  <img
                                    key={i}
                                    src={img}
                                    alt="Island Screenshot"
                                    onClick={() => setModalImage(img)}
                                    className="cursor-pointer w-full h-32 object-cover rounded-lg border hover:opacity-90"
                                  />

                                ))}

                              </div>

                            </div>

                          )}

                        </div>

                      </td>

                    </tr>

                  )}

                  </>
                ))}

              </tbody>

            </table>

          </div>

        )}

      </Card>

      {/* IMAGE MODAL */}

      {modalImage && (

        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >

          <img
            title="Click to close"
            src={modalImage}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />

        </div>

      )}

    </PageContainer>
  );
}