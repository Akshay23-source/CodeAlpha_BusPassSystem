import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function LandingNavbar({ onAuthClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScroll, setHasScroll] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setHasScroll(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleGetStarted = () => {
    if (onAuthClick) {
      onAuthClick('signup');
    }
  };

  const handleLogIn = () => {
    if (onAuthClick) {
      onAuthClick('login');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScroll
          ? 'py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50'
          : 'py-6 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">✓</span>
            </motion.div>
            <div>
              <h1 className="text-lg font-black text-white">SmartTransit</h1>
              <p className="text-xs text-blue-400 -mt-0.5">Cloud</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full border border-slate-700 bg-slate-900/50 text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* CTA Buttons - Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.button
                onClick={handleLogIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-white font-semibold hover:text-blue-300 transition-colors"
              >
                Log In
              </motion.button>
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 transition-all"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white border border-slate-700"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
        >
          <div className="pt-4 pb-4 space-y-2 border-t border-slate-800 mt-4">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                whileHover={{ x: 4 }}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-800">
              <motion.button
                onClick={handleLogIn}
                whileHover={{ scale: 1.02 }}
                className="w-full px-4 py-2.5 text-white font-semibold border border-blue-500 rounded-full hover:bg-blue-500/10 transition-all"
              >
                Log In
              </motion.button>
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.02 }}
                className="w-full px-4 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
}
