'use client';
import Head from 'next/head';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import Switcher from '../components/switcher';
import ScrollToTop from '../components/scroll-to-top';

import {
  FiShoppingBag,
  FiUsers,
  FiBarChart,
  FiUser,
  FiZap,
  FiMessageCircle,
  FiGlobe,
} from '../assets/icons/vander';

const features = [
  {
    icon: FiShoppingBag,
    title: 'Tienda Online + Marketplace Colaborativo',
    description:
      'Crea tu tienda profesional y únete a nuestro marketplace donde todos los emprendedores colaboran y se potencian mutuamente.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: FiUsers,
    title: 'Acompañamiento en Creación de Tienda',
    description:
      'No estás solo. Te guiamos paso a paso en la creación y optimización de tu tienda online con mentores especializados.',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: FiBarChart,
    title: 'Métricas de Ventas y Visitas',
    description:
      'Dashboard completo con analíticas avanzadas para que tomes decisiones basadas en datos reales de tu negocio.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: FiUser,
    title: 'CRM Integrado',
    description:
      'Gestiona todos tus clientes en un solo lugar. Seguimiento de leads, historial de compras y comunicación centralizada.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: FiZap,
    title: 'IA para Generar Contenido',
    description:
      'Inteligencia artificial que te ayuda a crear descripciones de productos, posts para redes sociales y contenido de marketing.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: FiMessageCircle,
    title: 'Chatbot WhatsApp',
    description:
      'Automatiza tu atención al cliente con chatbot inteligente que responde 24/7 y convierte conversaciones en ventas.',
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: FiGlobe,
    title: 'Comunidad con Capacitaciones y Eventos',
    description:
      'Accede a una red de emprendedores, webinars exclusivos, masterclasses y eventos de networking para hacer crecer tu negocio.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
  },
];

// Animaciones simplificadas
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

const cardVariants = {
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

export default function PorQueEmprendy() {
  return (
    <>
      <Head>
        <title>¿Por qué elegir EmprendyUp? | Beneficios para Emprendedores</title>
        <meta
          name="description"
          content="Descubre los beneficios de crear tu tienda online y unirte al marketplace colaborativo de EmprendyUp. Acompañamiento, métricas, CRM, IA, chatbot y comunidad para emprendedores."
        />
        <meta
          name="keywords"
          content="emprendedores, tienda online, marketplace, CRM, inteligencia artificial, chatbot, comunidad, capacitaciones, eventos, ventas, analíticas"
        />
        <meta property="og:title" content="¿Por qué elegir EmprendyUp?" />
        <meta
          property="og:description"
          content="Crea tu tienda profesional y únete al marketplace colaborativo. Accede a métricas, CRM, IA, chatbot y comunidad de emprendedores."
        />
        <meta property="og:image" content="/images/logo-dark.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emprendyup.com/por-que-emprendy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Por qué elegir EmprendyUp?" />
        <meta
          name="twitter:description"
          content="Descubre los beneficios de EmprendyUp para emprendedores: tienda online, marketplace, CRM, IA, chatbot y comunidad."
        />
        <meta name="twitter:image" content="/images/logo-dark.png" />
      </Head>
      {/* Hero Section */}
      <section className="relative table w-full py-36 bg-gradient-to-br from-fourth-base/10 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url(/images/hero/bg-shape.png)] bg-red-100 bg-center bg-no-repeat bg-cover opacity-10"></div>
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
              ¿Por qué elegir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-blue-600">
                EmprendyUp
              </span>
              ?
            </motion.h1>

            <motion.p
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              La plataforma integral que transforma tu idea en un negocio digital exitoso. Más que
              una tienda online, es tu ecosistema completo para emprender.
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/crear-tienda-online"
                className="py-4 px-8 inline-flex items-cente`r justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-fourth-base to-blue-600 hover:from-fourth-base/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Comenzar Ahora
                <FiZap className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Breadcrumb */}
        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-slate-600 hover:text-fourth-base">
              <Link href="/">EmprendyUp</Link>
            </li>
            <li className="inline-block text-base text-slate-600 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-fourth-base"
              aria-current="page"
            >
              Por qué EmprendyUp
            </li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative md:py-24 py-16 bg-white dark:bg-slate-900">
        <div className="container relative">
          <motion.div
            className="grid grid-cols-1 pb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 md:text-4xl text-3xl md:leading-normal leading-normal font-bold text-slate-900 dark:text-white">
              Todo lo que necesitas para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-blue-600">
                emprender con éxito
              </span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-lg">
              Descubre las herramientas y características que hacen de EmprendyUp la mejor decisión
              para tu emprendimiento digital.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-16 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative p-8 rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fourth-base/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div
                    className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <Icon className={`${feature.color} h-8 w-8`} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-fourth-base transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-fourth-base/20 transition-colors duration-300"></div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-fourth-base/10 to-blue-600/10 rounded-3xl p-12 border border-fourth-base/20">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                ¿Listo para transformar tu emprendimiento?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Únete a miles de emprendedores que ya están creciendo con EmprendyUp. Comienza
                gratis y descubre todo lo que podemos hacer por tu negocio.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/crear-tienda-online"
                  className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full bg-gradient-to-r from-fourth-base to-blue-600 hover:from-fourth-base/90 hover:to-blue-600/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  Crear Mi Tienda Gratis
                </Link>
                <Link
                  href="/contacto"
                  className="py-4 px-8 inline-flex items-center justify-center font-semibold tracking-wide align-middle duration-500 text-lg text-center rounded-full border-2 border-fourth-base text-fourth-base hover:bg-fourth-base hover:text-white transition-all"
                >
                  Hablar con un Experto
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
