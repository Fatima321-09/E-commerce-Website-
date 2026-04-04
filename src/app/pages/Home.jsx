import { HeroSection } from "../components/sections/HeroSection";
import { ShopByFit } from "../components/sections/ShopByFit";
import { CampaignBanner } from "../components/sections/CampaignBanner";
import { NewArrivals } from "../components/sections/NewArrivals";
import { FeaturesStrip } from "../components/sections/FeaturesStrip";
import { BrandStory } from "../components/sections/BrandStory";
import { InstagramGrid } from "../components/sections/InstagramGrid";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      <HeroSection />
      <ShopByFit />
      <CampaignBanner />
      <NewArrivals />
      <FeaturesStrip />
      <BrandStory />
      <InstagramGrid />
    </div>
  );
}
