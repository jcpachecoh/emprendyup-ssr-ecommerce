'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeriasEmprendedoresClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-extrabold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ferias de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fourth-base to-pink-400">
              Emprendedores
            </span>
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Participa en ferias mensuales. Conecta con miles de clientes potenciales y haz crecer tu
            negocio junto a otros emprendedores.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/captura-leads"
              className="inline-block bg-gradient-to-r from-fourth-base to-pink-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-fourth-base/25 transition-all duration-300"
            >
              🎪 Participar en Ferias
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Qué incluyen nuestras ferias
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🏪',
                title: 'Stand ',
                description: 'Tendrás tu espacio personalizado para exhibir productos y servicios.',
              },
              {
                icon: '👥',
                title: 'Miles de Visitantes',
                description: 'Acceso a una audiencia de miles de emprendedores y compradores.',
              },
              {
                icon: '💬',
                title: 'Chat en Vivo',
                description: 'Interactúa directamente con clientes potenciales en tiempo real.',
              },
              {
                icon: '📈',
                title: 'Networking',
                description: 'Conecta con otros emprendedores para colaboraciones y alianzas.',
              },
              {
                icon: '🎯',
                title: 'Marketing Incluido',
                description: 'Promocionamos la feria en redes sociales y medios digitales.',
              },
              {
                icon: '📊',
                title: 'Métricas Detalladas',
                description: 'Reportes completos de visitantes, interacciones y conversiones.',
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

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-8">
            ¿Listo para participar en las ferias?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Regístrate para recibir invitaciones exclusivas a nuestras ferias de emprendedores.
          </p>
          <Link
            href="/captura-leads"
            className="inline-block bg-gradient-to-r from-fourth-base to-pink-600 text-white font-bold text-xl px-8 py-4 rounded-full shadow-2xl hover:shadow-fourth-base/25 transition-all duration-300"
          >
            📝 Quiero Participar
          </Link>
        </div>
      </section>
    </div>
  );
}
