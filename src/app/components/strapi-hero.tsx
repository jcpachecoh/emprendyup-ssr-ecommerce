/**
 * Strapi-powered Hero Component
 *
 * This component fetches hero section content from Strapi CMS
 * and displays it with fallback to static content.
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchHeroSection, getStrapiMediaUrl } from '@/lib/strapiClient';

// Static fallback content
const FALLBACK_HERO = {
  title: 'Impulsa tu Emprendimiento',
  subtitle: 'Con EmprendyUp',
  description: 'Descubre herramientas, recursos y comunidad para hacer crecer tu negocio.',
  primaryButtonText: 'Comenzar Ahora',
  primaryButtonUrl: '/registrarse',
  secondaryButtonText: 'Conocer Más',
  secondaryButtonUrl: '/nosotros',
  backgroundImage: '/images/hero/bg4.jpg',
  heroImage: '/images/hero/bg6.jpg',
};

export default async function StrapiHero() {
  let heroData = null;

  // Try to fetch hero data from Strapi
  try {
    const strapiResponse = await fetchHeroSection();
    heroData = strapiResponse?.data?.attributes;
  } catch (error) {
    console.error('Error fetching hero section from Strapi:', error);
  }

  // Use Strapi data if available, otherwise fall back to static content
  const content = heroData
    ? {
        title: heroData.title,
        subtitle: heroData.subtitle,
        description: heroData.description,
        primaryButtonText: heroData.primaryButtonText,
        primaryButtonUrl: heroData.primaryButtonUrl,
        secondaryButtonText: heroData.secondaryButtonText,
        secondaryButtonUrl: heroData.secondaryButtonUrl,
        backgroundImage: getStrapiMediaUrl(heroData.backgroundImage?.data?.attributes?.url),
        heroImage: getStrapiMediaUrl(heroData.heroImage?.data?.attributes?.url),
        backgroundImageAlt: heroData.backgroundImage?.data?.attributes?.alternativeText,
        heroImageAlt: heroData.heroImage?.data?.attributes?.alternativeText,
      }
    : FALLBACK_HERO;

  return (
    <section
      className="relative table w-full py-36 lg:py-64 bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `url('${content.backgroundImage || FALLBACK_HERO.backgroundImage}')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>

      <div className="container relative">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
          <div className="lg:col-span-7 md:col-span-6">
            <div className="me-6">
              {content.subtitle && (
                <h5 className="mb-3 text-lg text-fourth-base font-semibold">{content.subtitle}</h5>
              )}

              <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5">
                {content.title}
              </h1>

              <p className="text-white/70 text-lg max-w-xl mb-8">{content.description}</p>

              <div className="flex flex-wrap gap-4">
                {content.primaryButtonText && content.primaryButtonUrl && (
                  <Link
                    href={content.primaryButtonUrl}
                    className="py-3 px-6 inline-flex items-center text-base font-medium rounded-md bg-fourth-base border border-fourth-base text-white hover:bg-fourth-base/90 transition-all duration-300"
                  >
                    {content.primaryButtonText}
                  </Link>
                )}

                {content.secondaryButtonText && content.secondaryButtonUrl && (
                  <Link
                    href={content.secondaryButtonUrl}
                    className="py-3 px-6 inline-flex items-center text-base font-medium rounded-md border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    {content.secondaryButtonText}
                  </Link>
                )}
              </div>

              {/* Source indicator */}
              <div className="mt-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60 backdrop-blur-sm">
                  {heroData ? '🔗 Contenido desde Strapi' : '📝 Contenido estático'}
                </span>
              </div>
            </div>
          </div>

          {content.heroImage && (
            <div className="lg:col-span-5 md:col-span-6">
              <div className="relative">
                <Image
                  src={content.heroImage || FALLBACK_HERO.heroImage}
                  width={500}
                  height={600}
                  className="rounded-xl shadow-2xl"
                  alt={
                    heroData?.backgroundImage?.data?.attributes?.alternativeText || content.title
                  }
                  priority
                />

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-fourth-base rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-fourth-base rounded-full opacity-40"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
