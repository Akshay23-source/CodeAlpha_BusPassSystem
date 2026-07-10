import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const StatCounter = ({ end, label, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const increment = end / 50;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-slate-400 font-semibold">{label}</div>
    </motion.div>
  );
};

export function StatisticsSection() {
  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
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
            Trusted by Millions,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Growing Every Day
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Our platform powers millions of transit journeys worldwide.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 py-12">
          <StatCounter end={5000} label="Active Passengers" suffix="+" delay={0} />
          <StatCounter end={100} label="Partner Routes" suffix="+" delay={0.1} />
          <StatCounter end={25000} label="Digital Passes Issued" suffix="+" delay={0.2} />
          <StatCounter end={99} label="Platform Uptime" suffix="%" delay={0.3} />
          <StatCounter end={50} label="Partner Universities" suffix="+" delay={0.4} />
          <StatCounter end={2} label="Years of Excellence" delay={0.5} />
        </div>

        {/* Glowing border card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-12 rounded-3xl border border-gradient-to-r from-blue-500/50 to-purple-500/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl"
        >
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Join the Revolution
            </h3>
            <p className="text-slate-300 mb-6">
              Be part of the smartest transit platform. Sign up today and get your first month free.
            </p>
            <button className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105">
              Claim Free Trial
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
