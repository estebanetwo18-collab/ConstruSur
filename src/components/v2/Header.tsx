"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { V2Logo } from "./Brand";
import { BtnDiag } from "./Buttons";
import { contacto } from "@/data/site";

const NAV = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Cotizador", href: "/#cotizador" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export function V2Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const cot = pathname === "/" ? "/#cotizador" : "/cotizador";
  const tel = `tel:+${contacto.whatsappNumber}`;

  return (
    <header className={`sticky top-0 z-50 bg-v2-black text-white transition-shadow duration-300 ${scrolled ? "shadow-[0_10px_30px_-12px_rgba(0,0,0,.7)]" : ""}`}>
      <div className={`mx-auto flex max-w-[1440px] items-center gap-6 px-5 transition-[height] duration-300 sm:px-8 lg:px-12 ${scrolled ? "h-16" : "h-[72px]"}`}>
        <Link href="/" aria-label="ConstruSur, inicio" onClick={() => setOpen(false)}>
          <V2Logo />
        </Link>

        <nav aria-label="Principal" className="ml-10 hidden flex-1 lg:block">
          <ul className="flex items-center gap-7">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link prefetch={false} href={l.href === "/#cotizador" ? cot : l.href} className="text-[0.92rem] font-medium text-white/90 transition-colors hover:text-v2-orange">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <a href={tel} className="hidden text-[0.92rem] font-semibold hover:text-v2-orange md:inline">
            Llamar ahora
          </a>
          <div className="hidden sm:block">
            <BtnDiag href={cot} size="sm">
              Cotice su proyecto
            </BtnDiag>
          </div>
          <div className="sm:hidden">
            <BtnDiag href={cot} size="sm">
              Cotizar
            </BtnDiag>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="v2-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="v2-menu"
        inert={!open}
        className={`fixed inset-x-0 bottom-0 top-[64px] bg-v2-black px-6 pb-24 pt-6 transition-[opacity,visibility,transform] duration-500 ease-brand lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Menú móvil">
          <ul>
            {NAV.map((l) => (
              <li key={l.href} className="border-b border-v2-brown">
                <Link prefetch={false} href={l.href === "/#cotizador" ? cot : l.href} onClick={() => setOpen(false)} className="v2-h flex items-center justify-between py-4 text-3xl">
                  {l.label}
                  <span aria-hidden className="v2-tri text-v2-orange" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 space-y-4">
          <BtnDiag href={cot}>Cotice su proyecto</BtnDiag>
          <p className="text-sm text-white/70">
            ¿Prefiere hablar? <a href={tel} className="font-bold text-white underline decoration-v2-orange underline-offset-4">Llamar ahora</a>
          </p>
        </div>
      </div>
    </header>
  );
}
