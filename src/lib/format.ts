import type { Moneda } from "@/data/cotizador.config";

/** Redondea montos para mostrar: ₡ a miles, $ a decenas. */
export function redondear(n: number, moneda: Moneda): number {
  const paso = moneda === "CRC" ? 1000 : 10;
  return Math.round(n / paso) * paso;
}

const fmt = {
  CRC: new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC", maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }),
};

export function dinero(n: number, moneda: Moneda): string {
  return fmt[moneda].format(redondear(n, moneda));
}

/** Formato compacto para textos (WhatsApp, correo): ₡67,5 millones. */
export function dineroCorto(n: number, moneda: Moneda): string {
  const s = moneda === "CRC" ? "₡" : "$";
  if (n >= 1_000_000) {
    const v = new Intl.NumberFormat("es-CR", { maximumFractionDigits: 1 }).format(n / 1_000_000);
    return `${s}${v} ${n >= 2_000_000 ? "millones" : "millón"}`;
  }
  return dinero(n, moneda);
}

export function pct(n: number): string {
  return `${new Intl.NumberFormat("es-CR", { maximumFractionDigits: 2 }).format(n)} %`;
}

export const nombreMoneda = (m: Moneda) => (m === "CRC" ? "colones" : "dólares");
