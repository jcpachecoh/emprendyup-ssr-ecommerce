export function MarketplaceJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Marketplace EmprendyUp',
    description: 'Marketplace de productos únicos y artesanales de emprendedores locales',
    url: 'https://emprendyup.com/marketplace',
    logo: 'https://emprendyup.com/images/logo-emprendyup.png',
    image: 'https://emprendyup.com/images/seo/marketplace-og.jpg',
    telephone: '+57-1-234-5678',
    email: 'marketplace@emprendyup.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressRegion: 'Latinoamérica',
      addressLocality: 'Colombia',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.711,
      longitude: -74.0721,
    },
    openingHours: ['Mo-Su 00:00-23:59'],
    paymentAccepted: ['Credit Card', 'Debit Card', 'PSE', 'Nequi', 'Daviplata', 'Cash'],
    currenciesAccepted: ['COP', 'USD'],
    priceRange: '$10 - $500',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Productos Únicos de Emprendedores',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Artesanías y Productos Únicos',
            category: 'Artesanías',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Ropa y Accesorios',
            category: 'Fashion',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: 'Productos para el Hogar',
            category: 'Home & Garden',
          },
        },
      ],
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Colombia',
      },
      {
        '@type': 'Country',
        name: 'México',
      },
      {
        '@type': 'Country',
        name: 'Argentina',
      },
    ],
    sameAs: [
      'https://www.facebook.com/emprendyup',
      'https://www.instagram.com/emprendyup',
      'https://www.linkedin.com/company/emprendyup',
      'https://twitter.com/emprendyup',
    ],
  };

  // Organization structured data
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EmprendyUp',
    url: 'https://emprendyup.com',
    logo: 'https://emprendyup.com/images/logo-emprendyup.png',
    description: 'Plataforma líder para emprendedores en Latinoamérica',
    foundingDate: '2024-01-01',
    founders: [
      {
        '@type': 'Person',
        name: 'EmprendyUp Team',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57-1-234-5678',
      contactType: 'customer service',
      email: 'soporte@emprendyup.com',
      availableLanguage: ['Spanish', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressRegion: 'Latinoamérica',
    },
    sameAs: [
      'https://www.facebook.com/emprendyup',
      'https://www.instagram.com/emprendyup',
      'https://www.linkedin.com/company/emprendyup',
      'https://twitter.com/emprendyup',
    ],
  };

  // Breadcrumb structured data
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://emprendyup.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Marketplace',
        item: 'https://emprendyup.com/marketplace',
      },
    ],
  };

  // Website structured data
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'EmprendyUp Marketplace',
    url: 'https://emprendyup.com/marketplace',
    description: 'Marketplace de productos únicos de emprendedores',
    publisher: {
      '@type': 'Organization',
      name: 'EmprendyUp',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://emprendyup.com/marketplace?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
