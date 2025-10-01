'use client';

import { useState } from 'react';

export default function UTMTestUrls() {
  const [baseUrl] = useState(() =>
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}/captura-leads`
      : 'http://localhost:3000/captura-leads'
  );

  const testCampaigns = [
    {
      name: 'Google Ads - Emprendedores',
      url: `${baseUrl}?utm_source=google&utm_medium=cpc&utm_campaign=emprendedores-2024&utm_term=crear-tienda-online&utm_content=anuncio-principal`,
      expectedMapping: 'Google → GOOGLE_UTM:google/emprendedores-2024',
    },
    {
      name: 'Facebook Social Campaign',
      url: `${baseUrl}?utm_source=facebook&utm_medium=social&utm_campaign=entrepreneurs-fb&utm_content=carousel-video`,
      expectedMapping: 'Redes Sociales → SOCIAL_MEDIA_UTM:facebook/entrepreneurs-fb',
    },
    {
      name: 'Email Newsletter',
      url: `${baseUrl}?utm_source=newsletter&utm_medium=email&utm_campaign=monthly-newsletter&utm_content=cta-principal`,
      expectedMapping: 'Otro → OTHER_UTM:newsletter/monthly-newsletter',
    },
    {
      name: 'LinkedIn B2B Campaign',
      url: `${baseUrl}?utm_source=linkedin&utm_medium=social&utm_campaign=emprendedores-b2b&utm_content=sponsored-post`,
      expectedMapping: 'Redes Sociales → SOCIAL_MEDIA_UTM:linkedin/emprendedores-b2b',
    },
    {
      name: 'Display Advertising',
      url: `${baseUrl}?utm_source=website&utm_medium=display&utm_campaign=banner-campaign&utm_content=main-banner`,
      expectedMapping: 'Publicidad → ADVERTISEMENT_UTM:website/banner-campaign',
    },
    {
      name: 'Event Referral',
      url: `${baseUrl}?utm_source=conference&utm_medium=event&utm_campaign=startup-meetup-2024&utm_content=speaker-link`,
      expectedMapping: 'Evento → EVENT_UTM:conference/startup-meetup-2024',
    },
    {
      name: 'Friend Referral',
      url: `${baseUrl}?utm_source=referral&utm_medium=word-of-mouth&utm_campaign=friend-referral&utm_content=share-link`,
      expectedMapping: 'Amigo → FRIEND_UTM:referral/friend-referral',
    },
  ];

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copiada al portapapeles! 📋');
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">🧪 URLs de Prueba - UTM Tracking</h1>
        <p className="text-gray-600 mb-6">
          Usa estas URLs para probar el tracking UTM y la auto-selección del campo de referencia.
        </p>

        <div className="grid gap-4">
          {testCampaigns.map((campaign, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{campaign.name}</h3>
                  <p className="text-sm text-green-600 font-medium">
                    Expected: {campaign.expectedMapping}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(campaign.url)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                    title="Copiar URL"
                  >
                    📋 Copiar
                  </button>
                  <a
                    href={campaign.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    🚀 Probar
                  </a>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <code className="text-xs text-gray-600 break-all">{campaign.url}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Cómo probar:</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. Haz clic en 🚀 Probar para abrir la URL en una nueva pestaña</li>
            <li>2. Observa el componente UTM Tracker que muestra los parámetros detectados</li>
            <li>3. Verifica que el campo ¿Cómo nos encontraste? se auto-complete</li>
            <li>4. Completa el formulario para ver cómo se almacena el referral source</li>
            <li>5. Revisa las notificaciones de Slack para ver los datos UTM</li>
          </ol>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Nota Importante:</h3>
          <p className="text-sm text-yellow-700">
            Estas URLs son para testing únicamente. En producción, configura tus campañas reales con
            los parámetros UTM apropiados según tu estrategia de marketing.
          </p>
        </div>
      </div>
    </div>
  );
}
