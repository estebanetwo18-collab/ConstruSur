"use client";

import { useEffect, useRef, useState } from "react";
import { v2PorQue } from "@/data/v2";
import { Monogram } from "./Brand";

/** Mezcla lineal entre dos colores hex. */
function mix(a: string, b: string, t: number) {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [x, y] = [h(a), h(b)];
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * t)).join(",")})`;
}

export function V2WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = reduce ? 1 : (vh * 0.75 - r.top) / (r.height * 0.85);
      setP(Math.min(1, Math.max(0, v)));
      // Bloque activo: el más cercano al centro de la pantalla
      const blocks = Array.from(el.querySelectorAll<HTMLElement>("[data-bloque]"));
      let best = 0;
      let dist = Infinity;
      blocks.forEach((b, i) => {
        const br = b.getBoundingClientRect();
        const dd = Math.abs(br.top + br.height / 2 - vh / 2);
        if (dd < dist) {
          dist = dd;
          best = i;
        }
      });
      setActivo(best);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="nosotros" aria-labelledby="v2-why-titulo" className="bg-v2-light text-v2-black">
      <div ref={ref} className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100svh-8rem)]">
          <h2 id="v2-why-titulo" className="v2-h text-[2.2rem] sm:text-5xl lg:text-[3.4rem]" data-reveal>
            {v2PorQue.titulo.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h2>
          <div className="mx-auto mt-8 w-[62%] max-w-[420px] lg:mx-0 lg:mt-12 lg:w-[72%]" style={{ color: mix("#c9b3a1", "#e0925f", p) }}>
            <Monogram progress={p} strokeWidth={7} className="w-full" />
          </div>
        </div>

        <div className="relative lg:pt-28">
          {/* Línea vertical de progreso */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 hidden w-px bg-v2-black/10 lg:block lg:top-28" />
          <span aria-hidden className="absolute left-0 top-0 hidden w-[3px] origin-top bg-v2-orange lg:block lg:top-28" style={{ height: `calc((100% - 7rem) * ${p})` }} />
          <div className="space-y-12 lg:space-y-20 lg:pl-10">
            {v2PorQue.bloques.map((b, i) => (
              <article key={b.titulo} data-bloque className={`border-l-[3px] pl-5 transition-colors duration-500 lg:border-l-0 lg:pl-0 ${i === activo ? "border-v2-orange" : "border-v2-black/10"}`} data-reveal>
                <h3 className={`text-[1.4rem] font-extrabold tracking-[-0.02em] transition-colors sm:text-[1.6rem] ${i === activo ? "text-v2-black" : "text-v2-black/70"}`}>{b.titulo}</h3>
                <p className="mt-3 max-w-lg text-[0.98rem] leading-relaxed text-v2-muted">{b.texto}</p>
                <p className="mt-4 flex items-center gap-3 text-[0.95rem] font-semibold text-v2-orange-ink">
                  <span aria-hidden className="v2-tri text-v2-orange" />
                  {b.destacado}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
