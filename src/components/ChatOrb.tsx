import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ChatOrbProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatOrb: React.FC<ChatOrbProps> = ({ onClick, isOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl focus:outline-none focus:ring-4 focus:ring-accent focus:ring-opacity-50"
          style={{
            backgroundColor: 'var(--color-accent)',
            boxShadow: isHovered
              ? '0 0 30px var(--color-accent)'
              : '0 10px 25px rgba(0, 0, 0, 0.3)'
          }}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: 1,
            rotate: 0,
            y: [0, -10, 0]
          }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{
            scale: { type: 'spring', stiffness: 200 },
            y: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open AI chat assistant"
        >
          <motion.svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </motion.svg>

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
