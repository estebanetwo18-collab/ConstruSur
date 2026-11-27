"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { proyectos, type Proyecto } from "@/data/proyectos";
import { BtnDiag } from "./Buttons";

const Lightbox = dynamic(() => import("@/components/ui/Lightbox").then((m) => m.Lightbox), { ssr: false });

/** /proyectos: todos los proyectos con su galería. */
export function V2ProjectsGrid() {
  const [abierto, setAbierto] = useState<Proyecto | null>(null);
  return (
    <section aria-labelledby="v2-proy-titulo" className="bg-v2-black">
      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 id="v2-proy-titulo" className="v2-h hero-title-in max-w-3xl text-[2.4rem] sm:text-6xl lg:text-[4.4rem]">
            Todos los proyectos. <span className="block text-v2-orange">Un mismo estándar.</span>
          </h1>
          <BtnDiag href="/cotizador">Cotice su proyecto</BtnDiag>
        </div>
        <ul className="mt-14 grid gap-px bg-v2-brown md:grid-cols-3">
          {proyectos.items.map((p, i) => (
            <li key={p.id} className="bg-v2-black" data-reveal style={{ "--i": i } as React.CSSProperties}>
              <button type="button" onClick={() => setAbierto(p)} className="group block w-full text-left" aria-label={`${p.fotos.length} fotos: abrir galería de ${p.nombre}`}>
                <span className="relative block aspect-[4/5] overflow-hidden">
                  <Image src={p.portada} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-1000 ease-brand group-hover:scale-105" />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,16,16,.9),transparent_55%)]" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="block text-xs font-bold uppercase tracking-[0.16em] text-v2-orange">Línea {p.linea}</span>
                    <span className="v2-h mt-1 block text-2xl">{p.nombre}</span>
                    <span className="mt-1 block text-sm text-white/70">{p.ubicacion}</span>
                    <span className="v2-link mt-4">
                      Ver proyecto <span aria-hidden className="v2-tri" />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {abierto && <Lightbox key={abierto.id} proyecto={abierto} onClose={() => setAbierto(null)} />}
    </section>
  );
}
