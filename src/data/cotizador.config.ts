/**
 * ==========================================================================
 *  CONFIGURACIÓN DEL COTIZADOR — ConstruSur
 * ==========================================================================
 *  Todos los valores "TODO_CONSTRUSUR" deben ser confirmados por ConstruSur
 *  y su contador. Mientras quede alguno:
 *   · en desarrollo (npm run dev) el cotizador usa los valores DEMO de abajo
 *     y muestra un banner rojo de "precios de demostración";
 *   · en producción NO muestra montos: invita a cotizar por WhatsApp.
 *
 *  Precios: colones (₡) por m², SIN IVA.
 *  Porcentajes: sobre el monto de construcción (ej. 4 = 4 %).
 * ==========================================================================
 */

export const TODO = "TODO_CONSTRUSUR" as const;
type Pendiente = typeof TODO;
type Num = number | Pendiente;

export type Linea = "essential" | "prestige" | "prime";
export type TipoObra = "nueva" | "remodelacion";
export type Moneda = "CRC" | "USD";

export const LINEAS: { id: Linea; nombre: string; resumen: string }[] = [
  { id: "essential", nombre: "Essential", resumen: "Accesible, sin atajos en materiales ni estructura." },
  { id: "prestige", nombre: "Prestige", resumen: "Medio-alto, distribución y acabados personalizables." },
  { id: "prime", nombre: "Prime", resumen: "Lujo y detalle para proyectos insignia." },
];

export const TIPOS_OBRA: { id: TipoObra; nombre: string }[] = [
  { id: "nueva", nombre: "Construcción nueva" },
  { id: "remodelacion", nombre: "Remodelación" },
];

export const cotizadorConfig = {
  area: { min: 40, max: 1000, inicial: 150, paso: 5 },

  /** Colones por dólar usados para mostrar montos en $. */
  tipoCambio: { valor: TODO as Num, fecha: TODO as string /* "dd/mm/aaaa" */ },

  /** Precio por m² (₡, sin IVA): rango mínimo y máximo por tipo de obra y línea. */
  precios: {
    nueva: {
      essential: { min: TODO as Num, max: TODO as Num },
      prestige: { min: TODO as Num, max: TODO as Num },
      prime: { min: TODO as Num, max: TODO as Num },
    },
    remodelacion: {
      essential: { min: TODO as Num, max: TODO as Num },
      prestige: { min: TODO as Num, max: TODO as Num },
      prime: { min: TODO as Num, max: TODO as Num },
    },
  },

  /** Diseño y consultoría, % de construcción. Referencia ≈ 10,5 % (0,5 + 1 + 4 + 5). */
  consultoria: [
    { id: "estudios", label: "Estudios preliminares", pct: TODO as Num },
    { id: "anteproyecto", label: "Anteproyecto", pct: TODO as Num },
    { id: "planos", label: "Planos constructivos", pct: TODO as Num },
    { id: "direccion", label: "Dirección técnica", pct: TODO as Num },
  ],

  /** Pagos institucionales estimados, % de construcción. Referencia ≈ 2,6 %. */
  institucionales: [
    { id: "cfia", label: "CFIA", pct: TODO as Num, nota: "CFIA según su tasación" },
    { id: "municipalidad", label: "Permiso municipal", pct: TODO as Num },
    { id: "ins", label: "Póliza INS (riesgos del trabajo)", pct: TODO as Num },
  ],

  /** IVA (%) aplicado sobre construcción y consultoría. Referencia 13 %. */
  ivaPct: TODO as Num,

  /** Hitos de pago (modal "Ver formas de pago"). pct = % del contrato. */
  hitos: [
    { label: "Firma del contrato", detalle: "Arranque de obra y movilización", pct: TODO as Num },
    { label: "Cimentación", detalle: "Fundaciones y contrapiso terminados", pct: TODO as Num },
    { label: "Obra gris", detalle: "Paredes, columnas y vigas", pct: TODO as Num },
    { label: "Techo y cerramientos", detalle: "Estructura de techo, cubierta y ventanería", pct: TODO as Num },
    { label: "Acabados", detalle: "Pisos, enchapes, cielos y pintura", pct: TODO as Num },
    { label: "Entrega", detalle: "Recepción a satisfacción y entrega de llaves", pct: TODO as Num },
  ],

  /**
   * Qué incluye cada línea (✓ / —).
   * TODO_CONSTRUSUR: valores de EJEMPLO, confirmar por partida y línea.
   */
  especificacionesConfirmadas: false,
  partidas: [
    { id: "estructura", label: "Estructura y cimentación" },
    { id: "paredes", label: "Paredes" },
    { id: "pisos", label: "Pisos" },
    { id: "banos", label: "Baños" },
    { id: "cocina", label: "Cocina" },
    { id: "electricidad", label: "Electricidad e iluminación" },
    { id: "ventaneria", label: "Ventanería" },
    { id: "cielos", label: "Cielos" },
    { id: "pintura", label: "Pintura" },
    { id: "exteriores", label: "Exteriores" },
    { id: "extras", label: "Extras" },
  ],
  especificaciones: {
    essential: { estructura: true, paredes: true, pisos: true, banos: true, cocina: true, electricidad: true, ventaneria: true, cielos: true, pintura: true, exteriores: false, extras: false },
    prestige: { estructura: true, paredes: true, pisos: true, banos: true, cocina: true, electricidad: true, ventaneria: true, cielos: true, pintura: true, exteriores: true, extras: false },
    prime: { estructura: true, paredes: true, pisos: true, banos: true, cocina: true, electricidad: true, ventaneria: true, cielos: true, pintura: true, exteriores: true, extras: true },
  } as Record<Linea, Record<string, boolean>>,

  avisos: [
    "Estimación referencial, no constituye una oferta.",
    "Válida para proyectos en la Gran Área Metropolitana.",
    "No incluye estudios de suelo, topografía ni movimiento de tierras.",
    "El precio final se confirma en el anteproyecto, con presupuesto por partida.",
  ],
};

/**
 * VALORES DE DEMOSTRACIÓN — SOLO DESARROLLO.
 * No son precios de ConstruSur. Sirven para probar el flujo en local.
 * Nunca se usan en producción (ver src/lib/pricing.ts).
 */
export const DEMO_DEV = {
  tipoCambio: { valor: 500, fecha: "01/01/2026" },
  precios: {
    nueva: {
      essential: { min: 400_000, max: 500_000 },
      prestige: { min: 550_000, max: 700_000 },
      prime: { min: 800_000, max: 1_100_000 },
    },
    remodelacion: {
      essential: { min: 300_000, max: 420_000 },
      prestige: { min: 420_000, max: 580_000 },
      prime: { min: 600_000, max: 900_000 },
    },
  },
  consultoria: { estudios: 0.5, anteproyecto: 1, planos: 4, direccion: 5 } as Record<string, number>,
  institucionales: { cfia: 0.27, municipalidad: 1, ins: 1.35 } as Record<string, number>,
  ivaPct: 13,
  hitos: [10, 20, 25, 20, 20, 5],
};
