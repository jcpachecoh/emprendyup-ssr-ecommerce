'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiCheck,
  FiStar,
  FiZap,
  FiShoppingBag,
  FiUsers,
  FiMessageCircle,
  FiTrendingUp,
  FiAward,
  FiSettings,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

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
        'Sí, ofrecemos un 20% de descuento al pagar anualmente. Contacta con nuestro equipo de ventas para más información sobre planes anuales.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Elige el plan que impulsa tu emprendimiento <span className="text-4xl">🚀</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Prueba cualquiera de nuestros planes por{' '}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                14 días totalmente gratis
              </span>
              , sin tarjeta de crédito ni ataduras.
            </p>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <FiUsers className="w-4 h-4 mr-2" />
                <span>+500 emprendedores</span>
              </div>
              <div className="flex items-center">
                <FiStar className="w-4 h-4 mr-2 text-yellow-500" />
                <span>4.8/5 valoración</span>
              </div>
              <div className="flex items-center">
                <FiZap className="w-4 h-4 mr-2 text-green-500" />
                <span>Setup en 5 minutos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-6">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 ${
                  plan.popular
                    ? 'border-purple-200 dark:border-purple-700 ring-4 ring-purple-100 dark:ring-purple-900'
                    : 'border-slate-200 dark:border-slate-700'
                } ${plan.popular ? 'md:scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center`}
                    >
                      <FiStar className="w-4 h-4 mr-2" />
                      Más Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-slate-500 dark:text-slate-400 mr-1">$</span>
                      <span className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                        {plan.price.split('.')[0]}
                      </span>
                      <span className="text-lg text-slate-500 dark:text-slate-400">
                        .{plan.price.split('.')[1]}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Precios en COP, sin IVA
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      router.push(`/registrarse?plan=${plan.name}`);
                    }}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl`
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>

                {/* Features List */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <FiCheck className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Global CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Todos los planes incluyen 14 días de prueba gratis, sin tarjeta de crédito, cancela en
            cualquier momento.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push('/registrarse');
            }}
            className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Comenzar prueba gratuita
          </motion.button>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
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
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <FiChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-slate-900 dark:bg-slate-800">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Únete a los emprendedores que ya están creciendo
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">+500</div>
              <div className="text-slate-300">Emprendedores activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">300%</div>
              <div className="text-slate-300">Crecimiento promedio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-slate-300">Soporte disponible</div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              router.push('/registrarse');
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Comenzar mi prueba gratuita
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default PricingPage;
