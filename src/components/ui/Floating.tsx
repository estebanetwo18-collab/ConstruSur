"use client";

import Link from "next/link";
import { Calculator } from "lucide-react";
import { WhatsAppIcon } from "./BrandIcons";
import { track } from "@/lib/analytics";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";

/** Botón flotante de WhatsApp (desktop) + barra fija inferior (móvil). */
export function Floating() {
  const wa = waLink(MENSAJE_GENERAL);
  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { ubicacion: "flotante" })}
        aria-label="Escríbanos por WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_30px_-8px_rgba(0,0,0,.45)] transition-transform duration-500 ease-brand hover:scale-110 md:grid"
      >
        <WhatsAppIcon className="size-7" />
      </a>

      <nav
        aria-label="Acciones rápidas"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <Link prefetch={false}
            href="/#cotizador"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-terra font-semibold text-ink"
          >
            <Calculator className="size-[18px]" /> Cotizar
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { ubicacion: "barra_movil" })}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-semibold text-cream"
          >
            <WhatsAppIcon className="size-[18px] text-[#25d366]" /> WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
