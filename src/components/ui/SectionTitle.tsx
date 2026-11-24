type Props = {
  eyebrow?: string;
  /** [antes, palabra clave, después] → la palabra clave va en terracota e itálica. */
  titulo: readonly [string, string, string];
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  size?: "lg" | "xl";
  id?: string;
  /** Sobre el pliegue: animación CSS inmediata (no espera al JS, no retrasa el LCP). */
  immediate?: boolean;
};

export function SectionTitle({ eyebrow, titulo, intro, align = "left", as: Tag = "h2", className = "", size = "lg", id, immediate = false }: Props) {
  const anim = (i: number) =>
    immediate
      ? { className: "hero-in", style: { "--i": i } as React.CSSProperties }
      : { className: "", "data-reveal": true, style: { "--i": i } as React.CSSProperties };
  const center = align === "center";
  const sz =
    size === "xl"
      ? "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem]"
      : "text-[2.15rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p {...anim(0)} className={`eyebrow ${anim(0).className} ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} {...anim(1)} className={`font-display mt-4 font-medium text-balance ${anim(1).className} ${sz}`}>
        {titulo[0]} <span className="kw">{titulo[1]}</span>
        {titulo[2]}
      </Tag>
      {intro && (
        <p {...anim(2)} className={`mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft text-pretty ${anim(2).className} ${center ? "mx-auto" : ""}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
