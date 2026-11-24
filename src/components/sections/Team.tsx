import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { equipo } from "@/data/equipo";
import { waLink } from "@/lib/whatsapp";

export function Team() {
  return (
    <section id="equipo" className="bg-cream py-20 sm:py-28" aria-labelledby="equipo-titulo">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:px-12">
        <div className="grid grid-cols-2 items-start gap-4 sm:gap-6 lg:col-span-7">
          {equipo.socios.map((s, i) => (
            <article key={s.nombre} className={`card lift zoom-group overflow-hidden p-2.5 ${i === 1 ? "mt-10 sm:mt-16" : ""}`} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <div className="zoom-img relative aspect-[3/4] overflow-hidden rounded-[14px] bg-line">
                <Image src={s.foto} alt={`${s.nombre}, ${s.rol} de ConstruSur`} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
                <div className="absolute inset-x-2 bottom-2 rounded-[12px] bg-ink/85 p-3 text-cream backdrop-blur-md sm:p-4">
                  <h3 className="font-display text-xl font-medium sm:text-2xl">{s.nombre}</h3>
                  <p className="text-xs text-cream/75 sm:text-sm">{s.rol}</p>
                </div>
              </div>
              <a
                href={waLink(`Hola ${s.nombre}, me gustaría conversar sobre un proyecto.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 flex h-11 items-center justify-center gap-2 rounded-full bg-cream text-sm font-semibold transition-colors hover:bg-terra"
              >
                <WhatsAppIcon className="size-4" /> <span className="hidden sm:inline">Escribirle a</span> {s.nombre}
              </a>
            </article>
          ))}
        </div>

        <div className="lg:col-span-5">
          <SectionTitle id="equipo-titulo" eyebrow={equipo.eyebrow} titulo={equipo.titulo} intro={equipo.intro} />
          <div className="mt-8 grid grid-cols-3 gap-3">
            {equipo.obra.map((f, i) => (
              <div key={f.src} className="zoom-img relative aspect-square overflow-hidden rounded-[14px]" data-reveal style={{ "--i": i + 2 } as React.CSSProperties}>
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 12vw, 30vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-8" data-reveal style={{ "--i": 5 } as React.CSSProperties}>
            <Button href="/#contacto" variant="dark">
              Conversemos hoy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
