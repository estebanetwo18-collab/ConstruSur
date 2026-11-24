import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { Gracias } from "./Gracias";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "¡Gracias!",
  description: "Recibimos su solicitud. Le contactamos pronto.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gracias" },
};

export default function GraciasPage() {
  return (
    <>
      <Gracias />
      <Footer />
      <Motion />
    </>
  );
}
