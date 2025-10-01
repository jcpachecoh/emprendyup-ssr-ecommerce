'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LandingFooter = () => {
  return (
    <motion.footer
      className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo.svg"
                width={40}
                height={40}
                alt="EmprendyUp Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-white">
                Emprend<span className="text-fourth-base">yUp</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-md">
              La plataforma líder para emprendedores que buscan hacer crecer su negocio con
              herramientas de IA, mentorías y una comunidad global.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-fourth-base font-bold text-2xl">100+</span>
                <span className="text-white/70 text-sm">Emprendedores</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-fourth-base font-bold text-2xl">95%</span>
                <span className="text-white/70 text-sm">Tasa de Éxito</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/ventajas"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Ventajas
              </Link>
              <Link
                href="/precios"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Precios
              </Link>
              <Link
                href="/contacto"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="space-y-2">
              <Link
                href="/terms"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacy"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/politica-borrado-datos"
                className="block text-white/70 hover:text-fourth-base transition-colors"
              >
                Borrado de Datos
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} EmprendyUp. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-white/60 text-sm">🔒 100% Seguro</span>
              <span className="text-white/60 text-sm">🛡️ Sin Spam</span>
              <span className="text-white/60 text-sm">📋 GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default LandingFooter;
