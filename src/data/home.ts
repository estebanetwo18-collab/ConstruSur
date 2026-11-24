/** Contenido de las secciones de la página de inicio. */

export const porQue = {
  eyebrow: "Por qué ConstruSur",
  titulo: ["Confiabilidad,", "no precio", "."] as const,
  intro:
    "No competimos por ser los más baratos. Competimos por ser la constructora en la que usted puede confiar su inversión más importante.",
  items: [
    {
      id: "equipo",
      titulo: "Equipo a cargo",
      texto:
        "Un equipo completo responde por cada obra de principio a fin, no un encargado que rota entre proyectos.",
    },
    {
      id: "reportes",
      titulo: "Reportes semanales",
      texto: "Avance, gasto y próximos pasos cada semana, sin que usted tenga que pedirlo.",
    },
    {
      id: "transparencia",
      titulo: "Transparencia total",
      texto:
        "Presupuestos abiertos por partida. Usted sabe en qué se invierte cada colón de su proyecto.",
    },
    {
      id: "orden",
      titulo: "Orden técnico",
      texto:
        "Cada proceso está estructurado y planificado al detalle para evitar imprevistos en obra.",
    },
  ],
};

export const proceso = {
  eyebrow: "Cómo trabajamos",
  titulo: ["De la idea al", "contrato", "."] as const,
  intro:
    "Un proceso claro, por etapas, para que usted sepa exactamente qué está aprobando y cuándo.",
  pasos: [
    {
      titulo: "Conversación inicial",
      texto:
        "Escuchamos su idea, revisamos el lote y el presupuesto disponible. Sin costo y sin compromiso.",
      puntos: ["Llamada o reunión de 30 minutos", "Revisión de lote y necesidades"],
    },
    {
      titulo: "Anteproyecto",
      texto:
        "Diseño preliminar y presupuesto detallado por partida antes de comprometer un solo colón en construcción.",
      puntos: ["Diseño arquitectónico preliminar", "Presupuesto por partida", "Ajustes conjuntos"],
    },
    {
      titulo: "Contrato",
      texto:
        "Con el anteproyecto aprobado firmamos el contrato: alcance, cronograma por hitos y responsables claros.",
      puntos: ["Cronograma con hitos verificables", "Pagos por avance"],
    },
    {
      titulo: "Obra y entrega",
      texto:
        "Un equipo completo a cargo de la obra, con reportes semanales de avance hasta la entrega de llaves.",
      puntos: ["Reportes semanales", "Entrega y acompañamiento"],
    },
  ],
};

export const valores = {
  eyebrow: "Nuestra filosofía",
  titulo: ["Los valores que", "no negociamos", "."] as const,
  items: [
    {
      titulo: "Aquí la palabra vale",
      texto:
        "Cumplimos cada promesa, por pequeña que sea. Preferimos perder una venta antes que dañar nuestra reputación.",
    },
    {
      titulo: "Transparencia total",
      texto:
        "Mostramos las cosas como son: propuestas claras y presupuestos reales, sin letra pequeña.",
    },
    {
      titulo: "Cercanía",
      texto:
        "Permanecemos junto al cliente en todo momento, con comunicación constante y asumiendo nuestra responsabilidad.",
    },
    {
      titulo: "Orden técnico",
      texto:
        "Cada proceso está estructurado y planificado al detalle para evitar imprevistos.",
    },
  ],
};

export const marquee = [
  "Construcción residencial",
  "Llave en mano",
  "Remodelación",
  "Diseño y consultoría",
  "Reportes semanales",
];

/**
 * Testimonios escritos.
 * placeholder: true → solo se muestra en desarrollo (nunca en producción),
 * para no publicar reseñas que no sean reales.
 */
export const testimonios = {
  eyebrow: "Testimonios",
  titulo: ["Lo que dicen", "nuestros clientes", "."] as const,
  escritos: [
    {
      cita: "Texto de ejemplo: aquí va la cita escrita de un cliente real, con su permiso. Reemplazar antes de publicar.",
      nombre: "Nombre del cliente",
      detalle: "Obra en Sabanilla de Montes de Oca",
      estrellas: 5,
      placeholder: true, // TODO_CONSTRUSUR: testimonio escrito real
    },
  ],
  video: {
    src: "/video/testimonio-01.mp4",
    poster: "/img/testimonio-poster.webp",
    titulo: "Testimonio en video de un cliente de ConstruSur",
  },
};
