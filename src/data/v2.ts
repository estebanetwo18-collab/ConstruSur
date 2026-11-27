/**
 * Contenido propio de la VERSIÓN B (diseño navy→ConstruSur).
 * Reutiliza el resto de /src/data (servicios, proyectos, contacto, cotizador).
 * Todo lo marcado TODO_CONSTRUSUR debe confirmarlo ConstruSur.
 */

export const v2Hero = {
  /** Titular en 3 líneas cortas, cada una con punto final. */
  lineas: ["Construido con orden.", "Entregado con palabra.", "Proyectos con propósito."],
  subtitulo:
    "Constructora residencial en la Gran Área Metropolitana. Un mismo equipo a cargo de su obra, con reportes semanales de principio a fin.",
  fondos: {
    foto: "/img/hero/hero-desktop.webp",
    fotoMovil: "/img/hero/hero-mobile.webp",
  },
};

/** Franja de credenciales bajo el hero. valor null → "XX" (pendiente). */
export const v2Credenciales = [
  { icono: "equipo", titulo: "Equipo propio a cargo", detalle: "Un mismo equipo de principio a fin" },
  { icono: "reportes", titulo: "Reportes semanales", detalle: "Avance, gasto y próximos pasos" },
  { icono: "obras", titulo: "XX obras entregadas", detalle: "Cifra por confirmar" }, // TODO_CONSTRUSUR
  { icono: "zona", titulo: "Gran Área Metropolitana", detalle: "San José, Heredia, Alajuela y Cartago" },
] as const;

/** Detalle de cada tab de servicios (se cruza con /src/data/servicios.ts por id). */
export const v2Servicios: Record<string, { titulo: string; parrafo: string; vinetas: [string, string, string] }> = {
  essential: {
    titulo: "Línea Essential",
    parrafo: "Construcción residencial de calidad accesible, sin atajos en materiales ni estructura, con el mismo acompañamiento cercano de nuestro equipo.",
    vinetas: ["Presupuesto por partida desde el anteproyecto", "Materiales y estructura sin atajos", "Reportes semanales de avance"],
  },
  prestige: {
    titulo: "Línea Prestige",
    parrafo: "Nivel medio-alto con espacio real para personalizar distribución, acabados y detalles, con control estricto de presupuesto y cronograma.",
    vinetas: ["Distribución definida junto a usted", "Acabados personalizables", "Cronograma por hitos verificables"],
  },
  prime: {
    titulo: "Línea Prime",
    parrafo: "Máximo nivel de lujo y detalle. Proyectos insignia donde cada decisión de diseño, material y ejecución recibe atención directa del equipo.",
    vinetas: ["Diseño y materiales de alto nivel", "Atención directa de los socios", "Supervisión técnica permanente"],
  },
  remodelacion: {
    titulo: "Remodelación",
    parrafo: "Renovamos y ampliamos su casa con el mismo orden técnico de una obra nueva, para que usted sepa qué se hace, cuándo y cuánto cuesta.",
    vinetas: ["Diagnóstico y alcance claros", "Trabajo por etapas, con su casa en mente", "Presupuesto abierto por partida"],
  },
  diseno: {
    titulo: "Diseño y consultoría",
    parrafo: "Anteproyecto, planos constructivos y dirección técnica con números reales sobre la mesa antes de comprometer un solo colón en obra.",
    vinetas: ["Estudios preliminares y anteproyecto", "Planos y trámites CFIA y municipales", "Dirección técnica de la obra"],
  },
  llave: {
    titulo: "Llave en mano",
    parrafo: "Nos encargamos de todo el proceso, del diseño a la entrega, y usted recibe su casa lista para habitar con un solo responsable.",
    vinetas: ["Un solo contrato y un solo responsable", "Diseño, permisos, obra y entrega", "Acompañamiento después de la entrega"],
  },
};

/**
 * Mapa de cobertura (esquemático, coordenadas en el viewBox 0–1000 × 0–640).
 * TODO_CONSTRUSUR: reemplazar por un SVG real del GAM si se desea precisión.
 */
