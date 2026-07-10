import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Engineering Student',
    avatar: '👩‍🎓',
    rating: 5,
    text: 'SmartTransit Cloud saved me so much time. I used to spend 20 minutes every month renewing my pass. Now it\'s automatic!',
  },
  {
    name: 'Raj Patel',
    role: 'Commuter, Tech Professional',
    avatar: '👨‍💼',
    rating: 5,
    text: 'The offline pass feature is a game-changer. I can still scan my pass even when my phone battery is dying.',
  },
  {
    name: 'Emma Rodriguez',
    role: 'Medical Student',
    avatar: '👩‍⚕️',
    rating: 5,
    text: 'Love the analytics dashboard. It helps me track my spending and plan my budget better. No more surprises!',
  },
  {
    name: 'Alex Kim',
    role: 'University Administrator',
    avatar: '👨‍💻',
    rating: 5,
    text: 'As an admin, the real-time reporting is invaluable. We can see usage patterns and plan routes better.',
  },
  {
    name: 'Jessica Martinez',
    role: 'Morning Commuter',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'The AI support answered my question at 6 AM before my commute. Customer service is now instant and smart.',
  },
];

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.9 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4 }}
    className={`absolute inset-0 p-8 sm:p-10 rounded-3xl border transition-all duration-300 ${
      isActive
        ? 'border-blue-500/50 bg-gradient-to-br from-blue-600/20 to-purple-600/20'
        : 'border-slate-700 bg-slate-900/30'
    }`}
  >
    <div className="flex items-start gap-4 mb-6">
      <div className="text-4xl">{testimonial.avatar}</div>
      <div className="flex-1">
        <h4 className="font-bold text-white">{testimonial.name}</h4>
        <p className="text-sm text-slate-400">{testimonial.role}</p>
      </div>
    </div>

    <div className="flex gap-1 mb-4">
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    <p className="text-slate-200 leading-relaxed">{testimonial.text}</p>
  </motion.div>
);

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Loved by Users
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Around the World
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            See what thousands of happy users have to say about SmartTransit Cloud.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative h-80 mb-8">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                isActive={index === current}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2 justify-center flex-1">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 w-8'
                    : 'bg-slate-700 w-2'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
