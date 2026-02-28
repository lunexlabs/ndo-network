import Container from "../layout/Container";
import Image from "next/image";

export default function ACTVSeasonOverview() {
  return (
    <section className="relative py-24 border-t border-black/10 overflow-hidden">

      {/* 🔥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/actv/actv-season-overview.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* 🔥 Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 🔥 Content Layer */}
      <div className="relative z-10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="text-white">
              <span className="px-4 py-1 text-xs bg-red-500 border border-red-400 rounded-full">
                Season 1
              </span>

              <h2 className="text-4xl font-bold mt-6 mb-6">
                The First Crown
              </h2>

              <p className="text-white leading-relaxed">
                Season 1 introduces the format to the world. Each episode
                features three unique island tours followed by a community
                vote. Winners advance until one island earns the title.
              </p>
            </div>

            {/* RIGHT MEDIA BLOCK */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/20 backdrop-blur-sm bg-white/5">

              {/* Image Placeholder / Poster */}
              <Image
                src="/images/actv/season1-placeholder.jpg"
                alt="ACTV Season 1 Artwork"
                fill
                className="object-cover"
              />

              {/* Soft Overlay */}
              <div className="absolute inset-0 bg-black/0" />

              {/* Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm uppercase tracking-widest">
                  
                </span>
              </div>

            </div>

          </div>
        </Container>
      </div>

    </section>
  );
}