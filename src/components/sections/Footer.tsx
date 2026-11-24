import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, redIcon } from "@/components/ui/BrandIcons";
import { contacto, nav, redes, site } from "@/data/site";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";

export function Footer() {
  const anio = 2026;
  const links = [
    { titulo: "Sitio", items: nav },
    {
      titulo: "Líneas",
      items: [
        { label: "Essential", href: "/cotizador?linea=essential" },
        { label: "Prestige", href: "/cotizador?linea=prestige" },
        { label: "Prime", href: "/cotizador?linea=prime" },
        { label: "Preguntas frecuentes", href: "/#faq" },
      ],
    },
  ];
  return (
    <footer className="on-dark relative overflow-hidden bg-ink pb-28 pt-16 text-cream sm:mx-3 sm:mb-3 sm:rounded-[48px] md:pb-10 lg:pt-24">
      <div className="relative z-10 mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-cream/15 pb-12">
          <h2 className="font-display max-w-2xl text-4xl font-medium leading-[1.05] sm:text-5xl">
            ¿Listo para empezar? <span className="kw">Cotice hoy.</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button href="/#cotizador">Cotice su proyecto</Button>
            <Button href={waLink(MENSAJE_GENERAL)} variant="outline-light" evento="whatsapp_click" eventoParams={{ ubicacion: "footer" }} icon={<WhatsAppIcon className="size-[18px]" />}>
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo dark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">{site.description}</p>
            <div className="mt-6 flex gap-2">
              <a href={waLink(MENSAJE_GENERAL)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full border border-cream/20 transition hover:border-terra hover:bg-terra hover:text-ink">
                <WhatsAppIcon className="size-5" />
              </a>
              {redes
                .filter((r) => r.url)
                .map((r) => {
                  const Icon = redIcon[r.id];
                  return (
                    <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" aria-label={r.label} className="grid size-11 place-items-center rounded-full border border-cream/20 transition hover:border-terra hover:bg-terra hover:text-ink">
                      <Icon className="size-5" />
                    </a>
                  );
                })}
            </div>
          </div>
          {links.map((g) => (
            <nav key={g.titulo} aria-label={g.titulo} className="lg:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-terra">{g.titulo}</h3>
              <ul className="mt-3 space-y-1 text-sm">
                {g.items.map((l) => (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href} className="inline-block py-1 text-cream/80 transition-colors hover:text-terra">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-terra">Contacto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
              <li>
                <a href={waLink(MENSAJE_GENERAL)} target="_blank" rel="noopener noreferrer" className="hover:text-terra">
                  {contacto.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacto.email}`} className="break-all hover:text-terra">
                  {contacto.email}
                </a>
              </li>
              <li>{contacto.zona}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/65">
          <p>
            © {anio} {site.legalName} — Costa Rica
          </p>
          <p>Construcción residencial · Gran Área Metropolitana</p>
        </div>
      </div>
      <svg aria-hidden viewBox="0 0 1000 200" className="pointer-events-none absolute -bottom-[3vw] left-1/2 w-[110%] -translate-x-1/2" preserveAspectRatio="xMidYMax meet">
        <text x="500" y="185" textAnchor="middle" className="watermark" fontSize="236" fill="rgba(244,240,232,.045)">
          ConstruSur
        </text>
      </svg>
    </footer>
  );
}
