'use client';
import { motion } from 'framer-motion';
import RotatingWords from './RotatingWords';

const HeroSection = () => {
  return (
    <div className="flex items-center text-center justify-center w-full flex-col bg-transparent">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        El marketplace para emprendedores
        <br />
        donde los <span className="text-primary">clientes son nuestra prioridad</span>
      </motion.h1>

      <motion.p
        className="text-lg text-slate-600 max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        Conecta tu tienda, muestra tus productos y haz crecer tu emprendimiento con tecnología,
        comunidad y recompensas que impulsan tu impacto.
      </motion.p>

      <motion.div
        className="flex items-center justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <RotatingWords />
      </motion.div>

      <motion.a
        href="#registro"
        className="inline-block bg-primary text-gray-900 bg-white font-semibold py-3 px-6 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        Únete gratis
      </motion.a>
    </div>
  );
};

export default HeroSection;
