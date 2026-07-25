import React from 'react';
import { motion } from 'framer-motion';

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
  {
    icon: (props) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    href: '#',
    label: 'X (Twitter)',
  },
  {
    icon: (props) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    href: '#',
    label: 'Facebook',
  },
  {
    icon: (props) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    href: '#',
    label: 'LinkedIn',
  },
  {
    icon: (props) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    href: '#',
    label: 'Instagram',
  },
  {
    icon: (props) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
    href: '#',
    label: 'GitHub',
  },
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
