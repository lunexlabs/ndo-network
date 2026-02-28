import Container from "../../../src/components/layout/Container";
import Link from "next/link";
import Image from "next/image";

export default function ACTVLearnMore() {
  return (
    <section className="bg-black text-white">
      
      {/* HERO */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/actv/season1-placeholder.jpg"
          alt="ACTV Island Edition"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ACTV: Island Edition
          </h1>
          <p className="text-white/70 text-lg md:text-xl">
            A competitive island showcase series where creativity meets
            community.
          </p>

          <div className="mt-10 flex justify-center gap-6">
            <Link
              href="/actv"
              className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-md font-semibold"
            >
              Watch Season 1
            </Link>
            <Link
              href="/actv/submit"
              className="border border-white/20 hover:border-white/40 px-8 py-4 rounded-md"
            >
              Submit Your Island
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <Container>
        <div className="py-28 space-y-28">

          {/* WHAT IS ACTV */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">What Is ACTV?</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              ACTV (Animal Crossing TV) is a competitive island showcase series.
              Each episode features three creators going head-to-head with their
              custom islands. The community votes. One winner advances.
              At the end of the season — one island earns the crown.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-16">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "1. Submit",
                  desc: "Creators submit their island with screenshots and a story explaining the vision behind it."
                },
                {
                  title: "2. Compete",
                  desc: "Three islands are selected per episode. Tours are showcased live."
                },
                {
                  title: "3. Vote",
                  desc: "The community votes to decide who advances and who earns the crown."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 p-8 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SEASON FORMAT */}
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">
              Season Format
            </h2>
            <p className="text-white/70 leading-relaxed text-lg mb-6">
              Each season runs multiple episodes featuring unique island
              concepts and themes. Winners advance through the bracket
              until one island remains.
            </p>

            <div className="bg-gradient-to-br from-purple-600/20 to-red-600/10 border border-white/10 rounded-xl p-10">
              <p className="text-white/80 text-lg">
                Season Finale: The Top Islands face off.
                <br />
                Community votes determine the ultimate winner.
              </p>
            </div>
          </div>

          {/* PRIZE */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              The Prize
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              The winning island receives exclusive recognition,
              featured placement, and a special seasonal reward.
              Future seasons may include sponsored prizes.
            </p>
          </div>

          {/* CALL TO ACTION */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">
              Think You Have What It Takes?
            </h2>

            <Link
              href="/actv/submit"
              className="inline-block bg-red-600 hover:bg-red-500 px-10 py-4 rounded-md text-lg font-semibold"
            >
              Submit Your Island
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}