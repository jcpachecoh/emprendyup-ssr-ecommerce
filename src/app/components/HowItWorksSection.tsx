'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: '🚀',
    title: 'Regístrate y configura tu perfil',
    description:
      'Completa tu registro en menos de 3 minutos. Nuestro asistente inteligente te guía para configurar tu perfil empresarial, subir tu logo y definir tu identidad de marca.',
    features: ['Registro gratuito', 'Configuración guiada', 'Plantillas personalizables'],
  },
  {
    number: '02',
    icon: '🛍️',
    title: 'Crea y personaliza tu tienda',
    description:
      'Diseña tu tienda online con nuestras herramientas. Sube tus productos, configura métodos de pago y define tus políticas de envío. Todo integrado automáticamente.',
    features: ['Editor visual intuitivo', 'Catálogo de productos', 'Pagos seguros integrados'],
  },
  {
    number: '03',
    icon: '🌐',
    title: 'Conéctate al marketplace',
    description:
      'Tu tienda se integra automáticamente a nuestro marketplace colaborativo. Accede a miles de compradores potenciales y aprovecha el tráfico de toda la comunidad.',
    features: ['Exposición masiva', 'Tráfico compartido', 'Algoritmo de recomendación'],
  },
  {
    number: '04',
    icon: '📈',
    title: 'Optimiza y haz crecer tu negocio',
    description:
      'Utiliza nuestras herramientas de IA, analytics avanzados y participa en la comunidad. Recibe mentorías, accede a capacitaciones y expande tu red de contactos.',
    features: ['IA para contenido', 'Analytics avanzados', 'Comunidad activa'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const HowItWorksSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-gray-50 dark:bg-slate-800">
      <div className="container relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Cuatro simples pasos para transformar tu emprendimiento y conectarte con miles de
            compradores
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center group"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-16 left-1/2 h-1 bg-gradient-to-r from-fourth-base to-yellow-400 z-0"
                  style={{
                    width: 'calc(100% + 1rem)',
                    transformOrigin: 'left center',
                  }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                />
              )}

              {/* Step Card */}
              <div className="relative z-10 bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Step Number & Icon */}
                <div className="relative mb-6 flex-shrink-0">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-fourth-base to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <span className="text-3xl">{step.icon}</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-center flex-grow">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center text-base text-slate-700 dark:text-slate-300 font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-4 h-4 bg-gradient-to-r from-fourth-base to-yellow-400 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-sm"
                          initial={{ scale: 0, rotate: -90 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 15,
                            delay: 0.15 * featureIndex,
                          }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 180,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <svg
                            className="w-2.5 h-2.5 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                        <span className="text-fourth-base font-semibold">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
