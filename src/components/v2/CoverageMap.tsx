"use client";

import { useEffect, useRef, useState } from "react";
import { v2Cobertura as M } from "@/data/v2";

/**
 * Mapa esquemático de la GAM (provincias simplificadas).
 * TODO_CONSTRUSUR: reemplazar los trazos por un SVG real si se requiere precisión geográfica.
 */
const PROV: Record<string, { d: string; lx: number; ly: number }> = {
  alajuela: { d: "M80 120 210 70 360 80 420 150 410 250 360 300 250 310 150 260 90 200Z", lx: 170, ly: 175 },
  heredia: { d: "M360 80 470 60 600 90 640 170 620 250 560 270 470 255 410 250 420 150Z", lx: 470, ly: 130 },
  sanjose: { d: "M250 310 360 300 410 250 470 255 560 270 620 250 680 300 700 400 640 480 520 560 400 540 330 450 280 380Z", lx: 430, ly: 470 },
  cartago: { d: "M620 250 700 200 850 240 950 330 930 480 820 590 660 600 640 480 700 400 680 300Z", lx: 800, ly: 380 },
};
const RUTAS = [
  "M120 230 260 250 380 268 470 300 540 322 620 330 720 380 800 450", // Ruta 1 → Ruta 2
  "M470 205 520 260 540 322", // Heredia → San José
  "M540 322 600 250 660 170", // Ruta 32
  "M470 300 500 360 560 380 620 360 640 320 600 290 540 285 490 300", // Circunvalación
];

