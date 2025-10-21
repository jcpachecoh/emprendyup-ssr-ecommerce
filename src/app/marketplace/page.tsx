import React from 'react';
import { Metadata } from 'next';
import MarketplaceClient from './components/MarketplaceClient';
import { MarketplaceJsonLd } from './components/MarketplaceJsonLd';

export const metadata: Metadata = {
  title: 'Marketplace EmprendyUp | Compra y Vende Productos Online | Tienda Digital',
  description:
    '🛒 Descubre el marketplace de EmprendyUp: miles de productos únicos, artesanales y de alta calidad. Compra directo de emprendedores locales. Envío gratis, garantía y soporte 24/7.',
  keywords: [
    // Palabras clave principales
    'marketplace online',
    'tienda digital',
    'comprar productos online',
    'marketplace emprendedores',
    'productos artesanales',

    // Long tail keywords
    'marketplace productos únicos',
    'tienda online emprendimientos',
    'comprar directo emprendedores',
    'productos hechos a mano',
    'marketplace local',

    // Específicas de producto
    'ropa elegante online',
    'accesorios únicos',
    'productos de calidad',
    'artesanías colombianas',
    'diseño exclusivo',

    // Geográficas
    'marketplace Colombia',
    'tienda online Latinoamérica',
    'productos locales México',
    'emprendedores Argentina',

    // Comerciales
    'envío gratis',
    'garantía de calidad',
    'soporte 24/7',
    'pago seguro online',
    'devoluciones fáciles',
  ].join(', '),
  authors: [{ name: 'EmprendyUp' }],
  creator: 'EmprendyUp',
  publisher: 'EmprendyUp',
  category: 'Ecommerce',
  classification: 'Shopping',

  // Open Graph optimizado
  openGraph: {
    title: 'Marketplace EmprendyUp | Compra Productos Únicos de Emprendedores',
    description:
      '🛒 Descubre miles de productos únicos, artesanales y de alta calidad. Compra directo de emprendedores locales con envío gratis y garantía.',
    url: 'https://emprendyup.com/marketplace',
    siteName: 'EmprendyUp',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://emprendyup.com/images/marketplace/marketplace-hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Marketplace EmprendyUp - Hero image',
        type: 'image/webp',
      },
      {
        url: 'https://emprendyup.com/images/marketplace/marketplace-hero-bg.webp',
        width: 1080,
        height: 1080,
        alt: 'Marketplace EmprendyUp - Square hero',
        type: 'image/webp',
      },
    ],
  },

  // Twitter Card optimizado
  twitter: {
    card: 'summary_large_image',
    site: '@EmprendyUp',
    creator: '@EmprendyUp',
    title: 'Marketplace EmprendyUp | Productos Únicos Online',
    description:
      '🛒 Miles de productos únicos, artesanales y de calidad. Compra directo de emprendedores con envío gratis.',
    images: ['https://emprendyup.com/images/marketplace/marketplace-hero-bg.webp'],
  },

  // Datos estructurados mejorados
  other: {
    // Marketplace structured data
    'product:retailer': 'EmprendyUp',
    'product:availability': 'in stock',
    'product:condition': 'new',
    'product:price:currency': 'COP',

    // Business structured data
    'business:contact_data:locality': 'Colombia',
    'business:contact_data:region': 'Latinoamérica',
    'business:contact_data:website': 'https://emprendyup.com',

    // Schema.org JSON-LD
    'schema:type': 'Store',
    'schema:name': 'Marketplace EmprendyUp',
    'schema:description': 'Marketplace de productos únicos y artesanales de emprendedores',
    'schema:image': 'https://emprendyup.com/images/seo/marketplace-og.jpg',
    'schema:url': 'https://emprendyup.com/marketplace',
    'schema:telephone': '+57-1-234-5678',
    'schema:email': 'marketplace@emprendyup.com',
    'schema:address': 'Colombia, Latinoamérica',
    'schema:paymentAccepted': 'Credit Card, Debit Card, PSE, Nequi',
    'schema:currenciesAccepted': 'COP, USD',
    'schema:priceRange': '$10 - $500',

    // Additional commerce data
    'commerce:category': 'Marketplace',
    'commerce:subcategory': 'Artesanías y Productos Únicos',
    'commerce:shipping': 'Envío gratis disponible',
    'commerce:returns': '30 días para devoluciones',
    'commerce:warranty': 'Garantía de calidad',
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
  applicationName: 'EmprendyUp Marketplace',
  referrer: 'origin-when-cross-origin',

  // Configuración de formato
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Idiomas alternativos
  alternates: {
    canonical: 'https://emprendyup.com/marketplace',
    languages: {
      'es-ES': 'https://emprendyup.com/marketplace',
      'es-MX': 'https://emprendyup.com/es-mx/marketplace',
      'es-AR': 'https://emprendyup.com/es-ar/marketplace',
    },
  },
};

export default function MarketplacePage() {
  return (
    <>
      <MarketplaceJsonLd />
      <MarketplaceClient />
    </>
  );
}
