import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle2, MapPin, CreditCard, Download, QrCode } from 'lucide-react';

const TimelineStep = ({ icon: Icon, title, description, number, isLast, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="relative"
  >
    {/* Desktop timeline line */}
    {!isLast && (
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="absolute top-16 left-[2.5rem] w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left hidden lg:block"
      />
    )}

    <div className="flex gap-8">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.4 }}
        viewport={{ once: true }}
        className="relative flex-shrink-0"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center border border-blue-500/50 shadow-lg shadow-blue-500/20">
          <Icon className="w-10 h-10 text-white" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border border-blue-400/50"
        />
        <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 border-4 border-slate-950 flex items-center justify-center text-xs font-bold text-white">
          {number}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="flex-1 pt-2"
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
      </motion.div>
    </div>
  </motion.div>
);

const steps = [
  {
    icon: UserPlus,
    number: 1,
    title: 'Create Account',
    description: 'Sign up with your email in just 30 seconds. It's quick, secure, and free.',
  },
  {
    icon: CheckCircle2,
    number: 2,
    title: 'Verify Identity',
    description: 'Verify your student status or ID. Instant verification in most cases.',
  },
  {
    icon: MapPin,
    number: 3,
    title: 'Choose Route',
    description: 'Select your preferred transit routes. Get personalized recommendations.',
  },
  {
    icon: CreditCard,
    number: 4,
    title: 'Complete Payment',
    description: 'Secure payment with multiple options. Flexible monthly or annual plans.',
  },
  {
    icon: Download,
    number: 5,
    title: 'Download Smart Pass',
    description: 'Get your digital pass instantly. Works on iOS and Android.',
  },
  {
    icon: QrCode,
    number: 6,
    title: 'Scan in Bus',
    description: 'Just scan the QR code when boarding. Start your journey!',
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Get Started in
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              6 Simple Steps
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            From sign-up to your first ride, it takes less than 5 minutes.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 lg:space-y-16">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              number={step.number}
              isLast={index === steps.length - 1}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
            Start Your Journey Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
