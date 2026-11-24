"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { contacto, nav } from "@/data/site";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sobre el hero (home, sin scroll) el header es transparente con texto claro.
  const overHero = isHome && !scrolled && !open;
  const href = (h: string) => (h === "/#cotizador" && !isHome ? "/cotizador" : h);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full transition-all duration-500 ease-brand ${
          overHero
            ? "on-dark h-16 px-3 text-cream sm:h-[72px] sm:px-5"
            : "h-14 bg-cream/85 px-3 text-ink shadow-[0_8px_30px_-12px_rgba(27,24,18,.25)] ring-1 ring-ink/5 backdrop-blur-xl sm:h-16 sm:px-4"
        }`}
      >
        <Link href="/" aria-label="ConstruSur, inicio" className="rounded-full px-1" onClick={() => setOpen(false)}>
          <Logo dark={overHero} className={scrolled ? "text-[1.3rem]" : ""} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={href(l.href)}
                  className={`rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${overHero ? "hover:bg-cream/10" : "hover:bg-ink/5"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={href("/#cotizador")} size="sm">
              Cotice su proyecto
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`grid size-11 place-items-center rounded-full lg:hidden ${overHero ? "bg-cream/10" : "bg-ink text-cream"}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        className={`on-dark fixed inset-0 -z-10 flex flex-col bg-ink px-6 pb-10 pt-28 text-cream transition-[opacity,visibility] duration-500 ease-brand lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!open}
      >
        <nav aria-label="Menú móvil" className="flex-1">
          <ul className="space-y-1">
            {nav.map((l, i) => (
              <li
                key={l.href}
                className="transition-all duration-700 ease-brand"
                style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms", opacity: open ? 1 : 0, transform: open ? "none" : "translateY(20px)" }}
              >
                <Link
                  href={href(l.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-cream/10 py-4 font-display text-4xl font-medium"
                >
                  <span className="font-sans text-xs font-semibold text-terra">0{i + 1}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-3">
          <Button href={href("/#cotizador")} className="w-full justify-between">
            Cotice su proyecto
          </Button>
          <a
            href={waLink(MENSAJE_GENERAL)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { ubicacion: "menu_movil" })}
            className="flex items-center gap-3 text-cream/80"
          >
            <WhatsAppIcon className="size-5 text-[#25d366]" /> {contacto.whatsappDisplay}
          </a>
        </div>
      </div>
    </header>
  );
}
