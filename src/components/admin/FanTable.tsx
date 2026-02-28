"use client";

type FanMessage = {
  id: string;
  name: string;
  city?: string;
  country?: string;
  message: string;
  status: string;
};

export default function FanTable({
  data,
  onApprove,
  onReject,
  onDelete,
}: {
  data: FanMessage[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {data.map((f) => (
        <div
          key={f.id}
          className="border p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {f.name} • {f.city}, {f.country}
            </p>

            <p className="text-sm text-gray-600">
              {f.message}
            </p>
          </div>

          <div className="flex gap-3">

            {f.status === "pending" && (
              <>
                <button
                  onClick={() => onApprove(f.id)}
                  className="text-green-600 hover:underline"
                >
                  Approve
                </button>

                <button
                  onClick={() => onReject(f.id)}
                  className="text-red-600 hover:underline"
                >
                  Reject
                </button>
              </>
            )}

            <button
              onClick={() => onDelete(f.id)}
              className="text-red-700 hover:underline"
            >
              Delete
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}