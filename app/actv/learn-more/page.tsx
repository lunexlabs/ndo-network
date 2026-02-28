import Container from "../../../src/components/layout/Container";
import Link from "next/link";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACTV - Learn More | NDO Network",
  description:
    "ACTV (Animal Crossing TV) is a structured competition series built around showcasing the most impressive, creative, and visionary island designs in the Animal Crossing community.",
  keywords: [
    "ACTV",
    "Animal Crossing TV",
    "NDO",
    "Island Showcase",
    "NDO Network",
  ],
  openGraph: {
    title: "ACTV - Learn More | NDO Network",
    description:
      "ACTV (Animal Crossing TV) is a structured competition series built around showcasing the most impressive, creative, and visionary island designs in the Animal Crossing community.",
    url: "https://ndo.network/actv/learn-more",
    siteName: "NDO Network",
    images: [
      {
        url: "https://ndo.network/images/seo-image.jpg",
        width: 1200,
        height: 630,
        alt: "ACTV - Learn More",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACTV - Learn More | NDO Network",
    description:
      "ACTV (Animal Crossing TV) is a structured competition series built around showcasing the most impressive, creative, and visionary island designs in the Animal Crossing community.",
    images: ["https://ndo.network/images/seo-image.jpg"],
  },
  alternates: {
    canonical: "https://ndo.network/actv/learn-more",
  },
};

export default function ACTVLearnMore() {
  return (
    <section className="bg-black text-white">
      
      {/* HERO */}
      <div className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/actv/season1-placeholder.jpg"
          alt="ACTV Island Edition"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ACTV: Island Edition
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            Animal Crossing TV is a competitive island showcase series where
            world-class creativity meets community decision making.
            Three creators. One episode. One crown.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
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

      <Container>
        <div className="py-28 space-y-32">

          {/* WHAT IS ACTV */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              What Is ACTV?
            </h2>

            <p className="text-white/70 leading-relaxed text-lg mb-6">
              ACTV (Animal Crossing TV) is a structured competition series
              built around showcasing the most impressive, creative, and
              visionary island designs in the Animal Crossing community.
            </p>

            <p className="text-white/70 leading-relaxed text-lg">
              Each episode features three unique islands selected from community
              submissions. Islands are toured, evaluated, and presented in a
              cinematic format. After all tours conclude, the community votes
              to determine the winner of that episode.
            </p>
          </div>

          {/* WHY ACTV EXISTS */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Why ACTV Exists
            </h2>

            <p className="text-white/70 leading-relaxed text-lg">
              Animal Crossing is more than a game — it’s architecture,
              storytelling, interior design, world building, and emotional
              expression. ACTV exists to spotlight creators who treat their
              islands as art.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-16">
              Episode Structure
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "1. Selection",
                  desc: "Creators submit their island along with screenshots, theme explanation, and creative vision. Three islands are selected per episode."
                },
                {
                  title: "2. Tour & Showcase",
                  desc: "Each island receives a guided tour highlighting design details, creativity, layout, and storytelling elements."
                },
                {
                  title: "3. Community Vote",
                  desc: "After all tours are complete, the audience votes to determine the episode winner."
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

          {/* JUDGING CRITERIA */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              What Makes a Winning Island?
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {[
                "Originality & Concept Strength",
                "Visual Cohesion & Layout",
                "Detail & Decorative Depth",
                "Theme Consistency",
                "Creative Risk & Innovation",
                "Emotional Impact"
              ].map((criteria) => (
                <div
                  key={criteria}
                  className="bg-white/5 border border-white/10 p-6 rounded-lg"
                >
                  <p className="text-white/80">{criteria}</p>
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
              Season 1 — "The First Crown" — introduces the competitive format.
              Episode winners advance through a structured bracket system.
              The top islands return for the Season Finale.
            </p>

            <div className="bg-gradient-to-br from-purple-600/20 to-red-600/10 border border-white/10 rounded-xl p-10">
              <p className="text-white/80 text-lg">
                Season Finale: The remaining islands face off.
                <br />
                Community votes determine the ultimate champion.
              </p>
            </div>
          </div>

          {/* COMMUNITY ROLE */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              The Power of Community
            </h2>

            <p className="text-white/70 text-lg leading-relaxed">
              ACTV is not judge-driven. It is community-driven.
              Viewers decide outcomes. The audience shapes the season.
              Every vote influences who advances and who earns the crown.
            </p>
          </div>

          {/* PRIZES */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              The Prize
            </h2>

            <p className="text-white/70 text-lg leading-relaxed mb-6">
              The Season Champion earns:
            </p>

            <ul className="space-y-3 text-white/80">
              <li>• Featured spotlight placement</li>
              <li>• Official ACTV Season Winner recognition</li>
              <li>• Exclusive seasonal reward</li>
              <li>• Future sponsored prize opportunities</li>
            </ul>
          </div>

          {/* LONG TERM VISION */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              The Future of ACTV
            </h2>

            <p className="text-white/70 text-lg leading-relaxed">
              Future editions may include themed seasons, home design
              competitions, speed builds, collaborative showcases,
              and sponsored creative challenges.
              ACTV is built to evolve.
            </p>
          </div>

          {/* FINAL CTA */}
          <div className="text-center pt-10">
            <h2 className="text-4xl font-bold mb-8">
              Ready To Compete?
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