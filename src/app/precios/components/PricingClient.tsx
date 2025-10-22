'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { FiCheck, FiStar, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';

function PricingClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Cambio: 'annual' como valor por defecto
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Persistencia del ciclo de facturación en la URL
  useEffect(() => {
    const billing = searchParams.get('billing');
    if (billing === 'monthly' || billing === 'annual') {
      setBillingCycle(billing);
    }
  }, [searchParams]);

  const handleTabChange = (cycle: 'monthly' | 'annual') => {
    setBillingCycle(cycle);
    console.log('analytics: pricing_tab_change', { billingCycle: cycle });
  };

  const plans = [
    {
      name: 'Basic',
      price: '19.900',
      period: 'mes',
      description: 'Perfecto para emprender y testear tu idea de negocio',
      features: [
        'Tienda básica con subdominio .emprendy',
        'CRM básico para gestionar clientes',
        'Plantillas básicas personalizables',
        'Soporte por email',
        'Analytics básicos',
      ],
      cta: 'Registrar Mi Interés',
      popular: false,
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Pro',
      price: '129.000',
      period: 'mes',
      description: 'El plan más popular para emprendedores que quieren escalar',
      features: [
        'Todo lo incluido en Basic',
        'Chatbot integrado WhatsApp',
        'Automatizaciones de WhatsApp a la medida',
        'Agente IA conversacional de ventas',
        'Asesoría para mejora de plantilla y dominio propio',
        'Integración con comunidad colaborativa',
        'Acceso anticipado a ferias presenciales',
        'CRM avanzado con automatizaciones',
        'Asesoría para integración de pagos',
        'Integración con Shopify y Tienda Nube',
        'Integración de productos en marketplace (5% fee)',
        'Marketing automation y alcance de marca',
      ],
      cta: 'Registrar Mi Interés',
      popular: true,
      color: 'from-purple-500 to-pink-600',
    },
    {
      name: 'Emprendy Partner',
      price: '189.000',
      period: 'mes',
      description: 'Para emprendedores serios que buscan el máximo crecimiento',
      features: [
        'Todo lo incluido en Pro',
        'Acceso directo y prioritario a ferias anticipadas',
        'Prioridad en asesorías personalizadas',
        'Automatizaciones de WhatsApp a la medida',
        'Automatización a la medida de procesos',
        'Capacitación continua personalizada',
        'Networking en ferias y capacitaciones físicas exclusivas',
        'Gestor de cuenta dedicado',
        'Integración APIs personalizadas',
      ],
      cta: 'Registrar Mi Interés',
      popular: false,
      color: 'from-emerald-400 to-teal-600',
    },
  ];

  const discountText = billingCycle === 'annual' ? ' (20% de descuento)' : '';

  const faqs = [
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer:
        'Sí, podrás actualizar o degradar tu plan en cualquier momento desde tu panel de control cuando esté disponible. Los cambios se reflejarán inmediatamente.',
    },
    {
      question: '¿Hay permanencia mínima?',
      answer:
        'No habrá permanencia mínima. Podrás cancelar tu suscripción cuando quieras sin penalizaciones.',
    },
    {
      question: '¿Qué métodos de pago aceptarán?',
      answer:
        'Aceptaremos tarjetas de crédito y débito, PSE, Nequi, y transferencias bancarias. Todos los pagos serán seguros y encriptados.',
    },
    {
      question: '¿Ofrecerán periodo de prueba?',
      answer:
        'Sí, todos los planes incluirán 14 días de prueba gratuita. No necesitarás tarjeta de crédito para empezar.',
    },
    {
      question: '¿Hay costos adicionales o comisiones?',
      answer:
        'No habrá costos ocultos. Solo pagarás la mensualidad del plan. Las comisiones por transacciones van directamente a la pasarela de pago (típicamente 2.9% + $900).',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero/bg-shape.png')] opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6">
              Planes que se adaptarán a tu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-blue-400">
                crecimiento
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              Elige el plan perfecto para tu emprendimiento. Sin costos ocultos, sin comisiones por
              venta, solo transparencia total cuando esté disponible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-full p-1 flex">
              <button
                onClick={() => handleTabChange('monthly')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-fourth-base text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => handleTabChange('annual')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  billingCycle === 'annual'
                    ? 'bg-fourth-base text-white shadow-lg'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Anual
                <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  20% OFF
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {plans.map((plan, index) => {
                const monthlyPrice = parseInt(plan.price.replace('.', ''));
                const annualPrice = Math.round(monthlyPrice * 0.8); // 20% discount
                const displayPrice = billingCycle === 'annual' ? annualPrice : monthlyPrice;
                const formattedPrice = displayPrice.toLocaleString('es-CO');

                return (
                  <motion.div
                    key={plan.name}
                    className={`relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 ${
                      plan.popular ? 'ring-2 ring-fourth-base' : ''
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-fourth-base to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                          <FiStar className="w-4 h-4 mr-2" />
                          Más Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-white/70 mb-6">{plan.description}</p>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={billingCycle}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="mb-8"
                        >
                          <div className="flex items-baseline justify-center">
                            <span className="text-4xl font-extrabold text-white">
                              ${formattedPrice}
                            </span>
                            <span className="text-white/60 ml-2">/{plan.period}</span>
                          </div>
                          <AnimatePresence>
                            {billingCycle === 'annual' && (
                              <motion.p
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-green-400 text-sm mt-2"
                              >
                                {discountText}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </AnimatePresence>

                      <ul className="text-left space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start text-white/90"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.05 }}
                          >
                            <FiCheck className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href="/impulsa-tu-emprendimiento"
                          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 inline-block text-center ${
                            plan.popular
                              ? 'bg-gradient-to-r from-fourth-base to-blue-600 text-white hover:shadow-xl hover:shadow-fourth-base/25'
                              : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                          }`}
                        >
                          {plan.cta}
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
            <p className="text-xl text-white/70">
              Resolvemos tus dudas sobre nuestros planes y precios futuros
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl mb-4 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="w-6 h-6 text-white/70" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-white/80">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PricingClient() {
  return (
    <Suspense fallback={<LoaderIcon />}>
      <PricingClientContent />
    </Suspense>
  );
}
