"use client";

import { useState } from "react";
import FanWallForm from "./FanWallForm";

export default function FanWallModalTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-800 transition"
      >
        Leave a Message
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-xl p-8 w-full max-w-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Leave a Message</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <FanWallForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}