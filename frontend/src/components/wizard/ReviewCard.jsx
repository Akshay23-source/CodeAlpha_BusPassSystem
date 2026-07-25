import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Ticket, File, ShieldCheck, TrendingUp, Edit2 } from 'lucide-react';

export function ReviewCard({ data, onEditStep, user }) {
  const getPassTypeName = (type) => {
    const names = {
      student: 'Student Pass (Per Semester)',
      monthly: 'Monthly Pass (30 Days)',
      semester: 'Semester Pass (6 Months)',
      staff: 'Staff Pass (30 Days)',
      premium: 'Premium Pass (90 Days)',
    };
    return names[type] || 'Monthly Pass';
  };

  const getPassPrice = (type) => {
    const prices = {
      student: '₹250.00',
      monthly: '₹450.00',
      semester: '₹1200.00',
      staff: '₹600.00',
      premium: '₹1800.00',
    };
    return prices[type] || '₹450.00';
  };

  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-400" />
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
          Review Application Details
        </h4>
      </div>

      <div className="space-y-3.5">
        {/* Step 1: Pass Details */}
        <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm relative group">
          <button
            type="button"
            onClick={() => onEditStep(0)}
            className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white hover:border-slate-700 transition-all focus:outline-none"
            title="Edit Pass Type"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          
          <div className="flex gap-3">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 h-fit text-slate-400 shrink-0">
              <Ticket className="w-4 h-4 text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Subscription Product</p>
              <h5 className="text-xs font-bold text-white leading-none mt-1">{getPassTypeName(data.passType)}</h5>
              <p className="text-[10px] text-slate-400 mt-1">Cost: <span className="font-bold text-blue-400">{getPassPrice(data.passType)}</span></p>
            </div>
          </div>
        </div>

        {/* Step 2 & 3: Org & Route Details */}
        <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm relative group">
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white hover:border-slate-700 transition-all focus:outline-none"
            title="Edit Route"
          >
            <Edit2 className="w-3 h-3" />
          </button>

          <div className="flex gap-3">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 h-fit text-slate-400 shrink-0">
              <MapPin className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="space-y-2 flex-1 min-w-0">
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Organization</p>
                <h5 className="text-xs font-bold text-white leading-none mt-1 truncate">{data.organization || 'Central Tech University'}</h5>
              </div>
              <div className="h-px bg-white/[0.03]" />
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Travel Route</p>
                <h5 className="text-xs font-bold text-white leading-none mt-1 truncate">{data.route}</h5>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Documents uploads */}
        <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-900/10 backdrop-blur-sm relative group">
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white hover:border-slate-700 transition-all focus:outline-none"
            title="Edit Documents"
          >
            <Edit2 className="w-3 h-3" />
          </button>

          <div className="flex gap-3">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 h-fit text-slate-400 shrink-0">
              <File className="w-4 h-4 text-pink-400" />
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">Verified Documents</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {data.files && data.files.length > 0 ? (
                  data.files.map((file) => (
                    <div key={file.category} className="px-3 py-2 rounded-xl bg-slate-950/40 border border-white/[0.04] flex items-center gap-2 min-w-0">
                      <File className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="text-[10px] text-slate-300 font-semibold truncate flex-1">{file.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-500 italic">No files attached</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Savings insight */}
        <div className="flex gap-3.5 p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
          <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5 h-fit shrink-0">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-xs font-bold text-white leading-none">Estimated Route Savings</h5>
            <p className="text-[10px] text-slate-400 leading-normal mt-1.5">
              This pass configuration saves you approximately <span className="text-emerald-400 font-bold">₹380.00</span> per month compared to single tickets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
