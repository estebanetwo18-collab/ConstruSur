import { describe, expect, it } from "vitest";
import { cotizar, validarArea, type Pricing } from "@/lib/cotizar";
import { resolverPricing, pendientesCotizador } from "@/lib/pricing";

// Pricing de prueba con números redondos (no son precios reales).
const P: Pricing = {
  area: { min: 40, max: 1000 },
  tipoCambio: { valor: 500, fecha: "01/01/2026" },
  precios: {
    nueva: {
      essential: { min: 400_000, max: 500_000 },
      prestige: { min: 600_000, max: 700_000 },
      prime: { min: 900_000, max: 1_200_000 },
    },
    remodelacion: {
      essential: { min: 300_000, max: 400_000 },
      prestige: { min: 450_000, max: 550_000 },
      prime: { min: 700_000, max: 900_000 },
    },
  },
  consultoria: [
    { id: "estudios", label: "Estudios preliminares", pct: 0.5 },
    { id: "anteproyecto", label: "Anteproyecto", pct: 1 },
    { id: "planos", label: "Planos", pct: 4 },
    { id: "direccion", label: "Dirección técnica", pct: 5 },
  ],
  institucionales: [
    { id: "cfia", label: "CFIA", pct: 0.27 },
    { id: "municipalidad", label: "Municipalidad", pct: 1 },
    { id: "ins", label: "INS", pct: 1.35 },
  ],
  ivaPct: 13,
};

const close = (a: number, b: number) => expect(a).toBeCloseTo(b, 4);

describe("validarArea", () => {
  it("acepta valores dentro del rango y redondea", () => {
    expect(validarArea(150, P.area)).toEqual({ ok: true, m2: 150 });
    expect(validarArea("120,6", P.area)).toEqual({ ok: true, m2: 121 });
    expect(validarArea(40, P.area).ok).toBe(true);
    expect(validarArea(1000, P.area).ok).toBe(true);
  });
  it("rechaza vacío, no numérico y fuera de rango", () => {
    expect(validarArea("", P.area).ok).toBe(false);
    expect(validarArea("abc", P.area).ok).toBe(false);
    expect(validarArea(39, P.area).ok).toBe(false);
    expect(validarArea(1001, P.area).ok).toBe(false);
  });
});

describe("cotizar — mínimos y máximos", () => {
  const res = cotizar({ m2: 100, tipo: "nueva", linea: "essential", moneda: "CRC" }, P)!;

  it("construcción = m² × precio/m²", () => {
    expect(res.construccion).toEqual({ min: 40_000_000, max: 50_000_000 });
    expect(res.precioM2).toEqual({ min: 400_000, max: 500_000 });
  });

  it("consultoría = 10,5 % de construcción, desglosada", () => {
    close(res.consultoria.pct, 10.5);
    close(res.consultoria.total.min, 4_200_000);
    close(res.consultoria.total.max, 5_250_000);
    const planos = res.consultoria.items.find((i) => i.id === "planos")!;
    close(planos.monto.min, 1_600_000);
  });

  it("institucionales = 2,62 % de construcción", () => {
    close(res.institucionales.pct, 2.62);
    close(res.institucionales.total.min, 1_048_000);
    close(res.institucionales.total.max, 1_310_000);
  });

  it("IVA solo sobre construcción + consultoría; total = subtotal + IVA", () => {
    close(res.iva.monto.min, (40_000_000 + 4_200_000) * 0.13);
    close(res.subtotal.min, 40_000_000 + 4_200_000 + 1_048_000);
    close(res.total.min, res.subtotal.min + res.iva.monto.min);
    close(res.total.max, res.subtotal.max + res.iva.monto.max);
  });

  it("el mínimo nunca supera al máximo", () => {
    for (const linea of ["essential", "prestige", "prime"] as const) {
      for (const tipo of ["nueva", "remodelacion"] as const) {
        const x = cotizar({ m2: 250, tipo, linea, moneda: "CRC" }, P)!;
        expect(x.total.min).toBeLessThanOrEqual(x.total.max);
      }
    }
  });

  it("límites de área: 40 y 1000 m² calculan; fuera de rango devuelve null", () => {
    expect(cotizar({ m2: 40, tipo: "nueva", linea: "prime", moneda: "CRC" }, P)!.construccion.min).toBe(36_000_000);
    expect(cotizar({ m2: 1000, tipo: "nueva", linea: "prime", moneda: "CRC" }, P)!.construccion.max).toBe(1_200_000_000);
    expect(cotizar({ m2: 20, tipo: "nueva", linea: "prime", moneda: "CRC" }, P)).toBeNull();
    expect(cotizar({ m2: 5000, tipo: "nueva", linea: "prime", moneda: "CRC" }, P)).toBeNull();
  });
});

describe("cotizar — moneda", () => {
  it("convierte a dólares con el tipo de cambio", () => {
    const crc = cotizar({ m2: 200, tipo: "nueva", linea: "prestige", moneda: "CRC" }, P)!;
    const usd = cotizar({ m2: 200, tipo: "nueva", linea: "prestige", moneda: "USD" }, P)!;
    expect(usd.moneda).toBe("USD");
    close(usd.construccion.min, crc.construccion.min / 500);
    close(usd.total.max, crc.total.max / 500);
    close(usd.precioM2.min, 1_200);
  });
  it("sin tipo de cambio válido no calcula en dólares", () => {
    const sinFx = { ...P, tipoCambio: { valor: 0, fecha: "" } };
    expect(cotizar({ m2: 100, tipo: "nueva", linea: "prime", moneda: "USD" }, sinFx)).toBeNull();
    expect(cotizar({ m2: 100, tipo: "nueva", linea: "prime", moneda: "CRC" }, sinFx)).not.toBeNull();
  });
});

describe("cotizar — remodelación vs. nueva", () => {
  it("usa la tabla de precios del tipo de obra", () => {
    const nueva = cotizar({ m2: 120, tipo: "nueva", linea: "prestige", moneda: "CRC" }, P)!;
    const remo = cotizar({ m2: 120, tipo: "remodelacion", linea: "prestige", moneda: "CRC" }, P)!;
    expect(remo.construccion).toEqual({ min: 54_000_000, max: 66_000_000 });
    expect(nueva.construccion).toEqual({ min: 72_000_000, max: 84_000_000 });
    expect(remo.total.max).toBeLessThan(nueva.total.max);
  });
});

describe("resolverPricing", () => {
  it("con placeholders: demo en desarrollo, sin montos en producción", () => {
    expect(pendientesCotizador().length).toBeGreaterThan(0);
    const dev = resolverPricing("development");
    expect(dev.demo).toBe(true);
    expect(dev.pricing).not.toBeNull();
    const prod = resolverPricing("production");
    expect(prod.pricing).toBeNull();
  });
});
