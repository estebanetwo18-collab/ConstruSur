"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video del hero: se carga DESPUÉS de la imagen (LCP), elige versión
 * liviana en móvil y no se carga con prefers-reduced-motion o ahorro de datos.
 * Se reproduce una vez: termina en la casa terminada (igual al poster).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (reduce || conn?.saveData || conn?.effectiveType === "2g") return;

    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const start = () => {
      v.src = desktop ? "/video/hero-desktop.mp4" : "/video/hero-mobile.mp4";
      v.load();
      v.play().catch(() => {});
    };
    // Espera a que la página esté cargada para no competir con el LCP.
    if (document.readyState === "complete") {
      const t = setTimeout(start, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  return (
    <video
      ref={ref}
      muted
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setVisible(true)}
      className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
    />
  );
}
