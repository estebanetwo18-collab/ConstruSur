"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { proceso } from "@/data/home";

/** 4 pasos con una línea que se dibuja según el avance del scroll. */
export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce) return setP(1);
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 cuando la lista entra por abajo; 1 cuando su final pasa el 55 % de la pantalla.
      const start = vh * 0.85;
      const end = vh * 0.45;
      const total = r.height + (start - end);
      setP(Math.min(1, Math.max(0, (start - r.top) / total)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = proceso.pasos.length;

  return (
    <section id="proceso" className="bg-paper py-20 sm:py-28" aria-labelledby="proceso-titulo">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle id="proceso-titulo" eyebrow={proceso.eyebrow} titulo={proceso.titulo} intro={proceso.intro} className="max-w-2xl" />
          <div data-reveal>
            <Button href="/#cotizador" variant="dark">
              Cotice su proyecto
            </Button>
          </div>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-10 pl-16 lg:mt-20 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-20">
          {/* Línea base + línea dibujada: vertical en móvil, horizontal en desktop */}
          <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[2px] bg-line lg:inset-x-[24px] lg:bottom-auto lg:left-6 lg:right-6 lg:top-[23px] lg:h-[2px] lg:w-auto" />
          <span
            aria-hidden
            className="absolute bottom-6 left-[23px] top-6 w-[2px] origin-top bg-terra lg:hidden"
            style={{ transform: `scaleY(${p})` }}
          />
          <span
            aria-hidden
            className="absolute left-6 right-6 top-[23px] hidden h-[2px] origin-left bg-terra lg:block"
            style={{ transform: `scaleX(${p})` }}
          />
          {proceso.pasos.map((paso, i) => {
            const activo = p >= (i + 0.15) / n || p >= 0.999;
            return (
              <li key={paso.titulo} className="relative" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span
                  className={`absolute -left-16 top-0 grid size-12 place-items-center rounded-full border-2 font-display text-lg font-semibold transition-all duration-700 ease-brand lg:-top-20 lg:left-0 ${
                    activo ? "border-terra bg-terra text-ink" : "border-line bg-paper text-muted"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className={`rounded-[20px] p-6 transition-colors duration-700 ${activo ? "bg-cream" : "bg-cream/50"}`}>
                  <h3 className="font-display text-2xl font-medium">{paso.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{paso.texto}</p>
                  <ul className="mt-5 space-y-2">
                    {paso.puntos.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm font-medium">
                        <Check className="mt-0.5 size-4 shrink-0 text-terra-ink" strokeWidth={2.5} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
