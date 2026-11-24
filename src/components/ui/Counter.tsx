"use client";

import { useEffect, useRef, useState } from "react";

/** Contador animado al entrar en pantalla. valor null → "XX" (dato pendiente). */
export function Counter({ valor, sufijo = "", duracion = 1600 }: { valor: number | null; sufijo?: string; duracion?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(valor ?? 0);
  const [armado, setArmado] = useState(false);

  useEffect(() => {
    if (valor === null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setArmado(true);
        setN(0);
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duracion);
          const eased = 1 - Math.pow(1 - p, 4);
          setN(Math.round(valor * eased));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [valor, duracion]);

  if (valor === null) {
    return (
      <span title="Dato pendiente de confirmar">
        XX{sufijo}
      </span>
    );
  }
  return (
    <span ref={ref}>
      <span className="sr-only">
        {valor}
        {sufijo}
      </span>
      <span aria-hidden>
        {armado ? n : valor}
        {sufijo}
      </span>
    </span>
  );
}
