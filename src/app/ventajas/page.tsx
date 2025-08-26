'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import NavbarSimple from '../components/NavBar/NavBarSimple';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import {
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiZap,
  FiTarget,
  FiAward,
  FiArrowRight,
} from '../assets/icons/vander';

const ventajas = [
  {
    icon: FiTrendingUp,
    title: 'Crecimiento 10x Más Rápido',
    description:
      'Nuestra IA y herramientas automatizadas aceleran tu crecimiento comparado con plataformas tradicionales.',
    stats: '+300% de crecimiento promedio',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    icon: FiShield,
    title: 'Seguridad de Nivel Empresarial',
    description:
      'Protección SSL, backup automático y sistema de pagos seguros que supera a la competencia.',
    stats: '99.9% de uptime garantizado',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    icon: FiUsers,
    title: 'Comunidad Activa de +50K',
    description:
      'La mayor red de emprendedores colaborando, comprando y vendiendo entre sí en Latinoamérica.',
    stats: '+50,000 emprendedores activos',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    icon: FiZap,
    title: 'IA Generativa Avanzada',
    description:
      'Único marketplace con IA que crea contenido, optimiza precios y personaliza experiencias automáticamente.',
    stats: 'Ahorra +20 horas semanales',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  {
    icon: FiTarget,
    title: 'Targeting Inteligente',
    description:
      'Algoritmos que conectan tus productos con los clientes ideales dentro del ecosistema colaborativo.',
    stats: '+85% de conversión efectiva',
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  {
    icon: FiAward,
    title: 'Acompañamiento Personalizado',
    description:
      'Mentores especializados y capacitaciones exclusivas que ninguna otra plataforma ofrece.',
    stats: 'Mentorías 1:1 incluidas',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
  },
];

const comparacion = [
  {
    feature: 'Marketplace Colaborativo',
    emprendyup: true,
    otros: false,
  },
  {
    feature: 'IA Generativa Integrada',
    emprendyup: true,
    otros: false,
  },
  {
    feature: 'Comunidad de +50K',
    emprendyup: true,
    otros: false,
  },
  {
    feature: 'Mentorías Personalizadas',
    emprendyup: true,
    otros: false,
  },
  {
    feature: 'CRM + Chatbot WhatsApp',
    emprendyup: true,
    otros: 'parcial',
  },
  {
    feature: 'Comisiones por Venta',
    emprendyup: '2-4%',
    otros: '8-15%',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const floatingAnimation = {
  y: [-10, 10],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse' as const,
  },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
  },
};

export default function VentajasCompetitivas() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative table w-full py-36 bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url(/images/hero/bg2.png)] bg-center bg-no-repeat bg-cover opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10"></div>
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="mb-6 text-5xl md:text-6xl leading-tight font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Nuestras{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-green-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Ventajas Competitivas
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Descubre por qué EmprendyUp supera a la competencia y se ha convertido en la
              plataforma líder para emprendedores en Latinoamérica.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Link
                href="#ventajas"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Explorar Ventajas
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ventajas Section */}
      <section id="ventajas" className="relative md:py-24 py-16 bg-white dark:bg-slate-900">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 md:text-4xl text-3xl font-bold text-slate-900 dark:text-white">
              6 Razones por las que nos eligen
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Ventajas únicas que nos diferencian de cualquier otra plataforma de e-commerce
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ventajas.map((ventaja, index) => (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-3xl ${ventaja.bgColor} border-2 ${ventaja.borderColor} hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden`}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="w-full h-full bg-gradient-to-br from-current rounded-full transform rotate-45 scale-150"></div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${ventaja.bgColor} border-2 ${ventaja.borderColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <ventaja.icon className={`h-8 w-8 ${ventaja.color}`} />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    {ventaja.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-4">
                    {ventaja.description}
                  </p>

                  <motion.div
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${ventaja.color} bg-white dark:bg-slate-800 border ${ventaja.borderColor}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiTrendingUp className="w-4 h-4 mr-2" />
                    {ventaja.stats}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              EmprendyUp vs Competencia
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Comparación directa de características clave
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <div className="font-bold text-lg">Característica</div>
                <div className="font-bold text-lg text-center">EmprendyUp</div>
                <div className="font-bold text-lg text-center">Otros</div>
              </div>

              {comparacion.map((item, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-3 p-6 border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="font-semibold text-slate-900 dark:text-white">{item.feature}</div>
                  <div className="text-center">
                    {typeof item.emprendyup === 'boolean' ? (
                      item.emprendyup ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full">
                          ✗
                        </span>
                      )
                    ) : (
                      <span className="font-semibold text-green-600">{item.emprendyup}</span>
                    )}
                  </div>
                  <div className="text-center">
                    {typeof item.otros === 'boolean' ? (
                      item.otros ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full">
                          ✗
                        </span>
                      )
                    ) : item.otros === 'parcial' ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full">
                        ~
                      </span>
                    ) : (
                      <span className="font-semibold text-red-600">{item.otros}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-fourth-base/5 via-purple-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-purple-200 dark:border-purple-800">
              <motion.h3
                className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¿Listo para la ventaja competitiva?
              </motion.h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Únete a los +50,000 emprendedores que ya disfrutan de estas ventajas exclusivas.
                Comienza gratis hoy mismo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/crear-tienda"
                    className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    Obtener Ventajas Ahora
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/por-que-emprendy"
                    className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Ver Más Beneficios
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
