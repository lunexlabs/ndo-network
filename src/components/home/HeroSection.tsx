import Container from "../layout/Container";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-600/20 via-transparent to-transparent blur-3xl" />

      <Container>
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-purple-400 mb-6">
            Official Network Platform
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            Where Gaming Shows Become Events.
          </h1>

          <p className="text-black/90 text-lg mb-10">
            Watch full episodes, explore ACTV Island Edition, and dive into
            structured gaming series built for the community.
          </p>

          <div className="flex gap-4">
            <Link
              href="/actv"
              className="bg-purple-600 hover:bg-purple-500 transition px-6 py-3 rounded-md text-sm font-medium text-white"
            >
              Explore ACTV
            </Link>

            <Link
              href="/shows"
              className="border border-black/20 hover:border-black/40 transition px-6 py-3 rounded-md text-sm font-medium"
            >
              View All Shows
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}