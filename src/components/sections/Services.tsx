import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Crown, Gem, Hammer, House, KeyRound, PencilRuler } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { servicios, type ServicioIcon } from "@/data/servicios";

const icons: Record<ServicioIcon, typeof House> = {
  essential: House,
  prestige: Gem,
  prime: Crown,
  remodelacion: Hammer,
  diseno: PencilRuler,
  llave: KeyRound,
};

export function Services() {
  return (
    <section id="servicios" className="overflow-hidden bg-paper py-20 sm:py-28" aria-labelledby="servicios-titulo">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="min-w-0 lg:col-span-4 lg:pt-4">
          <SectionTitle id="servicios-titulo" eyebrow={servicios.eyebrow} titulo={servicios.titulo} intro={servicios.intro} />
          <div className="mt-8" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            <Button href="/#cotizador">Cotice hoy</Button>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-8 lg:-mr-[max(0px,calc((100vw-1320px)/2+3rem))]">
          <Carousel label="Líneas y servicios de ConstruSur">
            {servicios.items.map((s, i) => {
              const Icon = icons[s.icon];
              const href = s.linea ? `/cotizador?linea=${s.linea}` : "/#contacto";
              return (
                <li key={s.id} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[300px]" data-reveal style={{ "--i": i } as React.CSSProperties}>
                  <Link href={href} className="zoom-group lift group block h-full rounded-[20px] bg-cream p-2.5">
                    <div className="zoom-img relative aspect-[4/4.4] overflow-hidden rounded-[14px]">
                      <Image src={s.img} alt="" fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 78vw" className="object-cover" />
                      <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 px-2.5 pb-3 pt-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-terra-soft text-terra-ink">
                        <Icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl font-medium">{s.titulo}</h3>
                        <p className="mt-1 text-sm leading-snug text-muted">{s.texto}</p>
                      </div>
                      <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-ink/40 transition-all duration-500 ease-brand group-hover:rotate-45 group-hover:text-terra-ink" />
                    </div>
                  </Link>
                </li>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
