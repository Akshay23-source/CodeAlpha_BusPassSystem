import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building, Wallet, CheckCircle } from 'lucide-react';

export function PaymentMethodCard({ type, onSelect, selected }) {
  const configs = {
    upi: {
      title: 'UPI (GPay / PhonePe / Paytm)',
      icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
      desc: 'Instant payment using UPI ID or scanner',
      tag: 'Popular',
    },
    card: {
      title: 'Credit / Debit Card',
      icon: <CreditCard className="w-5 h-5 text-blue-400" />,
      desc: 'Visa, Mastercard, RuPay, Maestro cards',
      tag: 'Secured',
    },
    netbanking: {
      title: 'Net Banking',
      icon: <Building className="w-5 h-5 text-emerald-400" />,
      desc: 'SBI, HDFC, ICICI and all major banks',
    },
    wallet: {
      title: 'Smart Wallet Credits',
      icon: <Wallet className="w-5 h-5 text-pink-400" />,
      desc: 'Deduct from your SmartTransit Wallet credits',
      tag: 'Bonus',
    },
    applepay: {
      title: 'Apple Pay / Google Pay Link',
      icon: <Smartphone className="w-5 h-5 text-slate-400 animate-pulse" />,
      desc: 'Express device checkout (Placeholder)',
      tag: 'Soon',
      disabled: true,
    },
  };

  const method = configs[type] || configs.upi;
  const isSelected = selected === type;

  return (
    <motion.button
      type="button"
      disabled={method.disabled}
      whileHover={method.disabled ? {} : { y: -2, scale: 1.01 }}
      whileTap={method.disabled ? {} : { scale: 0.99 }}
      onClick={() => onSelect(type)}
      className={`rounded-2xl border text-left p-4 transition-all relative overflow-hidden flex items-center gap-4 w-full focus:outline-none ${
        method.disabled 
          ? 'opacity-40 border-slate-900 bg-slate-950/20 cursor-not-allowed'
          : isSelected
            ? 'border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/5'
            : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/20'
      }`}
    >
      {/* Selected check tag */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 rounded-bl-2xl flex items-center justify-center pl-1 pb-1">
          <CheckCircle className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      {/* Icon */}
      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 shadow-md shrink-0">
        {method.icon}
      </div>

      {/* Meta */}
      <div className="space-y-0.5 text-left flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2">
          <h5 className="text-xs font-bold text-white leading-none truncate">{method.title}</h5>
          {method.tag && (
            <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
              isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
            }`}>
              {method.tag}
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-500 font-semibold leading-normal truncate mt-1">{method.desc}</p>
      </div>
    </motion.button>
  );
}
