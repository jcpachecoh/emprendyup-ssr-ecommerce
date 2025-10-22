'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiShield, FiUsers, FiZap, FiArrowRight } from '../assets/icons/vander';

const advantagesPreview = [
  {
    icon: FiTrendingUp,
    title: 'Crecimiento 10x Más Rápido',
    description: 'IA y herramientas automatizadas que aceleran tu crecimiento.',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    icon: FiShield,
    title: 'Seguridad Empresarial',
    description: 'Protección SSL, backup automático y 99.9% de uptime.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    icon: FiUsers,
    title: 'Comunidad +50K',
    description: 'La mayor red de emprendedores en Latinoamérica.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    icon: FiZap,
    title: 'IA Generativa',
    description: 'Única plataforma con IA que crea contenido automáticamente.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AdvantagesPreviewSection() {
  return (
    <section className="relative md:py-24 py-16 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 bg-[url(/images/hero/bg2.png)] bg-center bg-no-repeat bg-cover opacity-5"></div>
      <div className="container relative">
        <motion.div
          className="grid grid-cols-1 pb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="mb-6 md:text-4xl text-3xl font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Nuestras{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-green-600">
              Ventajas Competitivas
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Descubre por qué somos la plataforma líder para emprendedores en Latinoamérica
          </motion.p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-12 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {advantagesPreview.map((advantage, index) => (
            <motion.div
              key={index}
              className={`group relative p-6 rounded-2xl ${advantage.bgColor} border-2 ${advantage.borderColor} hover:shadow-xl transition-all duration-500 cursor-pointer`}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <div className="relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-xl ${advantage.bgColor} border ${advantage.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <advantage.icon className={`h-6 w-6 ${advantage.color}`} />
                </motion.div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {advantage.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>

              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform rotate-45 scale-150"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/ventajas"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold tracking-wide text-lg text-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-500 group"
            >
              Ver Todas las Ventajas
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-bold text-purple-600 dark:text-purple-400">+300%</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Crecimiento Promedio</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Emprendedores Activos</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <h4 className="text-2xl font-bold text-green-600 dark:text-green-400">99.9%</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Uptime Garantizado</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
