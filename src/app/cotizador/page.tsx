import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { CotizadorSection } from "@/components/cotizador/CotizadorSection";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { FaqJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Cotizador de construcción en línea — Costa Rica",
  description:
    "Calcule en segundos un rango de inversión para construir o remodelar su casa en la GAM: construcción, diseño y consultoría, permisos e IVA. Líneas Essential, Prestige y Prime.",
  alternates: { canonical: "/cotizador" },
  openGraph: {
    url: "/cotizador",
    title: "Cotizador de construcción en línea | ConstruSur",
    description: "Rango de inversión con desglose de construcción, diseño, permisos e IVA. Sin registrarse.",
  },
};

export default function CotizadorPage() {
  return (
    <>
      <CotizadorSection asPage />
      <Faq />
      <Footer />
      <FaqJsonLd />
      <Motion />
    </>
  );
}
