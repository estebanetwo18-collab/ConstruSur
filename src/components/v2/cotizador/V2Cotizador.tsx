"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cotizadorConfig as C, LINEAS, TIPOS_OBRA, type Moneda } from "@/data/cotizador.config";
import type { Pricing, Resultado } from "@/lib/cotizar";
import { dinero, pct } from "@/lib/format";
import { track } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";
import { useCotizador } from "@/lib/useCotizador";
import { AnimatedNumber } from "@/components/cotizador/AnimatedNumber";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { V2Modal } from "../Modal";
import { V2Segmented } from "../fields";
import { V2LeadForm } from "./V2LeadForm";

type Props = { pricing: Pricing | null; demo: boolean; hitos: { label: string; detalle: string; pct: number | null }[]; nivel?: 2 | 3 };

function Paso({ n, titulo, children, id }: { n: number; titulo: string; children: React.ReactNode; id?: string }) {
  return (
    <div className="border-t border-v2-brown pt-6 first:border-t-0 first:pt-0">
      <p id={id ?? `v2p-${n}`} className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em] text-white/80">
        <span className="text-v2-orange">0{n}</span> {titulo}
      </p>
      {children}
    </div>
  );
}

function Fila({ label, r, m, sub, strong }: { label: React.ReactNode; r: { min: number; max: number }; m: Moneda; sub?: boolean; strong?: boolean }) {
  const cls = sub ? "py-2 text-[0.82rem] text-white/60" : `py-3 ${strong ? "font-bold" : ""}`;
  return (
    <tr className={sub ? "" : "border-t border-v2-brown"}>
      <th scope="row" className={`${cls} ${sub ? "pl-4" : ""} text-left font-normal`}>
        {label}
      </th>
      <td className={`${cls} pl-3 text-right tabular-nums`}>{dinero(r.min, m)}</td>
      <td className={`${cls} pl-3 text-right tabular-nums`}>{dinero(r.max, m)}</td>
    </tr>
  );
}

