"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { track } from "@/lib/analytics";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";

/** Barra fija inferior en móvil: Cotizar + WhatsApp. */
export function V2MobileBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-v2-brown bg-v2-black pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <Link prefetch={false} href={pathname === "/" ? "/#cotizador" : "/cotizador"} className="flex h-[60px] items-center justify-center gap-2 bg-v2-orange font-bold text-v2-black">
        Cotizar <span aria-hidden className="v2-tri" />
      </Link>
      <a
        href={waLink(MENSAJE_GENERAL)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { ubicacion: "barra_movil" })}
        className="flex h-[60px] items-center justify-center gap-2 font-bold text-white"
      >
        <WhatsAppIcon className="size-5 text-[#25d366]" /> WhatsApp
      </a>
    </nav>
  );
}
