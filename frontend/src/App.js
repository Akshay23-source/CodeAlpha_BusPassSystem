import React, { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Activity, BarChart3, Ticket, Wallet, Zap } from 'lucide-react';

import { FeedbackToast } from './components/FeedbackToast';
import { LandingPage } from './pages/LandingPage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { requestJson, authHeaders } from './services/api';
import { ProtectedRoute, PublicRoute } from './components/auth/routeGuards';
import { SessionExpiredModal } from './components/auth/SessionExpiredModal';
import { VerificationBanner } from './components/auth/VerificationBanner';
import { LoadingOverlay } from './components/auth/LoadingOverlay';
import { FloatingAIButton } from './components/ai/FloatingAIButton';

// Redesigned premium Dashboard components
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { Sidebar } from './components/dashboard/Sidebar';
import { StatCard } from './components/dashboard/StatCard';
import { DigitalPassCard } from './components/dashboard/DigitalPassCard';
import { QRPreviewCard } from './components/dashboard/QRPreviewCard';
import { QuickActions } from './components/dashboard/QuickActions';
import { TravelTimeline } from './components/dashboard/TravelTimeline';
import { PaymentSummary } from './components/dashboard/PaymentSummary';
import { AnalyticsChart } from './components/dashboard/AnalyticsChart';
import { RightSidebar } from './components/dashboard/RightSidebar';
import { EmptyState } from './components/dashboard/EmptyState';
import { StatSkeleton, TableSkeleton } from './components/dashboard/LoadingSkeleton';

