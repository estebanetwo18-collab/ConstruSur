function Cinta({ items, reverse, className }: { items: string[]; reverse?: boolean; className: string }) {
  const grupo = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-5 font-display text-2xl font-medium uppercase tracking-tight sm:text-[2rem]">{t}</span>
          <span aria-hidden className="text-2xl sm:text-3xl">✱</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden py-3.5 sm:py-4 ${className}`}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {grupo(false)}
        {grupo(true)}
        {grupo(true)}
        {grupo(true)}
      </div>
    </div>
  );
}

/** Dos cintas cruzadas e inclinadas que se mueven en direcciones opuestas. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <section aria-label="Nuestros servicios" className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative">
        <Cinta items={items} className="-mx-4 -rotate-[3deg] bg-ink text-cream" reverse />
        <Cinta
          items={items}
          className="relative -mx-4 -mt-10 rotate-[2.5deg] bg-terra text-ink shadow-[0_16px_40px_-16px_rgba(27,24,18,.4)] sm:-mt-14"
        />
      </div>
    </section>
  );
}
