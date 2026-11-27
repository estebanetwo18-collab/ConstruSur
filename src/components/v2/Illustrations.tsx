/**
 * Ilustraciones de línea propias (estilo plano arquitectónico) para
 * "Para quién construimos". Cada trazo usa pathLength=1 para dibujarse.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function P({ d, i = 0 }: { d: string; i?: number }) {
  return <path d={d} pathLength={1} style={{ "--d": i * 120 } as React.CSSProperties} />;
}

const DIBUJOS: Record<string, string[]> = {
  // Casa unifamiliar: casa de dos aguas con puerta y ventanas
  unifamiliar: [
    "M10 110H190",
    "M40 110V60L90 25L140 60V110",
    "M30 66L90 20L150 66",
    "M78 110V80H102V110",
    "M52 72H70V88H52ZM110 72H128V88H110Z",
    "M150 110V78H180V110M150 92H180",
    "M120 38V24H130V45",
  ],
  // Residencia de lujo: volúmenes de techo plano, voladizo y piscina
  lujo: [
    "M8 110H192",
    "M20 110V62H110V110",
    "M60 62V36H170V62H140",
    "M50 36H180",
    "M70 46H96V58H70ZM110 46H160V58H110Z",
    "M30 74H100V100H30Z M65 74V100",
    "M120 110V76H176V110",
    "M110 118H186L180 126H116Z",
  ],
  // Remodelación: casa con andamio
  remodelacion: [
    "M10 110H190",
    "M50 110V62L95 30L140 62V110",
    "M80 110V84H104V110",
    "M60 70H78V86H60Z",
    "M150 110V34M178 110V34M150 56H178M150 82H178M150 34H178",
    "M150 56L178 82M178 56L150 82",
    "M116 70H134V86H116Z",
  ],
  // Ampliación: casa + volumen nuevo punteado
  ampliacion: [
    "M10 110H190",
    "M24 110V60L68 28L112 60V110",
    "M56 110V84H80V110",
    "M34 70H50V84H34Z",
    "M112 110V70H176V110",
    "M112 70L144 50L176 70",
    "M132 84H156V98H132Z",
    "M100 40L116 40M108 32V48",
  ],
  // Condominio / townhouse: tres casas en fila
  condominio: [
    "M6 110H194",
    "M14 110V56L40 36L66 56V110",
    "M66 110V56L92 36L118 56V110",
    "M118 110V56L144 36L170 56V110",
    "M32 110V88H48V110M84 110V88H100V110M136 110V88H152V110",
    "M24 62H56V76H24ZM76 62H108V76H76ZM128 62H160V76H128Z",
    "M170 110V74H188V110",
  ],
  // Llave en mano: casa y llave
  llave: [
    "M10 110H190",
    "M30 110V62L76 28L122 62V110",
    "M62 110V82H90V110",
    "M40 68H56V82H40Z",
    "M150 54A14 14 0 1 0 150.1 54",
    "M150 82V120M150 104H162M150 114H158",
    "M150 62A4 4 0 1 0 150.1 62",
  ],
};

export function Illustration({ id, className = "" }: { id: string; className?: string }) {
  const paths = DIBUJOS[id] ?? DIBUJOS.unifamiliar;
  return (
    <svg viewBox="0 0 200 130" aria-hidden className={`v2-draw ${className}`} {...S}>
      {paths.map((d, i) => (
        <P key={i} d={d} i={i} />
      ))}
    </svg>
  );
}
