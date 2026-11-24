import Image from "next/image";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { faq } from "@/data/faq";
import { equipo } from "@/data/equipo";
import { waLink } from "@/lib/whatsapp";

export function Faq() {
  const socio = equipo.socios[0];
  return (
    <section id="faq" className="bg-paper py-20 sm:py-28" aria-labelledby="faq-titulo">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionTitle
            id="faq-titulo"
            eyebrow={faq.eyebrow}
            titulo={faq.titulo}
            intro="Respuestas claras, sin letra pequeña. Si no encuentra la suya, escríbanos."
          />
          <div className="card mt-10 flex items-center gap-4 bg-cream p-4 shadow-none sm:p-5" data-reveal style={{ "--i": 3 } as React.CSSProperties}>
            <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl sm:size-24">
              <Image src={socio.foto} alt={`${socio.nombre}, ${socio.rol}`} fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="font-display text-xl font-medium">¿Tiene otra pregunta?</p>
              <p className="mt-0.5 text-sm text-muted">
                {socio.nombre} y el equipo le responden por WhatsApp.
              </p>
              <div className="mt-3">
                <Button
                  href={waLink("Hola ConstruSur, tengo una consulta.")}
                  size="sm"
                  variant="dark"
                  evento="whatsapp_click"
                  eventoParams={{ ubicacion: "faq" }}
                  icon={<WhatsAppIcon className="size-4" />}
                >
                  Escríbanos
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={faq.items} />
        </div>
      </div>
    </section>
  );
}
