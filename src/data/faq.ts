/**
 * Preguntas frecuentes. También alimentan el schema FAQPage.
 * Las respuestas no incluyen cifras: los montos se confirman en el anteproyecto.
 */
export const faq = {
  eyebrow: "Preguntas frecuentes",
  titulo: ["Lo que nos preguntan", "antes de construir", "."] as const,
  items: [
    {
      q: "¿Cuánto cuesta construir por metro cuadrado?",
      a: "Depende de la línea (Essential, Prestige o Prime), del tipo de obra, del terreno y de los acabados. En nuestro cotizador puede obtener un rango referencial en segundos; el precio final se confirma en el anteproyecto, con un presupuesto detallado por partida.",
    },
    {
      q: "¿Qué incluye cada línea?",
      a: "Las tres líneas comparten el mismo estándar estructural y el mismo equipo a cargo. Cambia el nivel de acabados y de personalización: Essential es accesible y sin atajos, Prestige permite personalizar distribución y acabados, y Prime está pensada para proyectos insignia. En el cotizador puede ver la tabla de lo que incluye cada una.",
    },
    {
      q: "¿Cuánto tarda una obra?",
      a: "El plazo depende del tamaño y la complejidad del proyecto. Queda definido en el contrato con un cronograma por hitos verificables, y usted recibe un reporte de avance cada semana.",
    },
    {
      q: "¿Se encargan de los permisos del CFIA y la municipalidad?",
      a: "Sí. Como parte del servicio de diseño y consultoría preparamos los planos y le acompañamos en el registro ante el CFIA, el permiso de construcción municipal y la póliza del INS. Los montos de esos pagos los define cada institución; el del CFIA se calcula según su tasación.",
    },
    {
      q: "¿Cuáles son las formas de pago?",
      a: "Los pagos se realizan por hitos de avance definidos en el contrato, de modo que usted paga conforme la obra avanza. En el cotizador puede consultar la estructura de hitos.",
    },
    {
      q: "¿Trabajan fuera de la Gran Área Metropolitana?",
      a: "Nuestra base de operación es la GAM. Valoramos proyectos fuera de ella caso por caso; escríbanos con la ubicación del lote y le respondemos.",
    },
  ],
};
