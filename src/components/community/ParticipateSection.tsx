import Container from "../layout/Container";
import Link from "next/link";

export default function ParticipateSection() {
  return (
    <section className="py-24 border-t border-black/10">
      <Container>
        <h2 className="text-3xl font-bold mb-12">
          Participate In The Network
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="p-8 border border-black/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold mb-4">
              ACTV Submissions
            </h3>
            <p className="text-black/70 mb-6">
              Submit your island for a chance to compete in ACTV Island Edition.
            </p>
            <Link
              href="/actv/learn-more"
              className="text-black-400 hover:text-green-500 transition text-sm"
            >
              Learn More →
            </Link>
          </div>

          <div className="p-8 border border-black/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold mb-4">
              Live stream Participation
            </h3>
            <p className="text-black/70">
              Join live gameplay sessions, community challenges, and interactive
              chat-driven moments.
            </p>
          </div>

          <div className="p-8 border border-black/10 rounded-xl bg-white/5">
            <h3 className="text-xl font-semibold mb-4">
              Upcoming Series
            </h3>
            <p className="text-black/70">
              Be part of new formats, competitions, and walkthrough projects
              launching soon.
            </p>
          </div>

        </div>
      </Container>
    </section>
  );
}