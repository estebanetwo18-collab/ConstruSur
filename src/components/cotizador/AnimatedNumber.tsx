"use client";

import { useEffect, useRef, useState } from "react";
import type { Moneda } from "@/data/cotizador.config";
import { dinero } from "@/lib/format";

/** Monto con conteo animado desde el valor anterior. */
export function AnimatedNumber({ value, moneda, duracion = 700 }: { value: number; moneda: Moneda; duracion?: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  const raf = useRef(0);

  useEffect(() => {
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duracion;
    const start = from.current;
    const t0 = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (t: number) => {
      const p = dur ? Math.min(1, (t - t0) / dur) : 1;
      const e = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * e;
      from.current = v;
      setShown(v);
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duracion]);

  return <span className="tabular-nums">{dinero(shown, moneda)}</span>;
}
