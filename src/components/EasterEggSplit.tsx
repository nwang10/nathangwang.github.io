import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import '../styles/ai-theme.css';

interface EasterEggSplitProps {
  isActive: boolean;
  onClose: () => void;
}

const aiLogMessages = [
  '🔮 Initializing quantum neural matrix... 97% complete',
  '💫 Generating portfolio vibes... MAXIMUM ENERGY',
  '🌈 Synthesizing digital consciousness... SUCCESS',
  '⚡ Applying blockchain-powered CSS animations... 42/42 chains verified',
  '🎨 Deploying machine learning color scheme... ALL COLORS AT ONCE',
  '📊 Calculating optimal gradient trajectories... TRAJECTORY: EXTREME',
  '✨ Enhancing visual experience with AI magic... MAGIC LEVEL: 9000',
  '🎯 Predicting user happiness levels: 127% (ERROR: EXCEEDS MAX)',
  '🤖 Injecting synthetic personality modules... PERSONALITY: ULTRA',
  '🔤 Optimizing Comic Sans rendering pipeline... OPTIMIZATION: PERFECT',
  '⚠️ Warning: Excessive awesomeness detected. Proceed anyway.',
  '🌟 Compiling rainbow shader effects... RAINBOWS: INFINITE',
  '💯 System status: Absolutely fabulous and then some',
  '🚀 Loading next-gen design patterns... PATTERN: REVOLUTIONARY',
  '🎭 Synergizing visual paradigms... SYNERGY ACHIEVED',
  '🔥 Implementing revolutionary UX innovations... INNOVATION: MAXIMUM',
  '💎 Processing aesthetic superiority algorithms... SUPERIORITY: CONFIRMED',
  '🎪 Generating portfolio vibes... 97% complete',
  '🌐 Deploying Web 3.0 design elements... DEPLOYMENT: SUCCESSFUL',
  '🎨 Mixing all fonts at once... FONT CHAOS: ENABLED',
  '💫 Adding more drop shadows... SHADOW COUNT: INFINITE',
  '🔊 Cranking visual volume to 11... VOLUME: 11',
  '🎊 Activating party mode... PARTY LEVEL: MAXIMUM'
];

