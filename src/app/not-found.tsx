import type { Metadata } from "next";
import { Motion } from "@/components/ui/Motion";
import { BtnDiag, ArrowLink } from "@/components/v2/Buttons";
import { MONO_PATHS } from "@/components/v2/Brand";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-v2-black px-5 py-24 sm:px-8 lg:px-12">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute -right-24 top-1/2 -z-10 w-[70vw] max-w-[760px] -translate-y-1/2 text-v2-brown/60" fill="none" stroke="currentColor" strokeWidth={0.8}>
        {MONO_PATHS.map((p) => (
          <path key={p} d={p} />
        ))}
      </svg>
      <div className="mx-auto w-full max-w-[1440px]">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-v2-orange">Error 404</p>
        <h1 className="v2-h mt-4 max-w-3xl text-[2.6rem] sm:text-6xl lg:text-[5rem]">
          Esta página no está en los planos.
        </h1>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <BtnDiag href="/">Volver al inicio</BtnDiag>
          <ArrowLink href="/cotizador">Ir al cotizador</ArrowLink>
        </div>
      </div>
      <Motion />
    </section>
  );
}
