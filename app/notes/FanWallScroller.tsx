"use client";

import { useEffect, useRef } from "react";

export default function FanWallScroller({ messages }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    let scroll = 0;

    const interval = setInterval(() => {
      scroll += 0.3;
      el.scrollTop = scroll;
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={ref}
      className="h-[500px] overflow-hidden relative border rounded-xl bg-white"
    >
      <div className="space-y-6 p-6">
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            className="border border-gray-200 rounded-lg p-5 bg-gray-50"
          >
            <p className="text-gray-800 mb-3">{msg.message}</p>

            <div className="text-sm text-gray-500">
              — {msg.name} • {msg.city}, {msg.country}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}