/**
 * Resuelve la configuración del cotizador a números.
 *  · Si no quedan TODO_CONSTRUSUR → precios reales.
 *  · Si quedan y estamos en desarrollo → valores DEMO_DEV (modo "demo").
 *  · Si quedan y estamos en producción → null (el cotizador no muestra montos).
 */
import { cotizadorConfig as C, DEMO_DEV, TODO, type Linea, type TipoObra } from "@/data/cotizador.config";
import type { Pricing } from "./cotizar";

const isNum = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

export function pendientesCotizador(): string[] {
  const p: string[] = [];
  if (!isNum(C.tipoCambio.valor) || C.tipoCambio.fecha === TODO) p.push("Tipo de cambio y fecha");
  for (const tipo of Object.keys(C.precios) as TipoObra[]) {
    for (const linea of Object.keys(C.precios[tipo]) as Linea[]) {
      const x = C.precios[tipo][linea];
      if (!isNum(x.min) || !isNum(x.max)) {
        p.push("Precios por m² (línea y tipo de obra)");
        break;
      }
    }
    if (p.includes("Precios por m² (línea y tipo de obra)")) break;
  }
  if (C.consultoria.some((i) => !isNum(i.pct))) p.push("% de diseño y consultoría");
  if (C.institucionales.some((i) => !isNum(i.pct))) p.push("% de pagos institucionales");
  if (!isNum(C.ivaPct)) p.push("IVA");
  if (C.hitos.some((h) => !isNum(h.pct))) p.push("Hitos de pago");
  if (!C.especificacionesConfirmadas) p.push("Especificaciones por línea");
  return p;
}

export type PricingState = { pricing: Pricing | null; demo: boolean; pendientes: string[] };

export function resolverPricing(env: string | undefined = process.env.NODE_ENV): PricingState {
  const pendientes = pendientesCotizador();
  const preciosPendientes = pendientes.some((x) => x !== "Hitos de pago" && x !== "Especificaciones por línea");

  if (!preciosPendientes) {
    return {
      demo: false,
      pendientes,
      pricing: {
        area: C.area,
        tipoCambio: { valor: C.tipoCambio.valor as number, fecha: C.tipoCambio.fecha },
        precios: C.precios as Pricing["precios"],
        consultoria: C.consultoria.map((i) => ({ ...i, pct: i.pct as number })),
        institucionales: C.institucionales.map((i) => ({ ...i, pct: i.pct as number })),
        ivaPct: C.ivaPct as number,
      },
    };
  }

  if (env === "production") return { pricing: null, demo: false, pendientes };

  return {
    demo: true,
    pendientes,
    pricing: {
      area: C.area,
      tipoCambio: DEMO_DEV.tipoCambio,
      precios: DEMO_DEV.precios,
      consultoria: C.consultoria.map((i) => ({ ...i, pct: DEMO_DEV.consultoria[i.id] ?? 0 })),
      institucionales: C.institucionales.map((i) => ({ ...i, pct: DEMO_DEV.institucionales[i.id] ?? 0 })),
      ivaPct: DEMO_DEV.ivaPct,
    },
  };
}

/** Hitos con % resueltos (demo en desarrollo, null si pendientes en producción). */
export function resolverHitos(env: string | undefined = process.env.NODE_ENV) {
  const listos = C.hitos.every((h) => isNum(h.pct));
  return C.hitos.map((h, i) => ({
    label: h.label,
    detalle: h.detalle,
    pct: listos ? (h.pct as number) : env === "production" ? null : DEMO_DEV.hitos[i] ?? null,
  }));
}
