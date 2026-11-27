import Image from "next/image";
import Link from "next/link";
import { contacto, redes, site } from "@/data/site";
import { v2Hero } from "@/data/v2";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon, redIcon } from "@/components/ui/BrandIcons";
import { V2Logo } from "./Brand";

const LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Cobertura", href: "/#cobertura" },
  { label: "Cotizador", href: "/cotizador" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export function V2Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-v2-brown bg-v2-black">
      <Image src="/img/obra/aerea.webp" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-15 grayscale" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--v2-black)_0%,rgba(18,16,16,.85)_60%,rgba(74,52,38,.6)_100%)]" />
      <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-16 sm:px-8 md:pb-10 lg:px-12 lg:pt-20">
        <div className="grid gap-10 border-b border-v2-brown pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <V2Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">{site.description}</p>
            <div className="mt-6 flex gap-2">
              <a href={waLink(MENSAJE_GENERAL)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center border border-v2-brown-line transition hover:border-v2-orange hover:text-v2-orange">
                <WhatsAppIcon className="size-5" />
              </a>
              {redes
                .filter((r) => r.url)
                .map((r) => {
                  const Icon = redIcon[r.id];
                  return (
                    <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.label} className="grid size-11 place-items-center border border-v2-brown-line transition hover:border-v2-orange hover:text-v2-orange">
                      <Icon className="size-5" />
                    </a>
                  );
                })}
            </div>
          </div>
          <nav aria-label="Sitio">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-v2-orange">Sitio</h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link prefetch={false} href={l.href} className="inline-block py-1.5 text-white/75 hover:text-v2-orange">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-v2-orange">Contacto</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/75">
              <li><a href={`tel:+${contacto.whatsappNumber}`} className="inline-block py-1 hover:text-v2-orange">{contacto.whatsappDisplay}</a></li>
              <li><a href={`mailto:${contacto.email}`} className="inline-block break-all py-1 hover:text-v2-orange">{contacto.email}</a></li>
              <li className="py-1">{contacto.zona}</li>
            </ul>
          </div>
        </div>

        <p aria-hidden className="v2-h mt-12 text-[2.4rem] text-white/[0.12] sm:text-6xl lg:text-[5.5rem]">
          {v2Hero.lineas[0]} <span className="block">{v2Hero.lineas[1]}</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
          <p>© 2026 {site.legalName} — Costa Rica</p>
          <p>Construcción residencial · Gran Área Metropolitana</p>
        </div>
      </div>
    </footer>
  );
}
