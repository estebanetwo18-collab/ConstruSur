"use client";

import { track } from "./analytics";
import { guardarUltimoLead, leerUtm, type UltimoLead } from "./storage";

/**
 * Envía un lead a /api/lead y guarda el resumen para /gracias.
 * Devuelve si el correo se confirmó; /gracias ofrece WhatsApp en ambos casos.
 */
export async function enviarLead(
  body: Record<string, unknown>,
  resumen: Omit<UltimoLead, "correoEnviado">,
  eventoParams: Record<string, string | number | boolean | undefined>,
): Promise<boolean> {
  let ok = false;
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, utm: leerUtm() }),
    });
    ok = res.ok;
  } catch {
    ok = false;
  }
  track("lead_enviado", { ...eventoParams, correo_ok: ok });
  guardarUltimoLead({ ...resumen, correoEnviado: ok });
  return ok;
}
