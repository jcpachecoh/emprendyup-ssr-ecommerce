'use client';
import { motion } from 'framer-motion';
import RotatingWords from './RotatingWords';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="flex items-center text-center justify-center w-full flex-col mb-10 z-10">
      <motion.h1
        className="text-xl md:text-4xl font-extrabold text-white dark:text-white mb-4 leading-relaxed px-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Impulsa tu negocio, conecta con nuevos compradores
        <br />
        haz crecer tu marca con{' '}
        <span className="text-fourth-base bg-black px-4 rounded-md">Emprendyup</span>
      </motion.h1>

      {/* <motion.p
        className="text-lg text-slate-300 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        Conecta tu tienda, muestra tus productos y haz crecer tu emprendimiento con tecnología, comunidad y recompensas
        que impulsan tu impacto.
      </motion.p> */}

      {/* <motion.div
        className="flex items-center justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <RotatingWords />
      </motion.div> */}

      <motion.div
        className="inline-block text-gray-900 bg-fourth-base font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <Link href="/registro" className="text-black">
          Únete gratis
        </Link>
      </motion.div>
    </div>
  );
};

export default HeroSection;
