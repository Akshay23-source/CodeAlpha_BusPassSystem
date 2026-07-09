import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Activity, BarChart3, ShieldCheck, Ticket, Zap } from 'lucide-react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HeroCard } from './components/cards/HeroCard';
import { AuthForm } from './components/forms/AuthForm';
import { PassApplicationForm } from './components/forms/PassApplicationForm';
import { Card } from './components/ui/Card';
import { StatCard } from './components/cards/StatCard';
import { PassCard } from './components/cards/PassCard';
import { FeedbackToast } from './components/FeedbackToast';
import { ThemeProvider } from './context/ThemeContext';
import { requestJson, authHeaders } from './services/api';
import './index.css';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [authMode, setAuthMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', rememberMe: false });
  const [applyRoute, setApplyRoute] = useState('Central - Airport');
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
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
      setUser(userData || null);
      setStatus(statusData?.status === 'no-pass' ? 'No active pass yet' : `${statusData?.status || 'Active'} · ${statusData?.route || 'Route'}`);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadDashboard();
    }
  }, [isLoggedIn, loadDashboard]);

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = authMode === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const payload = authMode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const data = await requestJson(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (authMode === 'login') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken || '');
        setUser(data.user);
        setIsLoggedIn(true);
        toast.success('Welcome back — your dashboard is ready.');
      } else {
        setAuthMode('login');
        toast.success('Account created. Please sign in to continue.');
      }
    } catch (error) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPass = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await requestJson('/api/pass/apply', {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ route: applyRoute, passType: 'monthly' }),
      });
      toast.success('Your pass request is now live.');
      loadDashboard();
    } catch (error) {
      toast.error(error.message || 'Unable to apply pass');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQr = async () => {
    const token = localStorage.getItem('token');
    try {
      const data = await requestJson('/api/qr/generate', { headers: authHeaders(token) });
      toast.success(`QR ready for ${data.qrData || 'your pass'}`);
    } catch (error) {
      toast.error(error.message || 'QR generation failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUser(null);
    setPasses([]);
    setStatus('No active pass');
    toast.success('You have been logged out.');
  };

  const summaryStats = useMemo(() => [
    { title: 'Pass status', value: status, subtitle: 'Live service update' },
    { title: 'Estimated savings', value: `₹${passes.length * 45}`, subtitle: 'This month' },
    { title: 'Next step', value: passes.length > 0 ? 'Board with confidence' : 'Apply your first pass', subtitle: 'Fast onboarding' },
  ], [passes.length, status]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.2),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] px-4 py-4 text-slate-100 sm:px-6 lg:px-8">
      <FeedbackToast />
      <Navbar isLoggedIn={isLoggedIn} onLogout={logout} onToggleAuth={() => setAuthMode((prev) => (prev === 'signup' ? 'login' : 'signup'))} />

      <div className="flex gap-6">
        <Sidebar />
        <main className="flex-1 space-y-6">
          <HeroCard onPrimaryAction={() => setAuthMode('signup')} />

          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 md:grid-cols-3">
            {summaryStats.map((item) => (
              <StatCard key={item.title} title={item.title} value={item.value} subtitle={item.subtitle} icon={item.title.includes('Pass') ? Ticket : item.title.includes('Estimated') ? BarChart3 : Activity} />
            ))}
          </motion.section>

          {!isLoggedIn ? (
            <section className="grid gap-6 xl:grid-cols-[0.95fr_0.75fr]">
              <AuthForm authMode={authMode} form={form} onFieldChange={(field, value) => setForm((prev) => ({ ...prev, [field]: value }))} onSubmit={handleAuthSubmit} loading={loading} switchMode={setAuthMode} />
              <Card>
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-300">
                  <ShieldCheck className="h-4 w-4" />
                  Why riders trust this experience
                </div>
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">Fast onboarding with a polished sign-up and login flow.</div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">Route-based pass management for daily and monthly travel.</div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">Modern dashboard cards that feel premium and helpful.</div>
                </div>
              </Card>
            </section>
          ) : (
            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <Card>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-300">Travel cockpit</p>
                      <h3 className="text-xl font-semibold text-slate-100">{user ? `Welcome back, ${user.name}` : 'Your smart bus pass dashboard'}</h3>
                    </div>
                    <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-400">{passes.length} active pass{passes.length === 1 ? '' : 'es'}</div>
                  </div>
                  <PassApplicationForm applyRoute={applyRoute} onRouteChange={setApplyRoute} onSubmit={handleApplyPass} onGenerateQr={handleGenerateQr} loading={loading} />
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <div className="mb-4 flex items-center gap-2 text-sm font-medium text-blue-300">
                    <Zap className="h-4 w-4" />
                    Recent passes
                  </div>
                  <div className="space-y-3">
                    {passes.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-800 p-4 text-sm text-slate-400">No passes yet. Apply your first one to begin.</div>
                    ) : (
                      passes.map((pass) => <PassCard key={pass.id || pass.route} pass={pass} />)
                    )}
                  </div>
                </Card>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;