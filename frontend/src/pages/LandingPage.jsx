import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { FeaturesSection } from '../components/sections/FeaturesSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { StatisticsSection } from '../components/sections/StatisticsSection';
import { ComparisonSection } from '../components/sections/ComparisonSection';
import { LivePreviewSection } from '../components/sections/LivePreviewSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FAQSection } from '../components/sections/FAQSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';

export function LandingPage() {
  const navigate = useNavigate();

  const handleAuthRedirect = (mode) => {
    navigate(mode === 'login' ? '/login' : '/signup');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden bg-slate-950"
    >
      <LandingNavbar onAuthClick={handleAuthRedirect} />

      {/* Hero Section */}
      <section id="home">
        <HeroSection />
      </section>


      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* How It Works Section */}
      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      {/* Live Preview Section */}
      <section id="preview">
        <LivePreviewSection />
      </section>

      {/* Statistics Section */}
      <section id="stats">
        <StatisticsSection />
      </section>

      {/* Comparison Section */}
      <section id="comparison">
        <ComparisonSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FAQSection />
      </section>

      {/* Newsletter Section */}
      <section id="newsletter">
        <NewsletterSection />
      </section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
