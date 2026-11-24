"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { Modal } from "./Modal";
import type { Proyecto } from "@/data/proyectos";

/** Galería con ficha del proyecto: teclado (←/→/Esc) y swipe. */
export function Lightbox({ proyecto, onClose }: { proyecto: Proyecto | null; onClose: () => void }) {
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const n = proyecto?.fotos.length ?? 0;

  useEffect(() => {
    if (!proyecto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [proyecto, n]);

  const foto = proyecto?.fotos[i];
  const ficha = proyecto
    ? [
        ["Línea", proyecto.linea],
        ["Ubicación", proyecto.ubicacion],
        ["Área", proyecto.m2],
        ["Plazo", proyecto.plazo],
        ["Año", proyecto.anio],
      ]
    : [];

  return (
    <Modal open={!!proyecto} onClose={onClose} bare labelledBy="lightbox-titulo">
      {proyecto && foto && (
        <div className="on-dark flex h-full flex-col text-cream lg:flex-row">
          <div
            className="relative min-h-0 flex-1"
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touch.current === null) return;
              const dx = e.changedTouches[0].clientX - touch.current;
              if (Math.abs(dx) > 40) setI((x) => (dx < 0 ? (x + 1) % n : (x - 1 + n) % n));
              touch.current = null;
            }}
          >
            <Image
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-contain p-3 sm:p-8"
              style={{ animation: "rise .6s var(--ease) both" }}
            />
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => setI((x) => (x - 1 + n) % n)}
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-terra"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => setI((x) => (x + 1) % n)}
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink transition hover:bg-terra"
            >
              <ChevronRight className="size-5" />
            </button>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold tabular-nums" aria-live="polite">
              {i + 1} / {n}
            </p>
          </div>

          <aside className="shrink-0 bg-ink p-5 sm:p-6 lg:w-[340px] lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Línea {proyecto.linea}</p>
                <h2 id="lightbox-titulo" className="font-display mt-2 text-2xl font-medium sm:text-3xl">
                  {proyecto.nombre}
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-cream/75">
                  <MapPin className="size-4 text-terra" /> {proyecto.ubicacion}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar galería"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-cream/10 transition hover:bg-terra hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>
            <dl className="mt-5 hidden grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid lg:mt-8 lg:grid-cols-1">
              {ficha.map(([k, v]) => (
                <div key={k} className="border-t border-cream/10 pt-3">
                  <dt className="text-xs uppercase tracking-[0.14em] text-cream/55">{k}</dt>
                  <dd className="mt-0.5 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto lg:mt-8 lg:grid lg:grid-cols-4">
              {proyecto.fotos.map((f, k) => (
                <button
                  key={f.src}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={`Ver foto ${k + 1}: ${f.alt}`}
                  aria-current={k === i}
                  className={`relative aspect-square w-14 shrink-0 overflow-hidden rounded-lg transition lg:w-auto ${k === i ? "ring-2 ring-terra" : "opacity-55 hover:opacity-100"}`}
                >
                  <Image src={f.src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </Modal>
  );
}
