'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// UTM to referral source mapping (same as in LeadCaptureSectionNew)
const mapUTMToReferralSource = (utmSource: string, utmMedium?: string): string => {
  if (!utmSource) return '';

  const source = utmSource.toLowerCase();
  const medium = utmMedium?.toLowerCase() || '';

  if (source.includes('google')) return 'GOOGLE';
  if (
    source.includes('facebook') ||
    source.includes('instagram') ||
    source.includes('linkedin') ||
    source.includes('twitter') ||
    source.includes('tiktok') ||
    medium === 'social'
  )
    return 'SOCIAL_MEDIA';
  if (source.includes('email') || source.includes('newsletter') || medium === 'email')
    return 'OTHER';
  if (
    medium === 'cpc' ||
    medium === 'display' ||
    medium === 'banner' ||
    source.includes('ads') ||
    source.includes('advertisement')
  )
    return 'ADVERTISEMENT';
  if (source.includes('event') || source.includes('conference') || source.includes('meetup'))
    return 'EVENT';
  if (source.includes('referral') || source.includes('friend') || medium === 'referral')
    return 'FRIEND';

  return 'OTHER';
};

const mappedReferralSources = [
  { name: 'Google', value: 'GOOGLE' },
  { name: 'Redes Sociales', value: 'SOCIAL_MEDIA' },
  { name: 'Amigo', value: 'FRIEND' },
  { name: 'Evento', value: 'EVENT' },
  { name: 'Publicidad', value: 'ADVERTISEMENT' },
  { name: 'Otro', value: 'OTHER' },
];

export default function UTMTracker() {
  const searchParams = useSearchParams();
  const [utmData, setUtmData] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });
  const [mappedReferral, setMappedReferral] = useState('');
  const [finalReferralSource, setFinalReferralSource] = useState('');

  useEffect(() => {
    const currentUtmData = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
    };

    setUtmData(currentUtmData);

    // Map to referral source
    const referralSource = mapUTMToReferralSource(
      currentUtmData.utm_source,
      currentUtmData.utm_medium
    );
    setMappedReferral(referralSource);

    // Create final referral source with UTM context
    if (currentUtmData.utm_source && currentUtmData.utm_campaign) {
      const utmContext = `${currentUtmData.utm_source}/${currentUtmData.utm_campaign}`;
      setFinalReferralSource(`${referralSource}_UTM:${utmContext}`);
    } else {
      setFinalReferralSource(referralSource);
    }
  }, [searchParams]);

  const getReferralDisplayName = (value: string) => {
    const found = mappedReferralSources.find((r) => r.value === value);
    return found ? found.name : value;
  };

  if (!utmData.utm_source) {
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 max-w-2xl mx-auto mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">🔍 UTM Tracking Status</h3>
        <p className="text-gray-600 text-sm">
          No UTM parameters detected. Add UTM parameters to the URL to see tracking in action.
        </p>
        <div className="mt-3 text-xs text-gray-500">
          <strong>Example:</strong> ?utm_source=google&utm_medium=cpc&utm_campaign=test-campaign
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto mb-6">
      <h3 className="font-semibold text-blue-800 mb-3">📊 UTM Tracking Active</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-blue-700 mb-2">Detected UTM Parameters:</h4>
          <div className="text-sm space-y-1">
            {Object.entries(utmData).map(
              ([key, value]) =>
                value && (
                  <div key={key} className="flex">
                    <span className="font-mono text-blue-600 min-w-[120px]">{key}:</span>
                    <span className="text-blue-800">{value}</span>
                  </div>
                )
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-blue-700 mb-2">Form Auto-fill:</h4>
          <div className="text-sm space-y-1">
            <div className="flex">
              <span className="font-medium min-w-[100px]">Mapped to:</span>
              <span className="text-green-700 font-medium">
                {getReferralDisplayName(mappedReferral)}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium min-w-[100px]">Stored as:</span>
              <span className="text-green-700 font-mono text-xs">{finalReferralSource}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs text-blue-600 bg-blue-100 rounded p-2">
        ✅ The ¿Cómo nos encontraste? field will be automatically prefilled based on your UTM source
      </div>
    </div>
  );
}
