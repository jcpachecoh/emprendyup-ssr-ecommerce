export function CrearTiendaOnlineJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo Crear una Tienda Online Gratis',
    description:
      'Guía completa paso a paso para crear tu tienda online gratis sin comisiones con dominio personalizado y herramientas profesionales.',
    image: 'https://emprendyup.com/images/seo/crear-tienda-online-og.jpg',
    totalTime: 'PT2H', // 2 horas
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Fotos de productos de alta calidad',
      },
      {
        '@type': 'HowToSupply',
        name: 'Logo de tu marca',
      },
      {
        '@type': 'HowToSupply',
        name: 'Paleta de colores de marca',
      },
      {
        '@type': 'HowToSupply',
        name: 'Categorías de productos definidas',
      },
      {
        '@type': 'HowToSupply',
        name: 'Visión y misión del emprendimiento',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Plataforma EmprendyUp',
        url: 'https://emprendyup.com',
      },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Preparar Fotos de Productos',
        text: 'Prepara fotos de alta calidad de tus productos. Mínimo 3 fotos por producto con buena iluminación y diferentes ángulos.',
        url: 'https://emprendyup.com/crear-tienda-online#paso-1',
        image: 'https://emprendyup.com/images/steps/fotos-productos.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Diseñar Logo de tu Marca',
        text: 'Diseña o prepara el logo que representará tu marca. Debe ser simple, memorable y funcionar en diferentes tamaños.',
        url: 'https://emprendyup.com/crear-tienda-online#paso-2',
        image: 'https://emprendyup.com/images/steps/logo-marca.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Definir Colores de tu Marca',
        text: 'Define la paleta de colores que identificará tu marca. Incluye color primario, secundario y neutros.',
        url: 'https://emprendyup.com/crear-tienda-online#paso-3',
        image: 'https://emprendyup.com/images/steps/colores-marca.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Clasificar Productos en Categorías',
        text: 'Clasifica tus productos en categorías claras para facilitar la navegación de tus clientes.',
        url: 'https://emprendyup.com/crear-tienda-online#paso-4',
        image: 'https://emprendyup.com/images/steps/categorias-productos.jpg',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Definir Visión del Emprendimiento',
        text: 'Define claramente qué problemas resuelves, tu propuesta de valor única y hacia dónde quieres llevar tu negocio.',
        url: 'https://emprendyup.com/crear-tienda-online#paso-5',
        image: 'https://emprendyup.com/images/steps/vision-emprendimiento.jpg',
      },
    ],
    author: {
      '@type': 'Organization',
      name: 'EmprendyUp',
      url: 'https://emprendyup.com',
      logo: 'https://emprendyup.com/images/logo-emprendyup.png',
      sameAs: [
        'https://www.facebook.com/emprendyup',
        'https://www.instagram.com/emprendyup',
        'https://www.linkedin.com/company/emprendyup',
        'https://twitter.com/emprendyup',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'EmprendyUp',
      url: 'https://emprendyup.com',
      logo: 'https://emprendyup.com/images/logo-emprendyup.png',
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Ecommerce',
      },
      {
        '@type': 'Thing',
        name: 'Tienda Online',
      },
      {
        '@type': 'Thing',
        name: 'Emprendimiento Digital',
      },
      {
        '@type': 'Thing',
        name: 'Comercio Electrónico',
      },
    ],
    keywords:
      'crear tienda online gratis, ecommerce sin comisiones, tienda virtual, emprendimiento digital, comercio electrónico',
    datePublished: '2024-01-15T00:00:00.000Z',
    dateModified: new Date().toISOString(),
    inLanguage: 'es-ES',
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
        name: 'Crear Tienda Online',
        item: 'https://emprendyup.com/crear-tienda-online',
      },
    ],
  };

  // FAQ structured data
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Es realmente gratis crear una tienda online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, con EmprendyUp puedes crear tu tienda online completamente gratis. Sin comisiones por ventas, sin costos mensuales ocultos. Solo pagas cuando vendes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo toma crear una tienda online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Si tienes preparados todos los elementos (fotos, logo, colores, categorías y visión), puedes tener tu tienda lista en aproximadamente 2 horas.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo tener mi propio dominio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, cada tienda incluye un dominio personalizado gratuito del tipo: tutienda.emprendyup.com. También puedes conectar tu propio dominio personalizado.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué métodos de pago puedo usar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes recibir pagos con PSE, tarjetas de crédito y débito, Nequi, Daviplata y otros métodos populares en Latinoamérica.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hay límite en la cantidad de productos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, tu catálogo es ilimitado. Puedes agregar tantos productos como necesites sin restricciones ni costos adicionales.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