// Lazy load authentication pages for modular structure
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/auth/SignupPage').then(m => ({ default: m.SignupPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })));
const EmailVerificationPage = lazy(() => import('./pages/auth/EmailVerificationPage').then(m => ({ default: m.EmailVerificationPage })));
const OTPVerificationPage = lazy(() => import('./pages/auth/OTPVerificationPage').then(m => ({ default: m.OTPVerificationPage })));
const ProfileCompletionPage = lazy(() => import('./pages/auth/ProfileCompletionPage').then(m => ({ default: m.ProfileCompletionPage })));
const ApplyPassPage = lazy(() => import('./pages/auth/ApplyPassPage').then(m => ({ default: m.ApplyPassPage })));
const WalletPage = lazy(() => import('./pages/auth/WalletPage').then(m => ({ default: m.WalletPage })));
const ConductorPage = lazy(() => import('./pages/auth/ConductorPage').then(m => ({ default: m.ConductorPage })));
const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(m => ({ default: m.AdminPage })));
const JourneyPlannerPage = lazy(() => import('./pages/auth/JourneyPlannerPage').then(m => ({ default: m.JourneyPlannerPage })));
const SuccessPage = lazy(() => import('./pages/auth/SuccessPage').then(m => ({ default: m.SuccessPage })));
const UnauthorizedPage = lazy(() => import('./pages/auth/UnauthorizedPage').then(m => ({ default: m.UnauthorizedPage })));
const NotFoundPage = lazy(() => import('./pages/auth/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

/**
 * Main dashboard view for authenticated riders
 */
function DashboardView() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('No active pass');

  const loadDashboard = React.useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const [passData, userData, statusData] = await Promise.all([
        requestJson('/api/pass/my', { headers: authHeaders(token) }),
        requestJson('/api/auth/me', { headers: authHeaders(token) }),
        requestJson('/api/pass/status', { headers: authHeaders(token) }),
      ]);

      setPasses(Array.isArray(passData) ? passData : []);
      setStatus(statusData?.status === 'no-pass' ? 'No active pass yet' : `${statusData?.status || 'Active'} · ${statusData?.route || 'Route'}`);
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // Set greeting message dynamically based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    const name = user?.name ? user.name.split(' ')[0] : 'Akshay';
    if (hour < 12) return `Good Morning, ${name} 👋`;
    if (hour < 18) return `Good Afternoon, ${name} 👋`;
    return `Good Evening, ${name} 👋`;
  }, [user]);

  const latestActivePass = useMemo(() => {
    if (!passes || passes.length === 0) return null;
    return passes[passes.length - 1];
  }, [passes]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.06),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] text-slate-100 flex flex-col">
      <VerificationBanner />
      
      {/* Redesigned Top Header Navbar */}
      <DashboardHeader 
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex flex-1 relative">
        {/* Collapsible Left Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        {/* Dashboard workspace grid */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          {/* Welcome header with date and membership details */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 pb-4 border-b border-white/[0.04]">
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">{greeting}</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · Sunny 28°C
              </p>
            </div>
            
            <div className="rounded-2xl border border-white/[0.05] bg-slate-900/10 px-4 py-2 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-300">Level: Gold Commuter</span>
            </div>
          </div>

          {/* Conditional loading skeletals or actual grid panels */}
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
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
              
              {/* Main content pane (Left) */}
              <div className="space-y-6">
                
                {/* Stats Counters Grid */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <StatCard 
                    title="Active Route" 
                    value={latestActivePass?.route || 'No Pass'} 
                    subtitle={latestActivePass ? 'Secured pass active' : 'Apply pass to start'} 
                    icon={Ticket}
                    color="blue"
                  />
                  <StatCard 
                    title="Days Remaining" 
                    value={latestActivePass ? '24 Days' : '0 Days'} 
                    subtitle="Expiry Aug 15, 2026" 
                    icon={Activity}
                    color="amber"
                  />
                  <StatCard 
                    title="Wallet Balance" 
                    value="₹150" 
                    subtitle="Auto top-up active" 
                    icon={Wallet}
                    color="emerald"
                  />
                  <StatCard 
                    title="Total Trips" 
                    value={38} 
                    subtitle="This billing period" 
                    icon={Activity}
                    color="purple"
                  />
                  <StatCard 
                    title="Amount Saved" 
                    value="₹850" 
                    subtitle="Compared to single fare" 
                    icon={BarChart3}
                    color="pink"
                  />
                  <StatCard 
                    title="Reward Points" 
                    value={1250} 
                    subtitle="Gold benefits level" 
                    icon={Zap}
                    color="blue"
                  />
                </div>

                {/* Digital Wallet pass and Quick Operations actions */}
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
                  {latestActivePass ? (
                    <DigitalPassCard 
                      pass={latestActivePass}
                      user={user}
                      onRenew={() => navigate('/apply-pass')}
                      onViewQr={() => setShowQrModal(true)}
                    />
                  ) : (
                    <EmptyState type="no-pass" />
                  )}
                  <QuickActions 
                    onViewQr={() => setShowQrModal(true)}
                    onRenew={() => navigate('/apply-pass')}
                  />
                </div>

                {/* Travel Timeline lists & Payments invoice lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/[0.04]">
                  <TravelTimeline />
                  <PaymentSummary />
                </div>

                {/* Interactive analytics graphs */}
                <div className="pt-6 border-t border-white/[0.04]">
                  <AnalyticsChart />
                </div>

              </div>

              {/* Sidebar helper panels (Right Column - Desktop only) */}
              <div className="hidden lg:block">
                <RightSidebar user={user} />
              </div>

            </div>
          )}
        </main>
      </div>

      {/* QR scanner full modal */}
      <QRPreviewCard 
        show={showQrModal}
        onClose={() => setShowQrModal(false)}
        route={latestActivePass?.route || 'Central - Airport'}
      />
    </div>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      {/* Hot toast manager for notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <FeedbackToast />

      {/* Global Session Expired modal listener */}
      <SessionExpiredModal />

      <Suspense fallback={<LoadingOverlay show={true} message="Loading secure cockpit..." />}>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Auth routes */}
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordPage /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ResetPasswordPage /></PublicRoute>} />

           {/* Guarded Auth stages */}
          <Route path="/verify-email" element={<ProtectedRoute><EmailVerificationPage /></ProtectedRoute>} />
          <Route path="/verify-otp" element={<ProtectedRoute><OTPVerificationPage /></ProtectedRoute>} />
          <Route path="/profile-completion" element={<ProtectedRoute><ProfileCompletionPage /></ProtectedRoute>} />
          <Route path="/apply-pass" element={<ProtectedRoute><ApplyPassPage /></ProtectedRoute>} />
 
           {/* Secure App routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardView /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/conductor" element={<ProtectedRoute><ConductorPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
          <Route path="/journey" element={<ProtectedRoute><JourneyPlannerPage /></ProtectedRoute>} />

          {/* Help & Error pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          
          {/* Default catch-all */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
      <FloatingAIButton />
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;