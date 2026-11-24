# ConstruSur — sitio web y cotizador

Sitio de **ConstruSur S.A.** (construcción residencial, Costa Rica) con cotizador en línea.

- **Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · `next/font` (Fraunces + Inter) · `next/image` · Route Handler `/api/lead` con **zod** + **Resend** · tests con **Vitest**.
- **Sin librerías pesadas de UI:** las animaciones son CSS + IntersectionObserver y se desactivan con `prefers-reduced-motion`. Los íconos son de `lucide-react`.
- **Páginas:** `/` (home), `/cotizador`, `/gracias` y una 404 con la marca.

---

## 1. Cómo correrlo

Requiere Node 20 o superior.

```bash
npm install
```

```bash
npm run dev
```

Abra <http://localhost:3000>.

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm test` | Tests del cálculo del cotizador (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run images -- <carpeta>` | Optimiza fotos a WebP y las guarda en `public/img/` |

**Variables de entorno:** copie `.env.example` como `.env.local`. Sin las variables de Resend, `/api/lead` funciona en **modo dev**: responde OK y escribe el lead en la consola del servidor, así el flujo completo se puede probar en local.

**Precios en desarrollo:** mientras `cotizador.config.ts` tenga valores `TODO_CONSTRUSUR`:

- En `npm run dev` el cotizador usa **precios de DEMOSTRACIÓN** y muestra un banner rojo.
- En producción (`npm run build` + `npm start`, o Vercel) **no muestra montos**. En su lugar invita a escribir por WhatsApp y el formulario de lead sigue funcionando.

---

## 2. Dónde editar

Todo el contenido vive en `src/data/`. Para cambiar un texto no hace falta tocar componentes.

| Archivo | Contenido |
| --- | --- |
| `src/data/site.ts` | Contacto (WhatsApp, correo, horario, Calendly), redes, menú, textos del hero y de Nosotros, **cifras** (`valor: null` muestra "XX") |
| `src/data/home.ts` | Por qué ConstruSur, Proceso, Valores, cinta (marquee), **testimonios** |
| `src/data/servicios.ts` | Tarjetas del carrusel de servicios |
| `src/data/proyectos.ts` | Proyectos: nombre, línea, ubicación, m², plazo, año y fotos de la galería |
| `src/data/equipo.ts` | Socios (nombre, rol, foto) y fotos de obra |
| `src/data/faq.ts` | Preguntas frecuentes (también generan el schema FAQPage) |
| **`src/data/cotizador.config.ts`** | **Precios por m², % de consultoría, % institucionales, IVA, tipo de cambio, hitos de pago y especificaciones por línea** |

### Precios del cotizador

En `src/data/cotizador.config.ts`, reemplace cada `TODO` por un número. Las convenciones:

- **Precios:** colones por m², **sin IVA**, con mínimo y máximo por línea y tipo de obra.
- **Porcentajes:** sobre el monto de construcción (`4` = 4 %).
- **Tipo de cambio:** `{ valor: 515, fecha: "15/01/2027" }`.
- **Especificaciones confirmadas:** cuando estén listas, ponga `especificacionesConfirmadas: true`.

Cuando no quede ningún `TODO` en precios, porcentajes, IVA y tipo de cambio, el cotizador usa los valores reales en todos los entornos y el banner desaparece. Los precios de demostración (`DEMO_DEV`) **nunca** se usan en producción.

El cálculo vive en `src/lib/cotizar.ts`, una función pura con tests en `tests/cotizar.test.ts`:

- **Construcción** = m² × precio/m²
- **Diseño y consultoría** = % de construcción (estudios preliminares, anteproyecto, planos, dirección técnica)
- **Pagos institucionales** = % de construcción (CFIA, municipalidad, INS)
- **IVA** sobre construcción + consultoría
- **Total** = subtotal + IVA

El servidor recalcula la cotización antes de enviar el correo: no confía en los montos que manda el navegador.

### Imágenes y videos

1. Ponga las fotos originales (JPG/PNG, sin importar el tamaño) en una carpeta, por ejemplo `originales/proyectos/prime-cocina.png`.
2. Corra el optimizador:

   ```bash
   npm run images -- originales
   ```

   Genera `public/img/proyectos/prime-cocina.webp` (WebP, máximo 1920 px).
3. Use la ruta en el archivo de datos correspondiente, por ejemplo `"/img/proyectos/prime-cocina.webp"`.

`next/image` sirve automáticamente AVIF/WebP en el tamaño justo, con carga diferida.

Videos: el hero usa `public/video/hero-desktop.mp4` y `hero-mobile.mp4`, y el testimonio `public/video/testimonio-01.mp4`. El poster del hero está en `public/img/hero/`.

**Fotos temporales que hay que reemplazar:**