export function V2CoverageMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [tip, setTip] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce) return setP(1);
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      // Desktop: avance dentro de la sección "pegajosa"; móvil: al entrar en pantalla.
      const v = total > 50 ? -r.top / total : (window.innerHeight - r.top) / (window.innerHeight * 0.9);
      setP(Math.min(1, Math.max(0, v)));
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

  // Zoom/paneo hacia las obras
  const cx = M.obras.reduce((s, o) => s + o.x, 0) / M.obras.length;
  const cy = M.obras.reduce((s, o) => s + o.y, 0) / M.obras.length;
  const e = 1 - Math.pow(1 - Math.min(1, p * 1.4), 3);
  const scale = 1 + e * 0.75;
  const tx = (500 - cx) * e * 0.9;
  const ty = (320 - cy) * e * 0.9;
  const ciudadesOn = p > 0.12;

  const conteo = (prov: string) => ({
    cantones: M.zona.filter((z) => z.provincia === prov).length,
    obras: M.obras.filter((o) => o.provincia === prov).length,
  });

  return (
    <section id="cobertura" aria-labelledby="v2-map-titulo" className="relative bg-v2-black">
      <div ref={ref} className="relative lg:h-[230vh]">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-16 sm:px-8 lg:sticky lg:top-[64px] lg:h-[calc(100svh-64px)] lg:grid-cols-[minmax(320px,0.8fr)_1.6fr] lg:items-center lg:px-12 lg:py-0">
          {/* Columna izquierda */}
          <div>
            <h2 id="v2-map-titulo" className="v2-h text-[2.2rem] sm:text-5xl lg:text-[3.4rem]">
              {M.titulo.map((t) => (
                <span key={t} className="block">
                  {t}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-white/70">{M.intro}</p>
            <ul className="mt-8 max-w-md">
              {M.provincias.map((pr) => {
                const c = conteo(pr.id);
                return (
                  <li key={pr.id} className="flex items-center justify-between border-b border-v2-brown py-3 text-sm">
                    <span className="flex items-center gap-3 font-semibold">
                      <span aria-hidden className="v2-tri text-v2-orange" />
                      {pr.nombre}
                    </span>
                    <span className="text-white/60">
                      {c.cantones} {c.cantones === 1 ? "cantón" : "cantones"}{c.obras ? ` · ${c.obras} ${c.obras === 1 ? "obra" : "obras"}` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70" aria-label="Leyenda del mapa">
              <li className="flex items-center gap-2">
                <span aria-hidden className="size-2 rounded-full bg-v2-brown-soft" /> Zona de trabajo
              </li>
              <li className="flex items-center gap-2">
                <svg aria-hidden viewBox="0 0 10 10" className="size-3 fill-v2-orange"><path d="M5 0 10 10H0Z" /></svg> Obra entregada
              </li>
              {M.oficina && (
                <li className="flex items-center gap-2">
                  <svg aria-hidden viewBox="0 0 10 10" className="size-3 fill-white"><path d="M5 0 10 10H0Z" /></svg> Oficina
                </li>
              )}
            </ul>
          </div>

          {/* Mapa */}
          <div className="relative aspect-[1000/640] w-full overflow-hidden">
            <svg viewBox="0 0 1000 640" className="size-full" role="img" aria-label="Mapa esquemático de la Gran Área Metropolitana con las obras de ConstruSur">
              <g style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})`, transformOrigin: `${cx}px ${cy}px`, transition: "transform .2s linear" }}>
                {Object.entries(PROV).map(([id, pr]) => (
                  <g key={id}>
                    <path d={pr.d} fill="rgba(74,52,38,.18)" stroke="var(--v2-brown-line)" strokeWidth={1.4 / scale} />
                    <text x={pr.lx} y={pr.ly} fill="rgba(201,179,161,.55)" fontSize={20 / Math.sqrt(scale)} fontWeight={700} textAnchor="middle" style={{ fontFamily: "var(--font-v2)" }}>
                      {M.provincias.find((x) => x.id === id)?.nombre}
                    </text>
                  </g>
                ))}
                {RUTAS.map((d) => (
                  <path key={d} d={d} fill="none" stroke="rgba(107,74,50,.8)" strokeWidth={1.6 / scale} strokeDasharray={`${6 / scale} ${5 / scale}`} />
                ))}
                {M.zona.map((z, k) => (
                  <g key={z.nombre} style={{ opacity: ciudadesOn ? 1 : 0, transition: `opacity .6s ${k * 40}ms` }}>
                    <circle cx={z.x} cy={z.y} r={3.2 / scale} fill="var(--v2-brown-soft)" />
                    <text x={z.x + 7 / scale} y={z.y - 5 / scale} fontSize={11 / scale} fill="rgba(244,240,232,.7)">
                      {z.nombre}
                    </text>
                  </g>
                ))}
              </g>
            </svg>

            {/* Pines (HTML, accesibles por teclado, con tooltip) */}
            {M.obras.map((o, k) => {
              const visible = p > 0.3 + k * 0.12;
              const x = ((o.x - cx) * scale + cx + tx) / 10;
              const y = ((o.y - cy) * scale + cy + ty) / 6.4;
              return (
                <div key={o.nombre} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <button
                    type="button"
                    aria-label={`Obra: ${o.nombre}`}
                    onMouseEnter={() => setTip(k)}
                    onMouseLeave={() => setTip(null)}
                    onFocus={() => setTip(k)}
                    onBlur={() => setTip(null)}
                    className="relative -ml-3 -mt-6 block size-6 transition-transform hover:scale-125 focus-visible:scale-125"
                    style={{ opacity: visible ? 1 : 0, animation: visible ? "v2-pin .6s var(--ease) both" : "none", pointerEvents: visible ? "auto" : "none" }}
                  >
                    <svg viewBox="0 0 10 10" className="size-full drop-shadow-[0_2px_6px_rgba(224,146,95,.6)]">
                      <path d="M5 0 10 10H0Z" fill="var(--v2-orange)" />
                    </svg>
                  </button>
                  {tip === k && (
                    <div role="tooltip" className="pointer-events-none absolute bottom-7 left-1/2 z-10 w-max max-w-[220px] -translate-x-1/2 bg-white px-3 py-2 text-v2-black shadow-xl">
                      <p className="text-sm font-bold">{o.nombre}</p>
                      <p className="text-xs text-v2-muted">{o.detalle}</p>
                    </div>
                  )}
                </div>
              );
            })}
            <p className="absolute right-1 top-1 text-[0.65rem] text-white/40">Mapa esquemático</p>
          </div>
        </div>
      </div>
    </section>
  );
}
