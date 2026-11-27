"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { contacto } from "@/data/site";
import { v2Contacto } from "@/data/v2";
import { enviarLead } from "@/lib/enviarLead";
import { track } from "@/lib/analytics";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { MONO_PATHS } from "./Brand";
import { V2Field, V2Honeypot, V2Select, v2Input } from "./fields";

export function V2Contact() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!d.nombre?.trim()) errs.nombre = "Ingrese su nombre.";
    if (!/^\S+@\S+\.\S+$/.test(d.correo ?? "")) errs.correo = "Ingrese un correo válido.";
    if ((d.telefono ?? "").replace(/\D/g, "").length < 8) errs.telefono = "Ingrese un teléfono de al menos 8 dígitos.";
    if (!d.mensaje?.trim()) errs.mensaje = "Cuéntenos brevemente su proyecto.";
    setErr(errs);
    if (Object.keys(errs).length) return document.getElementById(`v2c-${Object.keys(errs)[0]}`)?.focus();
    setEnviando(true);
    const nombre = [d.nombre, d.apellido].filter(Boolean).join(" ").trim();
    await enviarLead(
      { origen: "contacto", nombre, correo: d.correo, telefono: d.telefono, tipoProyecto: d.servicio || undefined, mensaje: d.mensaje, sitio_web: d.sitio_web },
      { nombre, tipo: "contacto" },
      { origen: "contacto", tipo_proyecto: d.servicio },
    );
    router.push("/gracias");
  }

  const tel = `tel:+${contacto.whatsappNumber}`;

  return (
    <section id="contacto" aria-labelledby="v2-contacto-titulo" className="relative isolate overflow-hidden bg-v2-black">
      {/* Monograma enorme de fondo */}
      <svg viewBox="0 0 100 100" aria-hidden className="absolute -right-[10%] top-1/2 -z-10 w-[85vw] max-w-[1100px] -translate-y-1/2 text-v2-brown/50 lg:left-[22%] lg:right-auto lg:w-[60vw]" fill="none" stroke="currentColor" strokeWidth={0.9}>
        {MONO_PATHS.map((p) => (
          <path key={p} d={p} />
        ))}
      </svg>
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-12 lg:py-28">
        <div className="flex flex-col">
          <h2 id="v2-contacto-titulo" className="v2-h text-[2.4rem] sm:text-6xl lg:text-[4.2rem]" data-reveal>
            {v2Contacto.titulo[0]} <span className="block text-v2-orange">{v2Contacto.titulo[1]}</span>
          </h2>
          <div className="mt-10 lg:mt-auto lg:pt-16" data-reveal>
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-white/70">{v2Contacto.texto}</p>
            <p className="mt-6 text-sm text-white/60">¿Prefiere hablar?</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href={tel} className="text-xl font-extrabold hover:text-v2-orange">
                Llamar ahora
              </a>
              <a href={waLink(MENSAJE_GENERAL)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { ubicacion: "contacto" })} className="flex items-center gap-2 text-xl font-extrabold hover:text-v2-orange">
                <WhatsAppIcon className="size-5 text-[#25d366]" /> WhatsApp
              </a>
            </div>
            <p className="mt-2 text-sm text-white/60">
              {contacto.whatsappDisplay} · {contacto.email}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate aria-label="Formulario de contacto" className="relative grid content-start gap-4 sm:grid-cols-2" data-reveal>
          <V2Field id="v2c-nombre" name="nombre" label="Nombre" autoComplete="given-name" error={err.nombre} required />
          <V2Field id="v2c-apellido" name="apellido" label="Apellido" autoComplete="family-name" />
          <V2Field id="v2c-correo" name="correo" type="email" label="Correo" autoComplete="email" error={err.correo} required />
          <V2Field id="v2c-telefono" name="telefono" type="tel" inputMode="tel" label="Teléfono" autoComplete="tel" error={err.telefono} required />
          <V2Select id="v2c-servicio" name="servicio" label="Servicio que necesita" options={v2Contacto.servicios} className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <label htmlFor="v2c-mensaje" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
              Mensaje <span className="text-v2-orange">*</span>
            </label>
            <textarea
              id="v2c-mensaje"
              name="mensaje"
              rows={5}
              required
              aria-invalid={!!err.mensaje}
              aria-describedby={err.mensaje ? "v2c-mensaje-err" : undefined}
              placeholder="Cuéntenos qué quiere construir, dónde y cuándo."
              className={`${v2Input} h-auto resize-y py-3`}
            />
            {err.mensaje && <p id="v2c-mensaje-err" className="mt-1.5 text-sm font-medium text-[#ff8a7a]">{err.mensaje}</p>}
          </div>
          <V2Honeypot />
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button type="submit" disabled={enviando} className="v2-btn disabled:opacity-70">
              <span>{enviando ? "Enviando…" : "Enviar mensaje"}</span>
              <span aria-hidden className="v2-tri" />
            </button>
            <p className="text-xs text-white/55">Sus datos se usan solo para responder su consulta.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