export const v2Cobertura = {
  titulo: ["De Montes de Oca", "a Santo Domingo", "de Heredia."],
  intro:
    "Trabajamos en la Gran Área Metropolitana. Estas son las provincias donde construimos y las obras que ya tienen nuestra firma.",
  provincias: [
    { id: "heredia", nombre: "Heredia" },
    { id: "sanjose", nombre: "San José" },
    { id: "alajuela", nombre: "Alajuela" },
    { id: "cartago", nombre: "Cartago" },
  ],
  /** Cantones de la zona de trabajo (puntos pequeños). TODO_CONSTRUSUR: confirmar. */
  zona: [
    { nombre: "Heredia", provincia: "heredia", x: 470, y: 205 },
    { nombre: "Santo Domingo", provincia: "heredia", x: 560, y: 248 },
    { nombre: "San Pablo", provincia: "heredia", x: 520, y: 222 },
    { nombre: "Belén", provincia: "heredia", x: 432, y: 238 },
    { nombre: "San José", provincia: "sanjose", x: 540, y: 330 },
    { nombre: "Montes de Oca", provincia: "sanjose", x: 606, y: 318 },
    { nombre: "Curridabat", provincia: "sanjose", x: 616, y: 362 },
    { nombre: "Moravia", provincia: "sanjose", x: 606, y: 270 },
    { nombre: "Escazú", provincia: "sanjose", x: 452, y: 360 },
    { nombre: "Santa Ana", provincia: "sanjose", x: 388, y: 350 },
    { nombre: "Alajuela", provincia: "alajuela", x: 320, y: 196 },
    { nombre: "La Unión", provincia: "cartago", x: 700, y: 372 },
    { nombre: "Cartago", provincia: "cartago", x: 792, y: 450 },
  ],
  /** Obras (pines naranja). Agregue más aquí. */
  obras: [
    { nombre: "Sabanilla de Montes de Oca", provincia: "sanjose", x: 622, y: 302, detalle: "Obra residencial" },
    { nombre: "Santo Domingo de Heredia", provincia: "heredia", x: 572, y: 236, detalle: "Obra residencial" },
  ],
  /** Oficina (triángulo). null = no se muestra. TODO_CONSTRUSUR */
  oficina: null as null | { nombre: string; x: number; y: number },
};

export const v2PorQue = {
  titulo: ["Por qué nos", "eligen."],
  bloques: [
    {
      titulo: "Equipo a cargo",
      texto: "Un equipo completo responde por cada obra de principio a fin, no un encargado que rota entre proyectos.",
      destacado: "Los socios dan la cara en cada obra",
    },
    {
      titulo: "Reportes semanales",
      texto: "Avance, gasto y próximos pasos cada semana, sin que usted tenga que pedirlo.",
      destacado: "52 reportes al año por obra",
    },
    {
      titulo: "Transparencia total",
      texto: "Presupuestos abiertos por partida. Usted sabe en qué se invierte cada colón de su proyecto.",
      destacado: "Presupuesto por partida desde el anteproyecto",
    },
    {
      titulo: "La palabra vale",
      texto: "Cumplimos cada promesa, por pequeña que sea. Preferimos perder una venta antes que dañar nuestra reputación.",
      destacado: "Cronograma por hitos verificables en el contrato",
    },
  ],
};

/** "Para quién construimos". TODO_CONSTRUSUR: confirmar la lista. */
export const v2ParaQuien = {
  titulo: "Para quién construimos: de la casa familiar a la residencia insignia.",
  items: [
    { id: "unifamiliar", titulo: "Casa unifamiliar", texto: "Su casa, diseñada y construida a la medida" },
    { id: "lujo", titulo: "Residencia de lujo", texto: "Proyectos insignia de la línea Prime" },
    { id: "remodelacion", titulo: "Remodelación", texto: "Renovación completa o por etapas" },
    { id: "ampliacion", titulo: "Ampliación", texto: "Más espacio sin perder el orden" },
    { id: "condominio", titulo: "Condominio / townhouse", texto: "Conjuntos residenciales pequeños" },
    { id: "llave", titulo: "Llave en mano", texto: "Del diseño a la entrega de llaves" },
  ],
};

export const v2Contacto = {
  titulo: ["Cuéntenos su proyecto.", "Nosotros ponemos el equipo."],
  texto: "Escríbanos y coordinamos una primera conversación sin costo para revisar su lote, su idea y su presupuesto.",
  servicios: ["Construcción nueva", "Remodelación", "Ampliación", "Diseño y consultoría", "Llave en mano", "Otro"],
};
