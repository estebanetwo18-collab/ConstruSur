"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cotizadorConfig as C, LINEAS, TIPOS_OBRA, type Linea, type Moneda, type TipoObra } from "@/data/cotizador.config";
import { cotizar, validarArea, type Pricing } from "./cotizar";
import { dineroCorto } from "./format";
import { track } from "./analytics";
import { mensajeCotizacion } from "./whatsapp";

/**
 * Estado y lógica del cotizador (sin UI). Lo usa la versión B; hace lo mismo
 * que el componente de la versión actual: cálculo en vivo, preselección por URL,
 * anuncio accesible y eventos cotizador_inicio / cotizador_resultado.
 */
export function useCotizador(pricing: Pricing | null) {
  const [m2Text, setM2Text] = useState(String(C.area.inicial));
  const [tipo, setTipo] = useState<TipoObra>("nueva");
  const [linea, setLinea] = useState<Linea>("prestige");
  const [moneda, setMoneda] = useState<Moneda>("CRC");
  const [anuncio, setAnuncio] = useState("");
  const iniciado = useRef(false);

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

  useEffect(() => {
    if (!resultado) return;
    const t = setTimeout(() => {
      setAnuncio(`Inversión estimada con IVA: de ${dineroCorto(resultado.total.min, moneda)} a ${dineroCorto(resultado.total.max, moneda)}.`);
      if (iniciado.current) {
        track("cotizador_resultado", { m2: resultado.input.m2, tipo, linea, moneda, min: Math.round(resultado.total.min), max: Math.round(resultado.total.max) });
      }
    }, 900);
    return () => clearTimeout(t);
  }, [resultado, tipo, linea, moneda]);

  const nombreTipo = TIPOS_OBRA.find((t) => t.id === tipo)!.nombre;
  const nombreLinea = LINEAS.find((l) => l.id === linea)!.nombre;
  const waMsg = mensajeCotizacion({ m2: m2 ?? C.area.inicial, tipoObra: nombreTipo, linea: nombreLinea, moneda, min: resultado?.total.min, max: resultado?.total.max });

  return {
    m2Text, setM2Text, tipo, setTipo, linea, setLinea, moneda, setMoneda,
    area, m2, resultado, anuncio, interactuar, nombreTipo, nombreLinea, waMsg,
  };
}
