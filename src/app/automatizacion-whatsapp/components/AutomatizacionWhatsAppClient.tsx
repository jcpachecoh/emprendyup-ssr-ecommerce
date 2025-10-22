'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AutomatizacionWhatsAppClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Automatización
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-green-400">
              WhatsApp Business
            </span>
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Chatbots inteligentes que trabajarán 24/7 para convertir conversaciones en ventas.
            Automatización que estará disponible cuando lancemos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/impulsa-tu-emprendimiento"
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            >
              💬 Quiero Mi Bot de WhatsApp
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Lo que podrá hacer tu bot de WhatsApp
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'Respuestas Automáticas',
                description:
                  'Responderá instantáneamente a consultas frecuentes, precios y disponibilidad.',
              },
              {
                icon: '🛒',
                title: 'Gestión de Pedidos',
                description:
                  'Procesará pedidos completos directamente desde WhatsApp sin intervención manual.',
              },
              {
                icon: '📋',
                title: 'Catálogo Interactivo',
                description:
                  'Mostrará tu catálogo completo con fotos, precios y botones de compra.',
              },
              {
                icon: '⏰',
                title: 'Atención 24/7',
                description: 'Trabajará día y noche, capturando ventas incluso cuando duermas.',
              },
              {
                icon: '📊',
                title: 'Métricas Detalladas',
                description: 'Tendrás reportes de conversaciones, conversiones y ventas generadas.',
              },
              {
                icon: '🎯',
                title: 'Seguimiento Inteligente',
                description:
                  'Hará seguimiento a clientes potenciales que no completaron la compra.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Beneficios de automatizar tu WhatsApp
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                {[
                  'Aumentarás las ventas hasta un 300%',
                  'Ahorrarás 8+ horas diarias de atención manual',
                  'Capturarás leads incluso de madrugada',
                  'Mejorarás la experiencia del cliente',
                  'Tendrás métricas precisas de conversión',
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-white text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-green-400 text-2xl mr-4">✅</span>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">¿Listo para automatizar?</h3>
                <p className="text-white/80 mb-6">
                  Únete a la lista de espera y sé de los primeros en tener tu bot funcionando.
                </p>
                <Link
                  href="/impulsa-tu-emprendimiento"
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                >
                  🚀 Registrar Mi Interés
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
