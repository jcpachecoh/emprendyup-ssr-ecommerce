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

export default function Home() {
  return (
    <>
      <Tagline />
      <Navbar navClass="defaultscroll is-sticky tagline-height" navlight={false} />

      {/* Hero Section */}
      <section className="flex items-center justify-between w-full md:h-screen pt-32 overflow-hidden bg-white dark:bg-slate-100 bg-[url('/images/hero/teenager.webp')] bg-cover bg-center bg-no-repeat relative">
        {/* Overlay background */}
        <div className="absolute inset-0 bg-black/50"></div>
        <NewHeroSection />
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Lead Capture Section */}
      <LeadCaptureSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Enhanced Footer */}
      <EnhancedFooter />

      <Switcher />
      <ScrollToTop />
    </>
  );
}
