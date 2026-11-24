"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

export function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div
            key={it.q}
            className={`rounded-[18px] border transition-colors duration-500 ${isOpen ? "border-transparent bg-ink text-cream on-dark" : "border-line bg-paper"}`}
            data-reveal
            style={{ "--i": i } as React.CSSProperties}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold sm:px-6 sm:py-5"
              >
                <span className="text-[0.98rem] sm:text-base">{it.q}</span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500 ease-brand ${isOpen ? "rotate-45 bg-terra text-ink" : "bg-terra-soft text-terra-ink"}`}
                >
                  <Plus className="size-4" strokeWidth={2.4} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-500 ease-brand ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="px-5 pb-5 text-[0.95rem] leading-relaxed text-cream/80 sm:px-6 sm:pb-6">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