function Desglose({ r }: { r: Resultado }) {
  const m = r.moneda;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <caption className="sr-only">Desglose de la estimación</caption>
        <thead>
          <tr className="text-xs uppercase tracking-[0.12em] text-white/60">
            <th scope="col" className="pb-2 text-left font-semibold">Concepto</th>
            <th scope="col" className="pb-2 text-right font-semibold">Mínimo</th>
            <th scope="col" className="pb-2 text-right font-semibold">Máximo</th>
          </tr>
        </thead>
        <tbody>
          <Fila strong r={r.construccion} m={m} label={<><b>Construcción</b><span className="block text-xs text-white/60">{r.input.m2} m² × {dinero(r.precioM2.min, m)}–{dinero(r.precioM2.max, m)} por m²</span></>} />
          <Fila strong r={r.consultoria.total} m={m} label={<><b>Diseño y consultoría</b> <span className="text-white/60">({pct(r.consultoria.pct)})</span></>} />
          {r.consultoria.items.map((i) => <Fila key={i.id} sub r={i.monto} m={m} label={`${i.label} · ${pct(i.pct)}`} />)}
          <Fila strong r={r.institucionales.total} m={m} label={<><b>Pagos institucionales estimados</b> <span className="text-white/60">({pct(r.institucionales.pct)})</span></>} />
          {r.institucionales.items.map((i) => <Fila key={i.id} sub r={i.monto} m={m} label={<>{i.label} · {pct(i.pct)}{i.nota && <span className="block text-[0.72rem] italic">{i.nota}</span>}</>} />)}
          <Fila strong r={r.subtotal} m={m} label={<b>Subtotal</b>} />
          <Fila r={r.iva.monto} m={m} label={<><b>IVA {pct(r.iva.pct)}</b><span className="block text-xs text-white/60">Sobre construcción y consultoría</span></>} />
          <tr className="border-t-2 border-v2-orange">
            <th scope="row" className="py-4 text-left text-lg font-extrabold">Total con IVA</th>
            <td className="py-4 pl-3 text-right text-lg font-extrabold tabular-nums">{dinero(r.total.min, m)}</td>
            <td className="py-4 pl-3 text-right text-lg font-extrabold tabular-nums text-v2-orange">{dinero(r.total.max, m)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function V2Cotizador({ pricing, demo, hitos, nivel = 3 }: Props) {
  const c = useCotizador(pricing);
  const { resultado: r, moneda } = c;
  const [desglose, setDesglose] = useState(false);
  const [specs, setSpecs] = useState(false);
  const [pagos, setPagos] = useState(false);
  const H = nivel === 2 ? "h2" : "h3";
  const pctSlider = c.m2 !== null ? ((c.m2 - C.area.min) / (C.area.max - C.area.min)) * 100 : 0;

  return (
    <div onPointerDown={c.interactuar} onKeyDown={c.interactuar}>
      <div className="grid gap-px bg-v2-brown lg:grid-cols-[1.35fr_1fr]">
        {/* Controles */}
        <div className="space-y-7 bg-v2-ink p-5 sm:p-8 lg:p-10">
          <Paso n={1} titulo="Metros cuadrados de construcción">
            <div className="flex items-center gap-5">
              <div className="relative w-36 shrink-0">
                <label htmlFor="v2-m2" className="sr-only">Metros cuadrados</label>
                <input
                  id="v2-m2"
                  type="number"
                  inputMode="numeric"
                  min={C.area.min}
                  max={C.area.max}
                  step={C.area.paso}
                  value={c.m2Text}
                  onChange={(e) => c.setM2Text(e.target.value)}
                  onBlur={() => c.m2 !== null && c.setM2Text(String(c.m2))}
                  aria-invalid={!c.area.ok}
                  aria-describedby="v2-m2-ayuda"
                  className="h-14 w-full border border-v2-brown-line bg-v2-brown-card pl-4 pr-12 text-2xl font-extrabold tabular-nums text-white focus:border-v2-orange focus:outline-none aria-[invalid=true]:border-[#ff8a7a]"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-white/50">m²</span>
              </div>
              <input
                type="range"
                aria-label="Metros cuadrados (control deslizante)"
                min={C.area.min}
                max={C.area.max}
                step={C.area.paso}
                value={c.m2 ?? C.area.min}
                onChange={(e) => c.setM2Text(e.target.value)}
                className="range v2-range"
                style={{ "--pct": `${pctSlider}%` } as React.CSSProperties}
              />
            </div>
            <p id="v2-m2-ayuda" role={c.area.ok ? undefined : "alert"} className={`mt-2 text-sm ${c.area.ok ? "text-white/55" : "font-medium text-[#ff8a7a]"}`}>
              {c.area.ok ? `Entre ${C.area.min} y ${C.area.max} m².` : c.area.error}
            </p>
          </Paso>

          <Paso n={2} titulo="Tipo de obra">
            <V2Segmented name="v2-tipo" labelledBy="v2p-2" value={c.tipo} onChange={c.setTipo} options={TIPOS_OBRA.map((t) => ({ id: t.id, label: t.nombre }))} />
          </Paso>

          <Paso n={3} titulo="Línea">
            <div role="radiogroup" aria-labelledby="v2p-3" className="grid gap-px bg-v2-brown sm:grid-cols-3">
              {LINEAS.map((l) => {
                const sel = c.linea === l.id;
                return (
                  <label
                    key={l.id}
                    className={`relative cursor-pointer p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-white ${
                      sel ? "bg-v2-brown text-white shadow-[inset_0_-3px_0_var(--v2-orange)]" : "bg-v2-brown-card text-white/80 hover:bg-v2-brown/60"
                    }`}
                  >
                    <input type="radio" name="v2-linea" value={l.id} checked={sel} onChange={() => c.setLinea(l.id)} className="sr-only" />
                    <span className="flex items-center justify-between">
                      <span className="text-lg font-extrabold tracking-[-0.02em]">{l.nombre}</span>
                      <span aria-hidden className={`size-4 border-2 ${sel ? "border-v2-orange bg-v2-orange" : "border-white/40"}`} />
                    </span>
                    <span className="mt-1 block text-[0.8rem] leading-snug text-white/60">{l.resumen}</span>
                  </label>
                );
              })}
            </div>
            <button type="button" onClick={() => setSpecs(true)} className="v2-link mt-4 text-v2-orange">
              Ver qué incluye cada línea <span aria-hidden className="v2-tri" />
            </button>
          </Paso>

          <Paso n={4} titulo="Moneda">
            <div className="flex flex-wrap items-center gap-4">
              <V2Segmented
                name="v2-moneda"
                labelledBy="v2p-4"
                className="w-40"
                value={moneda}
                onChange={c.setMoneda}
                options={[
                  { id: "CRC" as Moneda, label: "₡", sr: "Colones" },
                  { id: "USD" as Moneda, label: "$", sr: "Dólares" },
                ]}
              />
              {pricing && (
                <p className="text-sm text-white/60">
                  Tipo de cambio usado: <strong className="text-white">₡{pricing.tipoCambio.valor}</strong> ({pricing.tipoCambio.fecha})
                </p>
              )}
            </div>
          </Paso>
        </div>

        {/* Resultado */}
        <div className="relative bg-v2-brown-card p-5 sm:p-8 lg:p-10">
          <div className="lg:sticky lg:top-24">
            <p className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-v2-orange">
              Inversión estimada
              {demo && <span className="bg-[#c0392b] px-2 py-0.5 text-[0.65rem] tracking-wide text-white">Demo</span>}
            </p>
            {r ? (
              <>
                <p className="mt-1 text-sm text-white/60">
                  {r.input.m2} m² · {c.nombreTipo} · {c.nombreLinea}
                </p>
                <p className="mt-6 text-sm text-white/60">Desde</p>
                <p className="v2-h text-[2.2rem] sm:text-[2.7rem]">
                  <AnimatedNumber value={r.total.min} moneda={moneda} />
                </p>
                <p className="mt-2 text-sm text-white/60">Hasta</p>
                <p className="v2-h text-[2.2rem] text-v2-orange sm:text-[2.7rem]">
                  <AnimatedNumber value={r.total.max} moneda={moneda} />
                </p>
                <p className="mt-3 text-xs text-white/55">
                  IVA incluido · Construcción {dinero(r.precioM2.min, moneda)}–{dinero(r.precioM2.max, moneda)} por m²
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-expanded={desglose}
                    aria-controls="v2-desglose"
                    onClick={() => {
                      setDesglose((v) => !v);
                      if (!desglose) track("cotizador_desglose", { linea: c.linea, tipo: c.tipo });
                    }}
                    className="flex h-11 items-center justify-center gap-2 border border-white/30 text-sm font-bold hover:border-v2-orange hover:text-v2-orange"
                  >
                    {desglose ? "Ocultar desglose" : "Ver desglose"}
                    <ChevronDown className={`size-4 transition-transform ${desglose ? "rotate-180" : ""}`} />
                  </button>
                  <button type="button" onClick={() => setPagos(true)} className="flex h-11 items-center justify-center border border-white/30 text-sm font-bold hover:border-v2-orange hover:text-v2-orange">
                    Ver formas de pago
                  </button>
                </div>
              </>
            ) : pricing ? (
              <p className="mt-6 text-lg text-white/80">Ingrese entre {C.area.min} y {C.area.max} m² para ver su estimación.</p>
            ) : (
              <div className="mt-4">
                <p className="v2-h text-2xl">Estamos actualizando nuestros precios de referencia.</p>
                <p className="mt-2 text-sm text-white/70">Déjenos sus datos abajo o escríbanos y le enviamos una estimación personalizada.</p>
              </div>
            )}
            <div className="mt-7 flex flex-col gap-3 border-t border-v2-brown pt-6">
              <a href="#v2-lead" className="v2-btn justify-between">
                <span>Recibir esta cotización</span>
                <span aria-hidden className="v2-tri" />
              </a>
              <a href={waLink(c.waMsg)} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { ubicacion: "cotizador" })} className="flex h-11 items-center justify-center gap-2 text-sm font-bold text-white/85 hover:text-v2-orange">
                <WhatsAppIcon className="size-4 text-[#25d366]" /> Consultar por WhatsApp
              </a>
            </div>
            <p className="sr-only" aria-live="polite" aria-atomic="true">{c.anuncio}</p>
          </div>
        </div>
      </div>

      {r && (
        <div id="v2-desglose" className={`grid transition-[grid-template-rows] duration-700 ease-brand ${desglose ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden" inert={!desglose}>
            <div className="border-t-2 border-v2-orange bg-v2-ink p-5 sm:p-8">
              <H className="v2-h text-2xl">Desglose de la estimación</H>
              <p className="mt-1 text-sm text-white/60">{r.input.m2} m² · {c.nombreTipo} · Línea {c.nombreLinea} · {moneda === "CRC" ? "Colones" : "Dólares"}</p>
              <div className="mt-5"><Desglose r={r} /></div>
            </div>
          </div>
        </div>
      )}

      <ul className="mt-px grid gap-2 bg-v2-ink p-5 text-sm text-white/70 sm:grid-cols-2 sm:p-6">
        {C.avisos.map((a) => (
          <li key={a} className="flex gap-2"><Info className="mt-0.5 size-4 shrink-0 text-v2-orange" /> {a}</li>
        ))}
      </ul>

      <div id="v2-lead" className="anchor mt-10">
        <V2LeadForm
          cotizacion={{ m2: c.m2 ?? C.area.inicial, tipo: c.tipo, linea: c.linea, moneda }}
          resumen={r ? { min: r.total.min, max: r.total.max } : null}
          nombreTipo={c.nombreTipo}
          nombreLinea={c.nombreLinea}
          demo={demo}
          nivel={nivel}
        />
      </div>

      <V2Modal open={specs} onClose={() => setSpecs(false)} titulo="Qué incluye cada línea" wide>
        {!C.especificacionesConfirmadas && <p className="mb-4 bg-[#c0392b]/20 px-3 py-2 text-xs font-semibold text-[#ffb3a8]">Valores de ejemplo, pendientes de confirmar por ConstruSur.</p>}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <caption className="sr-only">Qué incluye cada línea, por partida</caption>
            <thead>
              <tr>
                <th scope="col" className="pb-3 text-left text-xs uppercase tracking-[0.12em] text-white/60">Partida</th>
                {LINEAS.map((l) => (
                  <th key={l.id} scope="col" className={`pb-3 pt-2 text-center font-extrabold ${l.id === c.linea ? "bg-v2-brown text-v2-orange" : ""}`}>{l.nombre}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {C.partidas.map((p) => (
                <tr key={p.id} className="border-t border-v2-brown">
                  <th scope="row" className="py-2.5 text-left font-medium">{p.label}</th>
                  {LINEAS.map((l) => (
                    <td key={l.id} className={`py-2.5 text-center ${l.id === c.linea ? "bg-v2-brown" : ""}`}>
                      {C.especificaciones[l.id][p.id] ? <span className="font-bold text-v2-orange" aria-label="Incluido">✓</span> : <span className="text-white/40" aria-label="No incluido">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </V2Modal>

      <V2Modal open={pagos} onClose={() => setPagos(false)} titulo="Formas de pago">
        <p className="text-sm text-white/70">Los pagos se realizan por hitos de avance verificables, definidos en el contrato.</p>
        {demo && <p className="mt-3 bg-[#c0392b]/20 px-3 py-2 text-xs font-semibold text-[#ffb3a8]">Porcentajes de demostración.</p>}
        <ol className="mt-5 space-y-px bg-v2-brown">
          {hitos.map((h, i) => (
            <li key={h.label} className="flex items-center gap-4 bg-v2-ink p-3 pr-4">
              <span className="text-sm font-extrabold text-v2-orange">0{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{h.label}</span>
                <span className="block text-xs text-white/60">{h.detalle}</span>
              </span>
              <span className="text-xl font-extrabold tabular-nums">{h.pct !== null ? `${h.pct} %` : "—"}</span>
            </li>
          ))}
        </ol>
      </V2Modal>
    </div>
  );
}
