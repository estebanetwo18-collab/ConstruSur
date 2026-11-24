"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Images } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CircleButton, Button } from "@/components/ui/Button";
import { Lightbox } from "@/components/ui/Lightbox";
import { proyectos, type Proyecto } from "@/data/proyectos";

const tilts = ["-2deg", "2deg", "2deg", "-2deg"];

export function Projects() {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);

  return (
    <section id="proyectos" className="bg-cream py-20 sm:py-28" aria-labelledby="proyectos-titulo">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <SectionTitle id="proyectos-titulo" align="center" eyebrow={proyectos.eyebrow} titulo={proyectos.titulo} intro={proyectos.intro} className="max-w-3xl" />

        <ul className="mt-14 grid gap-8 md:mt-20 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {proyectos.items.map((p, i) => (
            <li key={p.id} data-reveal style={{ "--i": i % 2 } as React.CSSProperties}>
              <article className="tilt zoom-group card p-3 sm:p-4" style={{ "--tilt": tilts[i] } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => setAbierto(p)}
                  className="zoom-img relative block aspect-[4/3] w-full overflow-hidden rounded-[14px]"
                  aria-label={`Abrir galería: ${p.nombre}`}
                >
                  <Image src={p.portada} alt={p.fotos[0]?.alt ?? p.nombre} fill sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
                    <Images className="size-3.5" /> {p.fotos.length} fotos
                  </span>
                </button>
                <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-5">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-terra-ink">Línea {p.linea}</p>
                    <h3 className="font-display mt-1 text-2xl font-medium">{p.nombre}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="size-4 shrink-0 text-terra-ink" /> {p.ubicacion}
                    </p>
                  </div>
                  <CircleButton label={`Ver proyecto ${p.nombre}`} onClick={() => setAbierto(p)} />
                </div>
              </article>
            </li>
          ))}

          {/* 4.ª tarjeta: invitación */}
          <li data-reveal style={{ "--i": 1 } as React.CSSProperties}>
            <article
              className="tilt on-dark relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[20px] bg-ink p-7 text-cream sm:p-9"
              style={{ "--tilt": tilts[3] } as React.CSSProperties}
            >
              <div className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full bg-terra/20 blur-2xl" />
              <p className="eyebrow">Su proyecto</p>
              <div>
                <h3 className="font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
                  ¿El próximo <span className="kw">es el suyo</span>?
                </h3>
                <p className="mt-4 max-w-sm text-cream/80">
                  Calcule un rango de inversión en segundos y conversemos sobre su anteproyecto.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/#cotizador">Cotice hoy</Button>
              </div>
            </article>
          </li>
        </ul>
      </div>
      <Lightbox key={abierto?.id ?? "cerrado"} proyecto={abierto} onClose={() => setAbierto(null)} />
    </section>
  );
}
