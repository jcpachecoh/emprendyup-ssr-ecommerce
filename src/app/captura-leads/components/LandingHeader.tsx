'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LandingHeader = () => {
  return (
    <motion.header
      className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.svg"
              width={48}
              height={48}
              alt="EmprendyUp Logo"
              className="h-12 w-12"
              priority
            />
            <span className="text-2xl font-bold text-white">
              Emprendy<span className="text-fourth-base">Up</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#beneficios"
              className="text-white/90 hover:text-fourth-base transition-colors font-medium"
            >
              Beneficios
            </a>
            <a
              href="#registro"
              className="text-white/90 hover:text-fourth-base transition-colors font-medium"
            >
              Registro
            </a>
            <Link
              href="/"
              className="text-white/90 hover:text-fourth-base transition-colors font-medium"
            >
              Sitio Principal
            </Link>
          </nav>

          {/* CTA Button */}
          <motion.a
            href="#registro"
            className="bg-gradient-to-r from-fourth-base to-blue-600 text-white font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Empezar Gratis
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};

export default LandingHeader;
