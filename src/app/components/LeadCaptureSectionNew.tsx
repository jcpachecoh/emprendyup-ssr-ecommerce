'use client';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const REGISTER_MUTATION = gql`
  mutation CreateEntrepreneur($data: CreateEntrepreneurDto!) {
    createEntrepreneur(data: $data) {
      id
      companyName
      country
      city
      name
      description
      phone
      website
      email
      category
      createdAt
      referralSource
    }
  }
`;

const mappedValues = [
  { name: 'Tecnología', value: 'TECHNOLOGY' },
  { name: 'Comida', value: 'FOOD' },
  { name: 'Moda', value: 'RETAIL' },
  { name: 'Educación', value: 'EDUCATION' },
  { name: 'Salud', value: 'HEALTH' },
  { name: 'Otro', value: 'OTHER' },
];

const mappedReferralSources = [
  { name: 'Google', value: 'GOOGLE' },
  { name: 'Redes Sociales', value: 'SOCIAL_MEDIA' },
  { name: 'Amigo', value: 'FRIEND' },
  { name: 'Evento', value: 'EVENT' },
  { name: 'Publicidad', value: 'ADVERTISEMENT' },
  { name: 'Otro', value: 'OTHER' },
];

// Mapeo de UTM source a referral source
const mapUTMToReferralSource = (utmSource: string, utmMedium?: string): string => {
  if (!utmSource) return '';

  const source = utmSource.toLowerCase();
  const medium = utmMedium?.toLowerCase() || '';

  // Google Ads, Google Organic
  if (source.includes('google')) {
    return 'GOOGLE';
  }

  // Social Media platforms
  if (
    source.includes('facebook') ||
    source.includes('instagram') ||
    source.includes('linkedin') ||
    source.includes('twitter') ||
    source.includes('tiktok') ||
    medium === 'social'
  ) {
    return 'SOCIAL_MEDIA';
  }

  // Email campaigns
  if (source.includes('email') || source.includes('newsletter') || medium === 'email') {
    return 'OTHER'; // Puedes crear una nueva opción EMAIL si es necesario
  }

  // Paid advertising
  if (
    medium === 'cpc' ||
    medium === 'display' ||
    medium === 'banner' ||
    source.includes('ads') ||
    source.includes('advertisement')
  ) {
    return 'ADVERTISEMENT';
  }

  // Events
  if (source.includes('event') || source.includes('conference') || source.includes('meetup')) {
    return 'EVENT';
  }

  // Referrals
  if (source.includes('referral') || source.includes('friend') || medium === 'referral') {
    return 'FRIEND';
  }

  // Default to OTHER for unknown sources
  return 'OTHER';
};

interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

interface FormData {
  companyName: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  country: string;
  city: string;
  description: string;
  referralSource: string;
  acceptTerms: boolean;
}

interface LeadCaptureSectionNewProps {
  utmData?: UTMData;
}

