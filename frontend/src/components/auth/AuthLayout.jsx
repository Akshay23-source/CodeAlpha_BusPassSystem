import React from 'react';
import { AnimatedAuthBackground } from './AnimatedAuthBackground';

export function AuthLayout({ children, showSidebar = true }) {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      <AnimatedAuthBackground />

      <div className="relative z-10 w-full h-screen flex">
        {/* Left Side - Illustration (Desktop only) */}
        {showSidebar && (
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
            <div className="max-w-md space-y-8">
              {/* Decorative cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-4xl mb-2">🔒</div>
                  <p className="text-sm text-slate-300">Enterprise-grade security</p>
                </div>
                <div className="p-6 rounded-2xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                  <div className="text-4xl mb-2">⚡</div>
                  <p className="text-sm text-slate-300">Lightning-fast authentication</p>
                </div>
                <div className="p-6 rounded-2xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                  <div className="text-4xl mb-2">🌐</div>
                  <p className="text-sm text-slate-300">Global access, local trust</p>
                </div>
              </div>

              {/* Brand tagline */}
              <div className="text-center">
                <p className="text-2xl font-black text-white mb-2">SmartTransit Cloud</p>
                <p className="text-slate-400">AI-Powered Smart Transit Pass Platform</p>
              </div>
            </div>
          </div>
        )}

        {/* Right Side - Auth Form */}
        <div className={`w-full ${showSidebar ? 'lg:w-1/2' : ''} flex items-center justify-center p-4 sm:p-8`}>
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
