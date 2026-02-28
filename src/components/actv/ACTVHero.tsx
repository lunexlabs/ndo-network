import Container from "../layout/Container";
import Link from "next/link";

export default function ACTVHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/actv-hero.jpg"
          alt="ACTV Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <Container>
          <div className="max-w-3xl">
            <span className="text-sm uppercase tracking-widest text-amber-300 mb-6 block">
              Featured Show • Coming Soon
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              ACTV: Island Edition
            </h1>

            <p className="text-lg text-gray-200 mb-10 max-w-xl">
              A competitive island showcase series where creators go head-to-head.
              The community votes. One island claims the crown.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/watch"
                className="bg-amber-600 hover:bg-amber-500 px-6 py-3 rounded-md font-medium transition"
              >
                Coming Soon
              </Link>

              <Link
                href="/actv/submit"
                className="border border-white/70 hover:bg-white hover:text-black px-6 py-3 rounded-md font-medium transition"
              >
                Submit Your Island
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}