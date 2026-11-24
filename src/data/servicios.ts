/** Servicios / líneas (carrusel de la home). */

export type ServicioIcon = "essential" | "prestige" | "prime" | "remodelacion" | "diseno" | "llave";

export const servicios = {
  eyebrow: "Líneas y servicios",
  titulo: ["Tres formas de construir,", "un mismo estándar", "."] as const,
  intro:
    "Usted elige el nivel de personalización y acabado. La responsabilidad de nuestro equipo y el estándar de obra no cambian en ninguna línea.",
  items: [
    {
      id: "essential",
      icon: "essential" as ServicioIcon,
      titulo: "Essential",
      texto: "Calidad accesible, sin atajos en materiales ni estructura.",
      img: "/img/proyectos/essential-fachada-frontal.webp",
      linea: "essential",
    },
    {
      id: "prestige",
      icon: "prestige" as ServicioIcon,
      titulo: "Prestige",
      texto: "Medio-alto, con distribución y acabados personalizables.",
      img: "/img/proyectos/prestige-exterior-piscina.webp",
      linea: "prestige",
    },
    {
      id: "prime",
      icon: "prime" as ServicioIcon,
      titulo: "Prime",
      texto: "Lujo y detalle para proyectos insignia.",
      img: "/img/proyectos/prime-terraza.webp",
      linea: "prime",
    },
    {
      id: "remodelacion",
      icon: "remodelacion" as ServicioIcon,
      titulo: "Remodelación",
      texto: "Renovamos y ampliamos su casa con el mismo orden de una obra nueva.",
      img: "/img/obra/carpintero.webp",
      linea: null,
    },
    {
      id: "diseno",
      icon: "diseno" as ServicioIcon,
      titulo: "Diseño y consultoría",
      texto: "Anteproyecto, planos y dirección técnica con números reales.",
      img: "/img/obra/planos.webp",
      linea: null,
    },
    {
      id: "llave",
      icon: "llave" as ServicioIcon,
      titulo: "Llave en mano",
      texto: "Nos encargamos de todo: usted recibe su casa lista para habitar.",
      img: "/img/proyectos/prime-cocina.webp",
      linea: null,
    },
  ],
};
