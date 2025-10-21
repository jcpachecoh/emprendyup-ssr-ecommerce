'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HerramientasClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Herramientas
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-purple-400">
              Todo en Uno
            </span>
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Suite completa de herramientas profesionales que estarán integradas para gestionar y
            hacer crecer tu emprendimiento desde una sola plataforma.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/captura-leads"
              className="inline-block bg-gradient-to-r from-fourth-base to-purple-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-fourth-base/25 transition-all duration-300"
            >
              🛠️ Quiero Estas Herramientas
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Herramientas que tendrás disponibles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏪',
                title: 'Tienda Online',
                description: 'Crea y gestiona tu ecommerce con catálogo ilimitado.',
              },
              {
                icon: '👥',
                title: 'CRM Avanzado',
                description: 'Gestiona clientes, seguimientos y oportunidades de venta.',
              },
              {
                icon: '📦',
                title: 'Inventario',
                description: 'Control total de stock, proveedores y movimientos.',
              },
              {
                icon: '🧾',
                title: 'Facturación',
                description: 'Genera facturas, cotizaciones y reportes contables.',
              },
              {
                icon: '📊',
                title: 'Analytics',
                description: 'Métricas avanzadas de ventas, marketing y finanzas.',
              },
              {
                icon: '📱',
                title: 'Marketing Digital',
                description: 'Campañas de email, WhatsApp y redes sociales.',
              },
              {
                icon: '💰',
                title: 'Finanzas',
                description: 'Control de ingresos, gastos y flujo de caja.',
              },
              {
                icon: '🎯',
                title: 'Automatización',
                description: 'Workflows que ahorran tiempo y aumentan eficiencia.',
              },
            ].map((tool, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                <p className="text-white/80 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                ¿Por qué una plataforma integral?
              </h2>
              <ul className="space-y-4">
                {[
                  'Todo conectado: datos sincronizados entre herramientas',
                  'Un solo login para acceder a todas las funciones',
                  'Precio único en lugar de múltiples suscripciones',
                  'Soporte técnico centralizado y especializado',
                  'Actualizaciones automáticas en todas las herramientas',
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-white text-lg"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-purple-400 text-2xl mr-4">⭐</span>
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
                <h3 className="text-3xl font-bold text-white mb-4">Ahorra tiempo y dinero</h3>
                <p className="text-white/80 mb-6">
                  En lugar de usar 8+ herramientas diferentes, tendrás todo integrado en una sola
                  plataforma.
                </p>
                <Link
                  href="/captura-leads"
                  className="inline-block bg-gradient-to-r from-fourth-base to-purple-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-xl hover:shadow-fourth-base/25 transition-all duration-300"
                >
                  🚀 Mostrar Mi Interés
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
