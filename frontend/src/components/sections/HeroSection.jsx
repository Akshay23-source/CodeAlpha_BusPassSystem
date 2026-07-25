import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '../ui/Button';

const FloatingCard = ({ delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.4, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    whileHover={{ y: -10 }}
    className="absolute backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 w-40"
    style={{ left: x, top: y }}
  >
    <div className="text-xs font-semibold text-blue-300">Live</div>
    <div className="text-sm font-bold text-white mt-2">Journey Active</div>
    <div className="text-xs text-slate-400 mt-1">Route: Central - Airport</div>
  </motion.div>
);

const AnimatedStat = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev < end ? prev + Math.ceil(end / 50) : end));
    }, 30);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {count.toLocaleString()}
      </div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </motion.div>
  );
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-slate-950 opacity-60" />
      
      {/* Floating blur shapes */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, delay: 5 }}
        className="absolute bottom-32 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 bg-blue-500/10 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trusted by 5000+ Users
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            Travel Smarter.<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Go Paperless.
            </span>
            <br />
            Ride Anywhere.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            SmartTransit Cloud is the AI-powered platform revolutionizing how students and commuters access transit passes. Digital passes, instant payments, and real-time tracking—all in one app.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button variant="primary" className="px-8 py-3 text-base flex items-center gap-2 group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ghost" className="px-8 py-3 text-base flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-slate-700/50"
          >
            <AnimatedStat end={5000} label="Active Users" />
            <AnimatedStat end={25000} label="Digital Passes" />
            <AnimatedStat end={99} label="Uptime %" />
            <AnimatedStat end={100} label="Partner Routes" />
          </motion.div>
        </motion.div>

        {/* Floating Glass Cards */}
        <FloatingCard delay={0.8} x="5%" y="20%" />
        <FloatingCard delay={1} x="85%" y="30%" />
        <FloatingCard delay={1.2} x="10%" y="70%" />

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-400">Scroll to explore</span>
            <div className="w-6 h-10 border border-slate-600 rounded-full flex items-center justify-center">
              <div className="w-1 h-3 bg-slate-400 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
