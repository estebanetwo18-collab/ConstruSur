import { Motion } from "@/components/ui/Motion";
import { V2Hero } from "@/components/v2/Hero";
import { V2ServiceTabs } from "@/components/v2/ServiceTabs";
import { V2ProjectsSlider } from "@/components/v2/ProjectsSlider";
import { V2CoverageMap } from "@/components/v2/CoverageMap";
import { V2WhyUs } from "@/components/v2/WhyUs";
import { V2WhoWeBuild } from "@/components/v2/WhoWeBuild";
import { V2CotizadorSection } from "@/components/v2/cotizador/V2CotizadorSection";
import { V2Contact } from "@/components/v2/Contact";
import { V2Footer } from "@/components/v2/Footer";

/** Inicio — VERSIÓN B (rama feat/version-b). */
export default function Home() {
  return (
    <>
      <V2Hero />
      <V2ServiceTabs />
      <V2ProjectsSlider />
      <V2CoverageMap />
      <V2WhyUs />
      <V2WhoWeBuild />
      <V2CotizadorSection />
      <V2Contact />
      <V2Footer />
      <Motion />
    </>
  );
}
