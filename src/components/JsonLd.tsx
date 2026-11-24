import { contacto, redes, site, SITE_URL } from "@/data/site";
import { faq } from "@/data/faq";

function Ld({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escapamos "<" para evitar inyección de HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BusinessJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE_URL}/#empresa`,
        name: site.legalName,
        alternateName: site.name,
        description: site.description,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image.jpg`,
        logo: `${SITE_URL}/icon.svg`,
        telephone: `+${contacto.whatsappNumber}`,
        email: contacto.email,
        address: { "@type": "PostalAddress", addressCountry: "CR", addressRegion: "San José" },
        areaServed: [
          { "@type": "AdministrativeArea", name: "Gran Área Metropolitana, Costa Rica" },
          { "@type": "City", name: "Montes de Oca" },
          { "@type": "City", name: "Santo Domingo de Heredia" },
        ],
        knowsAbout: ["Construcción residencial", "Llave en mano", "Remodelación", "Diseño y consultoría"],
        sameAs: redes.filter((r) => r.url).map((r) => r.url),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${contacto.whatsappNumber}`,
          contactType: "sales",
          availableLanguage: "es",
          areaServed: "CR",
        },
      }}
    />
  );
}

export function FaqJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}
