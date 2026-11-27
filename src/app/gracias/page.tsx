import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { V2Gracias } from "@/components/v2/Gracias";
import { V2Footer } from "@/components/v2/Footer";

export const metadata: Metadata = {
  title: "¡Gracias!",
  description: "Recibimos su solicitud. Le contactamos pronto.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gracias" },
};

export default function GraciasPage() {
  return (
    <>
      <V2Gracias />
      <V2Footer />
      <Motion />
    </>
  );
}
