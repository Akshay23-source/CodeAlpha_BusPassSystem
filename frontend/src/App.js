import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const [authMode, setAuthMode] = useState('signup');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    route: 'Central - Airport',
  });
  const [applyRoute, setApplyRoute] = useState('Central - Airport');
  const [passes, setPasses] = useState([]);
  const [message, setMessage] = useState('Ride smarter with instant bus pass access and travel insights.');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadPasses();
    }
  }, [isLoggedIn]);

  const loadPasses = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/pass/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPasses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const endpoint = authMode === 'signup' ? '/api/auth/register' : '/api/auth/login';
      const payload = authMode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Authentication failed');
      }

      if (authMode === 'login') {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setMessage('Welcome back! Your travel dashboard is ready.');
      } else {
        setAuthMode('login');
        setMessage('Account created successfully. Please log in to start using your pass.');
      }
    } catch (error) {
      setMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPass = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/pass/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ route: applyRoute }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Unable to apply pass');
      }

      setMessage('Your pass request is live. Enjoy a smoother commute.');
      loadPasses();
    } catch (error) {
      setMessage(error.message || 'Unable to apply pass');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setPasses([]);
    setMessage('You have been logged out.');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Smart Bus Pass</p>
          <h1>Travel faster with a smarter commute.</h1>
        </div>
        <div className="topbar-actions">
          {isLoggedIn ? (
            <button className="ghost-button" onClick={logout}>Logout</button>
          ) : (
            <button className="primary-button" onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')}>
              {authMode === 'signup' ? 'Login instead' : 'Sign up instead'}
            </button>
          )}
        </div>
      </header>

      <main className="content-grid">
        <section className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">Unique features</p>
            <h2>Secure signup, instant pass requests, and a travel dashboard built for everyday riders.</h2>
            <p>
              Create your account, apply for a pass, track your ride history, and enjoy smart route suggestions
              that make each journey simpler.
            </p>
            <div className="pill-row">
              <span>⚡ Instant access</span>
              <span>🧭 Route insights</span>
              <span>🪪 Digital pass ready</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-card">
              <p className="panel-label">Your travel badge</p>
              <h3>Daily commuter mode</h3>
              <p>Fast boarding • Smart routing • Zero hassle</p>
              <div className="qr-box">
                <div className="qr-grid">
                  {Array.from({ length: 64 }).map((_, index) => (
                    <span key={index} className={index % 5 === 0 ? 'qr-dark' : 'qr-light'} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {message && <div className="status-box">{message}</div>}

        {!isLoggedIn ? (
          <section className="auth-grid">
            <div className="card">
              <div className="card-header">
                <h3>{authMode === 'signup' ? 'Sign up' : 'Login'}</h3>
                <div className="toggle-group">
                  <button className={authMode === 'signup' ? 'active' : ''} onClick={() => setAuthMode('signup')}>Sign up</button>
                  <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Login</button>
                </div>
              </div>

              <form onSubmit={handleAuthSubmit} className="form-stack">
                {authMode === 'signup' && (
                  <input
                    placeholder="Full name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                  />
                )}
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  required
                />
                <button className="primary-button" type="submit" disabled={loading}>
                  {loading ? 'Please wait...' : authMode === 'signup' ? 'Create account' : 'Login'}
                </button>
              </form>
            </div>

            <div className="card feature-card">
              <h3>Why riders love this experience</h3>
              <ul>
                <li>Fast onboarding with a polished sign-up flow</li>
                <li>Route-based pass management for daily and monthly travel</li>
                <li>Smart dashboard cards that feel modern and helpful</li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="dashboard-grid">
            <div className="card wide-card">
              <div className="card-header">
                <div>
                  <p className="eyebrow">Travel cockpit</p>
                  <h3>Your bus pass dashboard</h3>
                </div>
                <div className="chip">{passes.length} active pass{passes.length === 1 ? '' : 'es'}</div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <p>Active routes</p>
                  <strong>{passes.length || 0}</strong>
                </div>
                <div className="stat-card">
                  <p>Estimated savings</p>
                  <strong>₹{passes.length * 45}</strong>
                </div>
                <div className="stat-card">
                  <p>Next step</p>
                  <strong>{passes.length > 0 ? 'Board with confidence' : 'Apply your first pass'}</strong>
                </div>
              </div>

              <form onSubmit={handleApplyPass} className="apply-form">
                <label>Choose your route</label>
                <select value={applyRoute} onChange={(event) => setApplyRoute(event.target.value)}>
                  <option>Central - Airport</option>
                  <option>North Gate - Market</option>
                  <option>University - Tech Park</option>
                  <option>Harbor - Downtown</option>
                </select>
                <button className="primary-button" type="submit" disabled={loading}>Apply pass</button>
              </form>
            </div>

            <div className="card">
              <h3>Recent passes</h3>
              <div className="pass-list">
                {passes.length === 0 ? (
                  <p>No passes yet. Apply your first one to begin.</p>
                ) : (
                  passes.map((pass) => (
                    <div key={pass.id} className="pass-item">
                      <strong>{pass.route}</strong>
                      <span>Pass #{pass.id}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;