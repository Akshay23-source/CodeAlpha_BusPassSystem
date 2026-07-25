import React from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  Zap,
  CreditCard,
  MapPin,
  Bell,
  Smartphone,
  BarChart3,
  Shield,
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300"
  >
    {/* Animated gradient background on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-300" />

    {/* Glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0" />

    <div className="relative z-10">
      {/* Icon container */}
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
        className="mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30"
      >
        <Icon className="w-6 h-6 text-blue-400" />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

      {/* Animated line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-4 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
      />
    </div>
  </motion.div>
);

const features = [
  {
    icon: QrCode,
    title: 'Digital QR Pass',
    description: 'Instant digital passes with scannable QR codes. No more physical cards needed.',
  },
  {
    icon: Zap,
    title: 'AI Assistant',
    description: 'Smart recommendations and instant support powered by advanced AI.',
  },
  {
    icon: CreditCard,
    title: 'Online Payments',
    description: 'Secure, multiple payment options integrated into one platform.',
  },
  {
    icon: MapPin,
    title: 'Google Maps Routes',
    description: 'Real-time route tracking and navigation with live updates.',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    description: 'Instant alerts for pass expiry, route changes, and promotions.',
  },
  {
    icon: Smartphone,
    title: 'Offline Pass Support',
    description: 'Access your passes even without internet connection.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track spending, journeys, and usage patterns in real-time.',
  },
  {
    icon: Shield,
    title: 'Cloud Security',
    description: '256-bit encryption and enterprise-grade security for peace of mind.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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
            Powerful Features,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Designed for You
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you need to manage your transit passes efficiently and securely.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
