'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LeadCaptureSectionNew from '../components/LeadCaptureSectionNew';
import UTMTracker from '../components/UTMTracker';
import LandingHeader from './components/LandingHeader';
import LandingFooter from './components/LandingFooter';
import { motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';

const CapturaLeads = () => {
  const searchParams = useSearchParams();
  const [utmData, setUtmData] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
  });

  useEffect(() => {
    // Capturar parámetros UTM de la URL
    const utmParams = {
      utm_source: searchParams.get('utm_source') || '',
      utm_medium: searchParams.get('utm_medium') || '',
      utm_campaign: searchParams.get('utm_campaign') || '',
      utm_term: searchParams.get('utm_term') || '',
      utm_content: searchParams.get('utm_content') || '',
    };

    setUtmData(utmParams);

    // Guardar en localStorage para tracking
    localStorage.setItem('utm_tracking', JSON.stringify(utmParams));

    // Analytics tracking (Google Analytics 4)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Landing Page - Lead Capture',
        page_location: window.location.href,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Header personalizado */}
      <LandingHeader />

      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url(/images/hero/bg-shape.png)] bg-center bg-no-repeat bg-cover opacity-5"></div>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              La plataforma que
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-blue-400">
                Transformará tu Emprendimiento
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Estamos construyendo la <strong>plataforma más innovadora</strong> para emprendedores.
              Regístrate para ser de los primeros en acceder a herramientas de IA, mentorías
              exclusivas y una comunidad que impulsará tu éxito.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔨</span>
                <span className="font-semibold">En Desarrollo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span className="font-semibold">Lanzamiento 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span className="font-semibold">Acceso Temprano</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#registro"
              className="inline-block bg-gradient-to-r from-fourth-base to-blue-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-fourth-base/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📝 Regristrarme
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-20 bg-black/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Qué tendrá <span className="text-fourth-base">EmprendyUp</span>?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Las herramientas que transformarán tu manera de emprender
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'IA Integrada',
                description:
                  'Tendrás un asistente inteligente que te ayudará a tomar decisiones estratégicas basadas en datos',
              },
              {
                icon: '📈',
                title: 'Crecimiento Acelerado',
                description:
                  'Accederás a metodologías probadas y estrategias que acelerarán el crecimiento de tu negocio',
              },
              {
                icon: '🌐',
                title: 'Marketplace Global',
                description:
                  'Podrás acceder a un mercado internacional y conectar con clientes de todo el mundo',
              },
              {
                icon: '💬',
                title: 'Soporte 24/7',
                description:
                  'Contarás con un chatbot inteligente y equipo de soporte siempre disponible',
              },
              {
                icon: '🎓',
                title: 'Mentorías Exclusivas',
                description:
                  'Tendrás sesiones personalizadas con expertos en emprendimiento y business mentors',
              },
              {
                icon: '🔧',
                title: 'Herramientas Completas',
                description:
                  'Dispondrás de todo lo necesario: CRM, Analytics, Marketing, Ventas en una sola plataforma',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-white/80 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* UTM Tracking Status */}
      {/* <div className="container mx-auto px-4 py-6">
        <UTMTracker />
      </div> */}

      {/* Lead Capture Section */}
      <section id="registro">
        <LeadCaptureSectionNew utmData={utmData} />
      </section>

      {/* Footer personalizado */}
      <LandingFooter />
    </div>
  );
};

export default function CapturaLeadsPage() {
  return (
    <Suspense fallback={<LoaderIcon />}>
      <CapturaLeads />
    </Suspense>
  );
}
