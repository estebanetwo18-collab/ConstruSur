/** sessionStorage seguro (modo privado, cookies bloqueadas, etc.). */

const KEY_UTM = "cs_utm";
const KEY_LEAD = "cs_ultimo_lead";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];

export function leer<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function guardar(key: string, value: unknown) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* sin almacenamiento: el flujo sigue funcionando */
  }
}

/** Guarda los UTM de la primera visita de la sesión (primer toque). */
export function capturarUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v) utm[k] = v.slice(0, 200);
    }
    if (Object.keys(utm).length && !leer(KEY_UTM)) {
      guardar(KEY_UTM, { ...utm, landing: window.location.pathname });
    }
  } catch {
    /* ignorar */
  }
}

export const leerUtm = () => leer<Record<string, string>>(KEY_UTM) ?? {};

export type UltimoLead = {
  nombre: string;
  tipo: "cotizacion" | "contacto";
  correoEnviado: boolean;
  resumen?: {
    m2: number;
    tipoObra: string;
    linea: string;
    moneda: "CRC" | "USD";
    min: number;
    max: number;
    demo: boolean;
  };
};

export const guardarUltimoLead = (l: UltimoLead) => guardar(KEY_LEAD, l);
export const leerUltimoLead = () => leer<UltimoLead>(KEY_LEAD);

/** Valor crudo (string) para useSyncExternalStore; null si no hay o no hay acceso. */
export function leerUltimoLeadRaw(): string | null {
  try {
    return window.sessionStorage.getItem(KEY_LEAD);
  } catch {
    return null;
  }
}
