import { resolverPricing } from "@/lib/pricing";

/** Banner visible SOLO en desarrollo mientras queden TODO_CONSTRUSUR en el cotizador. */
export function DevBanner() {
  if (process.env.NODE_ENV === "production") return null;
  const { pendientes, demo } = resolverPricing();
  if (!pendientes.length) return null;
  return (
    <div role="note" className="rounded-2xl border-2 border-dashed border-[#c0392b] bg-[#fdecea] p-4 text-sm text-[#7a1f16]">
      <p className="font-bold">
        Solo desarrollo · {demo ? "Precios de DEMOSTRACIÓN (no son de ConstruSur)" : "Datos pendientes"}
      </p>
      <p className="mt-1">
        Pendiente en <code className="font-mono">src/data/cotizador.config.ts</code>: {pendientes.join(" · ")}. En producción,
        mientras falten precios, el cotizador no muestra montos.
      </p>
    </div>
  );
}
