"use client";

import Link from "next/link";
import { track, type EventoCS } from "@/lib/analytics";

type Base = {
  href: string;
  children: React.ReactNode;
  className?: string;
  evento?: EventoCS;
  eventoParams?: Record<string, string>;
};

function Anchor({ href, className, children, evento, eventoParams }: Base) {
  const onClick = evento ? () => track(evento, eventoParams) : undefined;
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const ext = href.startsWith("http");
    return (
      <a href={href} className={className} onClick={onClick} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={href.includes("#") ? false : undefined} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Botón naranja con corte diagonal y flecha triangular. */
export function BtnDiag({ size = "md", outline = false, ...p }: Base & { size?: "md" | "sm"; outline?: boolean }) {
  return (
    <Anchor {...p} className={`v2-btn ${size === "sm" ? "v2-btn--sm" : ""} ${outline ? "v2-btn--outline" : ""} ${p.className ?? ""}`}>
      <span>{p.children}</span>
      <span aria-hidden className="v2-tri" />
    </Anchor>
  );
}

/** Link secundario con flecha triangular. */
export function ArrowLink(p: Base) {
  return (
    <Anchor {...p} className={`v2-link ${p.className ?? ""}`}>
      <span>{p.children}</span>
      <span aria-hidden className="v2-tri" />
    </Anchor>
  );
}
