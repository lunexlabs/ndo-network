import ACTVHero from "@/src/components/actv/ACTVHero";
import ACTVSeasonOverview from "@/src/components/actv/ACTVSeasonOverview";
import ACTVEpisodes from "@/src/components/actv/ACTVEpisodes";
import ACTVCTA from "@/src/components/actv/ACTVCTA";

export default function ACTVPage() {
  return (
    <>
      <ACTVHero />
      <ACTVSeasonOverview />
      <ACTVEpisodes />
    </>
  );
}