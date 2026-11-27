/**
 * Ilustraciones de línea propias (estilo plano arquitectónico) para
 * "Para quién construimos". Trazo fino en marrón claro con un detalle en naranja.
 * Cada trazo usa pathLength=1 para dibujarse al entrar en pantalla.
 */
type Trazo = { d: string; a?: true };

const SUELO = "M4 128H236";

const DIBUJOS: Record<string, Trazo[]> = {
  // Casa unifamiliar: dos aguas, chimenea, cochera y árbol
  unifamiliar: [
    { d: SUELO },
    { d: "M40 128V70H140V128" },
    { d: "M30 74L90 34L150 74" },
    { d: "M118 50V36H128V57" },
    { d: "M84 58a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" },
    { d: "M52 84H72V104H52ZM62 84V104M52 94H72" },
    { d: "M110 84H130V104H110ZM120 84V104M110 94H130" },
    { d: "M82 128V96H100V128", a: true },
    { d: "M140 128V88H192V128M140 88L166 72L192 88" },
    { d: "M148 128V100H184V128M148 108H184M148 116H184" },
    { d: "M212 128V104M212 104c-12 0-14-20 0-22c14 2 12 22 0 22Z" },
  ],
  // Residencia de lujo: volúmenes planos, voladizo, muro cortina y piscina
  lujo: [
    { d: "M4 120H236" },
    { d: "M24 120V76H150V120" },
    { d: "M62 34H218V40H62Z" },
    { d: "M70 76V40M210 40V76H70" },
    { d: "M80 48H200V68H80ZM110 48V68M140 48V68M170 48V68" },
    { d: "M34 86H96V120M34 86V120M55 86V120M76 86V120" },
    { d: "M110 120V86H140V120M110 98H140M110 109H140" },
    { d: "M200 76V120" },
    { d: "M150 120V128H232V120M162 124h12m8 0h12m8 0h12", a: true },
    { d: "M226 120V98M226 98c-8-6-14-4-18 0M226 98c8-6 14-4 18 0" },
  ],
  // Remodelación: casa con andamio y escalera
  remodelacion: [
    { d: SUELO },
    { d: "M40 128V72H130V128" },
    { d: "M30 76L85 40L140 76" },
    { d: "M56 88H76V106H56ZM66 88V106M56 97H76" },
    { d: "M92 128V98H110V128" },
    { d: "M150 128V44M190 128V44M146 44H194M146 64H194M146 92H194M146 120H194", a: true },
    { d: "M150 64L190 92M190 64L150 92M150 92L190 120" },
    { d: "M206 128L216 60M222 128L232 60M208 116H224M210 102H226M212 88H228M214 74H230" },
    { d: "M114 84l10-8" },
  ],
  // Ampliación: casa existente + volumen nuevo con cota
  ampliacion: [
    { d: SUELO },
    { d: "M24 128V74H104V128" },
    { d: "M16 78L64 42L112 78" },
    { d: "M36 88H54V106H36ZM45 88V106" },
    { d: "M70 128V98H88V128" },
    { d: "M104 128V86H176V128M100 86H180", a: true },
    { d: "M120 98H160V114H120ZM140 98V114" },
    { d: "M104 70H176M104 66V74M176 66V74M110 67L104 70L110 73M170 67L176 70L170 73" },
    { d: "M210 58V82M198 70H222", a: true },
  ],
  // Condominio / townhouse: cuatro unidades adosadas
  condominio: [
    { d: SUELO },
    { d: "M16 128V64L46 44L76 64V128" },
    { d: "M76 128V56L106 36L136 56V128" },
    { d: "M136 128V64L166 44L196 64V128" },
    { d: "M196 128V56L216 42L236 56V128" },
    { d: "M28 74H64V90H28ZM88 66H124V82H88ZM148 74H184V90H148ZM204 66H228V82H204Z" },
    { d: "M84 98H128M84 104H128M92 98V104M106 98V104M120 98V104", a: true },
    { d: "M38 128V106H54V128M98 128V112H114V128M158 128V106H174V128M210 128V108H222V128" },
  ],
  // Llave en mano: casa y llave
  llave: [
    { d: SUELO },
    { d: "M24 128V70H120V128" },
    { d: "M14 74L72 34L130 74" },
    { d: "M36 84H54V100H36ZM92 84H110V100H92Z" },
    { d: "M62 128V96H82V128" },
    { d: "M194 64a18 18 0 1 1 -36 0a18 18 0 1 1 36 0", a: true },
    { d: "M182 64a6 6 0 1 1 -12 0a6 6 0 1 1 12 0", a: true },
    { d: "M176 82V124M176 108H188M176 116H184M176 124H190", a: true },
  ],
};

export function Illustration({ id, className = "" }: { id: string; className?: string }) {
  const trazos = DIBUJOS[id] ?? DIBUJOS.unifamiliar;
  return (
    <svg viewBox="0 0 240 140" aria-hidden className={`v2-draw ${className}`} fill="none" strokeWidth={1.25} strokeLinejoin="round" strokeLinecap="round">
      {trazos.map((t, i) => (
        <path key={i} d={t.d} pathLength={1} stroke={t.a ? "var(--v2-orange)" : "var(--v2-brown-soft)"} style={{ "--d": i * 110 } as React.CSSProperties} />
      ))}
    </svg>
  );
}
