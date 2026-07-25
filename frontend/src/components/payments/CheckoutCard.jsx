import React, { useState } from 'react';
import { CreditCard, Smartphone, Check, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function CheckoutCard({ method = 'card', autoRenew, onAutoRenewToggle }) {
  const [cardNo, setCardNo] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [upiId, setUpiId] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="space-y-4 w-full text-left">
      {/* Dynamic forms */}
      {method === 'card' && (
        <div className="space-y-3.5">
          {/* Card Number */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Card Number</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <CreditCard className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="4111 2222 3333 4444"
                maxLength="19"
                value={cardNo}
                onChange={(e) => setCardNo(formatCardNumber(e.target.value))}
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-700"
              />
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                className="w-full text-xs px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">CVV Code</label>
              <input
                type="password"
                placeholder="•••"
                maxLength="3"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full text-xs px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-700"
              />
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cardholder Name</label>
            <input
              type="text"
              placeholder="Akshay Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs px-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-semibold placeholder-slate-700"
            />
          </div>
        </div>
      )}

      {method === 'upi' && (
        <div className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Virtual Private Address (UPI ID)</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <Smartphone className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="akshay@okhdfcbank"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-950/40 border border-slate-800 focus:border-blue-500 focus:outline-none rounded-xl text-white font-mono placeholder-slate-700"
              />
            </div>
            <p className="text-[9px] text-slate-500 font-semibold pl-1 mt-1 leading-none">Supports Google Pay, PhonePe, and Paytm handlers.</p>
          </div>
        </div>
      )}

      {method === 'netbanking' && (
        <div className="p-4 rounded-xl border border-white/[0.03] bg-slate-950/30 text-xs text-slate-400 font-medium text-center">
          You will be redirected to HDFC/SBI secure Net Banking portal at checkout submit.
        </div>
      )}

      {method === 'wallet' && (
        <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-xs text-emerald-400 font-medium text-center">
          Wallet credits deduction active. Your balance of <span className="font-bold text-white">₹150.00</span> will be auto-deducted.
        </div>
      )}

      {/* Auto renewal settings check */}
      <label className="flex items-center gap-2.5 p-3.5 rounded-xl border border-white/[0.03] bg-slate-950/20 text-xs text-slate-400 cursor-pointer select-none hover:border-white/[0.08] transition-colors w-full mt-3">
        <input
          type="checkbox"
          checked={autoRenew}
          onChange={(e) => onAutoRenewToggle(e.target.checked)}
          className="rounded accent-blue-600 border-slate-700 bg-slate-900"
        />
        <div>
          <span className="font-bold text-white block leading-none">Enable Pass Auto-Renewal</span>
          <span className="text-[9px] text-slate-500 font-semibold block mt-1">Automatically charges this payment method 2 days before pass expires.</span>
        </div>
      </label>
    </div>
  );
}
