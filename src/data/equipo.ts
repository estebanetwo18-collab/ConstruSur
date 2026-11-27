/**
 * Socios. Las fotos actuales son TEMPORALES (banco de imágenes):
 * TODO_CONSTRUSUR → reemplazar por fotos reales en /public/img/equipo/.
 */
export const equipo = {
  eyebrow: "Equipo",
  titulo: ["Las personas que", "dan la cara", "."] as const,
  intro:
    "Detrás de cada obra hay nombres y apellidos. Los socios de ConstruSur acompañan personalmente cada proyecto.",
  socios: [
    {
      nombre: "Josué",
      rol: "Socio fundador", // TODO_CONSTRUSUR: rol y apellido
      foto: "/img/equipo/socio-1.webp",
      /** WhatsApp individual (código de país + número). TODO_CONSTRUSUR: hoy usa el número general. */
      whatsapp: "50672229812",
    },
    {
      nombre: "Kenneth",
      rol: "Socio fundador", // TODO_CONSTRUSUR: rol y apellido
      foto: "/img/equipo/socio-2.webp",
      /** WhatsApp individual (código de país + número). TODO_CONSTRUSUR: hoy usa el número general. */
      whatsapp: "50672229812",
    },
  ],
  /** Fotos de obra que acompañan al equipo (temporales). */
  obra: [
    { src: "/img/obra/carpintero.webp", alt: "Trabajo de carpintería en obra" },
    { src: "/img/obra/varillas.webp", alt: "Armado de acero de refuerzo" },
    { src: "/img/obra/electricista.webp", alt: "Instalación eléctrica" },
  ],
};
