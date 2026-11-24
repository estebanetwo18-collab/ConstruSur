"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Modal accesible sobre <dialog> nativo: foco atrapado, Esc para cerrar,
 * clic fuera para cerrar y foco devuelto al disparador.
 */
export function Modal({
  open,
  onClose,
  titulo,
  children,
  className = "",
  bare = false,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  titulo?: string;
  children: React.ReactNode;
  className?: string;
  /** Sin caja blanca ni encabezado (lightbox). */
  bare?: boolean;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const titleId = labelledBy ?? (titulo ? "modal-titulo" : undefined);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={() => {
        document.documentElement.style.overflow = "";
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={
        bare
          ? `m-0 h-dvh w-screen bg-transparent p-0 ${className}`
          : `m-auto w-[calc(100%-2rem)] max-w-xl rounded-[24px] bg-paper p-0 text-ink shadow-2xl ${className}`
      }
    >
      {bare ? (
        children
      ) : (
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            {titulo && (
              <h2 id={titleId} className="font-display text-2xl font-medium sm:text-3xl">
                {titulo}
              </h2>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-cream transition-colors hover:bg-line"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      )}
    </dialog>
  );
}
