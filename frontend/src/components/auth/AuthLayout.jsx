import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, RefreshCw, KeyRound } from 'lucide-react';
import { AnimatedAuthBackground } from './AnimatedAuthBackground';

export function AuthLayout({ children, showSidebar = true }) {
  const benefitCards = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: 'Enterprise Cryptography',
      desc: 'Secured via Flask JWT authentication and standard encryption protocols.',
      color: 'border-blue-500/20 shadow-blue-500/5',
      delay: 0.1,
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: 'Real-time Validation',
      desc: 'Instant ticket issuance and smart verification loops.',
      color: 'border-purple-500/20 shadow-purple-500/5',
      delay: 0.2,
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-pink-400" />,
      title: 'Continuous Session Control',
      desc: 'Seamless token refreshes keep your dashboard active, secure, and ready.',
      color: 'border-pink-500/20 shadow-pink-500/5',
      delay: 0.3,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] overflow-hidden flex items-center justify-center relative select-none">
      {/* SaaS mesh gradient and floating particles */}
      <AnimatedAuthBackground />

      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Side - 3D Visual & Slogans (Desktop only) */}
        {showSidebar && (
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-slate-800/40 relative bg-slate-950/20 backdrop-blur-[2px]">
            {/* Header / Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <KeyRound className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">SmartTransit</span>
                <span className="text-xs text-blue-400 block -mt-1 font-bold">Cloud</span>
              </div>
            </div>

            {/* Middle: 3D Rotating Lock Graphic & Benefit Cards */}
            <div className="my-auto space-y-12 py-8">
              {/* Lock Graphic Container */}
              <div className="relative flex justify-center py-4">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Glowing Blur BG */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
                  />

                  {/* Pulsing Outer Rings */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-full h-full text-blue-500/10"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="6,6" fill="none" />
                  </motion.svg>

                  <motion.svg
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[80%] h-[80%] text-indigo-500/20"
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="12,8" fill="none" />
                  </motion.svg>

                  {/* SVG 3D Lock */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="z-10 bg-slate-900/60 p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center relative"
                  >
                    {/* SVG graphic of the lock */}
                    <svg className="w-16 h-16 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Lock shackle */}
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Lock body */}
                      <rect x="3" y="11" width="18" height="11" rx="2" fill="currentColor" fillOpacity="0.05" />
                      {/* Keyhole */}
                      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                      <path d="M12 17.5V20" strokeLinecap="round" />
                    </svg>

                    {/* Small blinking status light */}
                    <span className="absolute top-3 right-3 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Benefit Cards list */}
              <div className="space-y-4">
                {benefitCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: card.delay, duration: 0.6 }}
                    whileHover={{ x: 6, scale: 1.01 }}
                    className={`flex gap-4 p-4 rounded-2xl border bg-slate-900/40 backdrop-blur-md shadow-lg hover:bg-slate-900/60 transition-all duration-300 ${card.color}`}
                  >
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 h-fit">
                      {card.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{card.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer slogan */}
            <div className="text-xs text-slate-500 font-semibold tracking-wide">
              © {new Date().getFullYear()} SmartTransit Inc. All rights reserved.
            </div>
          </div>
        )}

        {/* Right Side - Auth Card Forms */}
        <div className={`w-full ${showSidebar ? 'lg:w-1/2' : ''} flex flex-col justify-center items-center p-6 sm:p-12 min-h-screen relative z-10`}>
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
