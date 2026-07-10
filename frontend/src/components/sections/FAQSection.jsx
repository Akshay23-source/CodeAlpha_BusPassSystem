import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    viewport={{ once: true }}
    className="border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
  >
    <motion.button
      onClick={onToggle}
      className={`w-full px-6 sm:px-8 py-4 sm:py-5 flex items-center justify-between transition-all duration-300 ${
        isOpen ? 'bg-slate-900/80' : 'bg-slate-900/40 hover:bg-slate-900/60'
      }`}
    >
      <span className="text-left font-semibold text-white">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex-shrink-0 ml-4"
      >
        <ChevronDown className="w-5 h-5 text-blue-400" />
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-slate-700 bg-slate-900/30"
        >
          <p className="px-6 sm:px-8 py-4 sm:py-5 text-slate-300 leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const faqs = [
  {
    question: 'How do I get started with SmartTransit Cloud?',
    answer:
      'Simply sign up with your email, verify your identity, choose your routes, and complete payment. You\'ll have your digital pass within minutes and can start scanning immediately.',
  },
  {
    question: 'Is my payment information secure?',
    answer:
      'Yes! We use 256-bit SSL encryption and comply with PCI DSS standards. All payment data is processed through secure gateways and we never store your full credit card details.',
  },
  {
    question: 'Can I use SmartTransit Cloud offline?',
    answer:
      'Absolutely! You can download your QR code and use it offline. However, you\'ll need internet to activate auto-recharge and check real-time notifications.',
  },
  {
    question: 'What happens if I lose my phone?',
    answer:
      'Your pass is tied to your account, not your phone. Simply log into a new device and download your pass again. Your subscription remains active and unaffected.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'We offer a 30-day money-back guarantee for unused passes. If you\'re not satisfied, contact our support team for a full refund, no questions asked.',
  },
  {
    question: 'Is there a student discount?',
    answer:
      'Yes! Our Student plan includes a 30% discount on monthly passes. You just need to verify your student status with a valid student ID or .edu email.',
  },
  {
    question: 'Can I share my pass with someone else?',
    answer:
      'No, passes are tied to your account for security reasons. However, each family member can create their own account and get student discounts if eligible.',
  },
  {
    question: 'What if my routes change?',
    answer:
      'You can update your routes anytime in your dashboard. Your subscription price remains the same, and the changes take effect immediately.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about SmartTransit Cloud.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              index={index}
            />
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-12 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-purple-600/10 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-3">
            Didn't find what you're looking for?
          </h3>
          <p className="text-slate-300 mb-6">
            Our support team is here to help 24/7. Get instant answers from our AI assistant or chat with a human.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              Chat with AI
            </button>
            <button className="px-6 py-3 rounded-full font-semibold text-white border border-blue-500 hover:bg-blue-500/10 transition-all">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
