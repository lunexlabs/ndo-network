export const dynamic = "force-dynamic";

import Container from "../../src/components/layout/Container";
import { getNotes } from "./actions";
import FanWallModalTrigger from "./FanWallModalTrigger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes – NDO Network",
  description:
    "Leave a note and become part of the NDO community.",
};

/* ----------------------------------
   RANDOM CARD ROTATION
----------------------------------- */

function getRotation() {
  const rotations = [
    "rotate-[-1deg]",
    "rotate-[1deg]",
    "rotate-[2deg]",
    "rotate-[-2deg]",
  ];

  return rotations[Math.floor(Math.random() * rotations.length)];
}

/* ----------------------------------
   NOTE CARD
----------------------------------- */

function NoteCard({ msg }: { msg: any }) {
  const rotation = getRotation();

  return (
    <div className={`mb-8 break-inside-avoid ${rotation}`}>
      <div className="relative group">

        {/* Glow */}
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 opacity-0 blur-sm group-hover:opacity-100 transition duration-500" />

        {/* Card */}
        <div className="relative rounded-xl bg-white p-7 shadow-lg border border-gray-200 transition transform group-hover:-translate-y-2 group-hover:shadow-xl">

          {/* Featured Star */}
          {msg.is_featured && (
            <div className="absolute top-4 right-4 text-yellow-500 text-sm">
              ⭐
            </div>
          )}

          <p className="text-gray-800 text-[15px] leading-relaxed mb-6">
            {msg.message}
          </p>

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

/* ----------------------------------
   PAGE
----------------------------------- */

export default async function NotesPage() {

  const { pinned, notes } = await getNotes();

  return (
    <>
      {/* HERO */}

      <section className="relative py-40 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/fans/fans-header.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

        <Container>

          <div className="relative text-center max-w-3xl mx-auto text-white">

            <span className="uppercase tracking-[0.3em] text-blue-300 text-sm">
              Community
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-6">
              Notes
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Leave a note and become part of the NDO journey.
            </p>

            <div className="mt-10">
              <FanWallModalTrigger />
            </div>

          </div>

        </Container>

      </section>

      {/* PINNED NOTES */}

      {pinned.length > 0 && (

        <section className="py-24 bg-gray-50 border-b">

          <Container>

            <h2 className="text-3xl font-bold text-center mb-16">
              📌 Pinned Notes
            </h2>

            <div className="grid md:grid-cols-2 gap-10">

              {pinned.map((msg: any) => (
                <NoteCard key={msg.id} msg={msg} />
              ))}

            </div>

          </Container>

        </section>

      )}

      {/* COMMUNITY NOTES */}

      <section className="py-32 bg-gradient-to-b from-white to-gray-100">

        <Container>

          <div className="flex items-center justify-between mb-20">

            <h2 className="text-4xl font-bold">
              Community Notes
            </h2>

            <span className="text-sm text-gray-500">
              Showing random notes
            </span>

          </div>

          {notes.length === 0 ? (

            <p className="text-center text-gray-500">
              No notes yet. Be the first to leave one.
            </p>

          ) : (

            <div className="columns-1 md:columns-2 lg:columns-3 gap-8">

              {notes.map((msg: any) => (
                <NoteCard key={msg.id} msg={msg} />
              ))}

            </div>

          )}

        </Container>

      </section>
    </>
  );
}