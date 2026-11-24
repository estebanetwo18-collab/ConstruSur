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
};

export function SectionTitle({ eyebrow, titulo, intro, align = "left", as: Tag = "h2", className = "", size = "lg", id }: Props) {
  const center = align === "center";
  const sz =
    size === "xl"
      ? "text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem]"
      : "text-[2.15rem] leading-[1.06] sm:text-5xl lg:text-[3.4rem]";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${center ? "justify-center" : ""}`} data-reveal>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={`font-display mt-4 font-medium text-balance ${sz}`} data-reveal style={{ "--i": 1 } as React.CSSProperties}>
        {titulo[0]} <span className="kw">{titulo[1]}</span>
        {titulo[2]}
      </Tag>
      {intro && (
        <p
          className={`mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft text-pretty ${center ? "mx-auto" : ""}`}
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
