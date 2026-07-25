import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, Shield, Award, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

export function ProfileWidget({ user }) {
  const phone = localStorage.getItem('userPhone') || '98765 43210';
  const college = localStorage.getItem('userPrefRoute') ? 'Central Tech University' : 'L.N. College of Engineering';

  const handleEditProfile = () => {
    toast.success('Profile editor loading...');
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none text-left">
        Rider Profile
      </h4>

      <div className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm relative overflow-hidden text-left space-y-5">
        <div className="absolute top-[-10%] right-[-10%] w-24 h-24 rounded-full bg-blue-500/5 blur-xl" />

        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 border border-white/10 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/10">
            {user?.name ? user.name.split(' ').map(n=>n[0]).join('').slice(0, 2).toUpperCase() : 'US'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h5 className="font-black text-white text-base leading-none tracking-tight">
                {user?.name || 'Rider Profile'}
              </h5>
              <Award className="w-4 h-4 text-blue-400 shrink-0" title="Verified Passenger" />
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">
              Gold Membership Tier
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3.5 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
            <Mail className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="truncate">{user?.email || 'rider@smarttransit.cloud'}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
            <Phone className="w-4 h-4 text-slate-500 shrink-0" />
            <span>+91 {phone}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="truncate">{college}</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-xs font-semibold">
            <Shield className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Identity Verified</span>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleEditProfile}
          className="w-full py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all flex items-center justify-center gap-2 focus:outline-none"
        >
          <Edit className="w-3.5 h-3.5 text-slate-400" /> Edit Profile Details
        </motion.button>
      </div>
    </div>
  );
}
