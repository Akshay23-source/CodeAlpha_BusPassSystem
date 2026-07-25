import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, Navigation, Wallet, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthCard } from '../../components/auth/AuthCard';
import { WalletCard } from '../../components/wallet/WalletCard';
import { PassDetailsCard } from '../../components/wallet/PassDetailsCard';
import { TravelHistoryTimeline } from '../../components/wallet/TravelHistoryTimeline';
import { JourneyAnalytics } from '../../components/wallet/JourneyAnalytics';
import { RenewBanner } from '../../components/wallet/RenewBanner';
import { OfflineIndicator } from '../../components/wallet/OfflineIndicator';
import { JourneyModal } from '../../components/wallet/JourneyModal';
import { requestJson, authHeaders } from '../../services/api';

// Payments & Audit logs subcomponents
import { TransactionTable } from '../../components/payments/TransactionTable';
import { PaymentAnalytics } from '../../components/payments/PaymentAnalytics';
import { PaymentSettings } from '../../components/payments/PaymentSettings';

export function WalletPage() {
  const { user } = useAuth();
  
  const [activeCard, setActiveCard] = useState('bus');
  const [subTab, setSubTab] = useState('details'); // details -> transactions -> analytics -> settings
  const [showJourneyModal, setShowJourneyModal] = useState(false);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasses = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const data = await requestJson('/api/pass/my', { headers: authHeaders(token) });
        setPasses(data || []);
      } catch (err) {
        console.error('Failed to load pass wallet:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPasses();
  }, []);

  const latestPass = passes.length > 0 ? passes[passes.length - 1] : null;

  return (
    <AuthLayout>
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* Top expiration warnings renew banner if pass is valid */}
        {latestPass && <RenewBanner />}

        {/* Workspace grid splits deck selectors and detail tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 items-start">
          
          {/* Left: Stacked Deck of Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pl-1">
              <span>My Transit Cards Deck</span>
              <span className="flex items-center gap-1 text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                <Wallet className="w-3.5 h-3.5" /> 4 Cards Active
              </span>
            </div>

            {/* Overlapping stack container */}
            <div className="relative flex flex-col gap-3">
              {['bus', 'metro', 'student', 'voucher'].map((type) => {
                const isActive = activeCard === type;
                return (
                  <WalletCard
                    key={type}
                    cardType={type}
                    active={isActive}
                    onSelect={(val) => setActiveCard(val)}
                    user={user}
                    pass={latestPass}
                  />
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Tabs based on selected active card */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              
              {/* Tabs for Transit Bus Pass */}
              {activeCard === 'bus' && (
                <motion.div
                  key="bus-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Horizontal Sub-tab select bar */}
                  <div className="rounded-2xl border border-white/[0.04] bg-slate-900/10 p-1 flex gap-1 w-full max-w-md mx-auto sm:mx-0">
                    {[
                      { id: 'details', label: 'Details Cockpit' },
                      { id: 'transactions', label: 'Transactions' },
                      { id: 'analytics', label: 'Analytics' },
                      { id: 'settings', label: 'Saved Methods' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSubTab(tab.id)}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all focus:outline-none ${
                          subTab === tab.id
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {subTab === 'details' && (
                      <motion.div
                        key="sub-details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <AuthCard
                          title="Digital Smart Pass Cockpit"
                          subtitle="Track validation parameters and initiate boarding"
                        >
                          <div className="space-y-5 text-left">
                            <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-600/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="space-y-1">
                                <h5 className="text-xs font-bold text-white leading-none flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Start Boarding Commute
                                </h5>
                                <p className="text-[10px] text-slate-400 font-semibold mt-1">Ready to board? Click start journey to generate time-limited boarding pass.</p>
                              </div>
                              <button
                                onClick={() => setShowJourneyModal(true)}
                                className="px-5 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-500/20 transition-all text-xs shrink-0 flex items-center gap-1.5 focus:outline-none"
                              >
                                <Navigation className="w-4.5 h-4.5 animate-pulse" /> Start Journey
                              </button>
                            </div>

                            <OfflineIndicator />
                            <PassDetailsCard user={user} pass={latestPass} />
                            
                            <div className="pt-4 border-t border-white/[0.04]">
                              <JourneyAnalytics />
                            </div>

                            <div className="pt-4 border-t border-white/[0.04]">
                              <TravelHistoryTimeline />
                            </div>
                          </div>
                        </AuthCard>
                      </motion.div>
                    )}

                    {subTab === 'transactions' && (
                      <motion.div
                        key="sub-transactions"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <AuthCard
                          title="Financial Audit Ledger"
                          subtitle="Review your historical payments invoices and checkout statuses"
                        >
                          <TransactionTable user={user} />
                        </AuthCard>
                      </motion.div>
                    )}

                    {subTab === 'analytics' && (
                      <motion.div
                        key="sub-analytics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <AuthCard
                          title="Wallet Spending Analytics"
                          subtitle="Smart transit budget saving graphs"
                        >
                          <PaymentAnalytics />
                        </AuthCard>
                      </motion.div>
                    )}

                    {subTab === 'settings' && (
                      <motion.div
                        key="sub-settings"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <AuthCard
                          title="Payments Config Center"
                          subtitle="Set defaults and auto renewal triggers"
                        >
                          <PaymentSettings />
                        </AuthCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Tabs for Metro Smart Card */}
              {activeCard === 'metro' && (
                <motion.div
                  key="metro-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <AuthCard
                    title="Metro Smart Card Parameters"
                    subtitle="Contactless tap card balance checks"
                  >
                    <div className="space-y-4 text-left">
                      <div className="p-5 rounded-2xl border border-white/[0.04] bg-slate-950/40 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Card status</span>
                          <p className="text-emerald-400 font-bold mt-1 text-xs">● ACTIVE COMMUTE CARD</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Wallet Credits</span>
                          <p className="text-white font-bold mt-1 text-xs">₹380.00 Credits</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toast.success('Metro credits top-up loaded.')}
                          className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 text-xs shadow-md"
                        >
                          Recharge Card Credits
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t border-white/[0.04]">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">Recent Metro Boardings</p>
                        <div className="space-y-3.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white font-bold">Terminal 1 → Station Loop</span>
                            <span className="text-slate-400 font-semibold">-₹28.00</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-white font-bold">Station Loop → Tech Hub</span>
                            <span className="text-slate-400 font-semibold">-₹18.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AuthCard>
                </motion.div>
              )}

              {/* Tabs for Student ID */}
              {activeCard === 'student' && (
                <motion.div
                  key="student-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <AuthCard
                    title="Student Identity Verification"
                    subtitle="College registration validation checks"
                  >
                    <div className="space-y-4 text-left">
                      <div className="p-4 rounded-2xl border border-white/[0.04] bg-slate-950/40 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Institute</span>
                          <span className="text-white font-bold">L.N. College of Engineering</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Department</span>
                          <span className="text-white font-bold">Computer Science & Engineering</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Academic Year</span>
                          <span className="text-white font-bold">Final Semester (2024-2026)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 font-bold">Identity Status</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[9px] uppercase tracking-wide">VERIFIED PASSENGER</span>
                        </div>
                      </div>
                    </div>
                  </AuthCard>
                </motion.div>
              )}

              {/* Tabs for Vouchers */}
              {activeCard === 'voucher' && (
                <motion.div
                  key="voucher-details"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <AuthCard
                    title="Discount Coupons & Rewards"
                    subtitle="Voucher discount catalog logs"
                  >
                    <div className="space-y-3.5 text-left">
                      <div className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 flex justify-between items-center gap-4">
                        <div>
                          <h5 className="text-xs font-bold text-white">50% Off Checkout</h5>
                          <p className="text-[10px] text-slate-500 mt-1">Valid code coupon: "TRANSIT50" applied on dashboard.</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/20 text-[9px] text-amber-400 font-black tracking-wider uppercase">ACTIVE</span>
                      </div>
                      
                      <div className="p-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 flex justify-between items-center gap-4 opacity-50">
                        <div>
                          <h5 className="text-xs font-bold text-slate-400">Free Weekend Transit Pass</h5>
                          <p className="text-[10px] text-slate-600 mt-1">Unlocked at 2,000 Gold member reward points.</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-[9px] text-slate-400 font-black tracking-wider uppercase">LOCKED</span>
                      </div>
                    </div>
                  </AuthCard>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Start Boarding Journey modal dialog */}
      <JourneyModal
        show={showJourneyModal}
        onClose={() => setShowJourneyModal(false)}
        route={latestPass?.route || 'Central - Airport'}
      />
    </AuthLayout>
  );
}
export default WalletPage;
