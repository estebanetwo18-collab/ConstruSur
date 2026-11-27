"use client";

import { useMemo, useSyncExternalStore } from "react";
import { contacto } from "@/data/site";
import { dinero } from "@/lib/format";
import { leerUltimoLeadRaw, type UltimoLead } from "@/lib/storage";
import { MENSAJE_GENERAL, mensajeCotizacion, waLink } from "@/lib/whatsapp";
import { ArrowLink, BtnDiag } from "./Buttons";
import { MONO_PATHS } from "./Brand";

/** /gracias de la versión B: misma lógica (sessionStorage + WhatsApp), otro diseño. */
export function V2Gracias() {
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
  const montos = !!r && r.max > 0;
  const wa = waLink(
    r ? mensajeCotizacion({ nombre: lead?.nombre, m2: r.m2, tipoObra: r.tipoObra, linea: r.linea, moneda: r.moneda, min: montos ? r.min : undefined, max: montos ? r.max : undefined }) : MENSAJE_GENERAL,
  );
  const nombre = lead?.nombre?.split(" ")[0];

  return (
    <section aria-labelledby="v2-gracias-titulo" className="relative isolate overflow-hidden bg-v2-black">
      <svg viewBox="0 0 100 100" aria-hidden className="absolute -right-24 bottom-0 -z-10 w-[70vw] max-w-[760px] text-v2-brown/50" fill="none" stroke="currentColor" strokeWidth={0.8}>
        {MONO_PATHS.map((p) => (
          <path key={p} d={p} />
        ))}
      </svg>
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h1 id="v2-gracias-titulo" className="v2-h hero-title-in max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[5rem]">
          Gracias{nombre ? `, ${nombre}` : ""}. <span className="block text-v2-orange">Recibimos su solicitud.</span>
        </h1>
        <p className="hero-in mt-6 max-w-xl text-lg text-white/75" style={{ "--i": 2 } as React.CSSProperties}>
          {lead?.tipo === "cotizacion"
            ? "Le enviamos el resumen de su cotización por correo. Uno de los socios le contactará pronto para conversar sobre su anteproyecto."
            : "Le responderemos a la brevedad. Si prefiere, adelantemos la conversación por WhatsApp."}
        </p>

        {listo && lead && !lead.correoEnviado && (
          <p role="status" className="mt-6 max-w-xl border-l-[3px] border-v2-orange bg-v2-brown-card p-4 text-sm">
            No pudimos confirmar el envío del correo. Envíenos su solicitud por WhatsApp y le atendemos de inmediato.
          </p>
        )}

        {r && (
          <div className="hero-in mt-10 max-w-xl border-t-2 border-v2-orange bg-v2-ink p-6 sm:p-8" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-v2-orange">Resumen de su cotización</p>
            <dl className="mt-4 grid grid-cols-3 gap-px bg-v2-brown text-sm">
              {[
                ["Área", `${r.m2} m²`],
                ["Obra", r.tipoObra],
                ["Línea", r.linea],
              ].map(([k, v]) => (
                <div key={k} className="bg-v2-ink p-3">
                  <dt className="text-white/55">{k}</dt>
                  <dd className="font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            {montos ? (
              <>
                <p className="mt-5 text-sm text-white/60">Inversión estimada con IVA{r.demo ? " (precios de demostración)" : ""}</p>
                <p className="v2-h mt-1 text-3xl tabular-nums sm:text-4xl">
                  {dinero(r.min, r.moneda)} – <span className="text-v2-orange">{dinero(r.max, r.moneda)}</span>
                </p>
                <p className="mt-3 text-xs text-white/55">Estimación referencial. El precio final se confirma en el anteproyecto.</p>
              </>
            ) : (
              <p className="mt-5 text-sm text-white/65">Le enviaremos una estimación personalizada.</p>
            )}
          </div>
        )}

        <div className="hero-in mt-10 flex flex-wrap items-center gap-6" style={{ "--i": 4 } as React.CSSProperties}>
          <BtnDiag href={wa} evento="whatsapp_click" eventoParams={{ ubicacion: "gracias" }}>
            Enviar por WhatsApp
          </BtnDiag>
          <ArrowLink href={contacto.calendlyUrl} evento="calendly_click" eventoParams={{ ubicacion: "gracias" }}>
            Agendar llamada
          </ArrowLink>
          <ArrowLink href="/">Volver al inicio</ArrowLink>
        </div>
      </div>
    </section>
  );
}
