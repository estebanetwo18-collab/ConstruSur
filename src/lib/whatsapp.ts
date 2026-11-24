import { contacto } from "@/data/site";
import type { Moneda } from "@/data/cotizador.config";
import { dineroCorto } from "./format";

export function waLink(mensaje?: string) {
  const base = `https://wa.me/${contacto.whatsappNumber}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

export const MENSAJE_GENERAL = "Hola ConstruSur, me interesa conversar sobre un proyecto.";

export function mensajeCotizacion(r: {
  nombre?: string;
  m2: number;
  tipoObra: string;
  linea: string;
  moneda: Moneda;
  min?: number;
  max?: number;
}) {
  const saludo = r.nombre ? `Hola ConstruSur, soy ${r.nombre}.` : "Hola ConstruSur.";
  const rango =
    r.min !== undefined && r.max !== undefined
      ? ` El cotizador me dio un rango de ${dineroCorto(r.min, r.moneda)} a ${dineroCorto(r.max, r.moneda)} (IVA incluido).`
      : "";
  return `${saludo} Coticé ${r.m2} m², ${r.tipoObra.toLowerCase()}, línea ${r.linea}.${rango} Me gustaría conversar sobre el anteproyecto.`;
}
