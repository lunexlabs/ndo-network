import Container from "@/src/components/layout/Container";
import ShowsHero from "@/src/components/shows/ShowsHero";
import ShowsGrid from "@/src/components/shows/ShowsGrid";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shows – NDO Network",
  description:
    "Explore original NDO Network shows including ACTV: Island Edition and future competitive creative series.",
  openGraph: {
    title: "Shows – NDO Network",
    description:
      "Discover original competitive series and creative showcases.",
    url: "https://ndo.network/shows",
    images: [
      {
        url: "https://ndo.network/images/seo/shows.jpg",
        width: 1200,
        height: 630,
        alt: "NDO Network Shows"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ndo.network/images/seo/shows.jpg"]
  },
  alternates: {
    canonical: "https://ndo.network/shows"
  }
};

export default function ShowsPage() {
  return (
    <>
      <ShowsHero />
      <ShowsGrid />
    </>
  );
}