| Archivo | Uso | Origen actual |
| --- | --- | --- |
| `public/img/equipo/socio-1.webp`, `socio-2.webp` | Josué y Kenneth | Banco de imágenes (Unsplash) |
| `public/img/obra/*.webp` | Nosotros, Por qué, Servicios, Equipo, Testimonios | Banco de imágenes (Unsplash) |
| `public/img/proyectos/*.webp` | Proyectos, servicios | Renders del sitio actual de ConstruSur |
| `public/img/testimonio-poster.webp`, `public/video/*` | Testimonio y hero | Sitio actual de ConstruSur |

---

## 3. Publicar en Vercel

1. **Importar el repo:** en [vercel.com/new](https://vercel.com/new), importe el repositorio de GitHub.
2. **Framework preset:** *Next.js*, que se detecta solo. No cambie *Build Command* (`next build`), *Output Directory* ni *Install Command*. **No hace falta `vercel.json`.**
3. **Variables de entorno:** en *Settings → Environment Variables*, para *Production* y *Preview*:

   | Variable | Ejemplo | Obligatoria |
   | --- | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.construsur.cr` | Sí (canonical, OG, sitemap, schema) |
   | `RESEND_API_KEY` | `re_...` | Sí, para enviar correos |
   | `LEAD_TO_EMAIL` | `construsurdigital@gmail.com` | Sí |
   | `LEAD_FROM_EMAIL` | `ConstruSur <cotizaciones@construsur.cr>` | Sí, de un dominio verificado |
   | `NEXT_PUBLIC_CALENDLY_URL` | `https://calendly.com/...` | No (por defecto, el del sitio actual) |
   | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` | No |
   | `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890` | No |

   Las variables `NEXT_PUBLIC_*` se leen al compilar: si las cambia, haga *Redeploy*.
4. **Verificar el dominio en Resend:** en [resend.com](https://resend.com), *Domains → Add domain*, agregue el dominio propio y copie los registros DNS (SPF, DKIM y opcionalmente DMARC) en el proveedor del dominio. Cuando aparezca *Verified*, cree una API key (*API Keys → Create*, permiso *Sending access*) y úsela en `RESEND_API_KEY`. `LEAD_FROM_EMAIL` debe usar ese dominio; Resend no permite enviar desde `@gmail.com`.
5. **Conectar el dominio propio:** en Vercel, *Settings → Domains → Add*, agregue `construsur.cr` y `www.construsur.cr`, y configure los DNS que indica Vercel (registro A o CNAME). Actualice `NEXT_PUBLIC_SITE_URL` y haga *Redeploy*.
6. **Probar el formulario en producción:**
   1. Abra `/cotizador`, complete el cálculo y el formulario con un correo propio.
   2. Verifique que lleguen **dos correos**: el lead a `LEAD_TO_EMAIL` y el resumen al cliente.
   3. Pruebe también el formulario de Contacto de la home.
   4. Si algo falla, revise *Vercel → Project → Logs* (filtre por `/api/lead`) y *Resend → Emails*.
   5. Aunque falle el correo, la página `/gracias` ofrece **Enviar por WhatsApp** con la cotización prellenada.
7. **Revisar SEO:** visite `/sitemap.xml` y `/robots.txt`, valide el schema en [Rich Results Test](https://search.google.com/test/rich-results) y mida con [PageSpeed Insights](https://pagespeed.web.dev/) sobre el dominio final.

---

## 4. Medición

Los eventos se envían siempre a `window.dataLayer`, y a GA4 y Meta Pixel si sus IDs están configurados:

| Evento | Cuándo |
| --- | --- |
| `cotizador_inicio` | Primera interacción con el cotizador |
| `cotizador_resultado` | El usuario deja de mover los controles con un resultado válido |
| `cotizador_desglose` | Abre el desglose |
| `lead_enviado` | Envía el formulario del cotizador o de contacto (en Meta: `Lead`) |
| `whatsapp_click` | Clic en cualquier botón de WhatsApp (en Meta: `Contact`) |
| `calendly_click` | Clic en "Agendar llamada" |

Los UTM y `fbclid`/`gclid` de la primera visita se guardan en `sessionStorage` y viajan con cada lead.

---

## 5. Estructura

```
src/
  app/                 páginas, layout, /api/lead, sitemap, robots, OG
  components/
    sections/          Header, Hero, About, Services, WhyUs, Process, Projects,
                       Testimonials, Team, Values, Faq, Contact, Footer
    cotizador/         Cotizador, Desglose, SpecsTable, LeadForm, AnimatedNumber
    ui/                Button, SectionTitle, Carousel, Accordion, Modal, Lightbox,
                       Marquee, Counter, Field, Motion, Floating, DevBanner…
  data/                ← contenido editable y configuración del cotizador
  lib/                 cotizar (cálculo), pricing, lead (zod + correos), format,
                       analytics, storage (UTM), whatsapp
tests/                 cotizar.test.ts
scripts/               optimize-images.mjs
references/            referencia visual (no se publica)
```
