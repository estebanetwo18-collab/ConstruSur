import { SectionTitle } from "@/components/ui/SectionTitle";
import { DevBanner } from "@/components/ui/DevBanner";
import { resolverHitos, resolverPricing } from "@/lib/pricing";
import { Cotizador } from "./Cotizador";

/** Sección del cotizador (se usa en la home y en /cotizador). */
export function CotizadorSection({ asPage = false }: { asPage?: boolean }) {
  const { pricing, demo } = resolverPricing();
  const hitos = resolverHitos();
  return (
    <section
      id="cotizador"
      className={`relative bg-cream ${asPage ? "pb-20 pt-32 sm:pt-40" : "py-20 sm:py-28"}`}
      aria-labelledby="cotizador-titulo"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(224,146,95,.22),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionTitle
          id="cotizador-titulo"
          as={asPage ? "h1" : "h2"}
          size={asPage ? "xl" : "lg"}
          align="center"
          eyebrow="Cotizador en línea"
          titulo={["Calcule su inversión", "en segundos", "."]}
          intro="Un rango referencial con desglose de construcción, diseño, permisos e IVA. Sin registrarse para ver el resultado."
          className="max-w-3xl"
          immediate={asPage}
        />
        <div className="mt-8 empty:hidden">
          <DevBanner />
        </div>
        <div className={`mt-10 sm:mt-14 ${asPage ? "hero-in" : ""}`} {...(asPage ? { style: { "--i": 3 } as React.CSSProperties } : { "data-reveal": true })}>
          <Cotizador pricing={pricing} demo={demo} hitos={hitos} nivel={asPage ? 2 : 3} />
        </div>
      </div>
    </section>
  );
}
