import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { cifras, nosotros } from "@/data/site";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function About() {
  return (
    <section id="nosotros" className="relative -mt-10 bg-cream pb-20 pt-28 sm:-mt-14 sm:pb-28 sm:pt-36" aria-labelledby="nosotros-titulo">
      <div className="mx-auto grid max-w-[1320px] gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Texto */}
        <div className="lg:order-2 lg:col-span-5 lg:px-4">
          <p className="eyebrow" data-reveal>
            {nosotros.eyebrow}
          </p>
          <h2 id="nosotros-titulo" className="font-display mt-4 text-[2.15rem] font-medium leading-[1.06] text-balance sm:text-5xl" data-reveal style={d(1)}>
            {nosotros.titulo[0]} <span className="kw">{nosotros.titulo[1]}</span>
            {nosotros.titulo[2]}
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft" data-reveal style={d(2)}>
            {nosotros.intro}
          </p>
          <dl className="mt-8 space-y-5">
            {[
              ["Misión", nosotros.mision],
              ["Visión", nosotros.vision],
            ].map(([k, v], i) => (
              <div key={k} className="border-l-2 border-terra pl-4" data-reveal style={d(3 + i)}>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-terra-ink">{k}</dt>
                <dd className="mt-1 leading-relaxed text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9" data-reveal style={d(5)}>
            <Button href="/#proceso" variant="dark">
              Conozca cómo trabajamos
            </Button>
          </div>
        </div>

        {/* Cifra blanca + imagen */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:order-1 lg:col-span-3 lg:grid-cols-1 lg:content-start">
          <div className="card lift p-5 sm:p-7" data-reveal="left">
            <p className="font-display text-5xl font-medium tabular-nums sm:text-6xl">
              <Counter valor={cifras.obras.valor} sufijo={cifras.obras.sufijo} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-ink">{cifras.obras.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">En la GAM, con el mismo equipo de principio a fin.</p>
          </div>
          <div className="zoom-img relative overflow-hidden rounded-[20px] lg:aspect-[4/5]" data-reveal="left" style={d(1)}>
            <Image
              src="/img/proyectos/essential-fachada-atardecer.webp"
              alt="Fachada de una casa de la línea Essential al atardecer"
              fill
              sizes="(min-width: 1024px) 22vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Imagen alta + cifra oscura */}
        <div className="relative lg:order-3 lg:col-span-4">
          <div className="zoom-img relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[560px]" data-reveal="scale">
            <Image src="/img/obra/varillas.webp" alt="Armado de acero de refuerzo en obra" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
          </div>
          <div
            className="on-dark absolute bottom-4 left-4 right-4 rounded-[20px] bg-ink p-6 text-cream shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] sm:right-auto sm:w-72 lg:-left-10 lg:bottom-10"
            data-reveal
            style={d(2)}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terra">Experiencia</p>
            <p className="font-display mt-1 text-6xl font-medium tabular-nums">
              <Counter valor={cifras.anios.valor} sufijo={cifras.anios.sufijo} />
            </p>
            <p className="mt-1 text-sm text-cream/80">{cifras.anios.label}</p>
            <div className="mt-4 flex items-center gap-3 border-t border-cream/15 pt-4">
              <p className="font-display text-3xl font-medium text-terra tabular-nums">
                <Counter valor={cifras.reportes.valor} />
              </p>
              <p className="text-xs leading-snug text-cream/80">{cifras.reportes.label}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
