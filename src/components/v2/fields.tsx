/** Campos de formulario oscuros de la versión B: borde marrón, foco naranja. */
export const v2Input =
  "h-12 w-full border border-v2-brown-line bg-v2-brown-card px-4 text-[0.95rem] text-white placeholder:text-white/40 transition-colors focus:border-v2-orange focus:outline-none aria-[invalid=true]:border-[#ff8a7a]";

export function V2Field({
  id,
  label,
  error,
  className = "",
  required,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; error?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
        {label} {required && <span className="text-v2-orange">*</span>}
      </label>
      <input id={id} required={required} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} className={v2Input} {...rest} />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-[#ff8a7a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function V2Select({ id, name, label, options, className = "" }: { id: string; name: string; label: string; options: string[]; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${v2Input} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%23e0925f' stroke-width='1.8'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
      >
        <option value="" disabled>
          Seleccione…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Segmented control de radios (naranja el activo). */
export function V2Segmented<T extends string>({
  name,
  value,
  onChange,
  options,
  labelledBy,
  className = "",
}: {
  name: string;
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: React.ReactNode; sr?: string }[];
  labelledBy: string;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className={`flex border border-v2-brown-line ${className}`}>
      {options.map((o) => (
        <label
          key={o.id}
          className={`flex h-12 flex-1 cursor-pointer items-center justify-center px-4 text-sm font-bold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-white ${
            value === o.id ? "bg-v2-orange text-v2-black" : "text-white/80 hover:bg-v2-brown-card"
          }`}
        >
          <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => onChange(o.id)} className="sr-only" />
          {o.label}
          {o.sr && <span className="sr-only">{o.sr}</span>}
        </label>
      ))}
    </div>
  );
}

/** Campo honeypot anti-spam. */
export function V2Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="v2-hp">Sitio web (no completar)</label>
      <input id="v2-hp" type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
