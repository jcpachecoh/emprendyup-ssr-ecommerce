'use client';
import { motion } from 'framer-motion';
import {
  FiShoppingCart,
  FiUsers,
  FiBarChart,
  FiBook,
  FiZap,
  FiMessageCircle,
  FiGlobe,
} from '../assets/icons/vander';

const features = [
  {
    icon: FiShoppingCart,
    title: 'Tienda online + Marketplace colaborativo',
    description:
      'Crea tu tienda personalizada con diseños únicos y conéctala automáticamente a nuestro marketplace. Accede a miles de compradores potenciales desde el primer día y aumenta tu visibilidad en línea.',
  },
  {
    icon: FiUsers,
    title: 'Acompañamiento en creación de tienda',
    description:
      'Nuestro equipo de expertos te guía paso a paso durante todo el proceso. Desde la configuración inicial hasta la optimización de ventas, nunca estarás solo en tu camino emprendedor.',
  },
  {
    icon: FiBarChart,
    title: 'Métricas de ventas y visitas',
    description:
      'Dashboard completo con análisis en tiempo real de tus ventas, visitantes y conversiones. Toma decisiones informadas con reportes detallados y proyecciones de crecimiento.',
  },
  {
    icon: FiBook,
    title: 'CRM integrado',
    description:
      'Sistema de gestión de clientes completamente integrado. Organiza contactos, historial de compras, seguimiento de leads y automatiza tu comunicación para maximizar la retención.',
  },
  {
    icon: FiZap,
    title: 'IA para generar contenido',
    description:
      'Inteligencia artificial avanzada que crea descripciones de productos, posts para redes sociales y contenido de marketing. Ahorra tiempo y mantén tu presencia digital siempre activa.',
  },
  {
    icon: FiMessageCircle,
    title: 'Chatbot WhatsApp',
    description:
      'Automatización inteligente para WhatsApp Business que responde consultas las 24/7, procesa pedidos y mantiene a tus clientes informados sobre el estado de sus compras.',
  },
  {
    icon: FiGlobe,
    title: 'Comunidad con capacitaciones y eventos',
    description:
      'Únete a una red de emprendedores exitosos. Accede a webinars exclusivos, talleres prácticos, networking events y mentorías personalizadas para acelerar tu crecimiento.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const FeaturesSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Todo lo que necesitas para hacer crecer tu negocio
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Herramientas profesionales diseñadas para emprendedores que quieren destacar
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="w-16 h-16 bg-fourth-base rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
