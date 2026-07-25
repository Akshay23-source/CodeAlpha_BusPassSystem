import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonCard = ({ title, items, isHighlighted, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
      isHighlighted
        ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-600/20 to-purple-600/20 scale-105'
        : 'border border-slate-700 bg-slate-900/50'
    }`}
  >
    {/* Recommended Badge */}
    {isHighlighted && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2 }}
        viewport={{ once: true }}
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-sm font-bold text-white"
      >
        Recommended
      </motion.div>
    )}

    <div className="p-8">
      <h3 className="text-2xl font-bold text-white mb-8 text-center">{title}</h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.1 + index * 0.05 }}
            viewport={{ once: true }}
            className="flex items-start gap-3"
          >
            {item.available ? (
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <X className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
            )}
            <span className={item.available ? 'text-slate-200' : 'text-slate-500 line-through'}>
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

const comparisonData = {
  traditional: [
    { name: 'Physical Cards', available: true },
    { name: 'Manual Recharge', available: true },
    { name: 'Weekly Verification', available: false },
    { name: 'Real-time Tracking', available: false },
    { name: 'Instant Support', available: false },
    { name: 'Usage Analytics', available: false },
    { name: 'Card Replacement Fees', available: true },
    { name: 'Cloud Security', available: false },
  ],
  smartTransit: [
    { name: 'Digital QR Passes', available: true },
    { name: 'Instant Auto-Recharge', available: true },
    { name: 'One-time Verification', available: true },
    { name: 'Real-time Tracking', available: true },
    { name: '24/7 AI Support', available: true },
    { name: 'Detailed Analytics', available: true },
    { name: 'Free Replacements', available: true },
    { name: 'Enterprise Security', available: true },
  ],
};

export function ComparisonSection() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Why Choose
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SmartTransit Cloud?
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            See how we compare to traditional bus pass systems.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ComparisonCard
            title="Traditional Bus Pass"
            items={comparisonData.traditional}
            isHighlighted={false}
            delay={0}
          />
          <ComparisonCard
            title="SmartTransit Cloud"
            items={comparisonData.smartTransit}
            isHighlighted={true}
            delay={0.2}
          />
        </div>

        {/* Key Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 p-8 sm:p-12 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Key Advantages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Activation',
                description: 'No waiting time. Your pass is active immediately after purchase.',
              },
              {
                title: 'Cost Savings',
                description: 'Save up to 30% compared to traditional monthly passes.',
              },
              {
                title: 'Always Connected',
                description: 'Get real-time updates and never miss important announcements.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
