import Image, { getImageProps } from "next/image";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, redIcon } from "@/components/ui/BrandIcons";
import { contacto, hero, redes } from "@/data/site";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";
import { HeroVideo } from "./HeroVideo";

const d = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  // Dirección de arte: poster horizontal en desktop, vertical en móvil.
  // En móvil la imagen vertical cubre la altura de la pantalla (~160vw de ancho).
  const {
    props: { srcSet: desktop },
  } = getImageProps({ alt: "", sizes: "100vw", quality: 70, src: "/img/hero/hero-desktop.webp", width: 1600, height: 1000 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ alt: "", sizes: "160vw", quality: 60, src: "/img/hero/hero-mobile.webp", width: 1000, height: 1338, loading: "eager" });

  const social = [
    { label: "WhatsApp", url: waLink(MENSAJE_GENERAL), Icon: WhatsAppIcon },
    { label: "Correo", url: `mailto:${contacto.email}`, Icon: Mail },
    ...redes.filter((r) => r.url).map((r) => ({ label: r.label, url: r.url, Icon: redIcon[r.id] })),
  ];

  return (
    <section className="on-dark relative z-10 overflow-hidden rounded-b-[32px] bg-ink text-cream sm:rounded-b-[56px]" aria-labelledby="hero-titulo">
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} sizes="100vw" />
          <source srcSet={mobile} sizes="160vw" />
          <img {...rest} alt="" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
        </picture>
        <HeroVideo />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,24,18,.55)_0%,rgba(27,24,18,.35)_35%,rgba(27,24,18,.78)_78%,rgba(27,24,18,.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(27,24,18,.55),transparent_60%)]" />
      </div>

      {/* Redes en columna vertical (desktop) */}
      <ul className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-label="Contacto directo">
        {social.map(({ label, url, Icon }, i) => (
          <li key={label} className="hero-in" style={d(i + 4)}>
            <a
              href={url}
              target={url.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-full border border-cream/25 transition-colors hover:border-terra hover:bg-terra hover:text-ink"
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        ))}
        <li aria-hidden className="mt-2 h-16 w-px bg-cream/30" />
        <li aria-hidden className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cream/60 [writing-mode:vertical-rl]">
          Síganos
        </li>
      </ul>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1320px] flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:min-h-[min(100svh,920px)] lg:px-20 lg:pb-24">
        <p className="eyebrow hero-in self-start rounded-full bg-ink/55 py-1.5 pl-3 pr-4 !text-cream backdrop-blur-sm before:!bg-terra" style={d(0)}>
          {hero.eyebrow}
        </p>
        <h1 id="hero-titulo" className="font-display hero-title-in mt-5 max-w-4xl text-[3.4rem] font-medium leading-[0.98] sm:text-7xl lg:text-[6.5rem]">
          {hero.titulo[0]} <span className="kw">{hero.titulo[1]}</span>
          {hero.titulo[2]}
        </h1>
        <p className="hero-in mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl" style={d(2)}>
          {hero.subtitulo}
        </p>
        <div className="hero-in mt-8 flex flex-wrap items-center gap-3" style={d(3)}>
          <Button href="/#cotizador">Cotice su proyecto</Button>
          <Button href="/#proceso" variant="outline-light">
            Ver nuestro proceso
          </Button>
        </div>

        <div className="hero-in mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-cream/15 pt-6" style={d(4)}>
          <div className="flex items-center gap-3 rounded-full bg-cream/10 py-2 pl-2 pr-5 backdrop-blur-md">
            <div className="flex -space-x-3">
              {["essential-fachada-frontal", "prestige-exterior-piscina", "prime-terraza"].map((f) => (
                <span key={f} className="relative size-10 overflow-hidden rounded-full ring-2 ring-ink">
                  <Image src={`/img/thumbs/${f}.webp`} alt="" width={40} height={40} className="size-10 object-cover" />
                </span>
              ))}
            </div>
            <p className="text-sm font-medium leading-tight">
              {hero.pruebaSocial}
              <span className="block text-xs font-normal text-cream/75">Reportes semanales en cada obra</span>
            </p>
          </div>
          <p className="hidden text-right text-sm text-cream/75 md:block">
            Essential · Prestige · Prime
            <span className="block">Gran Área Metropolitana, Costa Rica</span>
          </p>
        </div>
      </div>
    </section>
  );
}
