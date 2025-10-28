import { DM_Sans } from 'next/font/google';
import './assets/scss/tailwind.scss';
import './assets/css/materialdesignicons.css';
import { ReactNode } from 'react';
import ApolloWrapper from './components/ApolloWrapper';
import ConditionalLayout from './components/ConditionalLayout';
import Script from 'next/script';
import { Toaster } from 'sonner';
import CookieWrapper from './components/CookieWrapper';
import { ThemeProvider } from 'next-themes';
import SessionWrapper from './components/SessionWrapper';

const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm_sans',
});

export const metadata = {
  title: 'Crea tu tienda online gratis | Automatiza WhatsApp | EmprendyUp',
  description:
    'Crea tu tienda online gratis en minutos. Automatiza ventas por WhatsApp, participa en ferias de emprendedores y vende en un marketplace colaborativo. Herramientas para emprendedores en Colombia y LATAM.',
  keywords: [
    'crear tienda online gratis',
    'automatización de WhatsApp',
    'chatbot WhatsApp para ventas',
    'ferias de emprendedores',
    'herramientas para emprendedores',
    'marketplace colaborativo',
    'plataforma ecommerce',
    'emprendedores Colombia',
    'tienda virtual',
    'CRM para emprendedores',
    'IA para contenidos',
  ].join(', '),
  authors: [{ name: 'EmprendyUp Team' }],
  creator: 'EmprendyUp',
  publisher: 'EmprendyUp',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://www.emprendyup.com/',
    siteName: 'EmprendyUp',
    title: 'Crea tu tienda online gratis | Automatiza WhatsApp | EmprendyUp',
    description:
      'Plataforma todo-en-uno para emprendedores: tienda online, automatización de WhatsApp, marketplace colaborativo, CRM e IA.',
    images: [
      {
        url: '/images/emprendyup-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EmprendyUp: tienda online gratis, automatización de WhatsApp y herramientas para emprendedores',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@emprendyup',
    creator: '@emprendyup',
    title: 'Crea tu tienda online gratis | Automatiza WhatsApp | EmprendyUp',
    description:
      'Tienda online + Automatización WhatsApp + IA + CRM + Comunidad. Todo lo que necesitas para crecer.',
    images: ['/images/emprendyup-twitter-card.jpg'],
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    yandex: 'tu-codigo-yandex',
    yahoo: 'tu-codigo-yahoo',
  },
  alternates: {
    canonical: 'https://www.emprendyup.com/',
    languages: {
      'es-CO': 'https://www.emprendyup.com/co/',
      'es-MX': 'https://www.emprendyup.com/mx/',
      'es-ES': 'https://www.emprendyup.com/',
    },
  },
  other: {
    'application-name': 'EmprendyUp',
    'apple-mobile-web-app-title': 'EmprendyUp',
    'theme-color': '#10B981',
    'msapplication-TileColor': '#10B981',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Favicon & Manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Performance */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'EmprendyUp',
              url: 'https://www.emprendyup.com/',
              inLanguage: 'es',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.emprendyup.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'EmprendyUp',
              url: 'https://www.emprendyup.com',
              logo: 'https://www.emprendyup.com/images/logo-light.png',
              sameAs: [
                'https://www.facebook.com/emprendyup',
                'https://www.instagram.com/emprendyup',
                'https://www.linkedin.com/company/emprendyup',
                'https://twitter.com/emprendyup',
              ],
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+57-xxx-xxx-xxxx',
                  contactType: 'customer service',
                  areaServed: 'CO',
                  availableLanguage: ['es'],
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Crea tu tienda online gratis | Automatiza WhatsApp | EmprendyUp',
              url: 'https://www.emprendyup.com/',
              description:
                'Crea tu tienda online gratis en minutos. Automatiza ventas por WhatsApp, participa en ferias de emprendedores y vende en un marketplace colaborativo.',
              isPartOf: {
                '@type': 'WebSite',
                url: 'https://www.emprendyup.com/',
              },
              about: [
                { '@type': 'Thing', name: 'crear tienda online gratis' },
                { '@type': 'Thing', name: 'automatización de WhatsApp' },
                { '@type': 'Thing', name: 'ferias de emprendedores' },
                { '@type': 'Thing', name: 'herramientas para emprendedores' },
                { '@type': 'Thing', name: 'marketplace colaborativo' },
              ],
              breadcrumb: {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Inicio',
                    item: 'https://www.emprendyup.com/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Crear tienda online',
                    item: 'https://www.emprendyup.com/crear-tienda-online',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Automatización WhatsApp',
                    item: 'https://www.emprendyup.com/automatizacion-whatsapp',
                  },
                  {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Ferias emprendedores',
                    item: 'https://www.emprendyup.com/ferias-emprendedores',
                  },
                  {
                    '@type': 'ListItem',
                    position: 5,
                    name: 'Herramientas',
                    item: 'https://www.emprendyup.com/herramientas',
                  },
                ],
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: '¿Cómo crear una tienda online gratis con EmprendyUp?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Regístrate, elige una plantilla y carga tus productos. En minutos tendrás tu tienda online conectada al marketplace colaborativo.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Qué es la automatización de WhatsApp para ventas?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Automatiza respuestas, catálogos y seguimiento de pedidos con un chatbot integrado para acelerar tus ventas.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿EmprendyUp organiza ferias para emprendedores?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí, conectamos a marcas con compradores en ferias y eventos para impulsar visibilidad y ventas.',
                  },
                },
                {
                  '@type': 'Question',
                  name: '¿Qué herramientas para emprendedores incluye la plataforma?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Tienda online, CRM, IA para contenidos, métricas, automatización de WhatsApp y acceso a marketplace y comunidad.',
                  },
                },
              ],
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script src="https://checkout.epayco.co/checkout.js" strategy="beforeInteractive" />
      </head>

      <body className={`${dm_sans.variable} dark:bg-slate-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SessionWrapper>
            <ApolloWrapper>
              <ConditionalLayout>
                {children}
                <Toaster richColors position="top-right" />
              </ConditionalLayout>
            </ApolloWrapper>
            <CookieWrapper />
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
