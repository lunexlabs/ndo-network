import Container from "../layout/Container";
import Image from "next/image";

export default function ShowsHero() {
  return (
    <section className="relative overflow-hidden py-32 text-white">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/shows/show-header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Image Fallback (behind overlay, not blending weirdly)
      <Image
        src="/images/shows-hero-fallback.jpg"
        alt=""
        fill
        priority
        className="object-cover z-0"
      />
       */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/30 via-transparent to-transparent blur-3xl z-10" />

      {/* Content */}
      <div className="relative z-20">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-widest text-green-400 mb-6 block">
              NDO Originals
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Network Shows
            </h1>

            <p className="text-white text-lg leading-relaxed">
              Structured gaming formats, competitive series, and evolving
              interactive content produced under the NDO Network.
            </p>
          </div>
        </Container>
      </div>

    </section>
  );
}