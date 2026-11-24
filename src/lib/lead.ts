/** Esquema de validación y armado de correos para /api/lead. */
import { z } from "zod";
import { LINEAS, TIPOS_OBRA } from "@/data/cotizador.config";
import { cotizar, type Resultado } from "./cotizar";
import { resolverPricing } from "./pricing";
import { dinero, pct } from "./format";
import { contacto, site } from "@/data/site";
import { mensajeCotizacion, waLink } from "./whatsapp";

const texto = (max: number) => z.string().trim().max(max);
const opcional = (max: number) => texto(max).optional().or(z.literal("").transform(() => undefined));

const base = {
  nombre: texto(120).min(2, "Nombre requerido"),
  correo: z.email("Correo inválido").max(160),
  sitio_web: z.string().max(200).optional(), // honeypot
  utm: z.record(z.string(), z.string().max(200)).optional(),
};

export const leadSchema = z.discriminatedUnion("origen", [
  z.object({
    origen: z.literal("cotizador"),
    ...base,
    whatsapp: texto(30).refine((v) => v.replace(/\D/g, "").length >= 8, "WhatsApp inválido"),
    provincia: opcional(40),
    canton: opcional(80),
    lote: z.enum(["Sí", "No"]).optional(),
    planos: z.enum(["Sí", "No", "En proceso"]).optional(),
    inicio: opcional(40),
    contactar: z.boolean().default(false),
    cotizacion: z.object({
      m2: z.number().int().min(1).max(100_000),
      tipo: z.enum(["nueva", "remodelacion"]),
      linea: z.enum(["essential", "prestige", "prime"]),
      moneda: z.enum(["CRC", "USD"]),
    }),
  }),
  z.object({
    origen: z.literal("contacto"),
    ...base,
    telefono: texto(30).refine((v) => v.replace(/\D/g, "").length >= 8, "Teléfono inválido"),
    tipoProyecto: opcional(60),
    mensaje: texto(2000).min(2, "Mensaje requerido"),
  }),
]);

export type Lead = z.infer<typeof leadSchema>;

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Recalcula la cotización en el servidor (no confía en montos del cliente). */
export function cotizacionServidor(lead: Lead): { resultado: Resultado | null; demo: boolean } {
  if (lead.origen !== "cotizador") return { resultado: null, demo: false };
  const { pricing, demo } = resolverPricing();
  return { resultado: pricing ? cotizar(lead.cotizacion, pricing) : null, demo };
}

const fila = (k: string, v: unknown) =>
  v === undefined || v === "" ? "" : `<tr><td style="padding:6px 12px 6px 0;color:#6b6457">${esc(k)}</td><td style="padding:6px 0;font-weight:600">${esc(v)}</td></tr>`;

function tablaResultado(r: Resultado) {
  const m = r.moneda;
  const rango = (x: { min: number; max: number }) => `${dinero(x.min, m)} – ${dinero(x.max, m)}`;
  return `
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${fila("Construcción", rango(r.construccion))}
    ${fila(`Diseño y consultoría (${pct(r.consultoria.pct)})`, rango(r.consultoria.total))}
    ${fila(`Pagos institucionales (${pct(r.institucionales.pct)})`, rango(r.institucionales.total))}
    ${fila("Subtotal", rango(r.subtotal))}
    ${fila(`IVA ${pct(r.iva.pct)}`, rango(r.iva.monto))}
    <tr><td style="padding:10px 12px 6px 0;border-top:2px solid #1b1812;font-weight:700">Total con IVA</td><td style="padding:10px 0 6px;border-top:2px solid #1b1812;font-weight:700">${esc(rango(r.total))}</td></tr>
  </table>`;
}

const layout = (titulo: string, cuerpo: string) => `<!doctype html><html lang="es"><body style="margin:0;background:#f4f0e8;font-family:Inter,Arial,sans-serif;color:#1b1812">
<div style="max-width:600px;margin:0 auto;padding:32px 20px">
  <p style="font-family:Georgia,serif;font-size:22px;font-weight:600;margin:0 0 24px">Constru<span style="color:#e0925f">Sur</span></p>
  <div style="background:#fff;border-radius:16px;padding:28px">
    <h1 style="font-family:Georgia,serif;font-weight:500;font-size:24px;margin:0 0 16px">${esc(titulo)}</h1>
    ${cuerpo}
  </div>
  <p style="font-size:12px;color:#6b6457;margin-top:20px">${esc(site.legalName)} — Costa Rica · ${esc(contacto.whatsappDisplay)} · ${esc(contacto.email)}</p>
</div></body></html>`;

