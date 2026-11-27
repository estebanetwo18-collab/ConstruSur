import Image from "next/image";
import { ClipboardList, ScanEye, Users, Compass } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlueprintLines } from "@/components/ui/BlueprintLines";
import { porQue } from "@/data/home";

const icon = { equipo: Users, reportes: ClipboardList, transparencia: ScanEye, orden: Compass } as const;
const item = (id: keyof typeof icon) => porQue.items.find((x) => x.id === id)!;
const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Feature({ id, floating = false, dark = false }: { id: keyof typeof icon; floating?: boolean; dark?: boolean }) {
  const it = item(id);
  const Icon = icon[id];
  return (
    <div
      className={`${dark ? "on-dark bg-ink text-cream" : "bg-paper"} lift rounded-[20px] p-5 sm:p-6 ${floating ? "shadow-[0_24px_50px_-20px_rgba(27,24,18,.45)]" : "shadow-[var(--shadow-card)]"}`}
    >
      <span className={`grid size-12 place-items-center rounded-full ${dark ? "bg-terra text-ink" : "bg-terra text-ink"}`}>
        <Icon className="size-5" strokeWidth={1.7} />
      </span>
      <h3 className="font-display mt-4 text-xl font-medium sm:text-2xl">{it.titulo}</h3>
      <p className={`mt-2 text-[0.95rem] leading-relaxed ${dark ? "text-cream/80" : "text-muted"}`}>{it.texto}</p>
    </div>
  );
}

export function WhyUs() {
  return (
    <section id="por-que" className="relative overflow-hidden bg-cream py-20 sm:py-28" aria-labelledby="porque-titulo">
      <div className="pointer-events-none absolute inset-x-0 top-10 text-ink/[0.07]" data-parallax="0.12">
        <BlueprintLines className="mx-auto w-[1400px] max-w-none" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionTitle id="porque-titulo" align="center" eyebrow={porQue.eyebrow} titulo={porQue.titulo} intro={porQue.intro} className="max-w-3xl" />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[minmax(260px,auto)_minmax(300px,auto)]">
          {/* A: foto alta con tarjeta flotante */}
          <div className="relative sm:col-span-2 lg:col-span-5 lg:row-span-2" data-reveal="scale">
            <div className="zoom-img relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[16/10] lg:aspect-auto lg:h-full">
              <Image src="/img/obra/andamios.webp" alt="Equipo trabajando en la estructura de una obra" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm lg:bottom-6 lg:left-6 lg:right-6 lg:max-w-[360px]">
              <Feature id="equipo" floating />
            </div>
          </div>

          {/* B: reportes */}
          <div className="lg:col-span-4" data-reveal style={d(1)}>
            <div className="h-full [&>div]:h-full">
              <Feature id="reportes" dark />
            </div>
          </div>

          {/* C: foto planos */}
          <div className="zoom-img relative hidden overflow-hidden rounded-[20px] sm:block sm:aspect-[4/3] lg:col-span-3 lg:aspect-auto" data-reveal style={d(2)}>
            <Image src="/img/obra/planos.webp" alt="Planos arquitectónicos sobre la mesa" fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
          </div>

          {/* D: orden técnico */}
          <div className="lg:col-span-3" data-reveal style={d(3)}>
            <div className="h-full [&>div]:h-full">
              <Feature id="orden" />
            </div>
          </div>

          {/* E: foto con tarjeta flotante */}
          <div className="relative sm:col-span-2 lg:col-span-4" data-reveal style={d(4)}>
            <div className="zoom-img relative aspect-[4/3] overflow-hidden rounded-[20px] lg:aspect-auto lg:h-full">
              <Image src="/img/obra/excavacion.webp" alt="Movimiento de tierras al inicio de una obra" fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover" />
            </div>
            <div className="mt-4 lg:absolute lg:inset-x-4 lg:bottom-4 lg:mt-0">
              <Feature id="transparencia" floating />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
