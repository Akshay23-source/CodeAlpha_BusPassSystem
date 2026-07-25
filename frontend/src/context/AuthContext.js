import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, useAuthStore } from '../services/authStore';

const AuthContext = createContext(null);

// Create a global event emitter for 401 errors
export const authEventEmitter = {
  listeners: [],
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  },
  emitExpired() {
    this.listeners.forEach((callback) => callback());
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(useAuthStore.getToken());
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [emailVerified, setEmailVerified] = useState(() => {
    return localStorage.getItem('emailVerified') === 'true';
  });
  const [profileCompleted, setProfileCompleted] = useState(() => {
    return localStorage.getItem('profileCompleted') === 'true';
  });

  const checkUserSession = async () => {
    const activeToken = useAuthStore.getToken();
    if (!activeToken) {
      setLoading(false);
      return;
    }
    try {
      const userData = await authAPI.me(activeToken);
      setUser(userData);
      setToken(activeToken);
    } catch (err) {
      console.error('Session check failed:', err);
      // If server returns error, session might be invalid
      if (err.message.includes('401') || err.message.toLowerCase().includes('token')) {
        handleLogout(true); // expired
      } else {
        // network error or temporary issue
        setUser(useAuthStore.getUser());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();

    // Subscribe to global 401 events
    const unsubscribe = authEventEmitter.subscribe(() => {
      handleLogout(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    const data = await authAPI.login(email, password);
    if (data.token) {
      useAuthStore.setToken(data.token);
      setToken(data.token);
      if (data.refreshToken) {
        useAuthStore.setRefreshToken(data.refreshToken);
      }
      if (data.user) {
        useAuthStore.setUser(data.user);
        setUser(data.user);
      }
      setSessionExpired(false);
      
      // For mock demonstration, assume email is verified on simple login if it was already verified before
      // otherwise true
      localStorage.setItem('emailVerified', 'true');
      setEmailVerified(true);
    }
    return data;
  };

  const handleRegister = async (name, email, password) => {
    const data = await authAPI.register(name, email, password);
    if (data.token) {
      useAuthStore.setToken(data.token);
      setToken(data.token);
      if (data.refreshToken) {
        useAuthStore.setRefreshToken(data.refreshToken);
      }
      if (data.user) {
        useAuthStore.setUser(data.user);
        setUser(data.user);
      }
      setSessionExpired(false);
      
      // Newly registered users must verify email
      localStorage.setItem('emailVerified', 'false');
      setEmailVerified(false);
      localStorage.setItem('profileCompleted', 'false');
      setProfileCompleted(false);
    }
    return data;
  };

  const handleLogout = (expired = false) => {
    useAuthStore.clearAuth();
    setUser(null);
    setToken(null);
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('profileCompleted');
    setEmailVerified(false);
    setProfileCompleted(false);
    if (expired) {
      setSessionExpired(true);
    } else {
      setSessionExpired(false);
    }
  };

  const markEmailAsVerified = () => {
    localStorage.setItem('emailVerified', 'true');
    setEmailVerified(true);
  };

  const markProfileAsCompleted = () => {
    localStorage.setItem('profileCompleted', 'true');
    setProfileCompleted(true);
  };

  const value = {
    user,
    token,
    loading,
    sessionExpired,
    emailVerified,
    profileCompleted,
    isAuthenticated: !!token,
    login: handleLogin,
    register: handleRegister,
    logout: () => handleLogout(false),
    setSessionExpired,
    markEmailAsVerified,
    markProfileAsCompleted,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
