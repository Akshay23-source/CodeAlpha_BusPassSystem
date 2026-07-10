import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const PricingCard = ({ plan, price, description, features, highlighted, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
      highlighted
        ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/20 to-purple-600/20 scale-105'
        : 'border border-slate-700 bg-slate-900/50 hover:border-slate-600'
    }`}
  >
    {/* Recommended Badge */}
    {highlighted && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
        viewport={{ once: true }}
        className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white rounded-bl-2xl"
      >
        Most Popular
      </motion.div>
    )}

    <div className="p-8 sm:p-10">
      {/* Plan Name */}
      <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
      <p className="text-slate-400 text-sm mb-6">{description}</p>

      {/* Price */}
      <div className="mb-8">
        <span className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {price}
        </span>
        {price !== 'Custom' && <span className="text-slate-400 text-sm ml-2">/month</span>}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-3 rounded-full font-semibold transition-all duration-300 mb-8 flex items-center justify-center gap-2 ${
          highlighted
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20'
            : 'border border-slate-600 text-white hover:border-blue-500'
        }`}
      >
        Get Started
        <ArrowRight className="w-4 h-4" />
      </motion.button>

      {/* Features List */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-slate-200 text-sm">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const pricingPlans = [
  {
    plan: 'Free',
    price: '$0',
    description: 'Get started with basic features',
    features: [
      'Digital QR Pass',
      'Basic Route Access',
      'Email Support',
      'Manual Recharge',
      'Limited Analytics',
    ],
    highlighted: false,
  },
  {
    plan: 'Student',
    price: '$4.99',
    description: 'Best for students and regular commuters',
    features: [
      'Everything in Free',
      'Unlimited Routes',
      'Auto-Recharge',
      'Real-time Tracking',
      'Priority 24/7 Support',
      'Advanced Analytics',
      'Offline Pass Support',
      '30% Discount',
    ],
    highlighted: true,
  },
  {
    plan: 'Enterprise',
    price: 'Custom',
    description: 'For universities and transport operators',
    features: [
      'Everything in Student',
      'Bulk Management',
      'Custom Branding',
      'API Access',
      'Dedicated Manager',
      'Advanced Reporting',
      'Security & Compliance',
      'Custom Integrations',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/3 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pricing for Everyone
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((planData, index) => (
            <PricingCard
              key={index}
              plan={planData.plan}
              price={planData.price}
              description={planData.description}
              features={planData.features}
              highlighted={planData.highlighted}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-8 sm:p-12 rounded-3xl border border-slate-700 bg-slate-900/30 backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Questions about pricing?
          </h3>
          <p className="text-slate-400 mb-6">
            Contact our sales team for enterprise solutions, bulk discounts, or custom plans.
          </p>
          <button className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  );
}
