import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { V2CotizadorSection } from "@/components/v2/cotizador/V2CotizadorSection";
import { V2Contact } from "@/components/v2/Contact";
import { V2Footer } from "@/components/v2/Footer";

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
      <V2CotizadorSection asPage />
      <V2Contact />
      <V2Footer />
      <Motion />
    </>
  );
}
