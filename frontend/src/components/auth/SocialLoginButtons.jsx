import React from 'react';
import { motion } from 'framer-motion';

export function SocialLoginButtons() {
  const providers = [
    { name: 'Google', icon: '🔍', color: 'hover:border-blue-400' },
    { name: 'Microsoft', icon: '⊞', color: 'hover:border-blue-400' },
    { name: 'GitHub', icon: '⚙', color: 'hover:border-slate-400' },
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-slate-950 text-slate-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {providers.map((provider, idx) => (
          <motion.button
            key={idx}
            type="button"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled
            className={`py-3 rounded-xl border-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800/70 transition-all duration-300 text-white font-semibold text-sm ${provider.color} disabled:opacity-50 disabled:cursor-not-allowed`}
            title={`${provider.name} coming soon`}
          >
            <span className="text-lg mb-1">{provider.icon}</span>
            <p className="text-xs">{provider.name}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
