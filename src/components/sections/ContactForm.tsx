"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Field, Honeypot, inputCls, SelectField } from "@/components/ui/Field";
import { track } from "@/lib/analytics";
import { guardarUltimoLead, leerUtm } from "@/lib/storage";

const TIPOS = ["Construcción nueva", "Remodelación", "Diseño y consultoría", "Llave en mano", "Otro"];

export function ContactForm() {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!data.nombre?.trim()) errs.nombre = "Ingrese su nombre.";
    if (!/^\S+@\S+\.\S+$/.test(data.correo ?? "")) errs.correo = "Ingrese un correo válido.";
    if ((data.telefono ?? "").replace(/\D/g, "").length < 8) errs.telefono = "Ingrese un teléfono de al menos 8 dígitos.";
    if (!data.mensaje?.trim()) errs.mensaje = "Cuéntenos brevemente su proyecto.";
    setErrores(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setEnviando(true);
    let ok = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origen: "contacto", ...data, utm: leerUtm() }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    track("lead_enviado", { origen: "contacto", tipo_proyecto: data.tipoProyecto, correo_ok: ok });
    guardarUltimoLead({ nombre: data.nombre, tipo: "contacto", correoEnviado: ok });
    router.push("/gracias");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-5 sm:p-8" aria-label="Formulario de contacto">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="c-nombre" name="nombre" label="Nombre completo" autoComplete="name" error={errores.nombre} required />
        <Field id="c-correo" name="correo" type="email" label="Correo" autoComplete="email" error={errores.correo} required />
        <Field id="c-telefono" name="telefono" type="tel" label="Teléfono / WhatsApp" autoComplete="tel" inputMode="tel" error={errores.telefono} required />
        <SelectField id="c-tipo" name="tipoProyecto" label="Tipo de proyecto" options={TIPOS} />
        <div className="sm:col-span-2">
          <label htmlFor="c-mensaje" className="mb-1.5 block text-sm font-semibold">
            Mensaje <span className="text-terra-ink">*</span>
          </label>
          <textarea
            id="c-mensaje"
            name="mensaje"
            rows={4}
            required
            aria-invalid={!!errores.mensaje}
            aria-describedby={errores.mensaje ? "c-mensaje-err" : undefined}
            className={`${inputCls} h-auto resize-y py-3`}
            placeholder="Cuéntenos qué quiere construir, dónde y cuándo."
          />
          {errores.mensaje && (
            <p id="c-mensaje-err" className="mt-1.5 text-sm font-medium text-[#b3261e]">
              {errores.mensaje}
            </p>
          )}
        </div>
      </div>
      <Honeypot />
      <button
        type="submit"
        disabled={enviando}
        className="btn mt-6 inline-flex w-full items-center justify-between gap-3 rounded-full bg-terra py-1.5 pl-6 pr-1.5 font-semibold text-ink transition-colors hover:bg-[#e89f6f] disabled:opacity-70 sm:w-auto"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
        <span className="btn-arrow-circle grid size-10 place-items-center rounded-full bg-ink text-terra">
          {enviando ? <LoaderCircle className="size-[18px] animate-spin" /> : <span aria-hidden>→</span>}
        </span>
      </button>
      <p className="mt-4 text-xs text-muted">Sus datos se usan solo para responder su consulta.</p>
    </form>
  );
}
