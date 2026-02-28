import Container from "../layout/Container";
import Link from "next/link";

export default function CommunityCTA() {
  return (
    <section className="py-32 border-t border-black/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-purple-700/30 via-purple-600/10 to-transparent blur-3xl" />

      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-purple-400 mb-6">
            Join The Competition
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Think Your Island Deserves The Crown?
          </h2>

          <p className="text-black/70 text-lg mb-10">
            Submit your island for a chance to be featured on ACTV Island
            Edition. Compete, earn community votes, and fight for the
            season title.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/community"
              className="bg-purple-600 hover:bg-purple-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
            >
              Submit Your Island
            </Link>

            <Link
              href="/actv"
              className="border border-black/20 hover:border-black/40 transition px-8 py-4 rounded-md text-sm font-medium"
            >
              Watch ACTV
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}