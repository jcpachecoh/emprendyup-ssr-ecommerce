'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiCheck, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function PricingPage() {
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
      cta: 'Empieza gratis',
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
      cta: 'Empieza gratis',
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
      cta: 'Empieza gratis',
      popular: false,
      color: 'from-emerald-400 to-teal-600',
    },
  ];

  const faqs = [
    {
      question: '¿Puedo cancelar en cualquier momento?',
      answer:
        'Sí, puedes cancelar tu suscripción en cualquier momento desde tu panel de control. No hay contratos a largo plazo ni penalizaciones por cancelación.',
    },
    {
      question: '¿Qué incluye la prueba gratis de 14 días?',
      answer:
        'La prueba gratuita incluye acceso completo a todas las funciones del plan que elijas, sin limitaciones. No necesitas ingresar datos de tarjeta de crédito para comenzar.',
    },
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer:
        'Por supuesto. Puedes actualizar o reducir tu plan cuando quieras. Los cambios se aplicarán en tu próximo ciclo de facturación.',
    },
    {
      question: '¿Los precios incluyen IVA?',
      answer:
        'Los precios mostrados no incluyen IVA. El IVA se calculará automáticamente según tu país de residencia al momento del pago.',
    },
    {
      question: '¿Ofrecen descuentos por pago anual?',
      answer:
        'Sí, ofrecemos un 30% de descuento al pagar anualmente. El ahorro se aplica automáticamente al seleccionar la opción de facturación anual.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const handlePlanSelection = (plan: string, billingCycle: string) => {
    // Redirigir a la página de captura de leads con los parámetros del plan
    router.push(`/captura-leads?plan=${encodeURIComponent(plan)}&billing=${billingCycle}#registro`);

    // Registrar evento de analytics
    console.log('analytics: pricing_plan_selected', {
      plan,
      billingCycle,
      timestamp: new Date().toISOString(),
    });
  };

  const getDisplayPrice = (price: string) => {
    const base = parseFloat(price.replace('.', ''));
    if (billingCycle === 'annual') {
      const discounted = base * 12 * 0.7; // 30% OFF anual
      return Math.round(discounted).toLocaleString('es-CO');
    }
    return base.toLocaleString('es-CO');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Animación suave para el precio
  const priceVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero */}
      <section className="pt-20 pb-8 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Elige el plan que impulsa tu emprendimiento 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
        >
          Prueba cualquiera de nuestros planes por{' '}
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            14 días totalmente gratis
          </span>
          , sin tarjeta de crédito ni ataduras.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center items-center gap-3 mb-10"
          role="tablist"
          aria-label="Ciclo de facturación"
        >
          <button
            role="tab"
            aria-selected={billingCycle === 'monthly'}
            aria-controls="pricing-cards"
            tabIndex={billingCycle === 'monthly' ? 0 : -1}
            onClick={() => handleTabChange('monthly')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              billingCycle === 'monthly'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            Mensual
          </button>

          <div className="relative">
            <button
              role="tab"
              aria-selected={billingCycle === 'annual'}
              aria-controls="pricing-cards"
              tabIndex={billingCycle === 'annual' ? 0 : -1}
              onClick={() => handleTabChange('annual')}
              className={`relative px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              Anual
            </button>
            <AnimatePresence>
              {billingCycle === 'annual' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                >
                  -30%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section
        id="pricing-cards"
        className="pb-20 px-6"
        role="region"
        aria-label="Planes de precios"
      >
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-purple-200 dark:border-purple-700 ring-4 ring-purple-100 dark:ring-purple-900'
                    : 'border-slate-200 dark:border-slate-700'
                } ${plan.popular ? 'md:scale-105' : ''}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <div
                      className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg`}
                    >
                      <FiStar className="w-4 h-4 mr-2" />
                      Más Popular
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{plan.description}</p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billingCycle}
                      variants={priceVariants}
                      initial="initial"
                      animate="animate"
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="mb-6"
                    >
                      <div className="flex items-baseline justify-center">
                        <span className="text-sm text-slate-500 mr-1">$</span>
                        <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                          {getDisplayPrice(plan.price)}
                        </span>
                        <span className="text-slate-500 ml-2">
                          {billingCycle === 'annual' ? '/año' : '/mes'}
                        </span>
                      </div>
                      <AnimatePresence>
                        {billingCycle === 'annual' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm text-green-600 dark:text-green-400 font-semibold mt-2">
                              ✓ Ahorrando 30% vs plan mensual
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                              <span className="line-through">
                                $
                                {(parseFloat(plan.price.replace('.', '')) * 12).toLocaleString(
                                  'es-CO'
                                )}
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePlanSelection(plan.name, billingCycle)}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100'
                    }`}
                    aria-label={`Empezar con plan ${plan.name} - ${billingCycle === 'annual' ? 'facturación anual' : 'facturación mensual'}`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <FiCheck
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Resolvemos las dudas más comunes sobre nuestros planes
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown
                      className="w-5 h-5 text-slate-500 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                      </div>
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
