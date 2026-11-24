"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Carrusel horizontal con scroll-snap: swipe nativo en móvil, flechas en
 * desktop, navegable con teclado (Tab a cada tarjeta; ←/→ en el contenedor).
 */
export function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [can, setCan] = useState({ prev: false, next: true });
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCan({ prev: el.scrollLeft > 4, next: el.scrollLeft < max - 4 });
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * w, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carrusel" aria-label={label}>
      <ul
        ref={ref}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-6 pt-2 focus-visible:outline-offset-[-3px] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </ul>
      <div className="mt-2 flex items-center gap-5">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <div
            className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-ink transition-transform duration-300"
            style={{ transform: `translateX(${progress * 300}%)` }}
          />
        </div>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={!can.prev}
            aria-label="Anterior"
            className="grid size-12 place-items-center rounded-full border border-ink/15 bg-paper transition-all hover:bg-ink hover:text-cream disabled:opacity-35 disabled:hover:bg-paper disabled:hover:text-ink"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!can.next}
            aria-label="Siguiente"
            className="grid size-12 place-items-center rounded-full bg-terra text-ink transition-all hover:bg-ink hover:text-terra disabled:opacity-35 disabled:hover:bg-terra disabled:hover:text-ink"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