const LeadCaptureSectionNew = ({ utmData }: LeadCaptureSectionNewProps) => {
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      companyName: '',
      name: '',
      email: '',
      phone: '',
      website: '',
      category: '',
      country: '',
      city: '',
      description: '',
      referralSource: '',
      acceptTerms: false,
    },
  });
  const [registerBusiness, { data, loading, error }] = useMutation(REGISTER_MUTATION);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [extractedUtmData, setExtractedUtmData] = useState<UTMData | null>(null);

  // Extract UTM parameters from URL if not provided as props
  useEffect(() => {
    // Check if we're on the client side to avoid hydration issues
    if (typeof window === 'undefined') return;

    const currentUtmData = utmData || {
      utm_source: searchParams?.get('utm_source') || '',
      utm_medium: searchParams?.get('utm_medium') || '',
      utm_campaign: searchParams?.get('utm_campaign') || '',
      utm_term: searchParams?.get('utm_term') || '',
      utm_content: searchParams?.get('utm_content') || '',
    };

    setExtractedUtmData(currentUtmData);

    // Auto-fill referral source based on UTM data
    if (currentUtmData.utm_source) {
      const mappedReferralSource = mapUTMToReferralSource(
        currentUtmData.utm_source,
        currentUtmData.utm_medium
      );
      if (mappedReferralSource) {
        setValue('referralSource', mappedReferralSource);
      }
    }

    // Save to localStorage for tracking
    if (currentUtmData.utm_source) {
      try {
        localStorage.setItem('utm_tracking', JSON.stringify(currentUtmData));
      } catch (storageError) {
        console.warn('Failed to save UTM data to localStorage:', storageError);
      }
    }
  }, [utmData, searchParams, setValue]);

  const onSubmit = async (formData: FormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Format referral source with UTM context if available
      let referralSourceWithContext = formData.referralSource;
      if (extractedUtmData?.utm_source && extractedUtmData?.utm_campaign) {
        // Add UTM context to referral source for better tracking
        const utmContext = `${extractedUtmData.utm_source}/${extractedUtmData.utm_campaign}`;
        referralSourceWithContext = `${formData.referralSource}_UTM:${utmContext}`;
      }

      // Use existing payload structure - no extra UTM fields (exclude acceptTerms)
      const { acceptTerms, ...formDataWithoutTerms } = formData;

      const completeData = {
        ...formDataWithoutTerms,
        category: formData.category,
        referralSource: referralSourceWithContext, // Enhanced with UTM context
      };

      // Registrar en la base de datos
      const result = await registerBusiness({
        variables: {
          data: completeData,
        },
      });

      console.log('Registration result:', result);

      // Enviar notificación a Slack a través de API route
      if (result.data?.createEntrepreneur) {
        try {
          const slackResponse = await fetch('/api/send-slack-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              companyName: formData.companyName,
              phone: formData.phone,
              category: formData.category,
              city: formData.city,
              country: formData.country,
              description: formData.description,
              referralSource: referralSourceWithContext, // Use enhanced referral source
              website: formData.website,
              // Include UTM data for Slack notification tracking
              ...(extractedUtmData?.utm_source && {
                utm_source: extractedUtmData.utm_source,
                utm_medium: extractedUtmData.utm_medium,
                utm_campaign: extractedUtmData.utm_campaign,
              }),
            }),
          });

          if (!slackResponse.ok) {
            console.warn('Slack notification failed:', await slackResponse.text());
          } else {
            console.log('✅ Slack notification sent successfully');
          }
        } catch (slackError) {
          console.warn('Failed to send Slack notification:', slackError);
          // No hacer que falle el registro por esto
        }
      }

      // Analytics tracking
      if (typeof window !== 'undefined' && extractedUtmData?.utm_source) {
        try {
          if (window.gtag) {
            window.gtag('event', 'lead_conversion', {
              event_category: 'Lead Generation',
              event_label: formData.category,
              utm_source: extractedUtmData.utm_source,
              utm_medium: extractedUtmData.utm_medium,
              utm_campaign: extractedUtmData.utm_campaign,
              referral_source: formData.referralSource,
            });
          }
        } catch (analyticsError) {
          console.warn('Analytics tracking failed:', analyticsError);
        }
      }

      setSuccess(true);
      reset();
    } catch (e) {
      console.error('Error registering business:', e);
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url(/images/hero/bg-shape.png)] bg-center bg-no-repeat bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-fourth-base/10 via-blue-600/10 to-purple-600/10"></div>

      <div className="container relative mx-auto px-4 py-12">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left Side - Orange Full Height Modern Background, No Images */}
          <motion.div
            className="relative flex flex-col justify-center items-center h-full min-h-[600px] rounded-3xl shadow-2xl bg-transparent to-yellow-300"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col justify-center items-center h-full w-full px-8 py-12">
              <motion.h2
                className="text-4xl lg:text-5xl font-extrabold text-white mb-6 drop-shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                ¡El futuro del emprendimiento!
              </motion.h2>
              <motion.p
                className="text-xl lg:text-2xl text-white/90 mb-8 text-center max-w-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Sé parte de la revolución. Regístrate para acceso temprano a la plataforma que
                transformará tu emprendimiento.
              </motion.p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/20 rounded-xl px-6 py-4 text-white font-semibold text-lg shadow-md text-center">
                  ⏰ Acceso Temprano
                </div>
                <div className="bg-white/20 rounded-xl px-6 py-4 text-white font-semibold text-lg shadow-md text-center">
                  🤖 IA del Futuro
                </div>
                <div className="bg-white/20 rounded-xl px-6 py-4 text-white font-semibold text-lg shadow-md text-center">
                  � Beneficios Exclusivos
                </div>
                <div className="bg-white/20 rounded-xl px-6 py-4 text-white font-semibold text-lg shadow-md text-center">
                  � Notificaciones VIP
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h2
                  className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Muestra tu{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-blue-600">
                    Interés
                  </span>
                </motion.h2>
                <p className="text-slate-600 text-lg mb-6">
                  Sé de los primeros en conocer EmprendyUp
                </p>

                {/* Special Offer Badge */}
                <motion.div
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⭐ Acceso Temprano - Lista de Espera
                </motion.div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Company Name & Personal Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">
                      Nombre Emprendimiento *
                    </label>
                    <input
                      {...register('companyName', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                      placeholder="Mi emprendimiento"
                    />
                    {errors.companyName && (
                      <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">Tu Nombre *</label>
                    <input
                      {...register('name', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                      placeholder="Tu nombre completo"
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">Email *</label>
                    <input
                      type="email"
                      {...register('email', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">WhatsApp *</label>
                    <input
                      {...register('phone', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                      placeholder="+573001234567"
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="block font-semibold mb-2 text-slate-700">Sitio Web</label>
                  <input
                    {...register('website')}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                    placeholder="https://miemprendimiento.com (opcional)"
                  />
                </div>

                {/* Category & Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">Categoría *</label>
                    <select
                      {...register('category', { required: true })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                    >
                      <option value="">Selecciona categoría</option>
                      {mappedValues.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                    )}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-slate-700">País/Ciudad *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        {...register('country', { required: true })}
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all text-sm"
                        placeholder="Colombia"
                      />
                      <input
                        {...register('city', { required: true })}
                        className="w-full px-3 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all text-sm"
                        placeholder="Bogotá"
                      />
                    </div>
                    {(errors.country || errors.city) && (
                      <span className="text-red-500 text-xs mt-1 block">Ambos requeridos</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-semibold mb-2 text-slate-700">Descripción *</label>
                  <textarea
                    {...register('description', { required: true })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all resize-none"
                    placeholder="Describe brevemente tu emprendimiento..."
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                  )}
                </div>

                {/* Referral Source */}
                <div>
                  <label className="block font-semibold mb-2 text-slate-700">
                    ¿Cómo nos encontraste? *
                  </label>
                  <select
                    {...register('referralSource', { required: true })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black bg-white focus:outline-none focus:ring-2 focus:ring-fourth-base focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona una opción</option>
                    {mappedReferralSources.map((referral) => (
                      <option key={referral.value} value={referral.value}>
                        {referral.name}
                      </option>
                    ))}
                  </select>
                  {errors.referralSource && (
                    <span className="text-red-500 text-xs mt-1 block">Requerido</span>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="pt-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('acceptTerms', { required: true })}
                      className="mt-1 w-4 h-4 text-fourth-base bg-gray-100 border-gray-300 rounded focus:ring-fourth-base focus:ring-2"
                      id="acceptTerms"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-slate-700 leading-relaxed">
                      He leído y acepto los{' '}
                      <a
                        href="/terms"
                        target="_blank"
                        className="text-fourth-base hover:text-blue-600 underline font-medium"
                      >
                        Términos y Condiciones
                      </a>{' '}
                      y el{' '}
                      <a
                        href="/privacy"
                        target="_blank"
                        className="text-fourth-base hover:text-blue-600 underline font-medium"
                      >
                        Tratamiento de Datos Personales
                      </a>
                      . Autorizo el tratamiento de mis datos para fines comerciales y de contacto.
                    </label>
                  </div>
                  {errors.acceptTerms && (
                    <span className="text-red-500 text-xs mt-1 block">
                      Debes aceptar los términos y condiciones para continuar
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-fourth-base to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: loading || isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: loading || isSubmitting ? 1 : 0.98 }}
                >
                  {loading || isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      {isSubmitting ? 'Enviando...' : 'Procesando...'}
                    </div>
                  ) : (
                    <>Registrarme</>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                {success && (
                  <motion.div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    🎉 ¡Gracias por tu interés! Te notificaremos cuando esté listo.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ❌ Error: {error.message}
                  </motion.div>
                )}

                {/* Trust Indicators */}
                <div className="text-center pt-4 border-t border-slate-200 text-black">
                  <p className="text-sm text-gray-500 mb-2">
                    🔒 100% Seguro • 🛡️ Sin Spam • 📋 Datos Protegidos
                  </p>
                  <p className="text-xs text-slate-400">
                    Tus datos están seguros y protegidos según nuestra política de privacidad
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureSectionNew;
