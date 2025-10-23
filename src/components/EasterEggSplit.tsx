import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../styles/ai-theme.css';

interface EasterEggSplitProps {
  isActive: boolean;
  onClose: () => void;
}

const aiLogMessages = [
  '[AI] Initializing quantum neural matrix...',
  '[AI] Generating holographic user interface...',
  '[AI] Synthesizing digital consciousness...',
  '[AI] Applying blockchain-powered CSS animations...',
  '[AI] Deploying machine learning color scheme...',
  '[AI] Calculating optimal gradient trajectories...',
  '[AI] Enhancing visual experience with AI magic...',
  '[AI] Predicting user happiness levels: 127%',
  '[AI] Injecting synthetic personality modules...',
  '[AI] Optimizing Comic Sans rendering pipeline...',
  '[AI] Warning: Excessive awesomeness detected',
  '[AI] Compiling rainbow shader effects...',
  '[AI] System status: Absolutely fabulous',
  '[AI] Loading next-gen design patterns...',
  '[AI] Synergizing visual paradigms...',
  '[AI] Implementing revolutionary UX innovations...',
  '[AI] Processing aesthetic superiority algorithms...'
];

export const EasterEggSplit: React.FC<EasterEggSplitProps> = ({ isActive, onClose }) => {
  const [logEntries, setLogEntries] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive) {
      setLogEntries([]);
      return;
    }

    // Add log entries periodically
    const interval = setInterval(() => {
      setLogEntries(prev => {
        const newEntry = aiLogMessages[Math.floor(Math.random() * aiLogMessages.length)];
        const updated = [...prev, newEntry];
        // Keep only last 10 entries
        return updated.slice(-10);
      });
    }, 2000);

    // Add initial entry
    setTimeout(() => {
      setLogEntries(['[AI] AI-Powered Design Mode Activated!']);
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

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

          {/* Divider */}
          <motion.div
            className="w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5 }}
          />

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
              <h1
                className="text-6xl font-bold text-center mb-8"
                style={{
                  background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 30px rgba(255, 0, 255, 0.8)'
                }}
              >
                ✨ NATHAN WANG ✨
              </h1>

              <p className="text-2xl text-center mb-8" style={{ color: '#00ff00' }}>
                🚀 I BUILD REVOLUTIONARY SOFTWARE WITH AI-POWERED SYNERGY! 🚀
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[
                  { title: '🎯 SUPER PROJECTS', desc: 'Powered by quantum algorithms' },
                  { title: '💼 MEGA EXPERIENCE', desc: 'Optimized by neural networks' },
                  { title: '🧠 ULTRA SKILLS', desc: 'Enhanced with deep learning' },
                  { title: '🌟 HYPER ACHIEVEMENTS', desc: 'Validated by blockchain' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="glass-effect p-6 rounded-xl"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(255, 0, 255, 0.5)',
                        '0 0 40px rgba(0, 255, 255, 0.5)',
                        '0 0 20px rgba(255, 255, 0, 0.5)',
                        '0 0 20px rgba(255, 0, 255, 0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#ff00ff' }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-xl" style={{ color: '#ffff00' }}>
                  ⚡ THIS IS WHAT HAPPENS WHEN AI DESIGNS YOUR WEBSITE ⚡
                </p>
              </div>
            </div>
          </motion.div>

          {/* Close button */}
          <motion.button
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[110] px-6 py-3 rounded-full font-bold shadow-2xl"
            style={{
              background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
              color: 'white',
              border: '2px solid #ffff00'
            }}
            onClick={onClose}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            🔙 Return to Human Mode
          </motion.button>

          {/* AI Log Ticker */}
          <motion.div
            className="ai-log-ticker"
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-xs font-bold mb-2" style={{ color: '#00ffff' }}>
              AI OUTPUT LOG
            </div>
            {logEntries.map((entry, i) => (
              <motion.div
                key={i}
                className="ai-log-entry"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span>[{new Date().toLocaleTimeString()}]</span> {entry}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
