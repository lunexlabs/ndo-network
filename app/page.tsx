import HeroSlider from "../src/components/home/HeroSlider";
import ACTVSpotlight from "../src/components/home/ACTVSpotlight";
import LatestPreview from "../src/components/home/LatestPreview";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <LatestPreview />
      <ACTVSpotlight />
    </>
  );
}