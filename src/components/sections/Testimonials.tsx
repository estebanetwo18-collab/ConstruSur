"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Quote, Star } from "lucide-react";
import { testimonios } from "@/data/home";

/** Testimonios: escritos (solo reales en producción) + video con carga diferida. */
export function Testimonials() {
  const isProd = process.env.NODE_ENV === "production";
  const escritos = testimonios.escritos.filter((t) => !t.placeholder || !isProd);
  const [play, setPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) videoRef.current?.play().catch(() => {});
  }, [play]);

  return (
    <section className="on-dark relative isolate overflow-hidden rounded-[32px] bg-ink py-20 text-cream sm:mx-3 sm:rounded-[48px] sm:py-28" aria-labelledby="testimonios-titulo">
      <Image src="/img/obra/aerea.webp" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(27,24,18,.85),rgba(27,24,18,.55)_50%,rgba(27,24,18,.9))]" />
      <p aria-hidden className="watermark absolute left-1/2 top-10 -z-10 -translate-x-1/2 text-[15.5vw] text-transparent [-webkit-text-stroke:1.5px_rgba(244,240,232,.16)] sm:top-6" data-parallax="0.06">
        CONSTRUSUR
      </p>

      <div className="mx-auto grid max-w-[1160px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="eyebrow" data-reveal>
            {testimonios.eyebrow}
          </p>
          <h2 id="testimonios-titulo" className="font-display mt-4 text-[2.15rem] font-medium leading-[1.06] sm:text-5xl lg:text-[3.4rem]" data-reveal>
            {testimonios.titulo[0]} <span className="kw">{testimonios.titulo[1]}</span>
            {testimonios.titulo[2]}
          </h2>

          {escritos.map((t) => (
            <figure key={t.nombre} className="relative mt-10 rounded-[20px] bg-paper p-6 text-ink shadow-2xl sm:p-8" data-reveal>
              {t.placeholder && (
                <span className="absolute -top-3 right-5 rounded-full bg-[#c0392b] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-white">
                  Ejemplo · solo desarrollo
                </span>
              )}
              <Quote aria-hidden className="size-9 text-terra" strokeWidth={1.5} />
              <blockquote className="font-display mt-3 text-xl leading-snug sm:text-2xl">“{t.cita}”</blockquote>
              <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <div>
                  <p className="font-semibold">{t.nombre}</p>
                  <p className="text-sm text-muted">{t.detalle}</p>
                </div>
                <p className="flex gap-0.5" aria-label={`${t.estrellas} de 5 estrellas`}>
                  {Array.from({ length: 5 }, (_, k) => (
                    <Star key={k} aria-hidden className={`size-4 ${k < t.estrellas ? "fill-terra text-terra" : "text-line"}`} />
                  ))}
                </p>
              </figcaption>
            </figure>
          ))}
          {!escritos.length && (
            <p className="mt-6 max-w-md text-lg text-cream/80" data-reveal>
              Escuche de primera mano cómo es construir con un equipo que responde por su obra.
            </p>
          )}
        </div>

        <div className="mx-auto w-full max-w-[340px]" data-reveal="scale">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[24px] bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] ring-1 ring-cream/10">
            {play ? (
              <video
                ref={videoRef}
                src={testimonios.video.src}
                poster={testimonios.video.poster}
                controls
                playsInline
                preload="none"
                className="size-full object-cover"
                aria-label={testimonios.video.titulo}
              />
            ) : (
              <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0 block size-full">
                <span className="sr-only">Reproducir: </span>
                <Image src={testimonios.video.poster} alt="" fill sizes="340px" className="object-cover transition-transform duration-1000 ease-brand group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-terra text-ink shadow-xl transition-transform duration-500 ease-brand group-hover:scale-110">
                  <span className="absolute inset-0 animate-ping rounded-full bg-terra/40 motion-reduce:hidden" />
                  <Play className="relative size-7 translate-x-0.5 fill-ink" />
                </span>
                <span className="absolute bottom-5 left-5 right-5 text-left text-sm font-semibold text-cream">Testimonio en video · 1:14</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
