import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Users, Ticket, CreditCard, Cpu, LifeBuoy, Settings, BarChart3, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

import { AdminHeader } from '../../components/admin/AdminHeader';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { StatCard } from '../../components/dashboard/StatCard';
import { UsersTable } from '../../components/admin/UsersTable';
import { PassTable } from '../../components/admin/PassTable';
import { TransactionTable } from '../../components/payments/TransactionTable';
import { CloudStatusCard } from '../../components/admin/CloudStatusCard';
import { SupportCard } from '../../components/admin/SupportCard';
import { AIInsightCard } from '../../components/admin/AIInsightCard';
import { AnalyticsChart } from '../../components/dashboard/AnalyticsChart';
import { StatSkeleton, TableSkeleton } from '../../components/dashboard/LoadingSkeleton';
import { requestJson, authHeaders } from '../../services/api';

export function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Operations Data state
  const [stats, setStats] = useState({ users: 0, approvedPasses: 0, pendingPasses: 0 });
  const [usersList, setUsersList] = useState([]);
  const [passesList, setPassesList] = useState([]);

  // Role Gate Interception
  useEffect(() => {
    if (user && user.role !== 'admin' && user.role !== 'super_admin') {
      toast.error('Admin access required');
      navigate('/unauthorized');
    }
  }, [user, navigate]);

  const loadOperationsData = React.useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const [statsData, usersData, passesData] = await Promise.all([
        requestJson('/api/admin/dashboard', { headers: authHeaders(token) }),
        requestJson('/api/admin/users', { headers: authHeaders(token) }),
        requestJson('/api/admin/all_passes', { headers: authHeaders(token) }),
      ]);

      setStats(statsData || { users: 0, approvedPasses: 0, pendingPasses: 0 });
      setUsersList(Array.isArray(usersData) ? usersData : []);
      setPassesList(Array.isArray(passesData) ? passesData : []);
    } catch (err) {
      console.error('Failed to load admin operations console:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOperationsData();
  }, [loadOperationsData]);

  const handleApprovePass = async (passId) => {
    const token = localStorage.getItem('token');
    try {
      await requestJson(`/api/admin/approve/${passId}`, {
        method: 'PUT',
        headers: authHeaders(token),
      });
      toast.success(`Pass #${passId} approved successfully.`);
      loadOperationsData();
    } catch (err) {
      toast.error(err.message || 'Pass approval failed');
    }
  };

  const handleRejectPass = async (passId) => {
    const token = localStorage.getItem('token');
    try {
      await requestJson(`/api/admin/reject/${passId}`, {
        method: 'PUT',
        headers: authHeaders(token),
      });
      toast.success(`Pass #${passId} rejected.`);
      loadOperationsData();
    } catch (err) {
      toast.error(err.message || 'Pass rejection failed');
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await requestJson(`/api/admin/delete_user/${userId}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      });
      toast.success('Rider account archived.');
      loadOperationsData();
    } catch (err) {
      toast.error(err.message || 'Failed to archive user');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.06),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] text-slate-100 flex flex-col">
      {/* Admin header navbar */}
      <AdminHeader
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex flex-1 relative">
        {/* Collapsible Admin Navigation sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          onTabSelect={(tab) => setActiveTab(tab)}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dashboard workspace grids */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 pb-4 border-b border-white/[0.04] text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">Operations Control Center</h2>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest mt-1">NODE CLOUD MANAGER · SESSION ACTIVE</p>
            </div>
            <div className="rounded-2xl border border-white/[0.05] bg-slate-900/10 px-4 py-2 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-300">Transit Health: 100%</span>
            </div>
          </div>

          {loading ? (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </div>
              <TableSkeleton />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              
              {/* Tab: Dashboard Operations Overview */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  {/* Stats Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <StatCard
                      title="Riders Registered"
                      value={stats.users}
                      subtitle="Active commuters"
                      icon={Users}
                      color="blue"
                    />
                    <StatCard
                      title="Approved Passes"
                      value={stats.approvedPasses}
                      subtitle="Active valid tickets"
                      icon={Ticket}
                      color="emerald"
                    />
                    <StatCard
                      title="Pending Requests"
                      value={stats.pendingPasses}
                      subtitle="Authorization needed"
                      icon={Activity}
                      color="amber"
                    />
                  </div>

                  {/* Widgets grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    <div className="space-y-6">
                      <CloudStatusCard />
                      <div className="pt-4 border-t border-white/[0.04]">
                        <AnalyticsChart />
                      </div>
                    </div>
                    <div className="space-y-6 border-l border-white/[0.04] lg:pl-6">
                      <AIInsightCard />
                      <SupportCard />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab: User Database Management */}
              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <UsersTable
                    users={usersList}
                    onDelete={handleDeleteUser}
                  />
                </motion.div>
              )}

              {/* Tab: Pass Requests Authorizations */}
              {activeTab === 'passes' && (
                <motion.div
                  key="passes"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <PassTable
                    passes={passesList}
                    onApprove={handleApprovePass}
                    onReject={handleRejectPass}
                  />
                </motion.div>
              )}

              {/* Tab: Payments Transactions Ledger */}
              {activeTab === 'payments' && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <TransactionTable user={user} />
                </motion.div>
              )}

              {/* Tab: Cloud Monitor CPU usages */}
              {activeTab === 'system' && (
                <motion.div
                  key="system"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <CloudStatusCard />
                </motion.div>
              )}

              {/* Tab: Support center help queue */}
              {activeTab === 'support' && (
                <motion.div
                  key="support"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <SupportCard />
                </motion.div>
              )}

              {/* Tab: Settings Configurations parameters */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-5 rounded-3xl border border-white/[0.06] bg-slate-900/10 backdrop-blur-sm text-left space-y-4 text-xs font-semibold text-slate-400 max-w-lg"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Portal Name</label>
                    <input type="text" defaultValue="SmartTransit Cloud Ops" className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-800 rounded-xl text-white font-bold" />
                  </div>
                  <div className="space-y-1 pt-2 border-t border-white/[0.03]">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">SMS API Gateway Endpoint</label>
                    <input type="text" defaultValue="https://api.sms-gateway.internal/v1/send" className="w-full px-4 py-2.5 bg-slate-950/40 border border-slate-800 rounded-xl text-white font-mono" />
                  </div>
                  <button onClick={() => toast.success('Portal settings saved.')} className="w-full py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                    Save Operations Config
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          )}

        </main>
      </div>
    </div>
  );
}
export default AdminPage;
