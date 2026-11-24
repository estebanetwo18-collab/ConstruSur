"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { CalendarDays, CircleCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { contacto } from "@/data/site";
import { dinero } from "@/lib/format";
import { leerUltimoLeadRaw, type UltimoLead } from "@/lib/storage";
import { MENSAJE_GENERAL, mensajeCotizacion, waLink } from "@/lib/whatsapp";

export function Gracias() {
  // sessionStorage como fuente externa (null en el servidor).
  const raw = useSyncExternalStore(
    () => () => {},
    () => leerUltimoLeadRaw(),
    () => undefined,
  );
  const listo = raw !== undefined;
  const lead = useMemo<UltimoLead | null>(() => {
    try {
      return raw ? (JSON.parse(raw) as UltimoLead) : null;
    } catch {
      return null;
    }
  }, [raw]);

  const r = lead?.resumen;
  const tieneMontos = !!r && r.max > 0;
  const wa = waLink(
    r
      ? mensajeCotizacion({ nombre: lead?.nombre, m2: r.m2, tipoObra: r.tipoObra, linea: r.linea, moneda: r.moneda, min: tieneMontos ? r.min : undefined, max: tieneMontos ? r.max : undefined })
      : MENSAJE_GENERAL,
  );
  const nombre = lead?.nombre?.split(" ")[0];

  return (
    <section className="relative overflow-hidden bg-cream pb-20 pt-32 sm:pb-28 sm:pt-40" aria-labelledby="gracias-titulo">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(224,146,95,.25),transparent_65%)]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="hero-in mx-auto grid size-16 place-items-center rounded-full bg-terra text-ink">
          <CircleCheck className="size-8" strokeWidth={1.8} />
        </span>
        <h1 id="gracias-titulo" className="font-display hero-in mt-6 text-5xl font-medium leading-[1.02] sm:text-6xl" style={{ "--i": 1 } as React.CSSProperties}>
          ¡Gracias{nombre ? `, ${nombre}` : ""}! <span className="kw">Recibimos</span> su solicitud.
        </h1>
        <p className="hero-in mx-auto mt-5 max-w-xl text-lg text-ink-soft" style={{ "--i": 2 } as React.CSSProperties}>
          {lead?.tipo === "cotizacion"
            ? "Le enviamos el resumen de su cotización por correo. Uno de los socios le contactará pronto para conversar sobre su anteproyecto."
            : "Le responderemos a la brevedad. Si prefiere, adelantemos la conversación por WhatsApp."}
        </p>

        {listo && lead && !lead.correoEnviado && (
          <p role="status" className="mx-auto mt-6 flex max-w-xl items-start gap-3 rounded-2xl bg-[#fff4e5] p-4 text-left text-sm text-[#6b3a00]">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" />
            No pudimos confirmar el envío del correo. Envíenos su solicitud por WhatsApp y le atendemos de inmediato.
          </p>
        )}

        {r && (
          <div className="hero-in card mx-auto mt-10 max-w-xl p-6 text-left sm:p-8" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-terra-ink">Resumen de su cotización</p>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-b border-line pb-5 text-sm">
              <div>
                <dt className="text-muted">Área</dt>
                <dd className="font-semibold">{r.m2} m²</dd>
              </div>
              <div>
                <dt className="text-muted">Obra</dt>
                <dd className="font-semibold">{r.tipoObra}</dd>
              </div>
              <div>
                <dt className="text-muted">Línea</dt>
                <dd className="font-semibold">{r.linea}</dd>
              </div>
            </dl>
            {tieneMontos ? (
              <div className="pt-5">
                <p className="text-sm text-muted">Inversión estimada con IVA{r.demo ? " (precios de demostración)" : ""}</p>
                <p className="font-display mt-1 text-3xl font-medium tabular-nums sm:text-4xl">
                  {dinero(r.min, r.moneda)} <span className="text-muted">–</span> <span className="text-terra-title">{dinero(r.max, r.moneda)}</span>
                </p>
                <p className="mt-3 text-xs text-muted">Estimación referencial. El precio final se confirma en el anteproyecto.</p>
              </div>
            ) : (
              <p className="pt-5 text-sm text-muted">Le enviaremos una estimación personalizada.</p>
            )}
          </div>
        )}

        <div className="hero-in mt-10 flex flex-wrap justify-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <Button href={wa} evento="whatsapp_click" eventoParams={{ ubicacion: "gracias" }} icon={<WhatsAppIcon className="size-[18px]" />}>
            Enviar por WhatsApp
          </Button>
          <Button href={contacto.calendlyUrl} variant="dark" evento="calendly_click" eventoParams={{ ubicacion: "gracias" }} icon={<CalendarDays className="size-[18px]" />}>
            Agendar llamada
          </Button>
        </div>
        <p className="mt-8 text-sm">
          <Link href="/" className="font-semibold underline decoration-terra decoration-2 underline-offset-4">
            Volver al inicio
          </Link>
        </p>
      </div>
    </section>
  );
}
