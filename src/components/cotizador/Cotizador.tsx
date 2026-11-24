"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Info, Wallet, ListChecks } from "lucide-react";
import { cotizadorConfig as C, LINEAS, TIPOS_OBRA, type Linea, type Moneda, type TipoObra } from "@/data/cotizador.config";
import { cotizar, validarArea, type Pricing } from "@/lib/cotizar";
import { dinero, dineroCorto } from "@/lib/format";
import { track } from "@/lib/analytics";
import { waLink, mensajeCotizacion } from "@/lib/whatsapp";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { AnimatedNumber } from "./AnimatedNumber";
import { Desglose } from "./Desglose";
import { SpecsTable } from "./SpecsTable";
import { LeadForm } from "./LeadForm";

type Props = {
  pricing: Pricing | null;
  demo: boolean;
  hitos: { label: string; detalle: string; pct: number | null }[];
};

const LINEA_ICON: Record<Linea, string> = { essential: "I", prestige: "II", prime: "III" };

function Paso({ n, titulo, children, htmlFor }: { n: number; titulo: string; children: React.ReactNode; htmlFor?: string }) {
  const Label = htmlFor ? "label" : "p";
  return (
    <div className="border-t border-line pt-6 first:border-t-0 first:pt-0">
      <Label {...(htmlFor ? { htmlFor } : {})} className="flex items-center gap-3 text-[0.95rem] font-semibold" id={`paso-${n}`}>
        <span className="grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-cream">{n}</span>
        {titulo}
      </Label>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Cotizador({ pricing, demo, hitos }: Props) {
  const [m2Text, setM2Text] = useState(String(C.area.inicial));
  const [tipo, setTipo] = useState<TipoObra>("nueva");
  const [linea, setLinea] = useState<Linea>("prestige");
  const [moneda, setMoneda] = useState<Moneda>("CRC");
  const [specsDe, setSpecsDe] = useState<Linea | null>(null);
  const [desglose, setDesglose] = useState(false);
  const [pagos, setPagos] = useState(false);
  const [anuncio, setAnuncio] = useState("");
  const iniciado = useRef(false);
  const leadRef = useRef<HTMLDivElement>(null);

  // Preselección por URL (?linea=prime&tipo=remodelacion&m2=200)
  useEffect(() => {
    // La URL es un sistema externo: se lee una sola vez al montar.
    /* eslint-disable react-hooks/set-state-in-effect */
    const q = new URLSearchParams(window.location.search);
    const l = q.get("linea");
    if (l === "essential" || l === "prestige" || l === "prime") setLinea(l);
    const t = q.get("tipo");
    if (t === "nueva" || t === "remodelacion") setTipo(t);
    const m = q.get("m2");
    if (m && validarArea(m, C.area).ok) setM2Text(m);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const area = validarArea(m2Text, C.area);
  const m2 = area.ok ? area.m2 : null;
  const resultado = useMemo(
    () => (pricing && m2 !== null ? cotizar({ m2, tipo, linea, moneda }, pricing) : null),
    [pricing, m2, tipo, linea, moneda],
  );

  const interactuar = () => {
    if (!iniciado.current) {
      iniciado.current = true;
      track("cotizador_inicio");
    }
  };

  // Anuncio accesible + evento de resultado, cuando el usuario deja de mover controles.
  useEffect(() => {
    if (!resultado) return;
    const t = setTimeout(() => {
      setAnuncio(
        `Inversión estimada con IVA: de ${dineroCorto(resultado.total.min, moneda)} a ${dineroCorto(resultado.total.max, moneda)}.`,
      );
      if (iniciado.current) {
        track("cotizador_resultado", { m2: resultado.input.m2, tipo, linea, moneda, min: Math.round(resultado.total.min), max: Math.round(resultado.total.max) });
      }
    }, 900);
    return () => clearTimeout(t);
  }, [resultado, tipo, linea, moneda]);

  const pctSlider = m2 !== null ? ((m2 - C.area.min) / (C.area.max - C.area.min)) * 100 : 0;
  const nombreTipo = TIPOS_OBRA.find((t) => t.id === tipo)!.nombre;
  const nombreLinea = LINEAS.find((l) => l.id === linea)!.nombre;

  const waMsg = mensajeCotizacion({
    m2: m2 ?? C.area.inicial,
    tipoObra: nombreTipo,
    linea: nombreLinea,
    moneda,
    min: resultado?.total.min,
    max: resultado?.total.max,
  });

  const segBase = "relative flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra-ink";

  return (
    <div onPointerDown={interactuar} onKeyDown={interactuar}>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Controles ---------- */}
        <div className="card space-y-6 p-5 sm:p-8 lg:col-span-7">
          <Paso n={1} titulo="Metros cuadrados de construcción" htmlFor="cot-m2">
            <div className="flex items-center gap-4">
              <div className="relative w-36 shrink-0">
                <input
                  id="cot-m2"
                  type="number"
                  inputMode="numeric"
                  min={C.area.min}
                  max={C.area.max}
                  step={C.area.paso}
                  value={m2Text}
                  onChange={(e) => setM2Text(e.target.value)}
                  onBlur={() => m2 !== null && setM2Text(String(m2))}
                  aria-invalid={!area.ok}
                  aria-describedby="cot-m2-ayuda"
                  className="h-14 w-full rounded-xl border border-line bg-cream/60 pl-4 pr-12 font-display text-2xl font-medium tabular-nums focus:border-ink focus:bg-paper focus:outline-none aria-[invalid=true]:border-[#b3261e]"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">m²</span>
              </div>
              <input
                type="range"
                aria-label="Metros cuadrados (control deslizante)"
                min={C.area.min}
                max={C.area.max}
                step={C.area.paso}
                value={m2 ?? C.area.min}
                onChange={(e) => setM2Text(e.target.value)}
                className="range"
                style={{ "--pct": `${pctSlider}%` } as React.CSSProperties}
              />
            </div>
            <p id="cot-m2-ayuda" className={`mt-2 text-sm ${area.ok ? "text-muted" : "font-medium text-[#b3261e]"}`} role={area.ok ? undefined : "alert"}>
              {area.ok ? `Entre ${C.area.min} y ${C.area.max} m².` : area.error}
            </p>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Tamaños frecuentes">
              {[80, 150, 250, 400].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setM2Text(String(v))}
                  aria-pressed={m2 === v}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${m2 === v ? "border-ink bg-ink text-cream" : "border-line hover:border-ink/40"}`}
                >
                  {v} m²
                </button>
              ))}
            </div>
          </Paso>

          <Paso n={2} titulo="Tipo de obra">
            <div role="radiogroup" aria-labelledby="paso-2" className="flex gap-1 rounded-full bg-cream p-1">
              {TIPOS_OBRA.map((t) => (
                <label key={t.id} className={`${segBase} ${tipo === t.id ? "bg-ink text-cream shadow" : "text-ink hover:bg-ink/5"}`}>
                  <input type="radio" name="cot-tipo" value={t.id} checked={tipo === t.id} onChange={() => setTipo(t.id)} className="sr-only" />
                  {t.nombre}
                </label>
              ))}
            </div>
          </Paso>

          <Paso n={3} titulo="Línea">
            <div role="radiogroup" aria-labelledby="paso-3" className="grid gap-3 sm:grid-cols-3">
              {LINEAS.map((l) => {
                const sel = linea === l.id;
                return (
                  <div
                    key={l.id}
                    className={`relative flex flex-col rounded-[16px] border-2 p-4 transition-all duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terra-ink ${
                      sel ? "border-terra bg-terra-soft" : "border-line hover:border-ink/30"
                    }`}
                  >
                    <label className="cursor-pointer after:absolute after:inset-0 after:content-['']">
                      <input type="radio" name="cot-linea" value={l.id} checked={sel} onChange={() => setLinea(l.id)} className="sr-only" />
                      <span className="flex items-center justify-between">
                        <span className="font-display text-xl font-medium">{l.nombre}</span>
                        <span
                          aria-hidden
                          className={`grid size-6 place-items-center rounded-full border-2 transition-colors ${sel ? "border-terra bg-terra" : "border-line"}`}
                        >
                          {sel && <span className="size-2 rounded-full bg-ink" />}
                        </span>
                      </span>
                      <span className="mt-1 block text-[0.8rem] leading-snug text-muted">{l.resumen}</span>
                      <span aria-hidden className="mt-2 block font-display text-xs tracking-widest text-terra-ink">
                        {LINEA_ICON[l.id]}
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setSpecsDe(l.id)}
                      className="relative z-10 mt-3 inline-flex items-center gap-1 self-start text-[0.8rem] font-semibold underline decoration-terra decoration-2 underline-offset-4 hover:text-terra-ink"
                    >
                      <ListChecks className="size-3.5" /> Ver qué incluye
                      <span className="sr-only"> la línea {l.nombre}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </Paso>

          <Paso n={4} titulo="Moneda">
            <div className="flex flex-wrap items-center gap-4">
              <div role="radiogroup" aria-labelledby="paso-4" className="flex w-44 gap-1 rounded-full bg-cream p-1">
                {(["CRC", "USD"] as Moneda[]).map((m) => (
                  <label key={m} className={`${segBase} ${moneda === m ? "bg-ink text-cream shadow" : "hover:bg-ink/5"}`}>
                    <input type="radio" name="cot-moneda" value={m} checked={moneda === m} onChange={() => setMoneda(m)} className="sr-only" />
                    <span aria-hidden>{m === "CRC" ? "₡" : "$"}</span>
                    <span className="sr-only">{m === "CRC" ? "Colones" : "Dólares"}</span>
                  </label>
                ))}
              </div>
              {pricing && (
                <p className="text-sm text-muted">
                  Tipo de cambio usado: <strong className="font-semibold text-ink">₡{pricing.tipoCambio.valor}</strong> ({pricing.tipoCambio.fecha})
                </p>
              )}
            </div>
          </Paso>
        </div>

        {/* ---------- Resultado ---------- */}
        <div className="lg:col-span-5">
          <div className="on-dark sticky top-24 overflow-hidden rounded-[24px] bg-ink p-6 text-cream shadow-[0_30px_60px_-30px_rgba(27,24,18,.7)] sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-terra/25 blur-3xl" />
            <p className="relative flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-terra">
              Inversión estimada
              {demo && <span className="rounded-full bg-[#c0392b] px-2 py-0.5 text-[0.65rem] tracking-wide text-white">Demo</span>}
            </p>

            {resultado ? (
              <>
                <p className="relative mt-1 text-sm text-cream/75">
                  {resultado.input.m2} m² · {nombreTipo} · {nombreLinea}
                </p>
                <div className="relative mt-5 font-display font-medium leading-[1.05]">
                  <p className="text-sm font-sans font-medium text-cream/70">Desde</p>
                  <p className="text-[2.1rem] sm:text-[2.6rem]">
                    <AnimatedNumber value={resultado.total.min} moneda={moneda} />
                  </p>
                  <p className="mt-2 text-sm font-sans font-medium text-cream/70">Hasta</p>
                  <p className="text-[2.1rem] text-terra sm:text-[2.6rem]">
                    <AnimatedNumber value={resultado.total.max} moneda={moneda} />
                  </p>
                </div>
                <p className="relative mt-3 text-xs text-cream/70">IVA incluido · Construcción {dinero(resultado.precioM2.min, moneda)}–{dinero(resultado.precioM2.max, moneda)} por m²</p>

                <div className="relative mt-6 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    aria-expanded={desglose}
                    aria-controls="cot-desglose"
                    onClick={() => {
                      setDesglose((v) => !v);
                      if (!desglose) track("cotizador_desglose", { linea, tipo });
                    }}
                    className="flex h-11 items-center justify-center gap-2 rounded-full bg-cream/10 text-sm font-semibold transition-colors hover:bg-cream/20"
                  >
                    {desglose ? "Ocultar desglose" : "Ver desglose"}
                    <ChevronDown className={`size-4 transition-transform duration-500 ease-brand ${desglose ? "rotate-180" : ""}`} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPagos(true)}
                    className="flex h-11 items-center justify-center gap-2 rounded-full bg-cream/10 text-sm font-semibold transition-colors hover:bg-cream/20"
                  >
                    <Wallet className="size-4" /> Ver formas de pago
                  </button>
                </div>
              </>
            ) : pricing ? (
              <p className="relative mt-6 text-lg text-cream/80">Ingrese entre {C.area.min} y {C.area.max} m² para ver su estimación.</p>
            ) : (
              <div className="relative mt-4">
                <p className="font-display text-2xl font-medium">Estamos actualizando nuestros precios de referencia.</p>
                <p className="mt-2 text-sm text-cream/80">Déjenos sus datos abajo o escríbanos y le enviamos una estimación personalizada hoy mismo.</p>
              </div>
            )}

            <div className="relative mt-6 flex flex-col gap-2 border-t border-cream/15 pt-6">
              <Button
                href="#cot-lead"
                className="justify-between"
                external
              >
                Recibir esta cotización
              </Button>
              <a
                href={waLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { ubicacion: "cotizador" })}
                className="flex h-11 items-center justify-center gap-2 text-sm font-semibold text-cream/85 hover:text-terra"
              >
                <WhatsAppIcon className="size-4 text-[#25d366]" /> Consultar por WhatsApp
              </a>
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {anuncio}
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Desglose ---------- */}
      {resultado && (
        <div id="cot-desglose" className={`grid transition-[grid-template-rows] duration-700 ease-brand ${desglose ? "mt-6 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden" inert={!desglose}>
            <div className="card p-5 sm:p-8">
              <h3 className="font-display text-2xl font-medium">Desglose de la estimación</h3>
              <p className="mt-1 text-sm text-muted">
                {resultado.input.m2} m² · {nombreTipo} · Línea {nombreLinea} · {moneda === "CRC" ? "Colones" : "Dólares"}
              </p>
              <div className="mt-5">
                <Desglose r={resultado} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Avisos ---------- */}
      <ul className="mt-6 grid gap-2 rounded-[18px] border border-line bg-paper/60 p-5 text-sm text-ink-soft sm:grid-cols-2 sm:p-6">
        {C.avisos.map((a) => (
          <li key={a} className="flex gap-2">
            <Info className="mt-0.5 size-4 shrink-0 text-terra-ink" /> {a}
          </li>
        ))}
      </ul>

      {/* ---------- Lead ---------- */}
      <div id="cot-lead" ref={leadRef} className="anchor mt-10">
        <LeadForm
          cotizacion={{ m2: m2 ?? C.area.inicial, tipo, linea, moneda }}
          resumen={resultado ? { min: resultado.total.min, max: resultado.total.max } : null}
          nombreTipo={nombreTipo}
          nombreLinea={nombreLinea}
          demo={demo}
        />
      </div>

      {/* ---------- Modales ---------- */}
      <Modal open={specsDe !== null} onClose={() => setSpecsDe(null)} titulo="Qué incluye cada línea" className="max-w-2xl">
        <SpecsTable destacada={specsDe ?? linea} />
      </Modal>

      <Modal open={pagos} onClose={() => setPagos(false)} titulo="Formas de pago">
        <p className="text-sm text-muted">Los pagos se realizan por hitos de avance verificables, definidos en el contrato.</p>
        {demo && <p className="mt-3 rounded-xl bg-[#fdecea] px-3 py-2 text-xs font-semibold text-[#7a1f16]">Solo desarrollo · Porcentajes de demostración.</p>}
        <ol className="mt-5 space-y-2">
          {hitos.map((h, i) => (
            <li key={h.label} className="flex items-center gap-4 rounded-2xl bg-cream p-3 pr-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-cream">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{h.label}</span>
                <span className="block text-xs text-muted">{h.detalle}</span>
              </span>
              <span className="font-display text-xl font-medium tabular-nums">{h.pct !== null ? `${h.pct} %` : "—"}</span>
            </li>
          ))}
        </ol>
        {hitos.some((h) => h.pct === null) && <p className="mt-4 text-xs text-muted">Los porcentajes se definen en su contrato.</p>}
      </Modal>
    </div>
  );
}
