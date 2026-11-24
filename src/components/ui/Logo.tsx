export function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-[1.45rem] font-semibold tracking-tight ${className}`}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
        <rect width="32" height="32" rx="9" fill={dark ? "#f4f0e8" : "#1b1812"} />
        <path d="M7 17.5 16 9.5l9 8V24H7z" fill="none" stroke="#e0925f" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M13.5 24v-4.5h5V24" fill="none" stroke="#e0925f" strokeWidth="2.4" strokeLinejoin="round" />
      </svg>
      <span>
        Constru<span className="text-terra">Sur</span>
      </span>
    </span>
  );
}