export function correoInterno(lead: Lead, r: Resultado | null, demo: boolean) {
  const utm = lead.utm && Object.keys(lead.utm).length ? Object.entries(lead.utm).map(([k, v]) => `${k}=${v}`).join(" · ") : "—";
  if (lead.origen === "contacto") {
    return {
      subject: `Nuevo contacto: ${lead.nombre}${lead.tipoProyecto ? ` · ${lead.tipoProyecto}` : ""}`,
      html: layout(
        "Nuevo mensaje desde el sitio",
        `<table style="border-collapse:collapse;font-size:14px">${fila("Nombre", lead.nombre)}${fila("Correo", lead.correo)}${fila("Teléfono", lead.telefono)}${fila("Tipo de proyecto", lead.tipoProyecto)}${fila("UTM", utm)}</table>
         <p style="margin-top:16px;white-space:pre-wrap;background:#f4f0e8;padding:14px;border-radius:10px">${esc(lead.mensaje)}</p>`,
      ),
    };
  }
  const c = lead.cotizacion;
  const tipo = TIPOS_OBRA.find((t) => t.id === c.tipo)!.nombre;
  const linea = LINEAS.find((l) => l.id === c.linea)!.nombre;
  return {
    subject: `Nuevo lead del cotizador: ${lead.nombre} · ${c.m2} m² ${linea}${lead.contactar ? " · quiere contacto" : ""}`,
    html: layout(
      "Nuevo lead del cotizador",
      `<table style="border-collapse:collapse;font-size:14px">
        ${fila("Nombre", lead.nombre)}${fila("WhatsApp", lead.whatsapp)}${fila("Correo", lead.correo)}
        ${fila("Provincia / cantón", [lead.provincia, lead.canton].filter(Boolean).join(" / "))}
        ${fila("¿Tiene lote?", lead.lote)}${fila("¿Tiene planos?", lead.planos)}${fila("Inicio", lead.inicio)}
        ${fila("Quiere que lo contacten", lead.contactar ? "Sí" : "No")}
        ${fila("Proyecto", `${c.m2} m² · ${tipo} · Línea ${linea} · ${c.moneda}`)}
        ${fila("UTM", utm)}
      </table>
      ${r ? `<h2 style="font-size:16px;margin:24px 0 8px">Estimación${demo ? " (DEMO, no real)" : ""}</h2>${tablaResultado(r)}` : `<p style="margin-top:16px;color:#6b6457">Sin montos: precios pendientes de configurar.</p>`}
      <p style="margin-top:20px"><a href="https://wa.me/${esc(lead.whatsapp.replace(/\D/g, "").replace(/^(\d{8})$/, "506$1"))}" style="background:#e0925f;color:#1b1812;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:600">Responder por WhatsApp</a></p>`,
    ),
  };
}

export function correoCliente(lead: Lead, r: Resultado | null) {
  if (lead.origen !== "cotizador") return null;
  const c = lead.cotizacion;
  const tipo = TIPOS_OBRA.find((t) => t.id === c.tipo)!.nombre;
  const linea = LINEAS.find((l) => l.id === c.linea)!.nombre;
  const wa = waLink(mensajeCotizacion({ nombre: lead.nombre, m2: c.m2, tipoObra: tipo, linea, moneda: c.moneda, min: r?.total.min, max: r?.total.max }));
  return {
    subject: `Su cotización ConstruSur: ${c.m2} m², línea ${linea}`,
    html: layout(
      `Gracias, ${lead.nombre}`,
      `<p style="line-height:1.6">Este es el resumen de su estimación para <strong>${c.m2} m² · ${esc(tipo)} · Línea ${esc(linea)}</strong>.</p>
       ${r ? tablaResultado(r) : `<p style="line-height:1.6">En breve le enviamos una estimación personalizada.</p>`}
       <p style="font-size:12px;color:#6b6457;line-height:1.6;margin-top:16px">Estimación referencial, válida en la GAM. No incluye estudios de suelo, topografía ni movimiento de tierras. El precio final se confirma en el anteproyecto, con presupuesto por partida.</p>
       <p style="margin-top:24px"><a href="${esc(wa)}" style="background:#e0925f;color:#1b1812;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:600">Conversemos por WhatsApp</a>
       &nbsp; <a href="${esc(contacto.calendlyUrl)}" style="color:#1b1812;font-weight:600">Agendar una llamada</a></p>`,
    ),
  };
}
