import Container from "../layout/Container";
import Image from "next/image";

export default function CommunityHero() {
  return (
    <section className="relative overflow-hidden py-32 text-white">

      {/* 🖼 Background Image */}
      <Image
        src="/images/community/community-hero.jpg"
        alt="NDO Community Background"
        fill
        priority
        className="object-cover"
      />

      {/* 🌑 Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      {/* ✨ Purple Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-700/30 via-transparent to-transparent blur-3xl" />

      {/* 🔥 Content Layer */}
      <div className="relative z-10">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-widest text-blue-400 mb-6 block">
              NDO Network
            </span>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              The NDO Community
            </h1>

            <p className="text-white text-lg leading-relaxed">
A community built on creativity, connection, and love for games — where fans and creators gather to share experiences, inspire one another, and shape the future of NDO Network together.
            </p>
          </div>
        </Container>
      </div>

    </section>
  );
}