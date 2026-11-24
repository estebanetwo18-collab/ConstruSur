/**
 * Cálculo del cotizador — función pura, sin dependencias de React ni del DOM.
 * Se usa en el navegador (cálculo en vivo) y en /api/lead (resumen por correo).
 */
import type { Linea, Moneda, TipoObra } from "@/data/cotizador.config";

export type Rango = { min: number; max: number };

export type Pricing = {
  area: { min: number; max: number };
  tipoCambio: { valor: number; fecha: string };
  precios: Record<TipoObra, Record<Linea, Rango>>;
  consultoria: { id: string; label: string; pct: number }[];
  institucionales: { id: string; label: string; pct: number; nota?: string }[];
  ivaPct: number;
};

export type CotizacionInput = {
  m2: number;
  tipo: TipoObra;
  linea: Linea;
  moneda: Moneda;
};

export type Partida = { id: string; label: string; pct: number; monto: Rango; nota?: string };

export type Resultado = {
  input: CotizacionInput;
  moneda: Moneda;
  tipoCambio: { valor: number; fecha: string };
  precioM2: Rango;
  construccion: Rango;
  consultoria: { pct: number; items: Partida[]; total: Rango };
  institucionales: { pct: number; items: Partida[]; total: Rango };
  subtotal: Rango;
  iva: { pct: number; monto: Rango };
  total: Rango;
};

export type ValidacionArea = { ok: true; m2: number } | { ok: false; error: string };

export function validarArea(valor: unknown, limites: { min: number; max: number }): ValidacionArea {
  const n = typeof valor === "string" ? Number(valor.replace(",", ".")) : Number(valor);
  if (valor === "" || valor === null || valor === undefined || !Number.isFinite(n)) {
    return { ok: false, error: "Ingrese los metros cuadrados de construcción." };
  }
  if (n < limites.min) return { ok: false, error: `El mínimo es ${limites.min} m².` };
  if (n > limites.max) return { ok: false, error: `El máximo es ${limites.max} m². Para proyectos mayores, conversemos.` };
  return { ok: true, m2: Math.round(n) };
}

const r = (a: Rango, f: (v: number) => number): Rango => ({ min: f(a.min), max: f(a.max) });
const suma = (...rs: Rango[]): Rango => ({
  min: rs.reduce((s, x) => s + x.min, 0),
  max: rs.reduce((s, x) => s + x.max, 0),
});

/**
 * Calcula el rango de inversión.
 * Devuelve null si los m² están fuera de rango o falta un tipo de cambio válido.
 */
export function cotizar(input: CotizacionInput, p: Pricing): Resultado | null {
  const v = validarArea(input.m2, p.area);
  if (!v.ok) return null;
  const precio = p.precios[input.tipo]?.[input.linea];
  if (!precio) return null;
  if (input.moneda === "USD" && !(p.tipoCambio.valor > 0)) return null;

  // Todo se calcula en colones y se convierte al final.
  const fx = input.moneda === "USD" ? 1 / p.tipoCambio.valor : 1;
  const conv = (x: Rango) => r(x, (n) => n * fx);

  const construccionCRC = r(precio, (pm2) => pm2 * v.m2);

  const partidas = (items: { id: string; label: string; pct: number; nota?: string }[]): Partida[] =>
    items.map((it) => ({ ...it, monto: conv(r(construccionCRC, (c) => (c * it.pct) / 100)) }));

  const consultoriaItems = partidas(p.consultoria);
  const institucionalesItems = partidas(p.institucionales);

  const construccion = conv(construccionCRC);
  const consultoriaTotal = suma(...consultoriaItems.map((i) => i.monto));
  const institucionalesTotal = suma(...institucionalesItems.map((i) => i.monto));
  const subtotal = suma(construccion, consultoriaTotal, institucionalesTotal);
  // IVA sobre construcción + consultoría (los pagos institucionales no llevan IVA).
  const iva = r(suma(construccion, consultoriaTotal), (b) => (b * p.ivaPct) / 100);
  const total = suma(subtotal, iva);

  return {
    input: { ...input, m2: v.m2 },
    moneda: input.moneda,
    tipoCambio: p.tipoCambio,
    precioM2: conv(precio),
    construccion,
    consultoria: {
      pct: p.consultoria.reduce((s, i) => s + i.pct, 0),
      items: consultoriaItems,
      total: consultoriaTotal,
    },
    institucionales: {
      pct: p.institucionales.reduce((s, i) => s + i.pct, 0),
      items: institucionalesItems,
      total: institucionalesTotal,
    },
    subtotal,
    iva: { pct: p.ivaPct, monto: iva },
    total,
  };
}
