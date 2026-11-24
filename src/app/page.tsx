import { Motion } from "@/components/ui/Motion";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { CotizadorSection } from "@/components/cotizador/CotizadorSection";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { Marquee } from "@/components/ui/Marquee";
import { Values } from "@/components/sections/Values";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FaqJsonLd } from "@/components/JsonLd";
import { marquee } from "@/data/home";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <CotizadorSection />
      <Projects />
      <Testimonials />
      <Team />
      <Marquee items={marquee} />
      <Values />
      <Faq />
      <Contact />
      <Footer />
      <FaqJsonLd />
      <Motion />
    </>
  );
}
