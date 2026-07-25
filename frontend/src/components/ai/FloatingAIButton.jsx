import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AIChatWindow } from './AIChatWindow';

export function FloatingAIButton() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // Suppress rendering chatbot trigger on authorization login/signup steps
  const path = window.location.pathname;
  const isAuthPage = path === '/login' || path === '/signup' || path === '/' || path === '/forgot-password' || path === '/reset-password';
  
  if (isAuthPage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Expanded chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="origin-bottom-right"
          >
            <AIChatWindow 
              user={user} 
              onClose={() => setOpen(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {!open && (
        <motion.button
          layoutId="floatingAiActionBtn"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-2xl flex items-center justify-center relative overflow-hidden focus:outline-none border-2 border-white/20"
          title="Open AI Commute Copilot"
        >
          {/* Pulsing gradient rings */}
          <span className="absolute inset-0 rounded-full border border-pink-400 animate-ping opacity-60 pointer-events-none" />
          
          <Sparkles className="w-6 h-6 animate-pulse" />
        </motion.button>
      )}
    </div>
  );
}
export default FloatingAIButton;
