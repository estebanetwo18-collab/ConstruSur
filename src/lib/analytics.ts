/**
 * Eventos de medición. Siempre se empujan a window.dataLayer (GTM/GA4);
 * si GA4 (gtag) o Meta Pixel (fbq) están cargados, también se envían ahí.
 */
export type EventoCS =
  | "cotizador_inicio"
  | "cotizador_resultado"
  | "cotizador_desglose"
  | "lead_enviado"
  | "whatsapp_click"
  | "calendly_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(evento: EventoCS, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: evento, ...params });
    window.gtag?.("event", evento, params);
    if (window.fbq) {
      if (evento === "lead_enviado") window.fbq("track", "Lead", params);
      else if (evento === "whatsapp_click" || evento === "calendly_click") window.fbq("track", "Contact", params);
      else window.fbq("trackCustom", evento, params);
    }
  } catch {
    /* la medición nunca debe romper la página */
  }
}
