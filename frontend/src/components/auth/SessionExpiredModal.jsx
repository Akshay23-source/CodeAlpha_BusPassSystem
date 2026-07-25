import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function SessionExpiredModal() {
  const { sessionExpired, setSessionExpired } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => {
    setSessionExpired(false);
    navigate('/login', { replace: true });
  };

  return (
    <AnimatePresence>
      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md p-6 rounded-3xl border border-red-500/20 bg-slate-900/90 shadow-2xl text-center space-y-6"
          >
            {/* Warning Icon with pulse */}
            <div className="flex justify-center">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-red-500/20 blur-md"
                />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20 text-white">
                  <ShieldAlert className="w-8 h-8 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Session Expired</h3>
              <p className="text-slate-400 text-sm">
                Your authentication token has expired or is no longer valid. For security purposes, please log in again.
              </p>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClose}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-amber-600 hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Sign In Again
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
