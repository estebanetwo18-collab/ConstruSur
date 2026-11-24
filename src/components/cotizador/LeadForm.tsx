"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Field, Honeypot, SelectField } from "@/components/ui/Field";
import type { Linea, Moneda, TipoObra } from "@/data/cotizador.config";
import { track } from "@/lib/analytics";
import { guardarUltimoLead, leerUtm } from "@/lib/storage";

const PROVINCIAS = ["San José", "Heredia", "Alajuela", "Cartago", "Puntarenas", "Guanacaste", "Limón"];
const INICIO = ["En 0 a 3 meses", "En 3 a 6 meses", "En 6 a 12 meses", "En más de 12 meses"];

function Opciones({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-sm font-semibold">{legend}</legend>
      <div className="flex gap-1 rounded-full bg-cream p-1">
        {options.map((o) => (
          <label
            key={o}
            className="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-full px-2 text-sm font-semibold text-ink transition-colors has-[:checked]:bg-ink has-[:checked]:text-cream has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-terra-ink hover:bg-ink/5"
          >
            <input type="radio" name={name} value={o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function LeadForm({
  cotizacion,
  resumen,
  nombreTipo,
  nombreLinea,
  demo,
}: {
  cotizacion: { m2: number; tipo: TipoObra; linea: Linea; moneda: Moneda };
  resumen: { min: number; max: number } | null;
  nombreTipo: string;
  nombreLinea: string;
  demo: boolean;
}) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd.entries()) as Record<string, string>;

    const errs: Record<string, string> = {};
    if (!d.nombre?.trim()) errs.nombre = "Ingrese su nombre.";
    if ((d.whatsapp ?? "").replace(/\D/g, "").length < 8) errs.whatsapp = "Ingrese un número de al menos 8 dígitos.";
    if (!/^\S+@\S+\.\S+$/.test(d.correo ?? "")) errs.correo = "Ingrese un correo válido.";
    setErrores(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`l-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setEnviando(true);
    let correoEnviado = false;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origen: "cotizador",
          nombre: d.nombre,
          whatsapp: d.whatsapp,
          correo: d.correo,
          provincia: d.provincia || undefined,
          canton: d.canton || undefined,
          lote: d.lote || undefined,
          planos: d.planos || undefined,
          inicio: d.inicio || undefined,
          contactar: d.contactar === "si",
          sitio_web: d.sitio_web,
          cotizacion,
          utm: leerUtm(),
        }),
      });
      correoEnviado = res.ok;
    } catch {
      correoEnviado = false;
    }
    track("lead_enviado", { origen: "cotizador", linea: cotizacion.linea, tipo: cotizacion.tipo, m2: cotizacion.m2, correo_ok: correoEnviado });
    guardarUltimoLead({
      nombre: d.nombre,
      tipo: "cotizacion",
      correoEnviado,
      resumen: {
        m2: cotizacion.m2,
        tipoObra: nombreTipo,
        linea: nombreLinea,
        moneda: cotizacion.moneda,
        min: resumen?.min ?? 0,
        max: resumen?.max ?? 0,
        demo,
      },
    });
    router.push("/gracias");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card relative overflow-hidden p-5 sm:p-8 lg:p-10" aria-labelledby="lead-titulo">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Siguiente paso</p>
          <h3 id="lead-titulo" className="font-display mt-3 text-3xl font-medium leading-tight sm:text-4xl">
            Reciba su cotización y <span className="kw">conversemos</span>.
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
            Le enviamos el resumen a su correo y uno de los socios le contacta para revisar su proyecto. Sin costo y sin compromiso.
          </p>
          {resumen && (
            <p className="mt-5 rounded-2xl bg-cream p-4 text-sm">
              <span className="block font-semibold">Su estimación</span>
              {cotizacion.m2} m² · {nombreTipo} · {nombreLinea}
            </p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          <Field id="l-nombre" name="nombre" label="Nombre completo" autoComplete="name" error={errores.nombre} required />
          <Field id="l-whatsapp" name="whatsapp" type="tel" inputMode="tel" label="WhatsApp" autoComplete="tel" placeholder="8888 8888" error={errores.whatsapp} required />
          <Field id="l-correo" name="correo" type="email" label="Correo" autoComplete="email" error={errores.correo} required className="sm:col-span-2" />
          <SelectField id="l-provincia" name="provincia" label="Provincia" options={PROVINCIAS} />
          <Field id="l-canton" name="canton" label="Cantón" autoComplete="address-level2" />
          <Opciones name="lote" legend="¿Tiene lote?" options={["Sí", "No"]} />
          <Opciones name="planos" legend="¿Tiene planos?" options={["Sí", "No", "En proceso"]} />
          <SelectField id="l-inicio" name="inicio" label="¿Cuándo quiere iniciar?" options={INICIO} className="sm:col-span-2" />
          <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-cream p-4 text-sm sm:col-span-2">
            <input type="checkbox" name="contactar" value="si" defaultChecked className="mt-0.5 size-5 shrink-0 accent-[#1b1812]" />
            <span>
              <strong className="font-semibold">Quiero que me contacten</strong>
              <span className="block text-muted">Un socio de ConstruSur le escribe por WhatsApp o correo.</span>
            </span>
          </label>
          <Honeypot />
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button
              type="submit"
              disabled={enviando}
              className="btn inline-flex w-full items-center justify-between gap-3 rounded-full bg-terra py-1.5 pl-6 pr-1.5 font-semibold text-ink transition-colors hover:bg-[#e89f6f] disabled:opacity-70 sm:w-auto"
            >
              {enviando ? "Enviando…" : "Enviar y recibir mi cotización"}
              <span className="btn-arrow-circle grid size-10 place-items-center rounded-full bg-ink text-terra">
                {enviando ? <LoaderCircle className="size-[18px] animate-spin" /> : <span aria-hidden>→</span>}
              </span>
            </button>
            <p className="text-xs text-muted">Sus datos se usan solo para responder su solicitud.</p>
          </div>
        </div>
      </div>
    </form>
  );
}
