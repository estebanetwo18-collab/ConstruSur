import Image from "next/image";
import { DevBanner } from "@/components/ui/DevBanner";
import { resolverHitos, resolverPricing } from "@/lib/pricing";
import { V2Cotizador } from "./V2Cotizador";

const PASOS = ["Metros cuadrados", "Tipo de obra", "Línea", "Moneda"];

/** Cotizador destacado: banner con foto arriba y la calculadora montada encima. */
export function V2CotizadorSection({ asPage = false }: { asPage?: boolean }) {
  const { pricing, demo } = resolverPricing();
  const hitos = resolverHitos();
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="cotizador" aria-labelledby="v2-cot-titulo" className="relative isolate bg-v2-black">
      {/* Banner con foto */}
      <div className="relative isolate overflow-hidden">
        <Image src="/img/obra/planos.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" priority={asPage} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,16,16,.95)_0%,rgba(18,16,16,.75)_50%,rgba(74,52,38,.55)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--v2-black)_0%,transparent_45%)]" />
        <div className="mx-auto max-w-[1440px] px-5 pb-36 pt-16 sm:px-8 lg:px-12 lg:pb-44 lg:pt-24">
          <p className="inline-flex items-center gap-2 bg-v2-orange px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-v2-black [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,0_100%)] pr-5">
            Cotizador en línea · gratis
          </p>
          <Title id="v2-cot-titulo" className={`v2-h mt-5 max-w-3xl text-[2.4rem] sm:text-6xl lg:text-[4.6rem] ${asPage ? "hero-in" : ""}`} {...(asPage ? {} : { "data-reveal": true })}>
            Calcule su inversión. <span className="block text-v2-orange">En segundos.</span>
          </Title>
          <p className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/80">
            Un rango referencial con desglose de construcción, diseño, permisos e IVA. Sin registrarse para ver el resultado.
          </p>
          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
            {PASOS.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                <span className="text-v2-orange">0{i + 1}</span> {p}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Calculadora destacada, montada sobre el banner */}
      <div className="relative z-10 mx-auto -mt-24 max-w-[1440px] px-5 pb-20 sm:px-8 lg:-mt-28 lg:px-12 lg:pb-28">
        <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(224,146,95,.14),transparent_65%)]" />
        <div className="empty:hidden">
          <DevBanner />
        </div>
        <div className="border-t-4 border-v2-orange shadow-[0_50px_100px_-40px_rgba(0,0,0,.95)] ring-1 ring-v2-orange/30">
          <V2Cotizador pricing={pricing} demo={demo} hitos={hitos} nivel={asPage ? 2 : 3} />
        </div>
      </div>
    </section>
  );
}
