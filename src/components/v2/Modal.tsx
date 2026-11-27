"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/** Modal sobre <dialog> nativo (foco atrapado, Esc, clic fuera) con estilo de la versión B. */
export function V2Modal({ open, onClose, titulo, children, wide = false }: { open: boolean; onClose: () => void; titulo: string; children: React.ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby="v2-modal-titulo"
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto w-[calc(100%-2rem)] ${wide ? "max-w-2xl" : "max-w-xl"} border-t-4 border-v2-orange bg-v2-black p-0 text-white shadow-2xl`}
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="v2-modal-titulo" className="v2-h text-2xl sm:text-3xl">
            {titulo}
          </h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid size-10 shrink-0 place-items-center border border-white/30 hover:border-v2-orange hover:text-v2-orange">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  );
}
