/**
 * Monograma de la versión B: tres casas anidadas de línea (como un plano en planta
 * de alzado). Se usa pequeño en el logo y enorme, dibujándose, en "Por qué" y Contacto.
 */
export const MONO_PATHS = [
  "M8 92V47L50 9l42 38v45",
  "M24 92V54L50 31l26 23v38",
  "M40 92V61l10-9 10 9v31",
];

export function Monogram({
  className = "",
  strokeWidth = 6,
  draw = false,
  progress,
}: {
  className?: string;
  strokeWidth?: number;
  /** Agrega la clase de dibujo (stroke-dashoffset). */
  draw?: boolean;
  /** 0–1: avance del trazo controlado por scroll (opcional). */
  progress?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={`${draw ? "v2-draw" : ""} ${className}`} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="miter" strokeLinecap="square">
      {MONO_PATHS.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          style={
            progress !== undefined
              ? { strokeDasharray: 1, strokeDashoffset: Math.max(0, Math.min(1, 1 - (progress * 1.6 - i * 0.3))), transition: "none" }
              : ({ "--d": i * 250 } as React.CSSProperties)
          }
        />
      ))}
    </svg>
  );
}

export function V2Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 100 100" aria-hidden className="size-9 shrink-0" fill="none" stroke="#e0925f" strokeWidth={8} strokeLinecap="square">
        {MONO_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-v2)] text-[1.05rem] font-extrabold uppercase tracking-[0.04em]">
          Constru<span className="text-v2-orange">Sur</span>
        </span>
        <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.32em] text-white/60">Construcción · S.A.</span>
      </span>
    </span>
  );
}
