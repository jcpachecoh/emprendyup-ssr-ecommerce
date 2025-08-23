'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NewHeroSection = () => {
  return (
    <div className="container relative z-10">
      <div className="flex items-center justify-center min-h-[60vh]">
        {/* Centered Content */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tu emprendimiento con más <span className="text-fourth-base">alcance, tecnología</span>{' '}
            y comunidad
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crea tu tienda en línea con tu marca, intégrala al marketplace colaborativo y potencia
            tu crecimiento con inteligencia artificial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/registro">
              <motion.button
                className="bg-gradient-to-r from-fourth-base to-yellow-400 text-black font-bold py-4 px-8 rounded-xl shadow-lg text-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Quiero crear mi tienda
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewHeroSection;
