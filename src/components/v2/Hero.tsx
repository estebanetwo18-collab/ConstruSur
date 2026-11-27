import { getImageProps } from "next/image";
import { Users, ClipboardList, Building2, MapPinned } from "lucide-react";
import { BlueprintLines } from "@/components/ui/BlueprintLines";
import { v2Credenciales, v2Hero } from "@/data/v2";
import { ArrowLink, BtnDiag } from "./Buttons";
import { MONO_PATHS } from "./Brand";

const ICON = { equipo: Users, reportes: ClipboardList, obras: Building2, zona: MapPinned } as const;
const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function V2Hero() {
  const {
    props: { srcSet: desktop },
  } = getImageProps({ alt: "", sizes: "100vw", quality: 70, src: v2Hero.fondos.foto, width: 1600, height: 1000 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ alt: "", sizes: "160vw", quality: 60, src: v2Hero.fondos.fotoMovil, width: 1000, height: 1338, loading: "eager" });

  return (
    <section aria-labelledby="v2-hero-titulo" className="relative overflow-hidden bg-v2-black">
      <div className="relative min-h-[calc(100svh-72px-68px)] md:min-h-[calc(100svh-72px-120px)]">
        {/* Fondo 1: foto (zoom lento) */}
        <div className="absolute inset-0 overflow-hidden">
          <picture>
            <source media="(min-width: 768px)" srcSet={desktop} sizes="100vw" />
            <source srcSet={mobile} sizes="160vw" />
            <img {...rest} alt="" fetchPriority="high" className="v2-kenburns absolute inset-0 size-full object-cover" />
          </picture>
        </div>
        {/* Overlay negro → marrón */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,16,16,.92)_0%,rgba(18,16,16,.7)_45%,rgba(74,52,38,.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,16,16,.9)_0%,transparent_45%)]" />
        {/* Fondo 2: plano (aparece y desaparece) */}
        <div className="v2-plano absolute inset-0 bg-v2-brown/70 mix-blend-multiply" aria-hidden />
        <div className="v2-plano pointer-events-none absolute inset-0 text-v2-brown-soft/40" aria-hidden>
          <BlueprintLines className="absolute -right-24 top-6 w-[1300px] max-w-none opacity-80" />
        </div>
        {/* Monograma de líneas tenue (como el triángulo de la referencia) */}
        <svg viewBox="0 0 100 100" aria-hidden className="pointer-events-none absolute -bottom-16 right-[-6%] w-[58vw] max-w-[760px] text-v2-orange/25" fill="none" stroke="currentColor" strokeWidth={0.6}>
          {MONO_PATHS.map((p) => (
            <path key={p} d={p} />
          ))}
        </svg>

        <div className="relative mx-auto flex min-h-[inherit] max-w-[1440px] flex-col justify-end px-5 pb-12 pt-24 sm:px-8 lg:px-12 lg:pb-16">
          <h1 id="v2-hero-titulo" className="v2-h hero-title-in text-[1.75rem] min-[400px]:text-[1.9rem] sm:text-6xl lg:text-[5.4rem]">
            {v2Hero.lineas.map((l, i) => (
              <span key={l} className={`block ${i === 2 ? "text-v2-orange" : ""}`}>
                {l}
              </span>
            ))}
          </h1>
          <p className="hero-in mt-5 max-w-xl text-[0.98rem] leading-relaxed text-white/80 sm:text-base" style={d(2)}>
            {v2Hero.subtitulo}
          </p>
          <div className="hero-in mt-7 flex flex-wrap items-center gap-6" style={d(3)}>
            <BtnDiag href="/#cotizador">Cotice su proyecto</BtnDiag>
            <ArrowLink href="/#proyectos">Ver proyectos</ArrowLink>
          </div>
        </div>
      </div>

      {/* Franja de credenciales */}
      <div className="relative border-t border-v2-brown/70 bg-v2-black">
        <ul className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {v2Credenciales.map((c, i) => {
            const Icon = ICON[c.icono];
            return (
              <li
                key={c.titulo}
                className={`flex items-start gap-4 border-v2-brown/70 py-5 lg:py-7 ${i > 0 ? "border-t sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""} ${i > 1 ? "sm:border-t lg:border-t-0" : ""} lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0`}
                data-reveal
                style={d(i)}
              >
                <Icon aria-hidden className="mt-0.5 size-6 shrink-0 text-v2-orange" strokeWidth={1.4} />
                <div>
                  <p className="text-[0.95rem] font-bold">{c.titulo}</p>
                  <p className="mt-0.5 text-sm text-white/60">{c.detalle}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
