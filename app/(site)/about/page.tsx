import Container from "@/src/components/layout/Container";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About NDO Network",
  description:
    "Learn the story behind NDO Network, the vision for ACTV Island Edition, and the mission to spotlight creativity in gaming.",
  openGraph: {
    title: "About NDO Network",
    description:
      "The story, mission, and vision behind NDO Network and ACTV.",
    url: "https://ndo.network/about",
    images: [
      {
        url: "https://ndo.network/images/seo/about.jpg",
        width: 1200,
        height: 630,
        alt: "About NDO Network"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ndo.network/images/seo/about.jpg"]
  },
  alternates: {
    canonical: "https://ndo.network/about"
  }
};

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-40 overflow-hidden text-white">
        {/* Background Image */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/about/about-header.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10">
          <Container>
            <div className="max-w-3xl">
              <span className="text-sm uppercase tracking-widest text-red-400 mb-6 block">
                About NDO
              </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Building a Network for Gaming Legacy
            </h1>

              <p className="text-lg text-white leading-relaxed">
                NDO started streaming on YouTube as a way to document something personal, the love
                for gaming, reactions, and the experiences he never wanted to
                forget.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* ABOUT ME + PHOTO */}
      <section className="py-28 bg-white border-b border-gray-200">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/about/profile.jpg"
                alt="Founder of NDO"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Person Behind Network
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                Coby (NDO), started this journey because gaming has always meant more to
                him than just entertainment. It’s connection. It’s emotion.
                It’s memory.
              </p>

<p className="text-gray-600 leading-relaxed">
  In 2024, he was diagnosed with an advanced form of glaucoma, a progressive optic
  neuropathy that has rapidly reduced his vision taking his peripheral already and continues
  to impact his long-term visual capacity.
</p>

<p className="text-gray-600 leading-relaxed mt-4">
  Gaming has been a constant in his life since the 1980s, spanning multiple
  console generations, genres, and online ecosystems. What began as
  entertainment evolved into community, storytelling, and connection.
  After losing hisperipheral vision, simply live streaming was no
  longer enough. He wanted permanence - a structured, intentional archive
  that documents the experiences he loves before his visual world fades
  further.
</p>

<p className="text-gray-600 leading-relaxed mt-4">
  This platform exists as that archive. It is a long-form gaming chronicle
  designed to preserve moments, build genuine community, and refocus gaming
  around shared enjoyment rather than competitive pressure. It is not about
  chasing rankings — it is about capturing legacy.
</p>
            </div>

          </div>
        </Container>
      </section>

      {/* WHY THIS EXISTS */}
<section className="py-28 bg-gray-50 border-b border-gray-200">
  <Container>
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Why This Exists
      </h2>

      <p className="text-gray-600 leading-relaxed mb-6">
        What began as simple livestreams evolved into something far more
        intentional. The network transforms raw gameplay and live broadcasts
        into structured, episodic content designed for long-term viewing.
        Instead of moments disappearing into feeds, each stream becomes part
        of a curated, watchable series.
      </p>

      <p className="text-gray-600 leading-relaxed mb-6">
        This platform operates as a creative production network — developing
        original show formats, themed series, and community-driven segments
        built around interactive gaming experiences. Live sessions are edited,
        organized, and reimagined into narrative-driven content that audiences
        can follow consistently.
      </p>

      <p className="text-gray-600 leading-relaxed">
        The goal is to bridge live energy with professional structure —
        combining authenticity with production value. It is not just gameplay;
        it is formatted entertainment. Not just streaming; but show-building.
        A network designed to turn gaming moments into lasting content.
      </p>
    </div>
  </Container>
</section>

      {/* WHAT I'M BUILDING */}
      <section className="py-28 bg-white">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What I’m Building
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              NDO is evolving into a home for original gaming formats,
              structured playthroughs, and community-driven storytelling.
              It’s about turning moments into seasons, reactions into
              episodes, and gameplay into something meaningful.
            </p>

            <p className="text-gray-600 leading-relaxed">
              The goal isn’t just growth — it’s purpose. To build something
              that lasts. A network that documents experiences and brings
              people together through creativity and shared love for gaming.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}