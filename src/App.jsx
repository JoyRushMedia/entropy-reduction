import { motion } from 'framer-motion';
import GameBoard from './components/GameBoard';

/**
 * Main App Component (JUICE-INJECTED)
 * Entry point with animated title and scanline effects
 */

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: 0.2,
    },
  },
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.5,
    },
  },
};

export default function App() {
  return (
    <div className="w-screen h-screen bg-void-black overflow-hidden relative">
      {/* Ambient scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none z-[100] opacity-50" />

      {/* Title Header */}
      <div className="absolute top-0 left-0 right-0 p-6 text-center z-10">
        <motion.h1
          className="text-impact text-neon-cyan text-4xl mb-2 relative"
          style={{
            textShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff',
          }}
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 20px #00f0ff, 0 0 40px #00f0ff',
                '0 0 30px #00f0ff, 0 0 60px #00f0ff',
                '0 0 20px #00f0ff, 0 0 40px #00f0ff',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ENTROPY REDUCTION
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-header text-text-muted text-sm tracking-aggressive"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          High-Velocity Cognitive Arcade
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-4 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          style={{
            width: '60%',
            maxWidth: '400px',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* Main Game */}
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <GameBoard />
      </motion.div>

      {/* Corner decorations (aesthetic borders) */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-neon-cyan opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-neon-cyan opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-neon-cyan opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-neon-cyan opacity-20 pointer-events-none" />
    </div>
  );
}
