/**
 * Proyectos (grid 2×2 + galería).
 * Los valores "Por confirmar" son placeholders: TODO_CONSTRUSUR.
 * Para agregar fotos: optimícelas con `npm run images -- <carpeta>` y
 * agregue la ruta en `fotos`.
 */

export type Proyecto = {
  id: string;
  nombre: string;
  linea: "Essential" | "Prestige" | "Prime";
  ubicacion: string;
  m2: string;
  plazo: string;
  anio: string;
  portada: string;
  fotos: { src: string; alt: string }[];
};

const PC = "Por confirmar";

export const proyectos = {
  eyebrow: "Proyectos",
  titulo: ["Essential, Prestige y Prime,", "en imágenes", "."] as const,
  intro: "Así se ve el nivel de acabado de cada línea. Abra un proyecto para recorrer la galería.",
  items: [
    {
      id: "essential",
      nombre: "Residencia Essential",
      linea: "Essential",
      ubicacion: "Santo Domingo de Heredia", // TODO_CONSTRUSUR: confirmar
      m2: PC,
      plazo: PC,
      anio: PC,
      portada: "/img/proyectos/essential-fachada-atardecer.webp",
      fotos: [
        { src: "/img/proyectos/essential-fachada-atardecer.webp", alt: "Fachada al atardecer, línea Essential" },
        { src: "/img/proyectos/essential-fachada-frontal.webp", alt: "Fachada frontal, línea Essential" },
        { src: "/img/proyectos/essential-exterior.webp", alt: "Exterior y jardín, línea Essential" },
        { src: "/img/proyectos/essential-sala.webp", alt: "Sala, línea Essential" },
        { src: "/img/proyectos/essential-bano.webp", alt: "Baño, línea Essential" },
      ],
    },
    {
      id: "prestige",
      nombre: "Residencia Prestige",
      linea: "Prestige",
      ubicacion: "Sabanilla de Montes de Oca", // TODO_CONSTRUSUR: confirmar
      m2: PC,
      plazo: PC,
      anio: PC,
      portada: "/img/proyectos/prestige-exterior-piscina.webp",
      fotos: [
        { src: "/img/proyectos/prestige-exterior-piscina.webp", alt: "Exterior con piscina, línea Prestige" },
        { src: "/img/proyectos/prestige-sala.webp", alt: "Sala, línea Prestige" },
        { src: "/img/proyectos/prestige-dormitorio.webp", alt: "Dormitorio, línea Prestige" },
        { src: "/img/proyectos/prestige-bano.webp", alt: "Baño, línea Prestige" },
      ],
    },
    {
      id: "prime",
      nombre: "Residencia Prime",
      linea: "Prime",
      ubicacion: "Gran Área Metropolitana", // TODO_CONSTRUSUR: confirmar
      m2: PC,
      plazo: PC,
      anio: PC,
      portada: "/img/proyectos/prime-exterior-piscina.webp",
      fotos: [
        { src: "/img/proyectos/prime-exterior-piscina.webp", alt: "Exterior con piscina, línea Prime" },
        { src: "/img/proyectos/prime-terraza.webp", alt: "Terraza, línea Prime" },
        { src: "/img/proyectos/prime-cocina.webp", alt: "Cocina, línea Prime" },
        { src: "/img/proyectos/prime-dormitorio.webp", alt: "Dormitorio, línea Prime" },
        { src: "/img/proyectos/prime-bano.webp", alt: "Baño, línea Prime" },
      ],
    },
  ] satisfies Proyecto[],
};
