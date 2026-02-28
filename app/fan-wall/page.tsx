export const dynamic = "force-dynamic";

import Container from "../../src/components/layout/Container";
import { getApprovedMessages } from "./actions";
import FanWallForm from "./FanWallForm";

export default async function FanWallPage() {
  const messages = await getApprovedMessages();

  return (
    <>
      {/* =========================
          HERO
      ========================== */}
      <section className="relative py-32 border-b border-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/fans/fans-header.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <Container>
          <div className="relative max-w-3xl">
            <span className="text-sm uppercase tracking-widest text-blue-300 mb-6 block">
              Community
            </span>

            <h1 className="text-5xl font-bold text-white mb-8">
              Fan Wall
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed">
              Leave a message. Share encouragement. Be part of the journey.
            </p>
          </div>
        </Container>
      </section>

      {/* FORM */}
      <section className="py-24 bg-gray-50 border-b border-gray-200">
        <Container>
          <FanWallForm />
        </Container>
      </section>

      {/* WALL */}
      <section className="py-28 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">
            Messages From The Community
          </h2>

          {messages.length === 0 ? (
            <p className="text-center text-gray-500">
              No messages yet. Be the first.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-md transition"
                >
                  <p className="text-gray-800 mb-6 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="text-sm text-gray-500 space-y-1">
                    <div>
                      — {msg.name} • {msg.city}, {msg.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}