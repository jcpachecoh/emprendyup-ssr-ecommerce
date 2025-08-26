'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import NavbarSimple from '../components/NavBar/NavBarSimple';
import Footer from '../components/footer';
import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import {
  FiCamera,
  FiAward,
  FiDroplet,
  FiTag,
  FiEye,
  FiCheckCircle,
  FiPlay,
} from '../assets/icons/vander';
import ChatTienda from '../components/chatTienda';
import InteractiveChatStore from '../components/InteractiveChatStore';

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

export default function CrearTienda() {
  return (
    <>
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
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Crea tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-green-600">
                Tienda Online
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Sigue estos 5 pasos simples para tener todo listo antes de crear tu tienda. Te guiamos
              en cada etapa para asegurar el éxito de tu emprendimiento digital.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="#pasos"
                className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-fourth-base to-green-600 hover:from-fourth-base/90 hover:to-green-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Ver los Pasos
                <FiPlay className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* <ChatTienda /> */}

      <InteractiveChatStore />

      {/* Steps Section */}
      <section id="pasos" className="relative md:py-24 py-16 bg-white dark:bg-slate-900">
        <div className="container">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 md:text-4xl text-3xl font-bold text-slate-900 dark:text-white">
              5 Pasos para Crear tu Tienda
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Prepara estos elementos antes de comenzar y tendrás una tienda profesional en minutos
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-1 grid-cols-1 mt-12 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`group relative p-8 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} hover:shadow-xl transition-all duration-500 hover:scale-[1.02]`}
                variants={stepVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Icon and Step Number */}
                  <div className="flex-shrink-0">
                    <div
                      className={`relative w-20 h-20 rounded-2xl ${step.bgColor} border-2 ${step.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className={`h-10 w-10 ${step.color}`} />
                      <div
                        className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-fourth-base to-green-600 text-white text-sm font-bold flex items-center justify-center`}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <span
                        className={`text-sm font-semibold ${step.color} uppercase tracking-wider`}
                      >
                        {step.step}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Requirements */}
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
                      {step.requirements.map((requirement, reqIndex) => (
                        <div key={reqIndex} className="flex items-center gap-3">
                          <FiCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-slate-600 dark:text-slate-300">{requirement}</span>
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
      <section className="relative py-20 bg-gradient-to-br from-fourth-base/5 via-green-50 to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-fourth-base/10 to-green-600/10 rounded-3xl p-12 border border-fourth-base/20">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                ¿Ya tienes todo listo?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Perfecto. Ahora puedes crear tu tienda online en pocos minutos. Nuestro asistente te
                guiará paso a paso para configurar todo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/registro"
                  className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-fourth-base to-green-600 hover:from-fourth-base/90 hover:to-green-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Empezar a Crear Mi Tienda
                </Link>
                <Link
                  href="/por-que-emprendy"
                  className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full border-2 border-fourth-base text-fourth-base hover:bg-fourth-base hover:text-white transition-all"
                >
                  Ver Más Beneficios
                </Link>
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
