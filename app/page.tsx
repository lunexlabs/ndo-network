import HeroSlider from "../src/components/home/HeroSlider";
import ACTVSpotlight from "../src/components/home/ACTVSpotlight";
import LatestPreview from "../src/components/home/LatestPreview";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDO Network – Gaming, Live Streams & ACTV Island Edition",
  description:
    "Official home of NDO Network. Live streams, gaming content, and ACTV: Island Edition — the competitive Animal Crossing showcase series.",
  keywords: [
    "NDO Network",
    "ACTV Island Edition",
    "Gaming Content",
    "Animal Crossing TV",
    "Live Streams"
  ],
  openGraph: {
    title: "NDO Network – Gaming & ACTV Island Edition",
    description:
      "Watch live streams, gaming content, and the competitive ACTV Island Edition series.",
    url: "https://ndo.network",
    siteName: "NDO Network",
    images: [
      {
        url: "https://ndo.network/images/seo/home.jpg",
        width: 1200,
        height: 630,
        alt: "NDO Network"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NDO Network – Gaming & ACTV",
    description:
      "Gaming content, live streams, and ACTV Island Edition.",
    images: ["https://ndo.network/images/seo/home.jpg"]
  },
  alternates: {
    canonical: "https://ndo.network"
  }
};

export default function Home() {
  return (
    <>
      <HeroSlider />
      <LatestPreview />
      <ACTVSpotlight />
    </>
  );
}