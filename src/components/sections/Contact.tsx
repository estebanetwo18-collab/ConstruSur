import { Clock, Mail, MapPin, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { contacto } from "@/data/site";
import { MENSAJE_GENERAL, waLink } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const items = [
    { Icon: WhatsAppIcon, label: "WhatsApp", value: contacto.whatsappDisplay, href: waLink(MENSAJE_GENERAL) },
    { Icon: Mail, label: "Correo", value: contacto.email, href: `mailto:${contacto.email}` },
    { Icon: MapPin, label: "Zona de trabajo", value: contacto.zona },
    { Icon: Clock, label: "Horario", value: contacto.horario },
  ];
  return (
    <section id="contacto" className="relative bg-cream py-20 sm:py-28" aria-labelledby="contacto-titulo">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <SectionTitle
            id="contacto-titulo"
            eyebrow="Conversemos hoy"
            titulo={["Construyamos algo con", "propósito", "."]}
            intro="Cuéntenos qué tiene en mente y coordinamos una primera llamada sin costo para revisar alcance y presupuesto."
          />
          <ul className="mt-10 space-y-3">
            {items.map(({ Icon, label, value, href }, i) => {
              const inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-terra text-ink">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</span>
                    <span className="block break-words font-semibold">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} data-reveal style={{ "--i": i } as React.CSSProperties}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="lift flex items-center gap-4 rounded-[18px] bg-paper p-3 pr-5">
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-[18px] bg-paper/60 p-3 pr-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-8" data-reveal>
            <Button href={contacto.calendlyUrl} variant="dark" evento="calendly_click" eventoParams={{ ubicacion: "contacto" }} icon={<CalendarDays className="size-[18px]" />}>
              Agendar una llamada
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal="scale">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
