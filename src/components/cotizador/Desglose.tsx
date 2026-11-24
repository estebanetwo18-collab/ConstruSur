import type { Resultado, Rango } from "@/lib/cotizar";
import { dinero, pct } from "@/lib/format";

function Montos({ r, m, strong }: { r: Rango; m: Resultado["moneda"]; strong?: boolean }) {
  return (
    <>
      <td className={`py-3 pl-3 text-right tabular-nums ${strong ? "font-semibold" : ""}`}>{dinero(r.min, m)}</td>
      <td className={`py-3 pl-3 text-right tabular-nums ${strong ? "font-semibold" : ""}`}>{dinero(r.max, m)}</td>
    </>
  );
}

export function Desglose({ r }: { r: Resultado }) {
  const m = r.moneda;
  const sub = "py-2 pl-4 text-left text-[0.85rem] font-normal text-muted";
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-sm">
        <caption className="sr-only">Desglose de la estimación</caption>
        <thead>
          <tr className="text-xs uppercase tracking-[0.12em] text-muted">
            <th scope="col" className="pb-2 text-left font-semibold">
              Concepto
            </th>
            <th scope="col" className="pb-2 text-right font-semibold">
              Mínimo
            </th>
            <th scope="col" className="pb-2 text-right font-semibold">
              Máximo
            </th>
          </tr>
        </thead>
        <tbody className="[&>tr]:border-t [&>tr]:border-line">
          <tr>
            <th scope="row" className="py-3 text-left font-semibold">
              Construcción
              <span className="block text-[0.8rem] font-normal text-muted">
                {r.input.m2} m² × {dinero(r.precioM2.min, m)}–{dinero(r.precioM2.max, m)} por m²
              </span>
            </th>
            <Montos r={r.construccion} m={m} strong />
          </tr>

          <tr>
            <th scope="row" className="py-3 text-left font-semibold">
              Diseño y consultoría <span className="font-normal text-muted">({pct(r.consultoria.pct)})</span>
            </th>
            <Montos r={r.consultoria.total} m={m} strong />
          </tr>
          {r.consultoria.items.map((i) => (
            <tr key={i.id} className="!border-t-0">
              <th scope="row" className={sub}>
                {i.label} · {pct(i.pct)}
              </th>
              <td className="py-2 pl-3 text-right text-[0.85rem] tabular-nums text-muted">{dinero(i.monto.min, m)}</td>
              <td className="py-2 pl-3 text-right text-[0.85rem] tabular-nums text-muted">{dinero(i.monto.max, m)}</td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="py-3 text-left font-semibold">
              Pagos institucionales estimados <span className="font-normal text-muted">({pct(r.institucionales.pct)})</span>
            </th>
            <Montos r={r.institucionales.total} m={m} strong />
          </tr>
          {r.institucionales.items.map((i) => (
            <tr key={i.id} className="!border-t-0">
              <th scope="row" className={sub}>
                {i.label} · {pct(i.pct)}
                {i.nota && <span className="block text-[0.75rem] italic">{i.nota}</span>}
              </th>
              <td className="py-2 pl-3 text-right text-[0.85rem] tabular-nums text-muted">{dinero(i.monto.min, m)}</td>
              <td className="py-2 pl-3 text-right text-[0.85rem] tabular-nums text-muted">{dinero(i.monto.max, m)}</td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="py-3 text-left font-semibold">
              Subtotal
            </th>
            <Montos r={r.subtotal} m={m} strong />
          </tr>
          <tr>
            <th scope="row" className="py-3 text-left font-semibold">
              IVA {pct(r.iva.pct)}
              <span className="block text-[0.8rem] font-normal text-muted">Sobre construcción y consultoría</span>
            </th>
            <Montos r={r.iva.monto} m={m} />
          </tr>
          <tr className="!border-t-2 !border-ink">
            <th scope="row" className="py-4 text-left font-display text-lg font-medium">
              Total con IVA
            </th>
            <td className="py-4 pl-3 text-right font-display text-lg font-medium tabular-nums">{dinero(r.total.min, m)}</td>
            <td className="py-4 pl-3 text-right font-display text-lg font-medium tabular-nums">{dinero(r.total.max, m)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
