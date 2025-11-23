import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ParticleBurst Component
 * Explosive particle effect for "Critical Clear" (Positive Prediction Error)
 * Creates 20 particles that radiate outward with spring physics
 */

const PARTICLE_COUNT = 20;

export default function ParticleBurst({ x, y, color = '#a855f7', onComplete }) {
  const [particles] = useState(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
      const distance = 100 + Math.random() * 100; // 100-200px radius
      const size = 8 + Math.random() * 12; // 8-20px

      return {
        id: i,
        angle,
        distance,
        size,
        // Calculate end position
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance,
      };
    })
  );

  useEffect(() => {
    // Auto-cleanup after animation completes
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: particle.endX,
            y: particle.endY,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // Bounce ease
            delay: Math.random() * 0.1, // Stagger slightly
          }}
        />
      ))}

      {/* Central flash */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 60,
          height: 60,
          backgroundColor: color,
          left: -30,
          top: -30,
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}