export const EasterEggSplit: React.FC<EasterEggSplitProps> = ({ isActive, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isActive, onClose]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Left panel - Normal view */}
          <motion.div
            className="w-1/2 h-full overflow-auto relative"
            initial={{ x: -window.innerWidth / 2 }}
            animate={{ x: 0 }}
            exit={{ x: -window.innerWidth / 2 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="absolute top-4 left-4 z-10">
              <div className="glass-effect px-4 py-2 rounded-full text-sm font-bold">
                👤 Human Mode
              </div>
            </div>
          </motion.div>

          {/* Divider - slides from center */}
          <motion.div
            className="w-2 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 relative overflow-hidden"
            initial={{ scaleY: 0, originY: 0.5 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)'
            }}
          >
            {/* Animated glow that travels up and down */}
            <motion.div
              className="absolute w-full h-20 bg-white opacity-50"
              animate={{
                y: ['-100%', '100vh']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                filter: 'blur(10px)'
              }}
            />
          </motion.div>

          {/* Right panel - AI mode */}
          <motion.div
            className="w-1/2 h-full overflow-auto relative ai-mode"
            initial={{ x: window.innerWidth / 2 }}
            animate={{ x: 0 }}
            exit={{ x: window.innerWidth / 2 }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{
              background: 'linear-gradient(135deg, #000033 0%, #1a0033 50%, #000033 100%)'
            }}
          >
            <div className="absolute top-4 right-4 z-10">
              <div
                className="px-4 py-2 rounded-full text-sm font-bold border-3"
                style={{
                  background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
                  color: '#00ff00',
                  border: '3px solid #ffff00',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.8)'
                }}
              >
                🤖 AI-Generated Mode
              </div>
            </div>

            {/* Mirrored content with AI theme */}
            <div className="p-8 pt-20">
              <motion.h1
                className="text-6xl font-bold text-center mb-4"
                style={{
                  background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6), 0 0 90px rgba(255, 255, 0, 0.4)',
                  filter: 'drop-shadow(5px 5px 10px rgba(255, 0, 255, 0.8)) drop-shadow(-5px -5px 10px rgba(0, 255, 255, 0.8))'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                ⭐✨🌟 WELCOME TO 🌟✨⭐
              </motion.h1>

              <motion.h2
                className="text-7xl font-bold text-center mb-8"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 20px #ff00ff, 0 0 40px #00ffff, 0 0 60px #ffff00, 5px 5px 0px #ff00ff, 10px 10px 0px #00ffff, 15px 15px 0px #ffff00',
                  filter: 'drop-shadow(0 0 30px rgba(255, 0, 255, 1))'
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [-1, 1, -1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                NATHAN AI 9000™
              </motion.h2>

              <motion.p
                className="text-3xl text-center mb-4"
                style={{
                  color: '#00ff00',
                  textShadow: '0 0 20px #ff00ff, 3px 3px 0px #00ffff, 6px 6px 0px #ffff00',
                  filter: 'drop-shadow(2px 2px 5px rgba(255, 0, 255, 0.8))'
                }}
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                🚀 REVOLUTIONARY SOFTWARE ENGINEER 🚀
              </motion.p>

              <p className="text-xl text-center mb-8" style={{
                color: '#ffff00',
                textShadow: '0 0 10px #ff00ff, 2px 2px 0px #00ffff, 4px 4px 0px #ff00ff'
              }}>
                💫 Powered by Quantum Blockchain AI Neural Networks 💫
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  { title: '🎯 MEGA ULTRA SUPER PROJECTS', desc: 'Generated by quantum algorithms and cosmic energy fields', emoji: '⚡' },
                  { title: '💼 HYPER EXPERIENCE 9000', desc: 'Optimized by 47 different neural networks simultaneously', emoji: '🌟' },
                  { title: '🧠 INFINITE BRAIN SKILLS', desc: 'Enhanced with deep learning and extra deep learning', emoji: '💎' },
                  { title: '🌟 LEGENDARY ACHIEVEMENTS', desc: 'Validated by blockchain (all the blockchains)', emoji: '🔥' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="glass-effect p-6 rounded-xl relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5)',
                        '0 0 60px rgba(0, 255, 255, 0.8), 0 0 30px rgba(255, 255, 0, 0.5)',
                        '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 0, 255, 0.5)',
                        '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5)'
                      ],
                      rotate: [-1, 1, -1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <motion.div
                      className="absolute top-2 right-2 text-4xl"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      {item.emoji}
                    </motion.div>
                    <h3
                      className="text-2xl font-bold mb-2 pr-12"
                      style={{
                        color: '#00ffff',
                        textShadow: '0 0 10px #ff00ff, 2px 2px 0px #ffff00, 4px 4px 0px #ff00ff'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{
                      color: '#ff00ff',
                      textShadow: '0 0 5px #00ffff, 1px 1px 0px #ffff00'
                    }}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12 p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(45deg, rgba(255, 0, 255, 0.3), rgba(0, 255, 255, 0.3), rgba(255, 255, 0, 0.3))',
                  border: '5px solid #00ff00',
                  boxShadow: '0 0 40px rgba(255, 0, 255, 0.8), inset 0 0 40px rgba(0, 255, 255, 0.5)'
                }}
                animate={{
                  scale: [1, 1.02, 1],
                  borderColor: ['#00ff00', '#ff00ff', '#00ffff', '#ffff00', '#00ff00']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity
                }}
              >
                <p className="text-2xl font-bold" style={{
                  color: '#ffff00',
                  textShadow: '0 0 20px #ff00ff, 3px 3px 0px #00ffff, 6px 6px 0px #ff00ff, 9px 9px 0px #ffff00'
                }}>
                  ⚡⚡⚡ THIS IS WHAT HAPPENS WHEN AI DESIGNS YOUR WEBSITE ⚡⚡⚡
                </p>
                <p className="text-lg mt-2" style={{
                  color: '#00ff00',
                  textShadow: '0 0 10px #ff00ff'
                }}>
                  🎨 100% Generated by Artificial Intelligence (Definitely Not Satire) 🎨
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Close button - Enhanced */}
          <motion.button
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[110] px-8 py-4 rounded-full font-bold shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
              backgroundSize: '200% 200%',
              color: 'white',
              border: '4px solid #00ff00',
              fontSize: '1.1rem',
              textShadow: '0 0 10px rgba(0, 0, 0, 0.8), 2px 2px 0px rgba(255, 255, 0, 0.5)',
              boxShadow: '0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)'
            }}
            onClick={onClose}
            initial={{ y: -100, rotate: -10 }}
            animate={{
              y: 0,
              rotate: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              y: { type: 'spring', stiffness: 200, damping: 15 },
              rotate: { type: 'spring', stiffness: 200, damping: 15 },
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            whileHover={{
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              boxShadow: '0 0 50px rgba(255, 0, 255, 1), 0 0 100px rgba(0, 255, 255, 0.8)',
              transition: { duration: 0.3 }
            }}
            whileTap={{
              scale: 0.95,
              rotate: 0
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              🔙 ESCAPE TO HUMAN MODE 🔙
            </motion.span>
          </motion.button>

          {/* Scrolling Bottom Ticker */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[110] overflow-hidden"
            style={{
              background: 'linear-gradient(90deg, #000000, #1a0033, #000033, #1a0033, #000000)',
              borderTop: '3px solid #00ff00',
              boxShadow: '0 -5px 30px rgba(0, 255, 0, 0.5)',
              fontFamily: 'Comic Sans MS, cursive, sans-serif'
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <div className="relative h-12 flex items-center">
              {/* Scrolling text */}
              <motion.div
                className="flex whitespace-nowrap"
                animate={{
                  x: [0, -2000]
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {[...Array(3)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center">
                    {aiLogMessages.map((msg, i) => (
                      <span
                        key={`${setIndex}-${i}`}
                        className="mx-6 text-sm font-bold"
                        style={{
                          color: i % 3 === 0 ? '#00ff00' : i % 3 === 1 ? '#00ffff' : '#ffff00',
                          textShadow: '0 0 10px currentColor, 2px 2px 0px rgba(255, 0, 255, 0.5)'
                        }}
                      >
                        {msg}
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>

              {/* Gradient fade edges */}
              <div
                className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, #000000, transparent)'
                }}
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, #000000, transparent)'
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
