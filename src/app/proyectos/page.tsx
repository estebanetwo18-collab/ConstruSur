import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { V2ProjectsGrid } from "@/components/v2/ProjectsGrid";
import { V2Footer } from "@/components/v2/Footer";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Proyectos de ConstruSur en las líneas Essential, Prestige y Prime.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return (
    <>
      <V2ProjectsGrid />
      <V2Footer />
      <Motion />
    </>
  );
}
