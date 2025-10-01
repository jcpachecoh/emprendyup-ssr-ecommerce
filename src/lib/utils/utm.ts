interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Genera una URL con parámetros UTM
 */
export function generateUTMUrl(baseUrl: string, utmParams: UTMParams): string {
  const url = new URL(baseUrl);

  // Agregar parámetros UTM obligatorios
  url.searchParams.set('utm_source', utmParams.utm_source);
  url.searchParams.set('utm_medium', utmParams.utm_medium);
  url.searchParams.set('utm_campaign', utmParams.utm_campaign);

  // Agregar parámetros opcionales si existen
  if (utmParams.utm_term) {
    url.searchParams.set('utm_term', utmParams.utm_term);
  }
  if (utmParams.utm_content) {
    url.searchParams.set('utm_content', utmParams.utm_content);
  }

  return url.toString();
}

/**
 * Extrae parámetros UTM de una URL
 */
export function extractUTMParams(url: string): Partial<UTMParams> {
  const urlObj = new URL(url);

  return {
    utm_source: urlObj.searchParams.get('utm_source') || undefined,
    utm_medium: urlObj.searchParams.get('utm_medium') || undefined,
    utm_campaign: urlObj.searchParams.get('utm_campaign') || undefined,
    utm_term: urlObj.searchParams.get('utm_term') || undefined,
    utm_content: urlObj.searchParams.get('utm_content') || undefined,
  };
}

/**
 * URLs de ejemplo para diferentes campañas
 */
export const campaignUrls = {
  google_ads: {
    utm_source: 'google',
    utm_medium: 'cpc',
    utm_campaign: 'emprendedores-2024',
    utm_term: 'crear-tienda-online',
    utm_content: 'anuncio-principal',
  },
  facebook_ads: {
    utm_source: 'facebook',
    utm_medium: 'social',
    utm_campaign: 'emprendedores-facebook',
    utm_content: 'carousel-video',
  },
  email_marketing: {
    utm_source: 'newsletter',
    utm_medium: 'email',
    utm_campaign: 'newsletter-mensual',
    utm_content: 'cta-principal',
  },
  instagram_organic: {
    utm_source: 'instagram',
    utm_medium: 'social',
    utm_campaign: 'contenido-organico',
    utm_content: 'stories',
  },
  linkedin_ads: {
    utm_source: 'linkedin',
    utm_medium: 'social',
    utm_campaign: 'emprendedores-b2b',
    utm_content: 'sponsored-post',
  },
};

/**
 * Genera URLs de ejemplo para testing
 */
export function generateTestUrls(baseUrl: string = 'https://emprendyup.com/captura-leads') {
  return Object.entries(campaignUrls).reduce(
    (acc, [key, params]) => {
      acc[key] = generateUTMUrl(baseUrl, params);
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Valida que los parámetros UTM mínimos estén presentes
 */
export function validateUTMParams(params: Partial<UTMParams>): boolean {
  return !!(params.utm_source && params.utm_medium && params.utm_campaign);
}

/**
 * Formatea parámetros UTM para display
 */
export function formatUTMForDisplay(params: Partial<UTMParams>): string {
  const parts = [];

  if (params.utm_source) parts.push(`Source: ${params.utm_source}`);
  if (params.utm_medium) parts.push(`Medium: ${params.utm_medium}`);
  if (params.utm_campaign) parts.push(`Campaign: ${params.utm_campaign}`);
  if (params.utm_term) parts.push(`Term: ${params.utm_term}`);
  if (params.utm_content) parts.push(`Content: ${params.utm_content}`);

  return parts.join(' | ');
}
