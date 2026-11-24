"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { track, type EventoCS } from "@/lib/analytics";

type Variant = "terra" | "dark" | "light" | "outline" | "outline-light";

const styles: Record<Variant, { btn: string; circle: string }> = {
  terra: { btn: "bg-terra text-ink hover:bg-[#e89f6f]", circle: "bg-ink text-terra" },
  dark: { btn: "bg-ink text-cream hover:bg-[#2b2620]", circle: "bg-terra text-ink" },
  light: { btn: "bg-paper text-ink hover:bg-cream", circle: "bg-ink text-terra" },
  outline: { btn: "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03]", circle: "bg-ink text-cream" },
  "outline-light": { btn: "border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/5", circle: "bg-cream text-ink" },
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: React.ReactNode;
  evento?: EventoCS;
  eventoParams?: Record<string, string>;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

/** Botón pill con círculo de flecha (patrón de todo el sitio). */
export function Button({
  href,
  children,
  variant = "terra",
  size = "md",
  icon,
  evento,
  eventoParams,
  className = "",
  external,
  ariaLabel,
}: Props) {
  const s = styles[variant];
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const pad = size === "md" ? "py-1.5 pl-6 pr-1.5 text-[0.95rem]" : "py-1 pl-4 pr-1 text-sm";
  const circle = size === "md" ? "size-10" : "size-8";
  const cls = `btn group inline-flex items-center gap-3 rounded-full font-semibold transition-colors duration-300 ${pad} ${s.btn} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span aria-hidden className={`btn-arrow-circle grid shrink-0 place-items-center rounded-full ${circle} ${s.circle}`}>
        {icon ?? <ArrowUpRight className="size-[18px]" strokeWidth={2.2} />}
      </span>
    </>
  );
  const onClick = evento ? () => track(evento, eventoParams) : undefined;

  if (isExternal) {
    return (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={href.includes("#") || href.includes("?") ? false : undefined} className={cls} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}

/** Botón circular terracota solo con ícono. */
export function CircleButton({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`btn grid size-12 shrink-0 place-items-center rounded-full bg-terra text-ink shadow-[0_8px_20px_-6px_rgba(224,146,95,.7)] transition-transform duration-500 ease-brand hover:scale-105 ${className}`}
    >
      <span className="btn-arrow-circle grid place-items-center">{children ?? <ArrowUpRight className="size-5" strokeWidth={2.2} />}</span>
    </button>
  );
}
