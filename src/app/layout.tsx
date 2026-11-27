import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@/data/site";
import { V2Header } from "@/components/v2/Header";
import { V2MobileBar } from "@/components/v2/MobileBar";
import { Analytics } from "@/components/Analytics";
import { BusinessJsonLd } from "@/components/JsonLd";

// Versión B: grotesca compacta para titulares (sin serif).
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  // Solo se precarga Archivo (titular del hero); Inter usa fallback ajustado mientras carga.
  preload: false,
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
  themeColor: "#121010",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CR" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Habilita las animaciones de reveal solo si hay JS (sin JS todo es visible). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-v2-black pb-[68px] text-white md:pb-0">
        <a
          href="#contenido"
          className="fixed left-3 top-3 z-[100] -translate-y-24 bg-v2-orange px-5 py-3 font-bold text-v2-black transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <V2Header />
        <main id="contenido">{children}</main>
        <V2MobileBar />
        <BusinessJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
