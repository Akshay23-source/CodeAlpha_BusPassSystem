import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail } from 'lucide-react';

const FooterSection = ({ title, links, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <h3 className="font-bold text-white mb-4">{title}</h3>
    <div className="space-y-3">
      {links.map((link, index) => (
        <a
          key={index}
          href="#"
          className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
        >
          {link}
        </a>
      ))}
    </div>
  </motion.div>
);

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="relative border-t border-slate-800 bg-gradient-to-b from-slate-950 to-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 lg:mb-16">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SmartTransit
                </h2>
                <p className="text-xs text-slate-500 mt-1">Cloud</p>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Revolutionizing public transit with smart, digital passes.
              </p>
            </motion.div>

            {/* Product */}
            <FooterSection
              title="Product"
              links={['Features', 'Pricing', 'Security', 'Mobile App', 'Web Platform']}
              delay={0.1}
            />

            {/* Company */}
            <FooterSection
              title="Company"
              links={['About Us', 'Blog', 'Careers', 'Press', 'Contact']}
              delay={0.2}
            />

            {/* Resources */}
            <FooterSection
              title="Resources"
              links={['Documentation', 'API Reference', 'Help Center', 'Community', 'Tutorials']}
              delay={0.3}
            />

            {/* Legal */}
            <FooterSection
              title="Legal"
              links={['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Compliance', 'Contact']}
              delay={0.4}
            />
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 origin-left mb-8"
          />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            {/* Left Side */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-slate-500">
              <p>© 2024 SmartTransit Cloud. All rights reserved.</p>
              <div className="hidden sm:block h-4 w-px bg-slate-700" />
              <a href="#" className="hover:text-slate-300 transition-colors">
                Made with ❤️ by CodeAlpha
              </a>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full border border-slate-700 bg-slate-900/50 text-slate-400 hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all z-40"
      >
        ↑
      </motion.button>
    </footer>
  );
}
