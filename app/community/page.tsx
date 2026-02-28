import CommunityHero from "../../src/components/community/CommunityHero";
import ParticipateSection from "../../src/components/community/ParticipateSection";
import InfluenceSection from "../../src/components/community/InfluenceSection";
import JoinNetworkSection from "../../src/components/community/JoinNetworkSection";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Community – NDO Network",
  description:
    "Join the NDO Network community. Submit islands for ACTV, vote on episodes, and connect with fellow creators.",
  openGraph: {
    title: "Community – NDO Network",
    description:
      "Submit, vote, and connect through the ACTV community.",
    url: "https://ndo.network/community",
    images: [
      {
        url: "https://ndo.network/images/seo/community.jpg",
        width: 1200,
        height: 630,
        alt: "NDO Network Community"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ndo.network/images/seo/community.jpg"]
  },
  alternates: {
    canonical: "https://ndo.network/community"
  }
};

export default function CommunityPage() {
  return (
    <>
      <CommunityHero />
      <ParticipateSection />
      <InfluenceSection />
      <JoinNetworkSection />
    </>
  );
}