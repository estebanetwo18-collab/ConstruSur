import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@/data/site";
import { Header } from "@/components/sections/Header";
import { Floating } from "@/components/ui/Floating";
import { Analytics } from "@/components/Analytics";
import { BusinessJsonLd } from "@/components/JsonLd";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ConstruSur — Construcción residencial en Costa Rica | Proyectos con Propósito",
    template: "%s | ConstruSur",
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["constructora Costa Rica", "construcción residencial", "construir casa GAM", "cotizador construcción", "llave en mano", "remodelación", "ConstruSur"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: "ConstruSur — Proyectos con Propósito",
    description: "Un equipo completo a cargo de cada obra, reportes semanales y transparencia total. Cotice su proyecto en línea.",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1b1812",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CR" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Habilita las animaciones de reveal solo si hay JS (sin JS todo es visible). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh pb-[76px] md:pb-0">
        <a
          href="#contenido"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-cream transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Floating />
        <BusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
