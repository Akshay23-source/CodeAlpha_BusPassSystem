import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, GraduationCap, Calendar, Compass, UserCheck, Sparkles } from 'lucide-react';

export function PassTypeCard({ type, onSelect, selected }) {
  const configs = {
    student: {
      title: 'Student Pass',
      price: '₹250',
      duration: 'Per Semester',
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      benefits: ['80% fare discount', 'Unlimited college route trips', 'Requires ID validation'],
      tag: 'Best Value',
    },
    monthly: {
      title: 'Monthly Pass',
      price: '₹450',
      duration: '30 Days validity',
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      benefits: ['Fixed route commute', 'Valid on all weekdays', 'Includes wallet cashback'],
      tag: 'Regular Rider',
    },
    semester: {
      title: 'Semester Pass',
      price: '₹1200',
      duration: '6 Months validity',
      icon: <Compass className="w-5 h-5 text-pink-400" />,
      benefits: ['All college routes', 'Free weekend transits', 'Priority lane boarding'],
      tag: 'Full Term',
    },
    staff: {
      title: 'Staff Pass',
      price: '₹600',
      duration: '30 Days validity',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      benefits: ['Corporate invoice cover', 'Reserved seating options', 'Unlimited commutes'],
      tag: 'Corporate',
    },
    premium: {
      title: 'Premium Pass',
      price: '₹1800',
      duration: '90 Days validity',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      benefits: ['All routes access', 'A/C coach entry priority', 'Reward points multipliers'],
      tag: 'Exclusive',
    },
  };

  const card = configs[type] || configs.monthly;
  const isSelected = selected === type;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(type)}
      className={`rounded-2xl border text-left p-5 transition-all relative overflow-hidden flex flex-col justify-between h-56 w-full ${
        isSelected
          ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10'
          : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/20'
      } focus:outline-none`}
    >
      {/* Selected Indicator Checkbox Tag */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-10 h-10 bg-blue-500 rounded-bl-3xl flex items-center justify-center pl-2 pb-2">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}

      {/* Card Header */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 shadow-md">
            {card.icon}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm leading-none">{card.title}</h4>
            <span className="text-[10px] text-slate-500 font-semibold mt-1.5 block">{card.duration}</span>
          </div>
        </div>

        {/* Benefits lists */}
        <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
          {card.benefits.map((b, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
              <span className="text-slate-600">•</span>
              <span className="truncate">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Price Bottom */}
      <div className="flex justify-between items-end w-full">
        <div>
          <span className="text-xl font-black text-white">{card.price}</span>
        </div>
        
        {card.tag && (
          <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
            isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
          }`}>
            {card.tag}
          </span>
        )}
      </div>
    </motion.button>
  );
}
