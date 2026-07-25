import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Tag, Check, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderSummary({ passType = 'monthly', onSubmit, loading }) {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [useWallet, setUseWallet] = useState(false);

  const getPrice = () => {
    const prices = {
      student: 250,
      monthly: 450,
      semester: 1200,
      staff: 600,
      premium: 1800,
    };
    return prices[passType] || 450;
  };

  const basePrice = getPrice();
  const tax = +(basePrice * 0.05).toFixed(2); // 5% Service Tax
  const walletBalance = 150;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'TRANSIT50') {
      setAppliedCoupon({ code: 'TRANSIT50', discount: 50 });
      toast.success('Coupon applied! ₹50.00 discount credited.');
    } else {
      toast.error('Invalid coupon code. Try "TRANSIT50" for demo.');
    }
  };

  const getDiscount = () => {
    let d = 0;
    if (appliedCoupon) d += appliedCoupon.discount;
    if (useWallet) d += walletBalance;
    return d;
  };

  const discount = getDiscount();
  const finalAmount = Math.max(basePrice + tax - discount, 0);

  const handleSubmitCheckout = () => {
    onSubmit({
      amount: finalAmount,
      passType,
      useWallet,
      couponCode: appliedCoupon?.code || '',
    });
  };

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Order Summary & Payment
        </h4>
      </div>

      <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm space-y-4">
        {/* Cost breakdown */}
        <div className="space-y-2.5 text-xs text-slate-400 font-semibold pb-4 border-b border-white/[0.04]">
          <div className="flex justify-between items-center">
            <span>Base Fare</span>
            <span className="text-white">₹{basePrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>SGST / CGST (5%)</span>
            <span className="text-white">₹{tax.toFixed(2)}</span>
          </div>

          {appliedCoupon && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between items-center text-emerald-400"
            >
              <span className="flex items-center gap-1">🏷️ Promo ({appliedCoupon.code})</span>
              <span>-₹{appliedCoupon.discount.toFixed(2)}</span>
            </motion.div>
          )}

          {useWallet && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex justify-between items-center text-blue-400"
            >
              <span className="flex items-center gap-1">💳 Wallet Deduct</span>
              <span>-₹{walletBalance.toFixed(2)}</span>
            </motion.div>
          )}
        </div>

        {/* Coupon inputs */}
        <form onSubmit={handleApplyCoupon} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
              <Tag className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Enter Promo Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-950/40 border border-slate-800/80 focus:border-blue-500 focus:outline-none text-white font-mono placeholder-slate-600 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-4 rounded-xl border border-slate-800 bg-slate-900/30 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
          >
            Apply
          </button>
        </form>

        {/* Wallet check option */}
        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-white/[0.03] bg-slate-950/20 text-xs text-slate-400 cursor-pointer select-none hover:border-white/[0.08] transition-colors w-full">
          <input
            type="checkbox"
            checked={useWallet}
            onChange={(e) => setUseWallet(e.target.checked)}
            className="rounded accent-blue-600 border-slate-700 bg-slate-900"
          />
          <Wallet className="w-4 h-4 text-blue-400" />
          <span>Apply Wallet Credits (Balance: <span className="text-white font-bold">₹{walletBalance}</span>)</span>
        </label>

        {/* Final Amount display */}
        <div className="flex justify-between items-end pt-2">
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Total Checkout Fare</p>
            <h3 className="text-2xl font-black text-white leading-none mt-2 tracking-tight">₹{finalAmount.toFixed(2)}</h3>
          </div>
          
          <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Secure SSL Encrypted</span>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          type="button"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleSubmitCheckout}
          className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20 hover:shadow-indigo-500/30 transition-all hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 text-xs disabled:opacity-50"
        >
          <CreditCard className="w-4 h-4" />
          {loading ? 'Initiating razorpay checkout...' : 'Submit and Pay'}
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
