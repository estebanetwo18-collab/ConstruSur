"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { servicios } from "@/data/servicios";
import { v2Servicios } from "@/data/v2";
import { ArrowLink } from "./Buttons";

const DUR = 7000;

/** Servicios en tabs con autoplay, barra de progreso y paneles con corte diagonal. */
export function V2ServiceTabs() {
  const items = servicios.items;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const go = (i: number, focus = false) => {
    const n = (i + items.length) % items.length;
    setActive(n);
    const bar = tabsRef.current;
    const tab = bar?.querySelectorAll<HTMLButtonElement>("[role=tab]")[n];
    // Solo desplaza la barra de tabs (nunca la página).
    if (bar && tab) bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.offsetWidth / 2, behavior: "smooth" });
    if (focus) tab?.focus({ preventScroll: true });
  };

  return (
    <section id="servicios" aria-labelledby="v2-serv-titulo" className="bg-v2-light text-v2-black">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-14 lg:pt-24">
        <h2 id="v2-serv-titulo" className="v2-h max-w-3xl text-[2.2rem] sm:text-5xl lg:text-[3.6rem]" data-reveal>
          Tres líneas y tres servicios, bajo un mismo estándar.
        </h2>
      </div>

      {/* Barra de tabs */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Servicios de ConstruSur"
        className="no-scrollbar mx-auto flex max-w-[1440px] overflow-x-auto px-5 sm:px-8 lg:px-12"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(active + 1, true);
          if (e.key === "ArrowLeft") go(active - 1, true);
        }}
      >
        {items.map((s, i) => {
          const sel = i === active;
          return (
            <button
              key={s.id}
              role="tab"
              id={`v2-tab-${s.id}`}
              aria-selected={sel}
              aria-controls={`v2-panel-${s.id}`}
              tabIndex={sel ? 0 : -1}
              onClick={() => go(i)}
              className={`relative shrink-0 whitespace-nowrap px-6 py-3.5 text-left text-[0.92rem] font-semibold transition-colors lg:flex-1 ${
                sel ? "bg-v2-black text-white [clip-path:polygon(0_0,calc(100%-18px)_0,100%_100%,0_100%)] pr-9" : "text-v2-muted hover:text-v2-black"
              }`}
            >
              {s.titulo}
            </button>
          );
        })}
      </div>

      {/* Banda oscura con paneles deslizantes */}
      <div
        className={`overflow-hidden bg-v2-black pb-6 pt-6 lg:pt-8 ${paused ? "v2-paused" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div
            className="flex gap-5 transition-transform duration-700 ease-brand [--w:calc(100vw-40px)] sm:[--w:min(1100px,82vw)]"
            style={{ transform: `translateX(calc(${-active} * (var(--w) + 20px)))` }}
          >
            {items.map((s, i) => {
              const det = v2Servicios[s.id];
              const sel = i === active;
              return (
                <article
                  key={s.id}
                  id={`v2-panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`v2-tab-${s.id}`}
                  aria-hidden={!sel}
                  inert={!sel}
                  onClick={() => !sel && go(i)}
                  className={`grid w-[var(--w)] shrink-0 bg-white text-v2-black transition-opacity duration-500 md:grid-cols-[1fr_1.05fr] ${sel ? "" : "cursor-pointer opacity-60"}`}
                >
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px]">
                    <Image src={s.img} alt="" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
                  </div>
                  <div className="relative flex flex-col justify-center px-6 py-8 md:px-12 md:py-12 md:[clip-path:polygon(0_0,100%_0,calc(100%-44px)_100%,0_100%)]">
                    <h3 className="v2-h text-[1.7rem] sm:text-[2rem]">{det.titulo}</h3>
                    <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-v2-muted">{det.parrafo}</p>
                    <ul className="mt-6 max-w-md space-y-2.5 border-t border-v2-black/10 pt-5 text-[0.95rem]">
                      {det.vinetas.map((v) => (
                        <li key={v} className="flex items-center gap-3">
                          <span aria-hidden className="v2-tri text-v2-orange" />
                          {v}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7">
                      <ArrowLink href={s.linea ? `/cotizador?linea=${s.linea}` : "/#contacto"} className="text-v2-orange-ink">
                        {s.linea ? `Cotizar ${s.titulo}` : "Ver más"}
                      </ArrowLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Barra de progreso del autoplay */}
          <div className="mt-6 flex items-center gap-4" aria-hidden>
            <div className="relative h-[3px] flex-1 bg-v2-brown/70">
              <div
                key={active}
                className="v2-progress absolute inset-0 bg-v2-orange motion-reduce:hidden"
                style={{ "--dur": `${DUR}ms` } as React.CSSProperties}
                onAnimationEnd={() => go(active + 1)}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums text-white/60">
              0{active + 1} / 0{items.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
