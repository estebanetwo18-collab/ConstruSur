import { Resend } from "resend";
import { leadSchema, correoCliente, correoInterno, cotizacionServidor } from "@/lib/lead";

/**
 * POST /api/lead
 * Valida el lead (zod) y envía con Resend:
 *   (a) el lead a ConstruSur (LEAD_TO_EMAIL)
 *   (b) el resumen de la cotización al cliente (solo origen "cotizador")
 * Sin RESEND_API_KEY / LEAD_TO_EMAIL / LEAD_FROM_EMAIL → modo dev:
 * responde OK y escribe el lead en la consola del servidor.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Datos inválidos", campos: parsed.error.issues.map((i) => ({ campo: i.path.join("."), mensaje: i.message })) },
      { status: 422 },
    );
  }
  const lead = parsed.data;

  // Honeypot: un bot llenó el campo oculto → respondemos OK sin hacer nada.
  if (lead.sitio_web) return Response.json({ ok: true });

  const { resultado, demo } = cotizacionServidor(lead);
  const interno = correoInterno(lead, resultado, demo);
  const cliente = correoCliente(lead, resultado);

  const { RESEND_API_KEY, LEAD_TO_EMAIL, LEAD_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !LEAD_TO_EMAIL || !LEAD_FROM_EMAIL) {
    console.info("\n[api/lead] MODO DEV (faltan variables de Resend). Lead recibido:\n", JSON.stringify({ lead, total: resultado?.total, demo }, null, 2));
    return Response.json({ ok: true, modo: "dev" });
  }

  const resend = new Resend(RESEND_API_KEY);
  const envios = await Promise.allSettled([
    resend.emails.send({ from: LEAD_FROM_EMAIL, to: LEAD_TO_EMAIL.split(",").map((s) => s.trim()), replyTo: lead.correo, ...interno }),
    cliente ? resend.emails.send({ from: LEAD_FROM_EMAIL, to: lead.correo, replyTo: LEAD_TO_EMAIL.split(",")[0].trim(), ...cliente }) : Promise.resolve(null),
  ]);

  const fallo = (r: PromiseSettledResult<unknown>) =>
    r.status === "rejected" || (r.value && typeof r.value === "object" && "error" in r.value && (r.value as { error: unknown }).error);

  if (fallo(envios[0])) {
    console.error("[api/lead] Error enviando el lead interno:", envios[0]);
    return Response.json({ ok: false, error: "No se pudo enviar el correo" }, { status: 502 });
  }
  if (fallo(envios[1])) console.error("[api/lead] Error enviando el resumen al cliente:", envios[1]);

  return Response.json({ ok: true });
}
