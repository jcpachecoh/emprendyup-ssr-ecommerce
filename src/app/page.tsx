import React from 'react';
import Navbar from './components/NavBar/navbar';
import Tagline from './components/tagline';
import Switcher from './components/switcher';
import ScrollToTop from './components/scroll-to-top';
import NewHeroSection from './components/NewHeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import LeadCaptureSectionNew from './components/LeadCaptureSectionNew';
import TestimonialsSection from './components/TestimonialsSection';
import SEOHomepage from './components/SEOHomepage';
import SharingEconomyNetwork from './components/SharingEconomy';

export default function Home() {
  return (
    <>
      <SEOHomepage />
      {/* <Tagline /> */}

      {/* Hero Section */}
      <main>
        <section
          className="flex text-sm items-center justify-between w-full md:h-screen pt-16 overflow-hidden  bg-cover bg-center bg-no-repeat relative bg-black"
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

        <section aria-label="Economía colaborativa">
          <SharingEconomyNetwork />
        </section>

        {/* Lead Capture Section */}
        <section aria-label="Únete a la comunidad EmprendyUp" id={'lead-capture'}>
          <LeadCaptureSectionNew />
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
