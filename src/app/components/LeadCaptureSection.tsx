'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const LeadCaptureSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="relative py-16 md:py-24 bg-slate-900">
      <div className="container relative">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Únete a la comunidad EmprendyUp
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Beneficios exclusivos para los primeros emprendedores
              </p>
              <div className="inline-flex items-center bg-fourth-base text-black px-4 py-2 rounded-lg font-semibold">
                🎁 Registro gratuito por tiempo limitado
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fourth-base"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fourth-base"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="Tu número de WhatsApp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-fourth-base"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-fourth-base to-yellow-400 text-black font-bold py-4 px-6 rounded-lg shadow-lg text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quiero unirme a la comunidad
              </motion.button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              Al registrarte, aceptas recibir comunicaciones sobre emprendimiento y nuevas
              funcionalidades.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;
