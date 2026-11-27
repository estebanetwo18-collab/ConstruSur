import { DevBanner } from "@/components/ui/DevBanner";
import { resolverHitos, resolverPricing } from "@/lib/pricing";
import { V2Cotizador } from "./V2Cotizador";

export function V2CotizadorSection({ asPage = false }: { asPage?: boolean }) {
  const { pricing, demo } = resolverPricing();
  const hitos = resolverHitos();
  const Title = asPage ? "h1" : "h2";
  return (
    <section id="cotizador" aria-labelledby="v2-cot-titulo" className="bg-v2-black">
      <div className={`mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 ${asPage ? "pb-20 pt-14 lg:pt-20" : "py-20 lg:py-28"}`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Title id="v2-cot-titulo" className={`v2-h max-w-3xl text-[2.2rem] sm:text-5xl lg:text-[3.6rem] ${asPage ? "hero-in" : ""}`} {...(asPage ? {} : { "data-reveal": true })}>
            Calcule su inversión. <span className="block text-v2-orange">En segundos.</span>
          </Title>
          <p className="max-w-md text-[0.95rem] leading-relaxed text-white/70">
            Un rango referencial con desglose de construcción, diseño, permisos e IVA. Sin registrarse para ver el resultado.
          </p>
        </div>
        <div className="mt-8 empty:hidden">
          <DevBanner />
        </div>
        <div className="mt-10">
          <V2Cotizador pricing={pricing} demo={demo} hitos={hitos} nivel={asPage ? 2 : 3} />
        </div>
      </div>
    </section>
  );
}
