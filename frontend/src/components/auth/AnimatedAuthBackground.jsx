import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function AnimatedAuthBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse movement
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate coordinates relative to center of screen
      const x = (e.clientX - window.innerWidth / 2) / 15;
      const y = (e.clientY - window.innerHeight / 2) / 15;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020617] pointer-events-none select-none">
      {/* Dynamic Background Mesh Gradients */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="absolute inset-0 opacity-40 mix-blend-screen"
      >
        {/* Blob 1 */}
        <motion.div
          animate={{
            x: [0, 80, -50, 0],
            y: [0, -90, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.18)_0%,_transparent_65%)]"
        />

        {/* Blob 2 */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 80, -90, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-[-15%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15)_0%,_transparent_65%)]"
        />

        {/* Blob 3 */}
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, 60, 80, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
          className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.08)_0%,_transparent_60%)]"
        />
      </motion.div>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"
        style={{
          maskImage: 'radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)',
          WebkitMaskImage: 'radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)'
        }}
      />

      {/* Soft Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => {
          const duration = 12 + (i % 5) * 4;
          const delay = (i % 3) * 2;
          const size = 2 + (i % 3) * 2;
          const initialLeft = `${10 + (i * 7) % 80}%`;
          const initialTop = `${15 + (i * 9) % 75}%`;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0.1, y: 0 }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
                y: [-30, 30, -30],
                x: [-15, 15, -15],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay,
              }}
              style={{
                position: 'absolute',
                left: initialLeft,
                top: initialTop,
                width: size,
                height: size,
              }}
              className="rounded-full bg-blue-400/40 blur-[1px]"
            />
          );
        })}
      </div>

      {/* Vignette Background fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
    </div>
  );
}
