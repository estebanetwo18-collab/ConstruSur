export const inputCls =
  "h-12 w-full rounded-xl border border-line bg-cream/60 px-4 text-[0.98rem] text-ink placeholder:text-muted/80 transition-colors focus:border-ink focus:bg-paper focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 aria-[invalid=true]:border-[#b3261e]";

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
};

export function Field({ id, label, error, hint, required, className = "", ...rest }: FieldProps) {
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label} {required && <span className="text-terra-ink">*</span>}
      </label>
      <input id={id} required={required} aria-invalid={!!error} aria-describedby={describedBy} className={inputCls} {...rest} />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  options,
  required,
  error,
  className = "",
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label} {required && <span className="text-terra-ink">*</span>}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        defaultValue=""
        className={`${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%231b1812' stroke-width='1.8'/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10`}
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
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Campo trampa anti-spam: invisible para personas, los bots lo llenan. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="hp-sitio">Sitio web (no completar)</label>
      <input id="hp-sitio" type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
