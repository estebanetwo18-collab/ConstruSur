import { Check, Minus } from "lucide-react";
import { cotizadorConfig, LINEAS, type Linea } from "@/data/cotizador.config";

/** Tabla por partida (✓ / —) de las tres líneas, resaltando la elegida. */
export function SpecsTable({ destacada }: { destacada: Linea }) {
  const { partidas, especificaciones, especificacionesConfirmadas } = cotizadorConfig;
  return (
    <div>
      {!especificacionesConfirmadas && process.env.NODE_ENV !== "production" && (
        <p className="mb-4 rounded-xl bg-[#fdecea] px-3 py-2 text-xs font-semibold text-[#7a1f16]">
          Solo desarrollo · Valores de ejemplo, pendientes de confirmar por ConstruSur.
        </p>
      )}
      <div className="-mx-2 overflow-x-auto">
        <table className="w-full min-w-[420px] border-separate border-spacing-x-2 text-sm">
          <caption className="sr-only">Qué incluye cada línea, por partida</caption>
          <thead>
            <tr>
              <th scope="col" className="pb-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                Partida
              </th>
              {LINEAS.map((l) => (
                <th
                  key={l.id}
                  scope="col"
                  className={`rounded-t-xl px-2 pb-3 pt-2 text-center font-display text-base font-medium ${l.id === destacada ? "bg-ink text-cream" : ""}`}
                >
                  {l.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {partidas.map((p, i) => (
              <tr key={p.id}>
                <th scope="row" className="border-t border-line py-2.5 pr-2 text-left font-medium">
                  {p.label}
                </th>
                {LINEAS.map((l) => {
                  const ok = especificaciones[l.id][p.id];
                  const last = i === partidas.length - 1;
                  return (
                    <td
                      key={l.id}
                      className={`border-t py-2.5 text-center ${l.id === destacada ? `border-cream/10 bg-ink text-cream ${last ? "rounded-b-xl" : ""}` : "border-line"}`}
                    >
                      {ok ? (
                        <Check aria-label="Incluido" className={`mx-auto size-4 ${l.id === destacada ? "text-terra" : "text-terra-ink"}`} strokeWidth={2.6} />
                      ) : (
                        <Minus aria-label="No incluido" className="mx-auto size-4 opacity-40" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">El detalle de materiales y acabados se define en el anteproyecto.</p>
    </div>
  );
}
