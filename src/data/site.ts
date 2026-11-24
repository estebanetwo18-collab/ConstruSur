/**
 * Datos generales del sitio. Edite aquí textos, contacto y cifras.
 * Todo lo marcado con TODO_CONSTRUSUR debe confirmarlo ConstruSur.
 */

export const TODO = "TODO_CONSTRUSUR" as const;

const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const SITE_URL = (
  envSiteUrl && envSiteUrl.startsWith("http")
    ? envSiteUrl
    : process.env.NODE_ENV === "production"
      ? "https://dominio-final.example" // TODO_CONSTRUSUR: definir NEXT_PUBLIC_SITE_URL
      : "http://localhost:3000"
).replace(/\/$/, "");

export const site = {
  name: "ConstruSur",
  legalName: "ConstruSur S.A.",
  tagline: "Proyectos con Propósito",
  description:
    "Constructora residencial en Costa Rica. Un equipo completo a cargo de cada obra, reportes semanales y transparencia total. Líneas Essential, Prestige y Prime.",
  locale: "es_CR",
  country: "Costa Rica",
  region: "Gran Área Metropolitana (GAM)",
};

export const contacto = {
  whatsappNumber: "50672229812",
  whatsappDisplay: "+506 7222-9812",
  email: "construsurdigital@gmail.com",
  zona: "Gran Área Metropolitana, Costa Rica",
  horario: "Lunes a viernes, 8:00 a. m. – 5:00 p. m.", // TODO_CONSTRUSUR: confirmar horario
  /** Calendly: se puede sobrescribir con NEXT_PUBLIC_CALENDLY_URL. */
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/construsur-sociointeligente/30min",
};

/** Redes. Deje la URL vacía ("") para ocultar una red. */
export const redes: { id: "instagram" | "facebook" | "tiktok"; label: string; url: string }[] = [
  { id: "instagram", label: "Instagram", url: "" }, // TODO_CONSTRUSUR: URL de Instagram
  { id: "facebook", label: "Facebook", url: "" }, // TODO_CONSTRUSUR: URL de Facebook
];

export const nav = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Cotizador", href: "/#cotizador" },
  { label: "Contacto", href: "/#contacto" },
];

export const hero = {
  eyebrow: "Construcción residencial · Costa Rica",
  titulo: ["Proyectos con", "Propósito", "."] as const,
  subtitulo: "Un equipo completo a cargo de cada obra que firmamos, de principio a fin.",
  pruebaSocial: "Obras en Montes de Oca y Heredia",
};

/**
 * Cifras de la sección Nosotros.
 * valor: null muestra "XX" (pendiente). Reemplace con números reales.
 */
export const cifras = {
  obras: { valor: null as number | null, sufijo: "+", label: "obras entregadas" }, // TODO_CONSTRUSUR
  anios: { valor: null as number | null, sufijo: "", label: "años de experiencia" }, // TODO_CONSTRUSUR
  reportes: { valor: 52, sufijo: "", label: "reportes de avance al año por obra" },
};

export const nosotros = {
  eyebrow: "Quiénes somos",
  titulo: ["Un aliado técnico y humano para", "su casa", "."] as const,
  intro:
    "ConstruSur es una constructora residencial de la Gran Área Metropolitana. Competimos por confiabilidad: un mismo equipo responde por su obra desde la primera conversación hasta la entrega de llaves.",
  mision:
    "Acompañar a las personas en la construcción de su casa, funcionando como un aliado técnico y humano que protege su inversión.",
  vision:
    "Ser una constructora reconocida a nivel nacional por su reputación impecable, que genera tranquilidad en las familias y los inversionistas que confían en nosotros.",
};
