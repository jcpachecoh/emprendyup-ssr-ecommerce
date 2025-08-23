import React from 'react';
import Navbar from './components/navbar';
import Tagline from './components/tagline';
import Switcher from './components/switcher';
import ScrollToTop from './components/scroll-to-top';
import NewHeroSection from './components/NewHeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import LeadCaptureSection from './components/LeadCaptureSection';
import TestimonialsSection from './components/TestimonialsSection';
import EnhancedFooter from './components/EnhancedFooter';
import SEOHomepage from './components/SEOHomepage';

export default function Home() {
  return (
    <>
      <SEOHomepage />
      <Tagline />

      {/* Hero Section */}
      <main>
        <section
          className="flex items-center justify-between w-full md:h-screen pt-32 overflow-hidden bg-white dark:bg-slate-100 bg-[url('/images/hero/teenager.webp')] bg-cover bg-center bg-no-repeat relative"
          aria-label="Sección principal de EmprendyUp"
        >
          {/* Overlay background */}
          <div className="absolute inset-0 bg-black/50"></div>
          <NewHeroSection />
        </section>

        {/* Features Section */}
        <section aria-label="Características y beneficios de EmprendyUp">
          <FeaturesSection />
        </section>

        {/* How It Works Section */}
        <section aria-label="Cómo funciona la plataforma EmprendyUp">
          <HowItWorksSection />
        </section>

        {/* Lead Capture Section */}
        <section aria-label="Únete a la comunidad EmprendyUp">
          <LeadCaptureSection />
        </section>

        {/* Testimonials Section */}
        <section aria-label="Testimonios de emprendedores">
          <TestimonialsSection />
        </section>
      </main>

      <Switcher />
      <ScrollToTop />
    </>
  );
}
