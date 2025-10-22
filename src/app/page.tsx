import React, { Suspense } from 'react';
import Navbar from './components/NavBar/navbar';
import Tagline from './components/tagline';
import Switcher from './components/switcher';
import ScrollToTop from './components/scroll-to-top';
import NewHeroSection from './components/NewHeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import AdvantagesPreviewSection from './components/AdvantagesPreviewSection';
import LeadCaptureSectionNew from './components/LeadCaptureSectionNew';
import TestimonialsSection from './components/TestimonialsSection';
import SEOHomepage from './components/SEOHomepage';
import SharingEconomyNetwork from './components/SharingEconomy';
import { LoaderIcon } from 'lucide-react';

function HomeComponent() {
  return (
    <>
      <SEOHomepage />
      {/* <Tagline /> */}

      {/* Hero Section */}
      <main>
        {/* Overlay background */}
        <NewHeroSection />

        {/* Features Section */}
        <section aria-label="Características y beneficios de EmprendyUp" id="features">
          <FeaturesSection />
        </section>

        {/* How It Works Section */}
        <section aria-label="Cómo funciona la plataforma EmprendyUp">
          <HowItWorksSection />
        </section>

        <section aria-label="Economía colaborativa">
          <SharingEconomyNetwork />
        </section>

        {/* Advantages Preview Section */}
        <section aria-label="Ventajas competitivas de EmprendyUp">
          <AdvantagesPreviewSection />
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

export default function Home() {
  return (
    <Suspense fallback={<LoaderIcon />}>
      <HomeComponent />
    </Suspense>
  );
}
