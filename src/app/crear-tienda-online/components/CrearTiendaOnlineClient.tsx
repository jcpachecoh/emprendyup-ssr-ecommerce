'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import NavbarSimple from '../../components/NavBar/NavBarSimple';
import Footer from '../../components/footer';
import Switcher from '../../components/switcher';
import ScrollToTop from '../../components/scroll-to-top';

import {
  FiCamera,
  FiAward,
  FiDroplet,
  FiTag,
  FiEye,
  FiCheckCircle,
  FiPlay,
} from '../../assets/icons/vander';
import ChatTienda from '../../components/chatTienda';

const steps = [
  {
    icon: FiCamera,
    step: 'Paso 1',
    title: 'Fotos de Productos',
    description:
      'Prepara fotos de alta calidad de tus productos. Mínimo 3 fotos por producto con buena iluminación y diferentes ángulos.',
    requirements: [
      'Resolución mínima 800x800px',
      'Fondo limpio y profesional',
      'Múltiples ángulos',
      'Buena iluminación',
    ],
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    icon: FiAward,
    step: 'Paso 2',
    title: 'Logo de tu Marca',
    description:
      'Diseña o prepara el logo que representará tu marca. Debe ser simple, memorable y funcionar en diferentes tamaños.',
    requirements: [
      'Formato PNG con fondo transparente',
      'Resolución alta (mínimo 512x512px)',
      'Versiones en claro y oscuro',
      'Legible en tamaños pequeños',
    ],
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  {
    icon: FiDroplet,
    step: 'Paso 3',
    title: 'Colores de tu Marca',
    description:
      'Define la paleta de colores que identificará tu marca. Incluye color primario, secundario y neutros.',
    requirements: [
      'Color primario principal',
      'Color secundario complementario',
      'Colores neutros (gris, blanco, negro)',
      'Códigos hexadecimales exactos',
    ],
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
  },
  {
    icon: FiTag,
    step: 'Paso 4',
    title: 'Categoría de Productos',
    description:
      'Clasifica tus productos en categorías claras para facilitar la navegación de tus clientes.',
    requirements: [
      'Máximo 5 categorías principales',
      'Nombres descriptivos y claros',
      'Subcategorías si es necesario',
      'Jerarquía lógica',
    ],
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
  },
  {
    icon: FiEye,
    step: 'Paso 5',
    title: 'Visión del Emprendimiento',
    description:
      'Define claramente qué problemas resuelves, tu propuesta de valor única y hacia dónde quieres llevar tu negocio.',
    requirements: [
      'Misión clara en 1-2 líneas',
      'Visión a futuro del negocio',
      'Propuesta de valor única',
      'Público objetivo definido',
    ],
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: {
    opacity: 0,
    y: 50,
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

export default function CrearTiendaClient() {
  return (
    <>
      <NavbarSimple navlight={false} />

      {/* Hero Section */}
      <section className="relative table w-full py-36 bg-gradient-to-br from-fourth-base/10 via-blue-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url(/images/hero/bg3.png)] bg-center bg-no-repeat bg-cover opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-fourth-base/10 via-green-50/30 to-blue-50/30 dark:from-slate-800/60 dark:via-slate-900/60 dark:to-slate-800/60"></div>
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 text-5xl md:text-6xl leading-tight font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Crear Tienda Online{' '}
              <span className="bg-gradient-to-br from-fourth-base to-green-600 bg-clip-text text-transparent">
                Gratis
              </span>
            </motion.h1>

            <motion.p
              className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Te guiamos paso a paso para crear tu tienda online profesional. Sin comisiones, con
              dominio personalizado y todas las herramientas que necesitas para vender en línea
              exitosamente.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="#pasos"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center bg-fourth-base text-white rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl"
              >
                <FiPlay className="me-2 text-lg" />
                Ver Guía Completa
              </Link>
              <Link
                href="/captura-leads"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full border-2 border-fourth-base text-fourth-base hover:bg-fourth-base hover:text-white transition-all"
              >
                Comenzar Ahora
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="pasos" className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h2 className="mb-4 md:text-4xl text-3xl font-bold text-slate-900 dark:text-white">
              5 Pasos para Crear tu Tienda Online
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
              Sigue esta guía paso a paso y tendrás todo listo para lanzar tu tienda online
              profesional
            </p>
          </div>

          <motion.div
            className="grid lg:grid-cols-1 grid-cols-1 mt-8 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border ${step.borderColor} ${step.bgColor} p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                variants={stepVariants}
              >
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${step.color} bg-white dark:bg-slate-900 shadow-md`}
                    >
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                      <span
                        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${step.color} bg-white dark:bg-slate-900`}
                      >
                        {step.step}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-3">
                      {step.requirements.map((req, reqIndex) => (
                        <div
                          key={reqIndex}
                          className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
                        >
                          <FiCheckCircle className={`w-5 h-5 ${step.color} flex-shrink-0`} />
                          <span className="text-sm">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative md:py-24 py-16 bg-gradient-to-br from-fourth-base to-green-600">
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 md:text-4xl text-3xl font-bold text-white">
              ¿Listo para Crear tu Tienda Online?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
              Únete a cientos de emprendedores que ya están construyendo su futuro digital. Sin
              comisiones, sin límites, solo éxito.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/captura-leads"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center bg-white text-fourth-base rounded-full hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
              >
                <FiCheckCircle className="me-2 text-lg" />
                Empezar a Crear Mi Tienda
              </Link>
              <Link
                href="/por-que-emprendy"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full border-2 border-white text-white hover:bg-white hover:text-fourth-base transition-all"
              >
                Ver Más Beneficios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
