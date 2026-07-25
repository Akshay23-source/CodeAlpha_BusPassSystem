import React from 'react';
import { AlertOctagon, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';

export function FailedPaymentCard({ errorMsg = 'Insufficient balance in card account', onRetry, onChooseMethod }) {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-[32px] border border-red-500/20 bg-red-500/5 text-center space-y-6">
      
      {/* Alert Header */}
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertOctagon className="w-7 h-7 animate-bounce" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-black text-white">Transaction Failed</h3>
        <p className="text-xs text-slate-400 font-semibold">{errorMsg}</p>
      </div>

      {/* Utilities guidelines */}
      <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 text-left text-xs font-semibold text-slate-500 leading-normal space-y-2">
        <p>• Check if your card details (number, expiry, CVV) are correct.</p>
        <p>• Verify card account balance limits or UPI handler status.</p>
        <p>• Call HDFC/SBI bank gateway support desk if issues persist.</p>
      </div>

      {/* Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-500 transition-colors text-xs flex items-center justify-center gap-1.5 focus:outline-none"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry Payment
        </button>

        <button
          onClick={onChooseMethod}
          className="flex-1 py-3 rounded-xl border border-slate-800 bg-slate-900/20 text-xs font-bold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Select Method
        </button>
      </div>
    </div>
  );
}
export default FailedPaymentCard;
