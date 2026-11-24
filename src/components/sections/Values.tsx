import { SectionTitle } from "@/components/ui/SectionTitle";
import { valores } from "@/data/home";
import { Compass, Handshake, HeartHandshake, ScanEye } from "lucide-react";

const icons = [Handshake, ScanEye, HeartHandshake, Compass];

export function Values() {
  return (
    <section id="valores" className="bg-cream pb-20 sm:pb-28" aria-labelledby="valores-titulo">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionTitle id="valores-titulo" eyebrow={valores.eyebrow} titulo={valores.titulo} align="center" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {valores.items.map((v, i) => {
            const Icon = icons[i];
            return (
              <li key={v.titulo} className="card lift group relative overflow-hidden p-6 sm:p-7" data-reveal style={{ "--i": i } as React.CSSProperties}>
                <span aria-hidden className="absolute -right-2 -top-3 font-display text-[6rem] font-semibold leading-none text-ink/[0.05] transition-colors duration-500 group-hover:text-terra/20">
                  0{i + 1}
                </span>
                <span className="relative grid size-12 place-items-center rounded-full bg-terra-soft text-terra-ink transition-colors duration-500 group-hover:bg-terra group-hover:text-ink">
                  <Icon className="size-5" strokeWidth={1.6} />
                </span>
                <h3 className="font-display relative mt-5 text-2xl font-medium">{v.titulo}</h3>
                <p className="relative mt-2 text-[0.95rem] leading-relaxed text-muted">{v.texto}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
