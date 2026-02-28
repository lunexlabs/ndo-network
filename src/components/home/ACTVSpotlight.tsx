import Container from "../layout/Container";
import Link from "next/link";
import Image from "next/image";

export default function ACTVSpotlight() {
  return (
    <section className="py-28 border-t border-white/10">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-widest text-black-400">
                Featured Show
              </span>
              <span className="px-3 py-1 text-xs bg-red-600/80 border border-red-500/90 rounded-full text-white font-semibold">
                Season 1
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              ACTV: Island Edition
            </h2>

            <p className="text-black/70 mb-8 leading-relaxed">
              A competitive island showcase series where three creators go
              head-to-head each episode. The community votes. The winner
              advances. At the end of the season — one island claims the crown.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/actv"
                className="bg-red-600 hover:bg-red-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
              >
                Watch Season 1
              </Link>

              <Link
                href="/actv/submit"
                className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-md text-sm font-medium text-white"
              >
                Submit Your Island
              </Link>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
            <Image
              src="/images/actv/season1-placeholder.jpg"
              alt="ACTV Season 1 Artwork"
              fill
              priority
              className="object-cover"
            />

            {/* Optional cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

        </div>
      </Container>
    </section>
  );
}