import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { BlueprintLines } from "@/components/ui/BlueprintLines";
import { Motion } from "@/components/ui/Motion";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream px-5 py-32">
      <BlueprintLines className="pointer-events-none absolute left-1/2 top-1/2 w-[1300px] max-w-none -translate-x-1/2 -translate-y-1/2 text-ink/[0.07]" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="font-display mt-5 text-5xl font-medium leading-[1.02] sm:text-7xl">
          Esta página <span className="kw">no está en los planos</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ink-soft">Puede que el enlace haya cambiado. Le llevamos de vuelta a terreno firme.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Volver al inicio</Button>
          <Button href="/cotizador" variant="outline">
            Ir al cotizador
          </Button>
        </div>
      </div>
      <Motion />
    </section>
  );
}
