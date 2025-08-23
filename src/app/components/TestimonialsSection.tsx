'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: 'María González',
    business: 'Artesanías Luna',
    image: '/images/client/01.jpg',
    text: 'Gracias a EmprendyUp aumenté mis ventas en un 300% en solo 3 meses. La comunidad es increíble.',
  },
  {
    name: 'Carlos Rodríguez',
    business: 'TechSolutions',
    image: '/images/client/02.jpg',
    text: 'El acompañamiento y las herramientas de IA me ayudaron a profesionalizar mi negocio completamente.',
  },
  {
    name: 'Ana Martín',
    business: 'Eco Productos',
    image: '/images/client/03.jpg',
    text: 'La integración con el marketplace me abrió un mundo de nuevas oportunidades de negocio.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Lo que dicen nuestros emprendedores
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Historias reales de éxito de nuestra comunidad
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  width={60}
                  height={60}
                  alt={testimonial.name}
                  className="w-15 h-15 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {testimonial.business}
                  </p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic">
                &quot;{testimonial.text}&quot;
              </p>
              <div className="flex text-fourth-base mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
