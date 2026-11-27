"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Linea, Moneda, TipoObra } from "@/data/cotizador.config";
import { enviarLead } from "@/lib/enviarLead";
import { V2Field, V2Honeypot, V2Select } from "../fields";

const PROVINCIAS = ["San José", "Heredia", "Alajuela", "Cartago", "Puntarenas", "Guanacaste", "Limón"];
const INICIO = ["En 0 a 3 meses", "En 3 a 6 meses", "En 6 a 12 meses", "En más de 12 meses"];

function Opciones({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/70">{legend}</legend>
      <div className="flex border border-v2-brown-line">
        {options.map((o) => (
          <label key={o} className="flex h-11 flex-1 cursor-pointer items-center justify-center px-2 text-sm font-bold text-white/80 transition-colors hover:bg-v2-brown-card has-[:checked]:bg-v2-orange has-[:checked]:text-v2-black has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-white">
            <input type="radio" name={name} value={o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function V2LeadForm({
  cotizacion,
  resumen,
  nombreTipo,
  nombreLinea,
  demo,
  nivel = 3,
}: {
  cotizacion: { m2: number; tipo: TipoObra; linea: Linea; moneda: Moneda };
  resumen: { min: number; max: number } | null;
  nombreTipo: string;
  nombreLinea: string;
  demo: boolean;
  nivel?: 2 | 3;
}) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [err, setErr] = useState<Record<string, string>>({});
  const H = nivel === 2 ? "h2" : "h3";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!d.nombre?.trim()) errs.nombre = "Ingrese su nombre.";
    if ((d.whatsapp ?? "").replace(/\D/g, "").length < 8) errs.whatsapp = "Ingrese un número de al menos 8 dígitos.";
    if (!/^\S+@\S+\.\S+$/.test(d.correo ?? "")) errs.correo = "Ingrese un correo válido.";
    setErr(errs);
    if (Object.keys(errs).length) return document.getElementById(`v2l-${Object.keys(errs)[0]}`)?.focus();

    setEnviando(true);
    await enviarLead(
      {
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
      },
      {
        nombre: d.nombre,
        tipo: "cotizacion",
        resumen: { m2: cotizacion.m2, tipoObra: nombreTipo, linea: nombreLinea, moneda: cotizacion.moneda, min: resumen?.min ?? 0, max: resumen?.max ?? 0, demo },
      },
      { origen: "cotizador", linea: cotizacion.linea, tipo: cotizacion.tipo, m2: cotizacion.m2 },
    );
    router.push("/gracias");
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="v2-lead-titulo" className="relative grid gap-8 border-t-2 border-v2-orange bg-v2-ink p-5 sm:p-8 lg:grid-cols-12 lg:p-10">
      <div className="lg:col-span-4">
        <H id="v2-lead-titulo" className="v2-h text-3xl sm:text-4xl">
          Reciba su cotización. <span className="text-v2-orange">Conversemos.</span>
        </H>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-white/70">
          Le enviamos el resumen a su correo y uno de los socios le contacta para revisar su proyecto. Sin costo y sin compromiso.
        </p>
        {resumen && (
          <p className="mt-5 border-l-[3px] border-v2-orange bg-v2-brown-card p-4 text-sm">
            <span className="block font-bold">Su estimación</span>
            {cotizacion.m2} m² · {nombreTipo} · {nombreLinea}
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
        <V2Field id="v2l-nombre" name="nombre" label="Nombre completo" autoComplete="name" error={err.nombre} required />
        <V2Field id="v2l-whatsapp" name="whatsapp" type="tel" inputMode="tel" label="WhatsApp" autoComplete="tel" placeholder="8888 8888" error={err.whatsapp} required />
        <V2Field id="v2l-correo" name="correo" type="email" label="Correo" autoComplete="email" error={err.correo} required className="sm:col-span-2" />
        <V2Select id="v2l-provincia" name="provincia" label="Provincia" options={PROVINCIAS} />
        <V2Field id="v2l-canton" name="canton" label="Cantón" autoComplete="address-level2" />
        <Opciones name="lote" legend="¿Tiene lote?" options={["Sí", "No"]} />
        <Opciones name="planos" legend="¿Tiene planos?" options={["Sí", "No", "En proceso"]} />
        <V2Select id="v2l-inicio" name="inicio" label="¿Cuándo quiere iniciar?" options={INICIO} className="sm:col-span-2" />
        <label className="flex cursor-pointer items-start gap-3 bg-v2-brown-card p-4 text-sm sm:col-span-2">
          <input type="checkbox" name="contactar" value="si" defaultChecked className="mt-0.5 size-5 shrink-0 accent-[#e0925f]" />
          <span>
            <strong>Quiero que me contacten</strong>
            <span className="block text-white/60">Un socio de ConstruSur le escribe por WhatsApp o correo.</span>
          </span>
        </label>
        <V2Honeypot />
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button type="submit" disabled={enviando} className="v2-btn disabled:opacity-70">
            <span>{enviando ? "Enviando…" : "Enviar y recibir mi cotización"}</span>
            <span aria-hidden className="v2-tri" />
          </button>
          <p className="text-xs text-white/55">Sus datos se usan solo para responder su solicitud.</p>
        </div>
      </div>
    </form>
  );
}
