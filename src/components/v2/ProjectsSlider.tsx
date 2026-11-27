"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { proyectos, type Proyecto } from "@/data/proyectos";
import { BtnDiag } from "./Buttons";

const Lightbox = dynamic(() => import("@/components/ui/Lightbox").then((m) => m.Lightbox), { ssr: false });
const DUR = 6000;

/** Slider de proyectos a pantalla completa con índice y controles abajo a la derecha. */
export function V2ProjectsSlider() {
  const items = proyectos.items;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [abierto, setAbierto] = useState<Proyecto | null>(null);
  const p = items[i];
  const go = (n: number) => setI((n + items.length) % items.length);

  return (
    <section id="proyectos" aria-roledescription="carrusel" aria-label="Proyectos destacados" className="relative isolate overflow-hidden bg-v2-black">
      {items.map((it, k) => (
        <div key={it.id} aria-hidden={k !== i} className={`absolute inset-0 -z-20 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}>
          <Image src={it.portada} alt="" fill sizes="100vw" className={`object-cover transition-transform duration-[7000ms] ease-out ${k === i ? "scale-105" : "scale-100"}`} />
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(18,16,16,.85)_0%,rgba(18,16,16,.35)_35%,rgba(18,16,16,.45)_60%,rgba(18,16,16,.95)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-v2-brown/25 mix-blend-multiply" />

      <div className="mx-auto flex min-h-[640px] max-w-[1440px] flex-col px-5 pb-6 pt-14 sm:px-8 md:min-h-[86svh] lg:px-12 lg:pt-20">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <h2 className="v2-h max-w-2xl text-[2.2rem] sm:text-5xl lg:text-[3.6rem]" data-reveal>
            Obras con nombre, un estándar que se nota.
          </h2>
          <BtnDiag href="/proyectos" outline size="sm">
            Ver todos los proyectos
          </BtnDiag>
        </div>

        <div className="mt-auto pt-20" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-v2-orange">Línea {p.linea}</p>
          <h3 key={p.id} className="v2-h hero-in mt-2 text-3xl sm:text-[2.6rem]">
            {p.nombre}
          </h3>
          <dl className="mt-4 flex flex-wrap gap-px text-sm">
            {[
              ["Ubicación", p.ubicacion],
              ["Línea", p.linea],
              ["Año", p.anio],
            ].map(([k, v]) => (
              <div key={k} className="bg-v2-black/75 px-4 py-2.5 backdrop-blur">
                <dt className="text-[0.7rem] text-white/60">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <button type="button" onClick={() => setAbierto(p)} className="v2-link mt-5">
            Ver proyecto <span aria-hidden className="v2-tri" />
          </button>
        </div>

        {/* Índice + controles */}
        <div className="mt-10 flex items-end gap-6 border-t border-white/15 pt-4">
          <ol className="hidden flex-1 grid-cols-3 gap-6 md:grid">
            {items.map((it, k) => (
              <li key={it.id}>
                <button type="button" onClick={() => go(k)} aria-current={k === i} className={`w-full text-left text-sm font-semibold transition-colors ${k === i ? "text-white" : "text-white/55 hover:text-white"}`}>
                  {it.nombre}
                  <span className="mt-2 block h-[3px] bg-white/15">
                    {k === i && (
                      <span
                        key={`${i}-${playing}`}
                        className={`v2-progress block h-full bg-v2-orange ${playing ? "" : "[animation-play-state:paused]"}`}
                        style={{ "--dur": `${DUR}ms` } as React.CSSProperties}
                        onAnimationEnd={() => playing && go(i + 1)}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="flex-1 text-sm font-semibold tabular-nums md:hidden">
            0{i + 1} <span className="text-white/50">/ 0{items.length}</span>
          </p>
          <div className="flex gap-1.5">
            <button type="button" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pausar" : "Reproducir"} className="grid size-10 place-items-center border border-white/40 transition hover:border-v2-orange hover:text-v2-orange">
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <button type="button" onClick={() => go(i - 1)} aria-label="Proyecto anterior" className="grid size-10 place-items-center border border-white/40 transition hover:border-v2-orange hover:text-v2-orange">
              <ChevronLeft className="size-4" />
            </button>
            <button type="button" onClick={() => go(i + 1)} aria-label="Proyecto siguiente" className="grid size-10 place-items-center border border-white/40 transition hover:border-v2-orange hover:text-v2-orange">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
      {/* Móvil: autoplay también sin índice visible */}
      <span
        key={`m-${i}-${playing}`}
        aria-hidden
        className={`v2-progress absolute bottom-0 left-0 h-[3px] w-full bg-v2-orange md:hidden ${playing ? "" : "[animation-play-state:paused]"}`}
        style={{ "--dur": `${DUR}ms` } as React.CSSProperties}
        onAnimationEnd={() => playing && go(i + 1)}
      />
      {abierto && <Lightbox key={abierto.id} proyecto={abierto} onClose={() => setAbierto(null)} />}
    </section>
  );
}
