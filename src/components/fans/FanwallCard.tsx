"use client";

function getRotation() {
  const rotations = ["rotate-[-1deg]", "rotate-[1deg]", "rotate-[2deg]", "rotate-[-2deg]"];
  return rotations[Math.floor(Math.random() * rotations.length)];
}

export default function FanWallCard({ msg }: { msg: any }) {
  const rotation = getRotation();

  return (
    <div className={`mb-8 break-inside-avoid ${rotation}`}>

      {/* Glow border */}
      <div className="relative group">

        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 opacity-0 blur-sm group-hover:opacity-100 transition duration-500" />

        <div className="relative rounded-xl bg-white p-7 shadow-lg border border-gray-200 transition transform group-hover:-translate-y-2 group-hover:shadow-xl">

          {/* Message */}
          <p className="text-gray-800 text-[15px] leading-relaxed mb-6">
            {msg.message}
          </p>

          {/* Signature */}
          <div className="flex items-center justify-between">

            <div>
              <div className="text-lg font-serif italic text-gray-900">
                {msg.name}
              </div>

              <div className="text-xs text-gray-500">
                {msg.city}, {msg.country}
              </div>
            </div>

            {msg.created_at && (
              <div className="text-[11px] text-gray-400">
                {new Date(msg.created_at).toLocaleDateString()}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}