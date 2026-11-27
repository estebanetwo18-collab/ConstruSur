import { v2ParaQuien } from "@/data/v2";
import { Illustration } from "./Illustrations";

export function V2WhoWeBuild() {
  return (
    <section aria-labelledby="v2-quien-titulo" className="bg-v2-black">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 id="v2-quien-titulo" className="v2-h mx-auto max-w-3xl text-center text-[2rem] sm:text-5xl lg:text-[3.3rem]" data-reveal>
          {v2ParaQuien.titulo}
        </h2>
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:mt-20 lg:grid-cols-3 lg:gap-y-16">
          {v2ParaQuien.items.map((it, i) => (
            <li key={it.id} className="text-center" data-reveal style={{ "--i": i % 3 } as React.CSSProperties}>
              <Illustration id={it.id} className="mx-auto w-full max-w-[260px] text-v2-brown-soft [&_path:nth-child(odd)]:text-v2-orange" />
              <h3 className="mt-5 text-[1.05rem] font-bold">{it.titulo}</h3>
              <p className="mt-1 text-sm text-white/60">{it.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
