/**
 * Strapi-powered Testimonials Component
 *
 * This component fetches testimonials from Strapi CMS
 * and displays them with fallback to static content.
 */

import React from 'react';
import Image from 'next/image';
import { fetchTestimonials, getStrapiMediaUrl } from '@/lib/strapiClient';

// Static fallback testimonials
const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'María González',
    role: 'Fundadora de Artesanías MG',
    content:
      'EmprendyUp me ayudó a llevar mi negocio al siguiente nivel. Las herramientas y la comunidad son increíbles.',
    avatar: '/images/client/01.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    role: 'CEO de TechStart',
    content:
      'La plataforma es muy intuitiva y las capacitaciones son de alta calidad. Recomendado al 100%.',
    avatar: '/images/client/02.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ana López',
    role: 'Emprendedora Digital',
    content: 'Encontré todos los recursos que necesitaba para validar y lanzar mi idea de negocio.',
    avatar: '/images/client/03.jpg',
    rating: 5,
  },
];

interface TestimonialsProps {
  limit?: number;
  title?: string;
  subtitle?: string;
}

export default async function StrapiTestimonials({
  limit = 3,
  title = 'Lo que dicen nuestros emprendedores',
  subtitle = 'Testimonios reales de nuestra comunidad',
}: TestimonialsProps) {
  let strapiTestimonials = null;

  // Try to fetch testimonials from Strapi
  try {
    const strapiResponse = await fetchTestimonials(limit);
    strapiTestimonials = strapiResponse?.data;
  } catch (error) {
    console.error('Error fetching testimonials from Strapi:', error);
  }

  // Use Strapi data if available, otherwise fall back to static content
  const testimonials =
    strapiTestimonials && strapiTestimonials.length > 0
      ? strapiTestimonials.map((testimonial: any) => ({
          id: testimonial.id,
          name: testimonial.attributes.name,
          role: testimonial.attributes.role || testimonial.attributes.company,
          content: testimonial.attributes.content || testimonial.attributes.testimonial,
          avatar:
            getStrapiMediaUrl(testimonial.attributes.avatar?.data?.attributes?.url) ||
            '/images/client/default.jpg',
          rating: testimonial.attributes.rating || 5,
        }))
      : FALLBACK_TESTIMONIALS.slice(0, limit);

  return (
    <section className="relative md:py-24 py-16 bg-slate-50 dark:bg-slate-800">
      <div className="container relative">
        {/* Section Header */}
        <div className="grid grid-cols-1 pb-6 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            {title}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">{subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
          {testimonials.map((testimonial: any) => (
            <div
              key={testimonial.id}
              className="group relative bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4">
                <div className="w-8 h-8 bg-fourth-base rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              {/* Stars Rating */}
              <div className="flex items-center gap-1 mb-4 pt-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-slate-600 dark:text-slate-400 mb-6 italic leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src={testimonial.avatar}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    alt={testimonial.name}
                  />
                  {/* Verified badge */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Source indicator */}
        <div className="text-center mt-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 shadow-sm">
            {strapiTestimonials && strapiTestimonials.length > 0
              ? '🔗 Testimonios desde Strapi CMS'
              : '📝 Testimonios estáticos'}
          </span>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h4 className="text-xl font-semibold mb-4">
            ¿Listo para ser el próximo testimonio de éxito?
          </h4>
          <div className="flex justify-center gap-4">
            <a
              href="/registrarse"
              className="py-3 px-6 inline-flex items-center text-base font-medium rounded-md bg-fourth-base border border-fourth-base text-white hover:bg-fourth-base/90 transition-all duration-300"
            >
              Únete Ahora
            </a>
            <a
              href="/nosotros"
              className="py-3 px-6 inline-flex items-center text-base font-medium rounded-md border border-fourth-base text-fourth-base hover:bg-fourth-base hover:text-white transition-all duration-300"
            >
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
