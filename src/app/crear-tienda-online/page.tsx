import React from 'react';
import { Metadata } from 'next';
import CrearTiendaOnlineClient from './components/CrearTiendaOnlineClient';
import { CrearTiendaOnlineJsonLd } from './components/CrearTiendaOnlineJsonLd';

export const metadata: Metadata = {
  title: 'Crear Tienda Online Gratis 2024 | Guía Completa Sin Comisiones | EmprendyUp',
  description:
    '✅ Aprende cómo crear tu tienda online gratis paso a paso. Sin comisiones, con dominio personalizado, catálogo ilimitado y herramientas profesionales. Guía completa 2024.',
  keywords: [
    // Palabras clave principales
    'crear tienda online gratis',
    'como crear tienda online',
    'crear ecommerce gratis',
    'tienda virtual gratis',
    'plataforma ecommerce sin comisiones',

    // Long tail keywords
    'crear tienda online sin comisiones',
    'crear tienda virtual paso a paso',
    'montar tienda online gratis',
    'crear ecommerce profesional',
    'tienda online gratuita',

    // Específicas de negocio
    'vender productos online',
    'negocio digital rentable',
    'emprendimiento digital',
    'tienda online personalizada',
    'plataforma ventas online',

    // Geográficas
    'crear tienda online Colombia',
    'ecommerce gratis Latinoamérica',
    'tienda virtual México',
    'vender online Argentina',

    // Técnicas
    'tienda responsive',
    'dominio personalizado gratis',
    'diseño tienda online',
    'catálogo productos online',
  ].join(', '),
  authors: [{ name: 'EmprendyUp' }],
  creator: 'EmprendyUp',
  publisher: 'EmprendyUp',
  category: 'Ecommerce',
  classification: 'Business',

  // Open Graph optimizado
  openGraph: {
    title: 'Crear Tienda Online Gratis 2024 | Guía Completa Sin Comisiones',
    description:
      '✅ Guía completa para crear tu tienda online gratis. Sin comisiones, dominio personalizado y herramientas profesionales. ¡Empieza hoy!',
    url: 'https://emprendyup.com/crear-tienda-online',
    siteName: 'EmprendyUp',
    type: 'article',
    locale: 'es_ES',
    images: [
      {
        url: 'https://emprendyup.com/images/seo/crear-tienda-online-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Crear Tienda Online Gratis - EmprendyUp',
        type: 'image/jpeg',
      },
      {
        url: 'https://emprendyup.com/images/seo/crear-tienda-online-square.jpg',
        width: 1080,
        height: 1080,
        alt: 'Guía Crear Tienda Online - EmprendyUp',
        type: 'image/jpeg',
      },
    ],
  },

  // Twitter Card optimizado
  twitter: {
    card: 'summary_large_image',
    site: '@EmprendyUp',
    creator: '@EmprendyUp',
    title: 'Crear Tienda Online Gratis 2024 | Guía Completa',
    description:
      '✅ Guía paso a paso para crear tu tienda online gratis. Sin comisiones, dominio personalizado. ¡Empieza hoy!',
    images: ['https://emprendyup.com/images/seo/crear-tienda-online-og.jpg'],
  },

  // Datos estructurados mejorados
  other: {
    // Article structured data
    'article:published_time': '2024-01-15T00:00:00.000Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'EmprendyUp',
    'article:section': 'Ecommerce',
    'article:tag': 'crear tienda online, ecommerce gratis, tienda virtual',

    // Business structured data
    'business:contact_data:locality': 'Colombia',
    'business:contact_data:region': 'Latinoamérica',

    // Schema.org JSON-LD
    'schema:type': 'HowTo',
    'schema:name': 'Cómo Crear una Tienda Online Gratis',
    'schema:description':
      'Guía completa paso a paso para crear tu tienda online gratis sin comisiones',
    'schema:image': 'https://emprendyup.com/images/seo/crear-tienda-online-og.jpg',
    'schema:totalTime': 'PT2H',
    'schema:estimatedCost': '$0',
    'schema:supply': 'Fotos de productos, Logo, Colores de marca',
    'schema:tool': 'EmprendyUp Platform',
  },

  // Configuración adicional
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

  // Verificaciones
  verification: {
    google: 'tu-codigo-google-search-console',
    yandex: 'tu-codigo-yandex',
    other: {
      'facebook-domain-verification': 'tu-codigo-facebook',
    },
  },

  // Configuración móvil
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // Configuración de app
  applicationName: 'EmprendyUp',
  referrer: 'origin-when-cross-origin',

  // Configuración de formato
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Idiomas alternativos
  alternates: {
    canonical: 'https://emprendyup.com/crear-tienda-online',
    languages: {
      'es-ES': 'https://emprendyup.com/crear-tienda-online',
      'es-MX': 'https://emprendyup.com/es-mx/crear-tienda-online',
      'es-AR': 'https://emprendyup.com/es-ar/crear-tienda-online',
    },
  },
};

export default function CrearTiendaOnlinePage() {
  return (
    <>
      <CrearTiendaOnlineJsonLd />
      <CrearTiendaOnlineClient />
    </>
  );
}
