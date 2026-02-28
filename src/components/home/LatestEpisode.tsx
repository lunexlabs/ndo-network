import Container from "../layout/Container";
import Link from "next/link";

export default function LatestEpisode() {
  return (
    <section className="py-28 border-t border-black/10">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Video Thumbnail Placeholder */}
          <div className="relative">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-600/40 via-purple-500/20 to-transparent border border-black/10 backdrop-blur-md flex items-center justify-center">
              <span className="text-black/40 text-sm uppercase tracking-widest">
                Episode 1 Thumbnail / Trailer
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm uppercase tracking-widest text-purple-400 mb-4">
              Latest Episode
            </p>

            <h2 className="text-4xl font-bold tracking-tight mb-6">
              ACTV: Island Edition — Episode 1
            </h2>

            <p className="text-black/70 mb-8 leading-relaxed">
              Three islands. One community vote. Watch the first official
              episode of ACTV Island Edition and see which creator takes
              the early lead this season.
            </p>

            <div className="flex gap-4">
              <Link
                href="/actv"
                className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded-md text-sm font-medium text-white"
              >
                Watch Now
              </Link>

              <Link
                href="/community"
                className="border border-black/20 hover:border-black/40 transition px-6 py-3 rounded-md text-sm font-medium"
              >
                Vote
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}