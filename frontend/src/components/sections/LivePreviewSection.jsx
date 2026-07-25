import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Smartphone, LayoutDashboard, CreditCard, BarChart3 } from 'lucide-react';

const TabButton = ({ label, icon: Icon, isActive, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
        : 'text-slate-400 hover:text-white'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-5 h-5" />
    {label}
  </motion.button>
);

const MockDashboard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-white">Dashboard</h3>
      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">Active</div>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
        <div className="text-xs text-slate-400 mb-2">Active Passes</div>
        <div className="text-2xl font-bold text-blue-400">3</div>
      </div>
      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
        <div className="text-xs text-slate-400 mb-2">This Month</div>
        <div className="text-2xl font-bold text-purple-400">₹180</div>
      </div>
      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
        <div className="text-xs text-slate-400 mb-2">Journeys</div>
        <div className="text-2xl font-bold text-green-400">45</div>
      </div>
      <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
        <div className="text-xs text-slate-400 mb-2">Saved</div>
        <div className="text-2xl font-bold text-pink-400">₹650</div>
      </div>
    </div>
  </motion.div>
);

const MockDigitalPass = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white"
  >
    <div className="space-y-6">
      <div>
        <div className="text-sm opacity-80">SmartTransit Cloud</div>
        <div className="text-2xl font-bold mt-2">Monthly Pass</div>
        <div className="text-sm opacity-80 mt-1">Valid until Dec 31, 2024</div>
      </div>
      <div className="flex items-center justify-center h-32 bg-white/10 rounded-lg backdrop-blur">
        <div className="text-center">
          <div className="text-3xl mb-2">📱</div>
          <div className="text-xs opacity-80">Scan QR on buses</div>
        </div>
      </div>
      <div>
        <div className="text-xs opacity-80">Route</div>
        <div className="font-semibold">Central - Airport</div>
      </div>
    </div>
  </motion.div>
);

const MockQRPass = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-700 flex flex-col items-center justify-center h-80"
  >
    <div className="text-center">
      <QrCode className="w-24 h-24 mx-auto mb-4 text-blue-400" />
      <p className="font-bold text-white mb-2">Your Digital QR Pass</p>
      <p className="text-sm text-slate-400 mb-6">Scan this with any bus scanner</p>
      <div className="text-xs text-slate-500">Pass ID: PASS-2024-001234</div>
    </div>
  </motion.div>
);

const MockPayment = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
  >
    <h3 className="text-lg font-bold text-white mb-6">Choose Payment Method</h3>
    {['Credit Card', 'Debit Card', 'Net Banking', 'UPI'].map((method) => (
      <motion.button
        key={method}
        whileHover={{ scale: 1.02, x: 4 }}
        className="w-full p-4 rounded-lg border border-slate-700 bg-slate-900/50 hover:bg-slate-800/50 text-white font-semibold transition-all text-left"
      >
        {method}
      </motion.button>
    ))}
  </motion.div>
);

const MockAnalytics = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700"
  >
    <h3 className="text-lg font-bold text-white mb-6">Usage Analytics</h3>
    <div className="space-y-3">
      {['Central - Airport', 'North Gate - Market', 'University - Tech Park'].map((route, idx) => (
        <div key={route} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-white">{route}</span>
            <span className="text-blue-400 font-bold">{12 - idx * 2} trips</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (12 - idx * 2) / 12 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export function LivePreviewSection() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: MockDashboard },
    { id: 'pass', label: 'Digital Pass', icon: Smartphone, component: MockDigitalPass },
    { id: 'qr', label: 'QR Scanner', icon: QrCode, component: MockQRPass },
    { id: 'payment', label: 'Payment', icon: CreditCard, component: MockPayment },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: MockAnalytics },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
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
            Experience the
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Platform in Action
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Explore our intuitive interface and powerful features.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </motion.div>

        {/* Preview Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="p-1 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50"
        >
          <div className="bg-slate-950 rounded-3xl p-8">
            <AnimatePresence mode="wait">
              {ActiveComponent && <ActiveComponent key={activeTab} />}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 mb-6">Ready to try SmartTransit Cloud?</p>
          <button className="px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:scale-105">
            Start Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  );
}
