import React from 'react';
import { motion } from 'framer-motion';
import { LandingNavbar } from '../layout/LandingNavbar';
import { Footer } from '../layout/Footer';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { StatisticsSection } from './StatisticsSection';
import { ComparisonSection } from './ComparisonSection';
import { LivePreviewSection } from './LivePreviewSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FAQSection } from './FAQSection';
import { NewsletterSection } from './NewsletterSection';

export function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden bg-slate-950"
    >
      <LandingNavbar />

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
